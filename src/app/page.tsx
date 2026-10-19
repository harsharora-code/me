import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import { GitHubCalendar } from "react-github-calendar";
import { Separator } from "@radix-ui/react-separator";

const BLUR_FADE_DELAY = 0.04;

const SKILL_ICON_SLUGS: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Java: "openjdk",
  React: "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  "Express.js": "express",
  WebSockets: "socketdotio",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Prisma: "prisma",
  Redis: "redis",
  "Bun.js": "bun",
  Docker: "docker",
  AWS: "amazonaws",
  Nginx: "nginx",
  "CI/CD": "githubactions",
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            <section id="availability">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="rounded-lg border bg-card p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <p className="text-sm font-medium">
                {DATA.availability.status} - {DATA.availability.text}
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-36 shrink-0 border sm:size-40">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
     
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-col gap-5">
            {DATA.skills.map((group, id) => (
              <BlurFade
                key={group.category}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-x-8"
              >
                <h3 className="text-sm font-semibold">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="gap-2 rounded-md border-transparent bg-white px-3 py-1 font-semibold text-black hover:bg-zinc-100"
                    >
                      <img
                        src={
                          skill === "AWS"
                            ? "aws.jpg"
                            : `https://cdn.simpleicons.org/${SKILL_ICON_SLUGS[skill]}/000000`
                        }
                        alt=""
                        aria-hidden="true"
                        className="size-4 shrink-0 object-contain"
                      />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="github">
  <BlurFade delay={BLUR_FADE_DELAY * 15}>
     <div className="mb-4">
      <center>
     <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
         Proof of Work
     </div>
     </center>
     </div>
  </BlurFade>

  {/* <Separator> */}

  <BlurFade delay={BLUR_FADE_DELAY * 16}>
    <div className="mb-6 rounded-lg border bg-[#0a0a0a] p-4 text-zinc-400">
      <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
        <h3 className="m-0 font-normal text-zinc-300">contributions</h3>
        <a
          href="https://github.com/harsharora-code"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 transition-colors hover:text-zinc-300"
        >
          @harsharora-code
        </a>
      </div>
      <div className="overflow-x-hidden [scrollbar-width:none] [&_*]:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_*::-webkit-scrollbar]:hidden">
        <GitHubCalendar
          username="harsharora-code"
          blockSize={9}
          blockMargin={2}
          blockRadius={2}
          colorScheme="dark"
          fontSize={12}
          showWeekdayLabels={["mon", "wed", "fri"]}
          showColorLegend={false}
          theme={{
            dark: ["#161b16", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          labels={{ totalCount: "{{count}} contributions in the last year" }}
        />
      </div>
    </div>


      {/* </Separator> */}
    
  </BlurFade>
</section>

      <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>
  {/* <section id="github">
  <BlurFade delay={BLUR_FADE_DELAY * 15}>
    <h2 className="text-xl font-bold mb-4">GitHub Contributions</h2>
  </BlurFade>

  <BlurFade delay={BLUR_FADE_DELAY * 16}>
    <GithubContributions />
  </BlurFade>
</section> */}
    
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
