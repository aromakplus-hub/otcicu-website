import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ExecutiveForm } from "@/components/admin/executives/executive-form";
import { createExecutive } from "@/app/admin/(dashboard)/executives/actions";

export const metadata: Metadata = {
  title: "Add Executive",
  robots: { index: false, follow: false },
};

export default function NewExecutivePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/admin/executives"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-emerald-700"
        >
          <ArrowLeft size={15} /> Back to Executives
        </Link>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Add Executive</h1>
      </div>
      <div className="max-w-2xl rounded-2xl border border-ink-100 bg-white p-6 sm:p-8">
        <ExecutiveForm action={createExecutive} />
      </div>
    </div>
  );
}
