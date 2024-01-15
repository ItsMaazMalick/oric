"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
import { motion } from "framer-motion";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function FormSubmitButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button {...props} type="submit" disabled={props.disabled || loading}>
        <span className="flex items-center justify-center gap-1">
          {loading && <Loader2 size={20} className="animate-spin" />}
          {children}
        </span>
      </Button>
    </motion.div>
  );
}
