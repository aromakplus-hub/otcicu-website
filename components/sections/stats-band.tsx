import { Container } from "@/components/ui/container";
import { StatCounter } from "@/components/shared/stat-counter";
import { stats } from "@/lib/data/home";

export function StatsBand() {
  return (
    <section className="bg-emerald-800">
      <Container className="grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </Container>
    </section>
  );
}
