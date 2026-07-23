"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { executiveSchema } from "@/lib/validations/executive";
import type { Database } from "@/types/database.types";

export type ActionResult = { success: true } | { success: false; error: string };

async function getClientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

function revalidateExecutivePages() {
  revalidatePath("/admin/executives");
  revalidatePath("/about/executive-committee");
}

export async function createExecutive(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const parsed = executiveSchema.safeParse({
    full_name: formData.get("full_name"),
    position: formData.get("position"),
    biography: formData.get("biography"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    photo_url: formData.get("photo_url"),
    display_order: formData.get("display_order"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const insertPayload: Database["public"]["Tables"]["executives"]["Insert"] = {
    full_name: parsed.data.full_name,
    position: parsed.data.position,
    biography: parsed.data.biography || null,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    photo_url: parsed.data.photo_url || null,
    display_order: parsed.data.display_order,
    status: parsed.data.status,
    created_by: user?.id ?? null,
  };

  const { data, error } = await supabase
    .from("executives")
    .insert(insertPayload)
    .select("id")
    .single();

  if (error) {
    // RLS violation surfaces here as a generic Postgres error — translate it
    // into something a non-technical admin can actually understand.
    const message = error.message.includes("row-level security")
      ? "You don't have permission to publish directly. Save as Draft instead, or ask an Administrator to publish it."
      : "Could not save this executive. Please try again.";
    return { success: false, error: message };
  }

  await supabase.rpc("log_activity", {
    p_action: "executive.create",
    p_table_name: "executives",
    p_record_id: data.id,
    p_new_value: insertPayload,
    p_ip_address: await getClientIp(),
  });

  revalidateExecutivePages();
  return { success: true };
}

export async function updateExecutive(
  id: string,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const supabase = await createClient();

  const parsed = executiveSchema.safeParse({
    full_name: formData.get("full_name"),
    position: formData.get("position"),
    biography: formData.get("biography"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    photo_url: formData.get("photo_url"),
    display_order: formData.get("display_order"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { data: before } = await supabase
    .from("executives")
    .select("*")
    .eq("id", id)
    .single();

  const updatePayload: Database["public"]["Tables"]["executives"]["Update"] = {
    full_name: parsed.data.full_name,
    position: parsed.data.position,
    biography: parsed.data.biography || null,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    photo_url: parsed.data.photo_url || null,
    display_order: parsed.data.display_order,
    status: parsed.data.status,
  };

  const { error } = await supabase.from("executives").update(updatePayload).eq("id", id);

  if (error) {
    const message = error.message.includes("row-level security")
      ? "You don't have permission to publish this change directly. An Administrator needs to approve publishing."
      : "Could not save changes. Please try again.";
    return { success: false, error: message };
  }

  await supabase.rpc("log_activity", {
    p_action: "executive.update",
    p_table_name: "executives",
    p_record_id: id,
    p_old_value: before,
    p_new_value: updatePayload,
    p_ip_address: await getClientIp(),
  });

  revalidateExecutivePages();
  return { success: true };
}

export async function setExecutiveStatus(
  id: string,
  status: "published" | "hidden" | "draft"
): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: before } = await supabase.from("executives").select("status").eq("id", id).single();

  const { error } = await supabase.from("executives").update({ status }).eq("id", id);

  if (error) {
    const message = error.message.includes("row-level security")
      ? "Only an Administrator or Super Admin can publish or unpublish an executive."
      : "Could not update status. Please try again.";
    return { success: false, error: message };
  }

  await supabase.rpc("log_activity", {
    p_action: `executive.${status === "published" ? "publish" : "unpublish"}`,
    p_table_name: "executives",
    p_record_id: id,
    p_old_value: before,
    p_new_value: { status },
    p_ip_address: await getClientIp(),
  });

  revalidateExecutivePages();
  return { success: true };
}

export async function deleteExecutive(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: before } = await supabase.from("executives").select("*").eq("id", id).single();

  // Soft delete — see SECURITY.md / migration 0008. RLS additionally
  // enforces that only can_publish() roles may set deleted_at, so this is
  // defense in depth: the UI also hides the delete button from editors.
  const { error } = await supabase
    .from("executives")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    const message = error.message.includes("row-level security")
      ? "Only an Administrator or Super Admin can delete an executive."
      : "Could not delete this executive. Please try again.";
    return { success: false, error: message };
  }

  await supabase.rpc("log_activity", {
    p_action: "executive.delete",
    p_table_name: "executives",
    p_record_id: id,
    p_old_value: before,
    p_ip_address: await getClientIp(),
  });

  revalidateExecutivePages();
  return { success: true };
}
