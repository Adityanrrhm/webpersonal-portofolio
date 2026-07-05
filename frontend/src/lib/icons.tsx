import {
  SiPython,
  SiPostgresql,
  SiApachespark,
  SiDocker,
  SiGooglecloud,
  SiLinux,
  SiApacheairflow,
  SiTerraform,
} from "react-icons/si";
import { FaAws, FaChartBar, FaLinkedin } from "react-icons/fa";
import { SiGithub, SiInstagram } from "react-icons/si";
import { Mail } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiPython,
  SiPostgresql,
  SiApachespark,
  SiDocker,
  SiGooglecloud,
  SiLinux,
  SiApacheairflow,
  SiTerraform,
  FaAws,
  FaChartBar,
  FaLinkedin,
  SiGithub,
  SiInstagram,
  Mail,
};

export function getIcon(name: string) {
  return iconMap[name] || null;
}
