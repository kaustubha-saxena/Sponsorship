import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { email, password, role, name } = await req.json();

    // 🔴 Validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["cc", "oc"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Only cc or oc allowed." },
        { status: 400 }
      );
    }

    // 1️⃣ Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // 2️⃣ Create Firestore document
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      email,
      name: name || "",
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("REGISTER USER API ERROR:", err);

    // 🔍 Common Firebase errors
    if (err.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

