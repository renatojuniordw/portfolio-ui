import { ScrollReveal } from "@/components/fx/ScrollReveal";

interface Skill {
  name: string;
  icon: string;
}

interface SkillGroup {
  category: string;
  accent: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Front-end",
    accent: "tech",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Angular", icon: "🅰️" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Next.js", icon: "▲" },
      { name: "Tailwind CSS", icon: "🎨" },
    ],
  },
  {
    category: "IA & Automação",
    accent: "ia",
    skills: [
      { name: "n8n", icon: "⚡" },
      { name: "OpenAI API", icon: "🤖" },
      { name: "Langchain", icon: "🔗" },
      { name: "Prompt Eng.", icon: "🧠" },
    ],
  },
  {
    category: "Back-end & Infra",
    accent: "tech",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "AWS Lambda", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
      { name: "REST APIs", icon: "🔌" },
    ],
  },
  {
    category: "Ferramentas",
    accent: "barraco",
    skills: [
      { name: "Git / GitHub", icon: "🐙" },
      { name: "Figma", icon: "🎭" },
      { name: "Jira", icon: "📋" },
      { name: "SharePoint", icon: "📁" },
    ],
  },
];

const accentBorderMap: Record<string, string> = {
  tech: "hover:border-tech/60",
  ia: "hover:border-ia/60",
  barraco: "hover:border-barraco/60",
};

const accentTextMap: Record<string, string> = {
  tech: "text-tech",
  ia: "text-ia",
  barraco: "text-barraco",
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full px-8 py-24 lg:py-32 lg:px-24 2xl:px-40 bg-bg relative border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-sm font-medium text-muted uppercase tracking-widest mb-4 block">
              Stack
            </span>
            <h2 className="text-3xl lg:text-5xl font-display font-light tracking-tight text-text">
              Tecnologias & Ferramentas
            </h2>
          </div>
        </ScrollReveal>

        {/* Groups grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <ScrollReveal
              key={group.category}
              delay={groupIndex * 100}
              direction="up"
            >
              <div className="p-8 rounded-2xl bg-surface-2 border border-border h-full">
                <span
                  className={`text-xs font-semibold uppercase tracking-widest mb-6 block ${accentTextMap[group.accent]}`}
                >
                  {group.category}
                </span>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-bg text-text text-sm font-medium transition-all duration-200 ${accentBorderMap[group.accent]} hover:scale-105`}
                      style={{ animationDelay: `${groupIndex * 80 + skillIndex * 40}ms` }}
                    >
                      <span aria-hidden="true" className="text-base leading-none">
                        {skill.icon}
                      </span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
