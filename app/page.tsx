import Image from "next/image";
import pic from "@/assets/pic.png";
import SkillCard from "@/components/shared/SkillCard";
import Typewriter from "@/components/shared/Typewriter";
import { profile, skills, projects } from "@/lib/content";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] border-b-4 border-(--fg)">
        {/* Left: name + title + links */}
        <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-(--fg) flex flex-col justify-between gap-8">
          <div>
            <h1 className="font-display leading-none uppercase text-[15vw] md:text-[11vw]">
              {profile.name.split(" ").map((word, i) => (
                <span key={i} className={i === 0 ? "text-brand" : ""}>
                  {word}
                  <br />
                </span>
              ))}
            </h1>
            <p className="font-heading text-xl md:text-2xl uppercase tracking-widest mt-4 min-h-7 md:min-h-8">
              <Typewriter
                options={{
                  strings: [profile.occupation],
                  loop: false,
                  speed: 60,
                  cursor: false,
                }}
              />
            </p>
          </div>

          {/* Social links — filled buttons */}
          <div className="flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-(--fg) text-(--bg) border-2 border-(--fg) px-4 py-2 font-heading uppercase tracking-widest text-sm hover:bg-brand hover:border-brand hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[85vw] md:min-h-0 overflow-hidden photo-duotone">
          <Image
            src={pic}
            alt="Adam Rosołowski"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-[1fr_3fr] border-b-4 border-(--fg)">
        {/* Left: label */}
        <div className="p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-(--fg) flex items-center">
          <span className="font-display text-6xl md:text-8xl text-brand leading-none">
            ABOUT
          </span>
        </div>

        {/* Right: bio */}
        <div className="p-8 md:p-16 flex items-center">
          <p className="font-heading text-xl md:text-2xl tracking-wide leading-snug max-w-prose uppercase">
            {profile.bio}
          </p>
        </div>
      </section>

      {/* ── STACK ───────────────────────────────────────────────── */}
      <section className="border-b-4 border-(--fg)">
        <div className="p-8 md:p-16 border-b-4 border-(--fg)">
          <h2 className="font-display text-6xl md:text-8xl leading-none">
            SKILLS
          </h2>
        </div>
        <div className="p-8 md:p-16">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
            <div className="border-2 border-(--fg) aspect-square flex items-center justify-center font-mono text-xs opacity-30 select-none">
              +MORE
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────── */}
      <section className="border-b-4 border-(--fg)">
        <div className="p-8 md:p-16 border-b-4 border-(--fg)">
          <h2 className="font-display text-6xl md:text-8xl leading-none">
            PROJECTS
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`border-b-4 border-(--fg) ${
                i % 2 === 0 ? "md:border-r-4" : ""
              }`}
            >
              {/* Screenshot */}
              <div className="aspect-video border-b-4 border-(--fg) relative overflow-hidden bg-neutral-900">
                {/* Project number — absolute overlay, clipped by overflow-hidden */}
                <div className="absolute bottom-0 left-4 z-10 font-display leading-none select-none pointer-events-none text-brand opacity-20 text-[42vw] md:text-[19vw]"></div>
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-700">
                    <span className="font-display text-4xl md:text-6xl">
                      SCREENSHOT
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-8">
                <h3 className="font-display text-4xl md:text-5xl mb-3">
                  <span className="text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  . {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.links.map((link, i) => (
                    <a
                      key={link.url + i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-(--fg) text-(--bg) border-2 border-(--fg) px-4 py-2 font-heading uppercase tracking-widest text-sm hover:bg-brand hover:border-brand hover:text-black"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <p className="text-sm font-mono mb-4 opacity-70 max-w-sm">
                  {project.description}
                </p>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-(--fg) px-2 py-0.5 font-heading uppercase text-xs tracking-wider opacity-60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t-4 border-(--fg) relative overflow-hidden">
        <div className="px-8 md:px-16 py-10 md:py-14 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-display text-5xl md:text-7xl leading-none">
              ROSOLOWSKI.DEV
            </span>
            <div className="flex gap-6">
              {profile.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading uppercase tracking-widest text-sm opacity-50 hover:opacity-100 hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <span className="font-mono text-xs opacity-30 uppercase tracking-widest">
            {new Date().getFullYear()} Adam Rosołowski
          </span>
        </div>
        <span className="font-display text-brand leading-none select-none pointer-events-none absolute bottom-0 right-4 text-[28vw] md:text-[13vw] opacity-[0.08]">
          {new Date().getFullYear()}
        </span>
      </footer>
    </main>
  );
}
