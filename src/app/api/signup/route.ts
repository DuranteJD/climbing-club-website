import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

interface SignUpFormData {
  id: string;
  name: string;
  date: string;
  status: "confirmed" | "waitlist";
}

let signUps: SignUpFormData[] = [];
let practiceDates: string[] = ["2025-09-05", "2025-09-12", "2025-09-19", "2025-09-26"]; // Added TUFAS

// POST: add signup
export async function POST(req: Request) {
  const body = (await req.json()) as Omit<SignUpFormData, "id" | "status">;

  if (!body.name || !body.date) {
    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
  }

  const duplicate = signUps.find(s => s.name === body.name && s.date === body.date);
  if (duplicate) {
    return NextResponse.json({ success: false, message: "Already signed up for this date" }, { status: 400 });
  }

  const confirmedCount = signUps.filter(s => s.date === body.date && s.status === "confirmed").length;

  const newSignUp: SignUpFormData = {
    id: randomUUID(),
    status: confirmedCount < 18 ? "confirmed" : "waitlist",
    ...body,
  };

  signUps.push(newSignUp);

  return NextResponse.json({ success: true, signup: newSignUp });
}

// GET: list signups and dates
export async function GET() {
  return NextResponse.json({ signUps, practiceDates });
}

// DELETE: remove signup by id
export async function DELETE(req: Request) {
  const { id } = (await req.json()) as { id: string };

  const signupToRemove = signUps.find(s => s.id === id);
  if (!signupToRemove) {
    return NextResponse.json({ success: false, message: "Signup not found" }, { status: 404 });
  }

  // Remove signup
  signUps = signUps.filter(s => s.id !== id);

  // If a confirmed signup was removed, promote first waitlisted person for that date
  if (signupToRemove.status === "confirmed") {
    const waitlist = signUps.filter(s => s.date === signupToRemove.date && s.status === "waitlist");
    if (waitlist.length > 0) {
      waitlist[0].status = "confirmed";
    }
  }

  return NextResponse.json({ success: true });
}

// PUT: update practice dates (admin)
export async function PUT(req: Request) {
  const body = (await req.json()) as { practiceDates: string[] };

  if (!Array.isArray(body.practiceDates)) {
    return NextResponse.json({ success: false, message: "Invalid dates" }, { status: 400 });
  }

  practiceDates = body.practiceDates;
  return NextResponse.json({ success: true, practiceDates });
}

// PATCH: clear all signups (admin)
export async function PATCH() {
  signUps = [];
  return NextResponse.json({ success: true, message: "All signups cleared" });
}
