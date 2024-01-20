"use client"; // Error components must be Client Components

import AnimatedButton from "@/components/button/AnimatedButton";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-destructive font-bold">Something went wrong!</h2>
        <AnimatedButton>
          <button
            className=""
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </AnimatedButton>
      </div>
    </div>
  );
}
