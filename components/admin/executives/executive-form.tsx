"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhotoUpload } from "@/components/admin/executives/photo-upload";
import type { ActionResult } from "@/app/admin/(dashboard)/executives/actions";
import type { Database } from "@/types/database.types";

type Executive = Database["public"]["Tables"]["executives"]["Row"];

export function ExecutiveForm({
  executive,
  action,
}: {
  executive?: Executive;
  action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    action,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(executive ? "Executive updated." : "Executive created.");
      router.push("/admin/executives");
    } else if (state && !state.success) {
      toast.error(state.error);
    }
  }, [state, executive, router]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="photo_url">Photo</Label>
        <PhotoUpload name="photo_url" initialUrl={executive?.photo_url} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="full_name" label="Full Name" required>
          <Input id="full_name" name="full_name" defaultValue={executive?.full_name} required />
        </FormField>
        <FormField id="position" label="Position" required>
          <Input id="position" name="position" defaultValue={executive?.position} required />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="email" label="Email">
          <Input id="email" name="email" type="email" defaultValue={executive?.email ?? ""} />
        </FormField>
        <FormField id="phone" label="Phone">
          <Input id="phone" name="phone" type="tel" defaultValue={executive?.phone ?? ""} />
        </FormField>
      </div>

      <FormField id="biography" label="Biography">
        <Textarea id="biography" name="biography" defaultValue={executive?.biography ?? ""} rows={4} />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="display_order" label="Display Order" hint="Lower numbers appear first.">
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={executive?.display_order ?? 0}
          />
        </FormField>
        <FormField id="status" label="Status" required>
          <Select id="status" name="status" defaultValue={executive?.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </Select>
        </FormField>
      </div>

      <div className="flex items-center gap-3 border-t border-ink-100 pt-6">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save"} <Save size={16} />
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/executives")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
