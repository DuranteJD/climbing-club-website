import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: add signup
export async function POST(req: Request) {
  const body = await req.json() as { name: string; date: string };
  if (!body.name || !body.date) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const duplicate = await prisma.signUp.findFirst({
    where: { name: body.name, date: body.date },
  });

  if (duplicate) {
    return NextResponse.json(
      { success: false, message: "Already signed up for this date" },
      { status: 400 }
    );
  }

  const confirmedCount = await prisma.signUp.count({
    where: { date: body.date, status: "confirmed" },
  });

  const newSignUp = await prisma.signUp.create({
    data: {
      name: body.name,
      date: body.date,
      status: confirmedCount < 18 ? "confirmed" : "waitlist",
    },
  });

  return NextResponse.json({ success: true, signup: newSignUp });
}

// GET: list signups + dates
export async function GET() {
  const signUps = await prisma.signUp.findMany();
  const practiceDates = await prisma.practiceDate.findMany({ orderBy: { date: "asc" } });

  return NextResponse.json({
    signUps,
    practiceDates: practiceDates.map((d: { date: string }) => d.date),
  });
}

// DELETE: remove signup by id
export async function DELETE(req: Request) {
  const { id } = (await req.json()) as { id: string };

  const signupToRemove = await prisma.signUp.findUnique({ where: { id } });
  if (!signupToRemove) {
    return NextResponse.json({ success: false, message: "Signup not found" }, { status: 404 });
  }

  await prisma.signUp.delete({ where: { id } });

  // If confirmed removed → promote first waitlist
  if (signupToRemove.status === "confirmed") {
    const waitlist = await prisma.signUp.findMany({
      where: { date: signupToRemove.date, status: "waitlist" },
      orderBy: { id: "asc" },
    });

    if (waitlist.length > 0) {
      await prisma.signUp.update({
        where: { id: waitlist[0].id },
        data: { status: "confirmed" },
      });
    }
  }

  return NextResponse.json({ success: true });
}

// PUT: update practice dates
export async function PUT(req: Request) {
  const body = (await req.json()) as { practiceDates: string[] };
  if (!Array.isArray(body.practiceDates)) {
    return NextResponse.json(
      { success: false, message: "Invalid dates" },
      { status: 400 }
    );
  }

  // clear old dates and insert new ones
  await prisma.practiceDate.deleteMany({});
  await prisma.practiceDate.createMany({
    data: body.practiceDates.map((d) => ({ date: d })),
  });

  return NextResponse.json({ success: true, practiceDates: body.practiceDates });
}

// PATCH: clear all signups
export async function PATCH() {
  await prisma.signUp.deleteMany({});
  return NextResponse.json({ success: true, message: "All signups cleared" });
}
