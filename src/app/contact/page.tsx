import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Let's discuss your project, collaboration opportunities, or just say hello.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get In Touch"
        description="Have a project in mind, a question, or just want to connect? I'd love to hear from you."
      />
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-4 text-lg font-semibold">Contact Info</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Antalya, Turkey (Remote-friendly)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-semibold">Social</h2>
                <SocialLinks />
              </div>

              <div className="rounded-lg border border-border/50 p-5">
                <h3 className="mb-2 font-semibold">Open to Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  I&apos;m currently available for freelance work, full-time positions,
                  and interesting collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
