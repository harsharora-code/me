"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  CalendarIcon,
  ExternalLinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type ContributionLevel = 0 | 1 | 2 | 3 | 4;
type Range = "6m" | "9m" | "12m";

interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
}

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "harsharora-code";

/* ---------- Cell ---------- */

const Cell = React.memo(({ day }: { day: ContributionDay }) => {
  const colors = [
    "bg-gray-800",
    "bg-green-900",
    "bg-green-700",
    "bg-green-500",
    "bg-green-300",
  ];

  if (!day.date) return <div className="w-3 h-3" />;

  return (
    <div
      className={`w-3 h-3 rounded-sm ${colors[day.level]}`}
      title={`${day.date}: ${day.count} contributions`}
    />
  );
});
Cell.displayName = "Cell";

/* ---------- Main ---------- */

export default function GithubContributions() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [range, setRange] = useState<Range>("6m");
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const rangeDays: Record<Range, number> = {
    "6m": 182,
    "9m": 273,
    "12m": 365,
  };

  /* ---------- Fetch ---------- */

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        const data = await res.json();

        const sliced = data.contributions.slice(-rangeDays[range]);

        let best = 0,
          current = 0;

        const processed = sliced.map((d: any) => {
          if (d.count > 0) {
            current++;
            best = Math.max(best, current);
          } else current = 0;

          return {
            date: d.date,
            count: d.count,
            level: Math.min(d.level, 4) as ContributionLevel,
          };
        });

        setDays(processed);
        setTotal(data.total.lastYear);
        setStreak(best);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [range]);

  /* ---------- Weeks ---------- */

  const weeks = useMemo(() => {
    if (!days.length) return [];

    const w: ContributionDay[][] = [];
    let week: ContributionDay[] = [];

    const pad = new Date(days[0].date).getDay();
    for (let i = 0; i < pad; i++)
      week.push({ date: "", count: 0, level: 0 });

    days.forEach((d) => {
      week.push(d);
      if (week.length === 7) {
        w.push(week);
        week = [];
      }
    });

    if (week.length) {
      while (week.length < 7)
        week.push({ date: "", count: 0, level: 0 });
      w.push(week);
    }

    return w;
  }, [days]);

  /* ---------- Scroll Sync ---------- */

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollPercent(max ? (el.scrollLeft / max) * 100 : 0);
  };

  const onSlider = (v: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollLeft = (v / 100) * max;
    setScrollPercent(v);
  };

  const scrollBy = (d: "l" | "r") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: d === "l" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  /* ---------- Render ---------- */

  return (
    <div className="rounded-xl border bg-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">GitHub Contributions</h3>
          <p className="text-sm text-muted-foreground">
            Last {range === "6m" ? "6" : range === "9m" ? "9" : "12"} months of
            activity
          </p>
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-400 hover:text-indigo-300"
        >
          <ExternalLinkIcon className="w-5 h-5" />
        </a>
      </div>

      {/* Range Selector */}
      <div className="flex gap-2 mb-4 text-xs">
        {(["6m", "9m", "12m"] as Range[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-full border ${
              range === r
                ? "bg-indigo-500 text-white"
                : "text-muted-foreground"
            }`}
          >
            {r === "6m" ? "6M" : r === "9m" ? "9M" : "1Y"}
          </button>
        ))}
      </div>

      {/* Graph */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800"
        >
          <div className="grid grid-flow-col auto-cols-max gap-1 pb-2">
            {loading
              ? Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-rows-7 gap-1 animate-pulse"
                  >
                    {Array.from({ length: 7 }).map((_, j) => (
                      <div key={j} className="w-3 h-3 bg-gray-800 rounded-sm" />
                    ))}
                  </div>
                ))
              : weeks.map((w, i) => (
                  <div key={i} className="grid grid-rows-7 gap-1">
                    {w.map((d, j) => (
                      <Cell key={j} day={d} />
                    ))}
                  </div>
                ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => scrollBy("l")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 p-1 rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scrollBy("r")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 p-1 rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={100}
        value={scrollPercent}
        onChange={(e) => onSlider(Number(e.target.value))}
        className="w-full mt-3 accent-indigo-500"
      />

      {/* Footer */}
      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          <span>{total} contributions</span>
        </div>
        <span>Best streak: {streak} days</span>
      </div>
    </div>
  );
}
