import Image from "next/image";

interface SuivanLogoProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export default function SuivanLogo({
  size = 40,
  className = "",
  priority = false,
}: SuivanLogoProps) {
  return (
    <Image
      alt="Suivan"
      className={`object-contain ${className}`}
      height={size}
      priority={priority}
      src="/suivan-icon.svg"
      width={size}
    />
  );
}
