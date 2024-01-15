"use client";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

type PageProps = {
  children: React.ReactNode;
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

export default function AnimatedButton({ children, variant }: PageProps) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Button variant={variant ? variant : "default"}>{children}</Button>
    </motion.div>
  );
}
