import { motion } from "framer-motion";

import { styles } from "../../styles";
import { textVariant } from "../../utils/motion";

/**
 * Shared section chrome: eyebrow + title + optional aside blurb.
 */
const SectionHeader = ({
  eyebrow,
  title,
  aside,
  className = "",
  animate = true,
}) => {
  const content = (
    <div
      className={`flex flex-wrap items-end justify-between gap-6 ${className}`.trim()}
    >
      <div>
        <p className={styles.sectionSubText}>{eyebrow}</p>
        <h2 className={`${styles.sectionHeadText} mt-6`}>{title}</h2>
      </div>
      {aside ? (
        <p className="max-w-xs text-[14px] font-normal leading-relaxed text-grey">
          {aside}
        </p>
      ) : null}
    </div>
  );

  if (!animate) return content;

  return <motion.div variants={textVariant()}>{content}</motion.div>;
};

export default SectionHeader;
