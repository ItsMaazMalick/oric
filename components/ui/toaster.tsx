"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex items-center">
                <div className="relative w-6 h-6 mr-2">
                  {props.variant === "default" ? (
                    <AlertCircle className="animate-pulse" />
                  ) : props.variant === "success" ? (
                    <CheckCircle className="animate-pulse" />
                  ) : (
                    <XCircle className="animate-pulse" />
                  )}

                  {/* <Image
                    src={`/images/${
                      props.variant === "default"
                        ? "loading-animate.gif"
                        : props.variant === "success"
                        ? "tick-animate.gif"
                        : "cross-animate.gif"
                    }`}
                    alt="Loading icon"
                    fill
                    className=""
                  /> */}
                </div>
                <div>
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
