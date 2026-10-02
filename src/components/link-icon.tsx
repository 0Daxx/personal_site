import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Github,
  Globe,
  Linkedin,
  Mail,
  Mic,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";

export const LINK_ICON_MAP: Record<string, LucideIcon> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
  calendar: Calendar,
  mic: Mic,
  sparkles: Sparkles,
  globe: Globe,
  users: Users,
};

export function LinkIcon({ name, className }: { name: string; className?: string }) {
  const Icon = LINK_ICON_MAP[name] ?? Globe;
  return <Icon className={className} aria-hidden="true" />;
}
