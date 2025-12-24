"use client";

import dynamic from "next/dynamic";

const GithubContributions = dynamic(
  () => import("@/components/GithubContribute"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border p-6 text-center text-muted-foreground">
        Loading GitHub contributions…
      </div>
    ),
  }
);

export default function GithubContributionsClient() {
  return <GithubContributions />;
}
