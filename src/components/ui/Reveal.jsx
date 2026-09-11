import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [16, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
