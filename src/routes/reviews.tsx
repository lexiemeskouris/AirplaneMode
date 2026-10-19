import { createFileRoute, Link } from "@tanstack/react-router";
import { TESTIMONIALS } from "@/data/site";
import { TestimonialCard } from "@/components/Testimonials";

const TITLE = "Reviews - AirplaneMode";
const DESCRIPTION = "What people say about the trips I have planned for them.";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-5xl font-extrabold leading-tight tracking-tight text-foreground md:text-7xl">
        Reviews,
        <span className="block text-primary">from people I have planned for.</span>
      </h1>

      <div className="mt-12 space-y-4">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/plan"
          className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105"
        >
          Plan my trip
        </Link>
      </div>
    </div>
  );
}
