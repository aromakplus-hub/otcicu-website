import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { ApplicationForm } from "@/components/forms/application-form";

export const metadata: Metadata = {
  title: "Membership Application",
  description: "Apply for membership at Otitoloju C.I.C.U in a few guided steps.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership Application"
        title="Apply for membership"
        description="This guided form takes about 10 minutes. You can move back and forth between steps before submitting."
      />

      <section className="py-16 md:py-20">
        <Container className="mx-auto max-w-3xl">
          <ApplicationForm />
        </Container>
      </section>
    </>
  );
}
