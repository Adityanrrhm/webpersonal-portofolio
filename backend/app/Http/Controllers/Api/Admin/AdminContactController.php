<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Contact;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminContactController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Contact::latest()->get()->map(fn ($c) => [
                'id'        => $c->id,
                'name'      => $c->name,
                'email'     => $c->email,
                'subject'   => $c->subject,
                'message'   => $c->message,
                'isRead'    => $c->is_read,
                'createdAt' => $c->created_at,
            ]),
        ]);
    }

    public function show(Contact $contact)
    {
        return response()->json([
            'data' => [
                'id'        => $contact->id,
                'name'      => $contact->name,
                'email'     => $contact->email,
                'subject'   => $contact->subject,
                'message'   => $contact->message,
                'isRead'    => $contact->is_read,
                'createdAt' => $contact->created_at,
            ],
        ]);
    }

    public function markRead(Contact $contact)
    {
        $contact->update(['is_read' => true]);

        return response()->json(['message' => 'Marked as read.']);
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json(['message' => 'Contact deleted.']);
    }
}
