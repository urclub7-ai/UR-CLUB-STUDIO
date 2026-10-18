import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "home") {
      const home = await prisma.homeContent.findUnique({ where: { id: "default-home" } });
      return NextResponse.json(home);
    }

    if (type === "about") {
      const about = await prisma.aboutContent.findUnique({ where: { id: "default-about" } });
      const skills = await prisma.skill.findMany({ orderBy: { displayOrder: "asc" } });
      return NextResponse.json({ about, skills });
    }

    if (type === "settings") {
      const settings = await prisma.siteSettings.findUnique({
        where: { id: "default-settings" },
        include: { socialLinks: { orderBy: { displayOrder: "asc" } } },
      });
      return NextResponse.json(settings);
    }

    return NextResponse.json({ error: "Invalid type requested" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

