import { supabaseAdmin } from "./supabaseAdmin";
import { NextRequest } from "next/server";

export async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const emailAllow = (process.env.ADMIN_EMAIL || "").toLowerCase();
  if (!token || !emailAllow || !supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user?.email || data.user.email.toLowerCase() !== emailAllow) return null;
  return data.user;
}
