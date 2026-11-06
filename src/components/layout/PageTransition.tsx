import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function PageTransition({
  children,
  className = "min-h-svh px-6 pt-36 md:pt-28",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.main>
  );
}