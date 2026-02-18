"use client";

import * as SimpleIcons from "@icons-pack/react-simple-icons";
import type { Skill } from "@/lib/content";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export default function SkillCard({ skill }: { skill: Skill }) {
  const Icon = skill.icon
    ? (SimpleIcons[skill.icon as keyof typeof SimpleIcons] as IconComponent | undefined)
    : undefined;

  return (
    <div className="border-2 border-(--fg) p-3 flex flex-col items-center gap-2 min-w-20 hover:border-brand hover:text-brand cursor-default select-none">
      {Icon ? (
        <Icon size={24} />
      ) : (
        <span className="text-lg font-display leading-none">#</span>
      )}
      <span className="font-heading uppercase tracking-wider text-xs text-center">
        {skill.name}
      </span>
    </div>
  );
}
