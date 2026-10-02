import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.subject.trim().length < 3) errors.subject = "Please add a short subject.";
  if (values.message.trim().length < 20) errors.message = "Message should be at least 20 characters.";
  return errors;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Honeypot field for spam prevention — humans never see or fill this.
  const [company, setCompany] = useState("");
  const { toast } = useToast();

  const setField = (field: keyof typeof values) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (company) return; // silently drop bots

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);
    try {
      await submitContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Transmission received",
        description: "Your message is in orbit. I'll respond within 48 hours.",
      });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error.");
    }
  };

  if (status === "success") {
    return (
      <div className="gradient-border animate-fade-up flex flex-col items-center rounded-2xl px-8 py-14 text-center">
        <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-void-800 shadow-glow-cyan">
          <CheckCircle2 className="h-8 w-8 text-neon-cyan" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-white">Message launched ✦</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
          Thanks for reaching out. My reply usually arrives within 48 hours — check the void (and your spam folder) for{" "}
          <span className="text-neon-cyan">{site_email_hint()}</span>.
        </p>
        <Button variant="cyan" className="mt-7" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const fieldClass = (hasError?: string) =>
    cn("transition-colors", hasError && "border-fuchsia-500/70 focus-visible:ring-fuchsia-500/30");

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby={status === "error" ? "contact-form-error" : undefined}>
      {/* Spam-prevention honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-field">Company (leave blank)</label>
        <input id="company-field" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-display text-sm text-zinc-300">
            Name <span className="text-fuchsia-400" aria-hidden="true">*</span>
          </label>
          <Input
            id="contact-name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            placeholder="Ada Lovelace"
            value={values.name}
            onChange={(e) => setField("name")(e.target.value)}
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-fuchsia-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block font-display text-sm text-zinc-300">
            Email <span className="text-fuchsia-400" aria-hidden="true">*</span>
          </label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            placeholder="ada@example.com"
            value={values.email}
            onChange={(e) => setField("email")(e.target.value)}
            className={fieldClass(errors.email)}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-fuchsia-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-subject" className="mb-1.5 block font-display text-sm text-zinc-300">
          Subject <span className="text-fuchsia-400" aria-hidden="true">*</span>
        </label>
        <Input
          id="contact-subject"
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          placeholder="Project inquiry, collaboration, or just hello"
          value={values.subject}
          onChange={(e) => setField("subject")(e.target.value)}
          className={fieldClass(errors.subject)}
        />
        {errors.subject && (
          <p id="contact-subject-error" role="alert" className="mt-1.5 text-xs text-fuchsia-400">
            {errors.subject}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="mb-1.5 block font-display text-sm text-zinc-300">
          Message <span className="text-fuchsia-400" aria-hidden="true">*</span>
        </label>
        <Textarea
          id="contact-message"
          required
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          placeholder="Tell me about your project, timeline, and what success looks like…"
          value={values.message}
          onChange={(e) => setField("message")(e.target.value)}
          className={fieldClass(errors.message)}
        />
        <p id="contact-message-hint" className="mt-1.5 text-xs text-zinc-500">
          Minimum 20 characters. Your email is only used to reply.
        </p>
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-fuchsia-400">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          id="contact-form-error"
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">Launch failed.</p>
            <p className="mt-0.5 text-fuchsia-300/80">{errorMessage ?? "Something went wrong. Please try again."}</p>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" /> Transmitting…
          </>
        ) : (
          <>
            <Send aria-hidden="true" /> Launch Message
          </>
        )}
      </Button>
    </form>
  );
}

function site_email_hint() {
  return "hello@novakane.dev";
}
