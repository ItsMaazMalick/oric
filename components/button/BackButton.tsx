"use client";
import { motion } from "framer-motion";
import { Undo } from "lucide-react";
import { useRouter } from "next/navigation";
import TooltipComponent from "../tooltip/TooltipComponent";

const BackButton = () => {
  const router = useRouter();
  return (
    <TooltipComponent title="Back">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={router.back}
        className="p-2 bg-primary hover:bg-secondary text-primary-foreground rounded-lg"
      >
        <Undo />
      </motion.div>
    </TooltipComponent>
  );
};

export default BackButton;
