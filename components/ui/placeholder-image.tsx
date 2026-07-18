import { cn } from "@/lib/utils";

export const PlaceholderImage = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center",
      className
    )}
  >
    <span className="font-mono text-xs text-neutral-500 text-center px-2">
      {label}
    </span>
  </div>
);
