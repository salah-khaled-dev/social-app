import React, { useState, useEffect } from "react";

export interface AvatarsProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showStatus?: boolean;
  isOnline?: boolean;
}

const sizeClasses: Record<string, string> = {
  xs: "w-7 h-7",
  sm: "w-9 h-9",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-28 h-28 sm:w-36 sm:h-36",
};

export default function Avatars({
  src,
  alt,
  name = "User",
  size = "md",
  className = "",
  showStatus = false,
  isOnline = true,
  ...props
}: AvatarsProps) {
  const getFallback = (n?: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      n?.trim() || "User"
    )}&background=7c3aed&color=fff&size=200`;

  const [imgSrc, setImgSrc] = useState<string>(src || getFallback(name));

  useEffect(() => {
    setImgSrc(src || getFallback(name));
  }, [src, name]);

  const resolvedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`relative inline-block shrink-0 ${!className.includes("w-") ? resolvedSize : ""}`}>
      <img
        src={imgSrc}
        alt={alt || name || "User Avatar"}
        onError={() => setImgSrc(getFallback(name))}
        className={`object-cover rounded-2xl shadow-sm ${
          className || `${resolvedSize} rounded-2xl`
        }`}
        style={{
          backgroundColor: "var(--media-bg, #18181b)",
        }}
        {...props}
      />
      {showStatus && (
        <span
          className={`absolute rounded-full ring-2 ring-white dark:ring-neutral-900 ${
            size === "2xl"
              ? "w-4 h-4 bottom-2 right-2"
              : size === "xl"
              ? "w-3.5 h-3.5 bottom-1 right-1"
              : "w-2.5 h-2.5 bottom-0 right-0"
          } ${isOnline ? "bg-emerald-500" : "bg-zinc-400"}`}
        />
      )}
    </div>
  );
}
