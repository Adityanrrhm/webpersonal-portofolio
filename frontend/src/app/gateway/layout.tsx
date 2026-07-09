import { AuthProvider } from "@/context/AuthContext";

export default function GatewayLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
