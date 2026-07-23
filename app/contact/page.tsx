import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Otitoloju C.I.C.U — office address, phone, email, and office hours.",
};

const officeHours: { day: string; hours: string }[] = [
  // Not supplied in the approved content workbook yet.
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We're here to help"
        description="Whether it's a membership question or a loan enquiry, reach us through any channel below."
      />

      <section className="py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Contact form */}
          <div className="lg:col-span-7">
            <p className="mb-6 font-display text-xl font-semibold text-ink-900">Send us a message</p>
            <ContactForm />
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-col gap-5 rounded-3xl border border-ink-100 p-7">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">Office Address</p>
                  <p className="text-sm text-ink-500">{siteConfig.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">Phone</p>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-sm text-ink-500 hover:text-emerald-700">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">Email</p>
                  {siteConfig.email ? (
                    <a href={`mailto:${siteConfig.email}`} className="text-sm text-ink-500 hover:text-emerald-700">
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span className="text-sm text-ink-400">Coming soon</span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-display text-sm font-semibold text-ink-900">Office Hours</p>
                  {officeHours.length > 0 ? (
                    <dl className="mt-1 flex flex-col gap-0.5 text-sm text-ink-500">
                      {officeHours.map((entry) => (
                        <div key={entry.day} className="flex justify-between gap-4">
                          <dt>{entry.day}</dt>
                          <dd>{entry.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="mt-1 text-sm text-ink-400">Coming soon</p>
                  )}
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-4 font-ui text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </a>

            {/* Map placeholder */}
            <div
              role="img"
              aria-label="Map showing the cooperative's office location — placeholder pending live map integration"
              className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl bg-emerald-50 text-center"
            >
              <MapPin size={28} className="text-emerald-300" />
              <p className="text-sm text-ink-500">Map integration placeholder</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="faqs" className="bg-emerald-50/50 py-16">
        <Container className="text-center">
          <p className="text-sm text-ink-500">
            Looking for answers to common questions? Visit our{" "}
            <a href="/membership" className="font-semibold text-emerald-700 hover:underline">
              Membership
            </a>
            ,{" "}
            <a href="/savings" className="font-semibold text-emerald-700 hover:underline">
              Savings
            </a>
            , or{" "}
            <a href="/loans" className="font-semibold text-emerald-700 hover:underline">
              Loans
            </a>{" "}
            pages for detailed FAQs.
          </p>
        </Container>
      </section>
    </>
  );
}
