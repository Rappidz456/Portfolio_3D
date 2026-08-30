import { useEffect } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { site } from "../constants/site";
import { fadeIn, textVariant } from "../utils/motion";
import { useContactForm } from "../hooks/useContactForm";
import { useToast } from "../context/ToastProvider";
import MetaList, { MetaRow } from "./ui/MetaList";
import FormField from "./ui/FormField";

const Contact = () => {
  const { form, loading, status, handleChange, handleSubmit } =
    useContactForm();
  const { toast } = useToast();

  // The hook reports the send result; surface it as a toast.
  useEffect(() => {
    if (!status) return;

    toast({
      type: status.type,
      title:
        status.type === "success" ? "Message sent" : "Couldn't send message",
      message: status.message,
      duration: status.type === "success" ? 6000 : 9000,
    });
  }, [status, toast]);

  return (
    <>
      <div className="relative">
        <motion.div variants={textVariant()} className="relative z-10">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="display-xl mt-8 text-ink">
            Let&apos;s build
            <br />
            something <span className="accent-italic">good</span>.
          </h2>
        </motion.div>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 0.8)}
          className="lg:col-span-5"
        >
          <p className="section-copy">
            Have a product in mind, or an existing codebase that needs a steady
            pair of hands? Tell me what you&apos;re working on and I&apos;ll get
            back to you.
          </p>

          <MetaList className="mt-12">
            <MetaRow label="Email">
              <a
                href={`mailto:${site.email}`}
                className="link-underline text-[16px] font-normal text-ink"
              >
                {site.email}
              </a>
            </MetaRow>
            <MetaRow label="Phone">
              <a
                href={site.phoneHref}
                className="link-underline text-[16px] font-normal text-ink"
              >
                {site.phone}
              </a>
            </MetaRow>
            <MetaRow label="Elsewhere">
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-[16px] font-normal text-ink"
              >
                {site.githubLabel}
              </a>
            </MetaRow>
          </MetaList>
        </motion.div>

        <motion.form
          variants={fadeIn("up", "tween", 0.25, 0.8)}
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 lg:col-span-6 lg:col-start-7"
        >
          <FormField
            label="01 / Your name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            required
          />
          <FormField
            label="02 / Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            required
          />
          <FormField
            label="03 / Project"
            name="message"
            type="textarea"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about what you're building"
            required
          />

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="site-btn w-fit"
          >
            {loading ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </button>
        </motion.form>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
