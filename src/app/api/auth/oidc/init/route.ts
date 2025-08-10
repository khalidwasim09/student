import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db";

const bodySchema = z.object({ institutionId: z.string().min(1) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parse = bodySchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const inst = await prisma.institution.findUnique({ where: { id: parse.data.institutionId } });
  if (!inst || inst.status !== "active")
    return NextResponse.json({ error: "Institution not found" }, { status: 404 });

  if (inst.ssoType !== "OIDC")
    return NextResponse.json({ error: "Institution not configured for OIDC" }, { status: 400 });

  // TODO: Build dynamic OIDC client and generate auth URL
  const redirectUrl = `/api/auth/oidc/callback?institutionId=${inst.id}&code=mock-code`;
  return NextResponse.json({ redirectUrl });
}