import Link from "next/link";
import Image from "next/image";

interface NeuronLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withAura?: boolean;
}

export default function NeuronLogo({ className = "", size = "md", withAura = false }: NeuronLogoProps) {
  const heightClasses = {
    sm: "h-5 md:h-6",
    md: "h-6 md:h-7",
    lg: "h-8 md:h-10",
  };

  return (
    <div className={`relative inline-flex items-center group select-none ${className}`}>
      {withAura && (
        <span
          className="absolute -inset-2 rounded-full bg-emerald-500/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          aria-hidden="true"
        />
      )}
      <Image
        src="/logo.png"
        alt="Neuron"
        width={693}
        height={165}
        priority
        className={`w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${heightClasses[size]}`}
      />
    </div>
  );
}

