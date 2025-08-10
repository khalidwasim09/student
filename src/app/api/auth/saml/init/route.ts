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

  if (inst.ssoType !== "SAML")
    return NextResponse.json({ error: "Institution not configured for SAML" }, { status: 400 });

  // TODO: Use samlify to build redirect URL to IdP
  const redirectUrl = `/api/auth/saml/acs?institutionId=${inst.id}&SAMLResponse=mock`;
  return NextResponse.json({ redirectUrl });
}