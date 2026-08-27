import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const FeedbackCard = ({ index, testimonial, name, designation, company }) => (
  <motion.figure
    variants={fadeIn("up", "tween", index * 0.09, 0.7)}
    className="interactive-card flex flex-col justify-between rounded-sm p-8 sm:p-10"
  >
    <span
      className="font-display text-[56px] leading-none text-sand"
      aria-hidden="true"
    >
      &ldquo;
    </span>

    <blockquote className="mt-2 flex-1">
      <p className="font-display text-[21px] leading-[1.45] text-ink">
        {testimonial}
      </p>
    </blockquote>

    <figcaption className="mt-8 border-t border-[color:var(--hairline)] pt-5">
      <p className="text-[14px] font-normal text-ink">{name}</p>
      <p className="mt-1 text-[12px] font-light text-grey">
        {designation} · {company}
      </p>
    </figcaption>
  </motion.figure>
);

const Feedbacks = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className={styles.sectionSubText}>Social proof</p>
          <h2 className={`${styles.sectionHeadText} mt-6`}>Testimonials</h2>
        </div>
      </motion.div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
