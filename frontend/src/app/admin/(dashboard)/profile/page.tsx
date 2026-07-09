"use client";

import { useState, useEffect, type FormEvent } from "react";
import { apiAdmin, getToken } from "@/lib/apiAdmin";
import { uploadFiles } from "@/lib/uploadthing";
import ImageUpload from "@/components/admin/ImageUpload";
import { Save, Lock, Loader2 } from "lucide-react";
import { useToast, Toast } from "@/components/admin/Toast";

interface Profile {
  name: string;
  title: string;
  bio: string;
  photoUrl: string | File | null;
  cvUrl: string | null;
  email: string;
  location: string;
  focus: string;
  study: string;
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  const { toast, showToast, dismissToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwBusy, setPwBusy] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    apiAdmin<{ data: Profile }>("profile")
      .then((res) => {
        setProfile(res.data);
        setOriginalPhotoUrl(typeof res.data.photoUrl === "string" ? res.data.photoUrl : null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    
    let finalPhotoUrl = typeof profile.photoUrl === "string" ? profile.photoUrl : null;

    try {
      if (profile.photoUrl instanceof File) {
        const token = getToken();
        const res = await uploadFiles("imageUploader", {
          files: [profile.photoUrl],
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res?.[0]) finalPhotoUrl = res[0].ufsUrl ?? res[0].url;
      }

      const body = { ...profile, photoUrl: finalPhotoUrl };

      await apiAdmin("admin/profile", {
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (originalPhotoUrl && originalPhotoUrl !== finalPhotoUrl) {
        await apiAdmin("uploadthing/delete", {
          method: "POST",
          body: JSON.stringify({ url: originalPhotoUrl }),
        }).catch(err => console.error("Failed to delete old image:", err));
        setOriginalPhotoUrl(finalPhotoUrl);
      }

      showToast("Profile updated!", "success");
    } catch {
      showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const updatePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwError("");

    if (!currentPassword || !newPassword) {
      setPwError("All fields are required");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwords do not match");
      return;
    }

    setPwBusy(true);
    try {
      await apiAdmin("admin/profile", {
        method: "PUT",
        body: JSON.stringify({
          current_password: currentPassword,
          password: newPassword,
        }),
      });
      showToast("Password updated!", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPwError(err.message || "Failed to update password");
    } finally {
      setPwBusy(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-6">{Array(6).fill(0).map((_, i) => <div key={i} className="h-12 bg-gray-200 rounded-lg" />)}</div>;
  if (!profile) return <p className="text-gray-400">Profile not found.</p>;

  const update = (key: keyof Profile, value: any) => setProfile(p => p ? { ...p, [key]: value } : p);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Edit Profile</h1>
      </div>

      <form onSubmit={save} className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 max-w-2xl space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" value={profile.name} onChange={v => update("name", v)} required />
          <Input label="Title" value={profile.title} onChange={v => update("title", v)} required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Bio</label>
          <textarea value={profile.bio} onChange={e => update("bio", e.target.value)} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Email" type="email" value={profile.email} onChange={v => update("email", v)} required />
          <Input label="Location" value={profile.location} onChange={v => update("location", v)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Focus" value={profile.focus} onChange={v => update("focus", v)} />
          <Input label="Study" value={profile.study} onChange={v => update("study", v)} />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Photo</label>
          <ImageUpload value={profile.photoUrl || ""} onChange={v => update("photoUrl", v)} />
        </div>

        <Input label="CV URL" type="text" value={profile.cvUrl || ""} onChange={v => update("cvUrl", v)} placeholder="Link to downloadable CV/resume" />

        <div className="pt-4 border-t">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.97] disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

      <form onSubmit={updatePassword} className="bg-white rounded-xl border shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 max-w-2xl space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-5 h-5 text-gray-700" />
          <h2 className="font-heading text-lg font-semibold">Change Password</h2>
        </div>

        {pwError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
            {pwError}
          </p>
        )}

        <Input label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} placeholder="Enter current password" />
        <Input label="New Password" type="password" value={newPassword} onChange={setNewPassword} placeholder="Min. 6 characters" />
        <Input label="Confirm New Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter new password" />

        <div className="pt-2">
          <button type="submit" disabled={pwBusy} className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all active:scale-[0.97] disabled:opacity-70">
            {pwBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {pwBusy ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      <Toast toast={toast} onDismiss={dismissToast} />
    </div>
  );
}

function Input({ label, value, onChange, required, type, placeholder }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
      <input type={type || "text"} required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10" />
    </div>
  );
}
