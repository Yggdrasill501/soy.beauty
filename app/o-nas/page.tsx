import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye } from "lucide-react";

export const revalidate = 60;
export default async function ProjectsPage() {
  // No longer tracking page views - using a typed empty record with default values
  const views: Record<string, number> = {};

  const featured = allProjects.find((project) => project.slug === "soybeauty")!;
  const top2 = allProjects.find((project) => project.slug === "modernakrasa")!;
  const top3 = allProjects.find((project) => project.slug === "moderneprocedury")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );
// Vitajte v mieste, kde sa krása stretáva s profesionalitou a starostlivosťou."
// V srdci Nitri sme vytvorili oázu krásy a relaxácie, kde sa čas spomalí a vy sa stanete stredobodom našej pozornosti."
// Veríme, že každá tvár rozpráva príbeh, a my sme tu, aby sme zvýraznili jeho najkrajšie kapitoly."
// Naším poslaním je nielen skrášľovať, ale aj inšpirovať a dodávať sebavedomie."
// Za každou premenou stojí tím profesionálov, ktorí svoju prácu milujú rovnako ako výsledky, ktoré prinášajú."
// Náš tím spája vášeň pre krásu s neustálym vzdelávaním sa v najnovších trendoch a technikách."
// Od jemnej dennej starostlivosti až po dramatické večerné premeny – naše služby sú šité na mieru vašim potrebám a túžbam."
// V našom salóne nájdete harmóniu medzi tradičnými postupmi a inovatívnymi technológiami pre dosiahnutie dokonalých výsledkov."
// Každá návšteva u nás je osobným zážitkom, kde vaše priania a potreby sú našou prioritou."
// Veríme, že skutočná krása je o tom, ako sa cítite – preto je naším cieľom, aby ste od nás odchádzali nielen krajšie, ale aj šťastnejšie."
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            O nás
          </h2>
          <p className="mt-4 text-zinc-300">
          Náš príbeh sa začal s jednoduchou víziou – vytvoriť priestor, kde každá žena objaví svoju jedinečnú krásu.
          </p> 
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/o-nas/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-400">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-300 group-hover:text-zinc-100">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
