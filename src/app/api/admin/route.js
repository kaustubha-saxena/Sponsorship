import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const { email, password, role, name } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!["ot", "oc"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // 1️⃣ Create Auth user
    const user = await admin.auth().createUser({
      email,
      password,
    });

    // 2️⃣ Create Firestore user doc
    await admin.firestore().collection("users").doc(user.uid).set({
      email,
      name: name || "",
      role,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CREATE USER ERROR:", err.message);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
