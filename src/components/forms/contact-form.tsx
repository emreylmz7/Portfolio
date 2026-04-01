"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site-config";
import type { ContactFormData, FormStatus } from "@/types";

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-border/50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-semibold">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <XCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          Subject
        </label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="What's this about?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell me about your project or idea..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
