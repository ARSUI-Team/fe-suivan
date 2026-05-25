import Image from "next/image";

interface SuivanLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export default function SuivanLogo({
  size = 64,
  className = "",
  priority = false,
}: SuivanLogoProps) {
  return (
    <Image
      alt="Suivan"
      className={`object-contain ${className}`}
      height={size}
      priority={priority}
      src="/suivan-logo.png"
      width={size}
    />
  );
}
