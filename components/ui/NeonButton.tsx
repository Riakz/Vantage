import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
}

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "relative px-6 py-2 rounded-sm font-bold uppercase tracking-wider transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    variant === "primary" && "bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(255,70,85,0.5)] active:scale-95",
                    variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    variant === "danger" && "bg-destructive text-destructive-foreground hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
                    variant === "ghost" && "bg-transparent hover:bg-white/5",
                    className
                )}
                {...props}
            />
        );
    }
);
NeonButton.displayName = "NeonButton";

export { NeonButton };
