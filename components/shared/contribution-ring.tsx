"use client";

import { useReducedMotion, motion } from "framer-motion";

/**
 * The Contribution Ring
 * ----------------------------------------------------------------
 * The cooperative's core idea — many individual contributions
 * arranged in a circle, each connected to a shared center — made
 * into a visual signature. Inspired by the "Ajo" thrift-circle
 * tradition the cooperative descends from, and by the rosette
 * emblems used on cooperative society seals.
 *
 * - Outer ring: 24 member nodes (gold), one slow rotation.
 * - Inner ring: 12 nodes (emerald), rotating the opposite way.
 * - Center: the shared fund, pulsing gently.
 * All motion is disabled when the user prefers reduced motion.
 */
export function ContributionRing({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const outerNodes = Array.from({ length: 24 });
  const innerNodes = Array.from({ length: 12 });

  return (
    <svg
      viewBox="0 0 480 480"
      className={className}
      role="img"
      aria-label="Concentric ring of members contributing to a shared cooperative fund"
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a9b73" />
          <stop offset="100%" stopColor="#0b6e4f" />
        </radialGradient>
      </defs>

      {/* faint guide circles */}
      <circle cx="240" cy="240" r="190" fill="none" stroke="#0b6e4f" strokeOpacity="0.08" />
      <circle cx="240" cy="240" r="130" fill="none" stroke="#0b6e4f" strokeOpacity="0.1" />

      {/* connecting spokes */}
      <g opacity="0.12">
        {outerNodes.map((_, i) => {
          const angle = (i / outerNodes.length) * Math.PI * 2;
          const x = 240 + Math.cos(angle) * 190;
          const y = 240 + Math.sin(angle) * 190;
          return <line key={i} x1="240" y1="240" x2={x} y2={y} stroke="#0b6e4f" strokeWidth="1" />;
        })}
      </g>

      {/* outer ring — gold member nodes */}
      <motion.g
        style={{ originX: "240px", originY: "240px" }}
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {outerNodes.map((_, i) => {
          const angle = (i / outerNodes.length) * Math.PI * 2;
          const x = 240 + Math.cos(angle) * 190;
          const y = 240 + Math.sin(angle) * 190;
          const isQuarter = i % 6 === 0;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isQuarter ? 6 : 3.5}
              fill={isQuarter ? "#c9a227" : "#d9b94f"}
            />
          );
        })}
      </motion.g>

      {/* inner ring — emerald member nodes, opposite rotation */}
      <motion.g
        style={{ originX: "240px", originY: "240px" }}
        animate={shouldReduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      >
        {innerNodes.map((_, i) => {
          const angle = (i / innerNodes.length) * Math.PI * 2;
          const x = 240 + Math.cos(angle) * 130;
          const y = 240 + Math.sin(angle) * 130;
          return <circle key={i} cx={x} cy={y} r="5" fill="#0b6e4f" fillOpacity="0.85" />;
        })}
      </motion.g>

      {/* shared center */}
      <motion.circle
        cx="240"
        cy="240"
        r="54"
        fill="url(#centerGlow)"
        animate={shouldReduceMotion ? undefined : { r: [54, 58, 54] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <text
        x="240"
        y="236"
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontWeight="600"
        fontFamily="var(--font-display)"
      >
        Iserere
      </text>
      <text
        x="240"
        y="254"
        textAnchor="middle"
        fill="white"
        fillOpacity="0.85"
        fontSize="9.5"
        letterSpacing="0.14em"
        fontFamily="var(--font-ui)"
      >
        SHARED FUND
      </text>
    </svg>
  );
}
