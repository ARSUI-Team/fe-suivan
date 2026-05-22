import SuivanLogo from "./SuivanLogo";

interface ArchaLogoProps {
  size?: number;
  className?: string;
}

export default function ArchaLogo({ size = 180, className = "" }: ArchaLogoProps) {
  return <SuivanLogo className={className} size={size} />;
}
