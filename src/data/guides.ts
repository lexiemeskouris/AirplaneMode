import type { Place } from "./itineraries";
import vienna from "@/assets/vienna.svg";

/**
 * A city I have opinions about but no itinerary for. Same links and the same
 * tiles as an itinerary, without pretending there is a plan: no days, no
 * duration, no season, because none of those are true of a list.
 */
export type GuideSection = {
  title: string;
  /** Lead-in line for the section. */
  note?: string;
  places?: Place[];
  /** Lines that are not a place you can pin on a map. */
  items?: string[];
  /** Renders as a warning rather than a recommendation. */
  avoid?: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  destination: string;
  country: string;
  cover: string;
  summary: string;
  teaser: string;
  tags: string[];
  /** Practical things to know before you go, e.g. cash only. */
  notes?: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "vienna",
    title: "Vienna Recommendations",
    destination: "Vienna",
    country: "Austria",
    cover: vienna,
    summary:
      "No itinerary, just the list. Where to drink, what to eat, which museums earn it and which one does not.",
    teaser:
      "Vienna without a plan attached. The bars and clubs worth the night, the sausage stand worth going back to three times, the three museums that earn their entry fee, and the one to skip.",
    tags: ["#Wurstelstand", "#Volksgarten", "#Albertina"],
    notes: ["Bring cash. Most places are cash only."],
    sections: [
      {
        title: "Bars",
        places: [
          { name: "Travel Shack", note: "You are going to die at this place, it's awesome." },
        ],
      },
      {
        title: "Clubs",
        places: [
          { name: "Volksgarten", note: "21+, and the best music ever." },
          { name: "Prater Dome" },
        ],
      },
      {
        title: "Eat",
        note: "Eat at every hot dog and kebab stand. They are so good.",
        places: [
          {
            name: "Würstelstand",
            url: "https://www.google.com/maps/place/W%C3%BCrstelstand/@48.2114965,16.3773391,20.86z/data=!4m19!1m12!4m11!1m6!1m2!1s0x476d07bbd806e0e5:0x5fa5f935f7f0ca57!2sSigmund+Freud+Museum,+Berggasse,+Vienna,+Austria!2m2!1d16.3630759!2d48.2186272!1m3!2m2!1d16.3771171!2d48.2113613!3m5!1s0x476d07a0510894b1:0x2b0e892b270738ec!8m2!3d48.2115422!4d16.3775781!16s%2Fg%2F11b7tvq97h?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D",
            note: "This one literally changed my life. I ate it three times.",
          },
        ],
      },
      {
        title: "Museums",
        places: [
          { name: "Albertina" },
          { name: "Leopold Museum" },
          { name: "Kunsthistorisches Museum Wien" },
        ],
      },
      {
        title: "Skip",
        avoid: true,
        places: [{ name: "Sigmund Freud Museum" }],
      },
      {
        title: "Day trip to Salzburg",
        note: "Worth the trip out.",
        places: [
          { name: "Salzburg", near: "Austria" },
          { name: "Hohensalzburg Fortress", near: "Salzburg, Austria" },
        ],
        items: [
          "Walk through the town.",
          "Take the cable car up to the castle.",
          "Take 1900s photos.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
