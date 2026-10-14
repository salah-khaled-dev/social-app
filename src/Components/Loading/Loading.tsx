import React from "react";
import { Loader } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 w-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-10 h-10 rounded-full bg-purple-500/15 blur-lg animate-pulse" />
        <Loader className="w-9 h-9 animate-spin text-purple-600 dark:text-purple-400 relative" />
      </div>
      {text && (
        <p className="text-sm font-semibold animate-pulse" style={{ color: "var(--text-muted)" }}>
          {text}
        </p>
      )}
    </div>
  );
}
