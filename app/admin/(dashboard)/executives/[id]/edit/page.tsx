import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ExecutiveForm } from "@/components/admin/executives/executive-form";
import { updateExecutive } from "@/app/admin/(dashboard)/executives/actions";
import type { ActionResult } from "@/app/admin/(dashboard)/executives/actions";

export const metadata: Metadata = {
  title: "Edit Executive",
  robots: { index: false, follow: false },
};

export default async function EditExecutivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: executive } = await supabase
    .from("executives")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (!executive) notFound();

  const boundAction = async (
    prevState: ActionResult | null,
    formData: FormData
  ): Promise<ActionResult> => updateExecutive(id, prevState, formData);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/executives"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-emerald-700"
        >
          <ArrowLeft size={15} /> Back to Executives
        </Link>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Edit Executive</h1>
      </div>
      <div className="max-w-2xl rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <ExecutiveForm executive={executive} action={boundAction} />
      </div>
    </div>
  );
}
