import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";

export const runtime = "nodejs";

const bodySchema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parse = bodySchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { email } = parse.data;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return NextResponse.json({ error: "Invalid email" }, { status: 400 });

  const domainRecord = await prisma.emailDomain.findUnique({ where: { domain } });
  if (!domainRecord) {
    return NextResponse.json({ error: "Unsupported institution domain" }, { status: 400 });
  }

  // TODO: rate limit, generate token+code, email via nodemailer
  // For now, return stub
  return NextResponse.json({ ok: true, message: "Verification email sent if eligible" });
}