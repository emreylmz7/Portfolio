"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { sectionIds } from "@/lib/constants";

const USERNAME = "emreylmz7";

export function GitHubStats() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const streakTheme = isDark ? "dark" : "default";

  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${USERNAME}&theme=${streakTheme}&hide_border=true&background=00000000`;
  const summaryUrl = `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${USERNAME}&theme=${isDark ? "github_dark" : "default"}`;

  return (
    <SectionWrapper id={sectionIds.github}>
      <Container>
        <SectionHeading
          title="GitHub"
          subtitle="My open source activity and contributions"
        />
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          <div className="flex items-center justify-center rounded-xl border border-border/50 bg-card/30 p-4">
            {mounted ? (
              <img
                src={summaryUrl}
                alt="GitHub Profile Summary"
                className="w-full"
                loading="lazy"
              />
            ) : (
              <div className="h-40 w-full animate-pulse rounded-lg bg-muted" />
            )}
          </div>
          <div className="flex items-center justify-center rounded-xl border border-border/50 bg-card/30 p-4">
            {mounted ? (
              <img
                src={streakUrl}
                alt="GitHub Streak"
                className="w-full max-w-lg"
                loading="lazy"
              />
            ) : (
              <div className="h-40 w-full animate-pulse rounded-lg bg-muted" />
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
