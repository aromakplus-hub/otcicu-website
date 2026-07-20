"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Stat } from "@/lib/data/home";

function formatValue(value: number) {
  return Number.isInteger(value)
    ? value.toLocaleString("en-NG")
    : value.toLocaleString("en-NG", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function StatCounter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? stat.value : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(stat.value * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, shouldReduceMotion, stat.value]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <p className="font-ui text-4xl font-bold tabular-nums text-white md:text-5xl">
        {stat.prefix}
        {formatValue(display)}
        {stat.suffix}
      </p>
      <p className="text-sm font-medium text-emerald-100/80">{stat.label}</p>
    </div>
  );
}
