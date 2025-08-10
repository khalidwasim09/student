import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const institutions = await prisma.institution.findMany({
    where: { status: "active" },
    select: {
      id: true,
      name: true,
      ssoType: true,
      domains: { select: { domain: true } },
    },
  });
  return NextResponse.json(institutions);
}