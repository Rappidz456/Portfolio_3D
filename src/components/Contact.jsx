import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { useInView } from "../hooks/useInView";
import { fadeIn, textVariant } from "../utils/motion";
import { useContactForm } from "../hooks/useContactForm";
import { useToast } from "../context/ToastProvider";

const GlobeSceneCanvas = lazy(() => import("./canvas/GlobeScene"));

const EMAIL = "mohammadali6918773@gmail.com";
const PHONE = "+92 331 4835133";
const PHONE_HREF = "tel:+923314835133";

const fieldClass =
  "w-full border-0 border-b border-[color:var(--line)] bg-transparent pb-3 pt-2 text-[16px] font-light text-ink outline-none transition-colors duration-300 placeholder:text-grey/60 focus:border-clay";

const Contact = () => {
  const { form, loading, status, handleChange, handleSubmit } =
    useContactForm();
  const { toast } = useToast();
  const globeRef = useRef(null);
  const globeVisible = useInView(globeRef, { rootMargin: "200px" });

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
        {/* Rotating wireframe globe, offset behind the headline */}
        <div
          ref={globeRef}
          className="absolute -top-16 right-0 z-0 hidden h-[26rem] w-[26rem] md:block lg:h-[32rem] lg:w-[32rem]"
        >
          {globeVisible ? (
            <Suspense fallback={null}>
              <GlobeSceneCanvas className="h-full w-full" />
            </Suspense>
          ) : null}
        </div>

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

          <dl className="mt-12">
            <div className="hairline py-5 first:border-t-0">
              <dt className="meta-label">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-underline text-[16px] font-light text-ink"
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="hairline py-5">
              <dt className="meta-label">Phone</dt>
              <dd className="mt-2">
                <a
                  href={PHONE_HREF}
                  className="link-underline text-[16px] font-light text-ink"
                >
                  {PHONE}
                </a>
              </dd>
            </div>
            <div className="hairline py-5">
              <dt className="meta-label">Elsewhere</dt>
              <dd className="mt-2 flex flex-wrap gap-5">
                <a
                  href="https://github.com/Rappidz456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[16px] font-light text-ink"
                >
                  GitHub
                </a>
              </dd>
            </div>
          </dl>
        </motion.div>

        <motion.form
          variants={fadeIn("up", "tween", 0.25, 0.8)}
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 lg:col-span-6 lg:col-start-7"
        >
          <label className="flex flex-col gap-1">
            <span className="meta-label">01 / Your name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="meta-label">02 / Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              required
              className={fieldClass}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="meta-label">03 / Project</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about what you're building"
              required
              className={`${fieldClass} resize-none`}
            />
          </label>

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
