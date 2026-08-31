import type { Place } from "./itineraries";
import vienna from "@/assets/vienna.svg";
import kilimanjaro from "@/assets/kilimanjaro.svg";

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
  /**
   * Tile chip. "RECS" for a list of places; something else when the page is
   * mostly advice, which "RECS" would undersell.
   */
  label?: string;
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
  {
    slug: "kilimanjaro",
    title: "Climbing Kilimanjaro",
    destination: "Kilimanjaro",
    country: "Tanzania",
    cover: kilimanjaro,
    label: "GUIDE",
    summary:
      "Eight days on the Northern Lemosho route, and everything worth knowing before you book it.",
    teaser:
      "Not an itinerary. This is the practical half: which route and why, what to buy before you go, what goes in the medical kit, and the small decisions that made the biggest difference on the mountain.",
    tags: ["#NorthernLemosho", "#Goretex", "#Diamox"],
    notes: [
      "Bring more cash than you normally would, in USD, and enough for the whole trip. Service and bank access are patchy, and card machines often will not connect.",
      "Start Diamox the day before you land. Moshi and Arusha sit at around 6,000 feet, and it cannot help you once you are already sick.",
    ],
    sections: [
      {
        title: "The trek",
        places: [
          { name: "Monkey Adventures", near: "Moshi, Tanzania" },
          { name: "Mount Kilimanjaro", near: "Tanzania" },
        ],
        items: [
          "We did the 8-day Northern Lemosho route with Monkey Adventures. They were great.",
          "A team of three guides, one cook and sixteen porters. They are amazing and really take care of you, especially on summit day.",
          "It is longer than what most people do, but we wanted to give ourselves the best possible shot at acclimatising.",
          "It is also a newer, quieter route. On days three to six we were the only group at the campsite. It is one of the longest because it literally circles the mountain, and you get a great view of Nairobi from one of the campsites.",
          "There are shorter routes, the shortest being five days, and some where you sleep in ranger or tea houses. Those are more crowded and harder, because you climb vertically at a much faster pace.",
          "We hiked at the tail end of rainy season, so it rained on days one, two, part of three, and seven. Kilimanjaro is unpredictable, so be prepared whatever time of year you go. It has its own climate zones.",
          "Some days were easier than expected and some were harder.",
          "The food was solid. Three meals a day, some really good and some bad. Breakfast was almost always the highlight.",
        ],
      },
      {
        title: "Tipping",
        items: [
          "A real cost on top of the trek itself, and worth budgeting for separately.",
          "Each company posts its recommended amounts, generally per person, per position, per day.",
        ],
      },
      {
        title: "Packing and gear",
        items: [
          "If you do not already have hiking gear, this is an expensive trip to REI.",
          "Invest in Goretex. Rain trousers, rain jacket, backpack. It can rain almost every day, and if you are not in Goretex then either you or all of your things will get wet. If your backpack is not Goretex, put a dry bag inside it.",
          "Prioritise layering. The weather varies through the day and you start hiking early, so you go from three layers to something thin.",
          "Bring extra layers in case the ones you are wearing get wet.",
          "It gets freezing at night regardless of altitude. Rent the warmest sleeping bag, and bring your warmest gloves in multiple layers, plus hats, warmers, a balaclava and wool socks.",
          "Rent the hiking poles. It would not have been possible without them, especially going downhill.",
          "Bring a bladder for your backpack so you can drink without stopping, and a second water bottle, because the bladder freezes on summit day. Something light and plastic, not a Hydro Flask - they are too heavy.",
          "A quick-dry towel, for wiping things down and as a makeshift pillow.",
          "Wipes, wipes, wipes, and hand sanitiser. You will need to pee, or worse, while hiking.",
        ],
      },
      {
        title: "Medication",
        items: [
          "Bring anything and everything you think you might need. The guides carry oxygen, but taking care of yourself is on you.",
          "What I brought: Advil, Tylenol, a steroid pack, malaria pills, a Z-Pak, Cipro, Diamox, nausea medication, plasters, my daily medication, instant cold packs, a callous and blister cushion, itch cream, Benadryl and an ace bandage.",
          "I definitely went overboard, and almost all of it was used by me or my friends. Everything except the ace bandage. I was called a walking pharmacy.",
          "Diamox is the altitude sickness medication. Altitude sickness does not discriminate, no matter what training you have done. Some of the people in the best cardio and hiking shape got it worst.",
          "For headaches, reach for Tylenol first.",
          "Malaria tablets do not make you as sick as you think. Take them with food.",
          "There are some bugs on the mountain, but only at the beginning and the end of the hike.",
          "Bring both Tylenol and Advil. You may need to max out both if you get a headache, because the hike is extremely dehydrating and altitude makes it worse.",
          "Tums, Pepto and Imodium for nausea, a bad stomach or diarrhoea. Someone in the group will need them.",
          "The general symptoms of altitude sickness are headache, diarrhoea and nausea. Be prepared for those and you will be golden.",
        ],
      },
      {
        title: "Where we stayed",
        places: [{ name: "Chanya Lodge", near: "Moshi, Tanzania" }],
        items: [
          "We stayed at Chanya Lodge before and after the hike, and they stored our luggage while we were on the mountain.",
          "Make sure wherever you stay has air conditioning, mosquito nets and good showers. Nothing will feel as good as that first shower.",
          "It is outside 'central' Moshi, in quotes because Moshi is more of a small town, but it is nice. We ate all of our meals there before and after the hike.",
          "It was much busier after the hike in June, when the busy season on the mountain picks up.",
        ],
      },
      {
        title: "Training",
        items: [
          "There is an array of options. The best thing is altitude training, but you can only really do that in the month before.",
          "Strengthen your legs as much as you can and work on your breathing. I used an altitude mask at the gym. I looked like an idiot but I think it helped.",
          "Work your arms and back too, for the backpack and the poles. Carrying a pack uphill for eight hours a day is a bitch.",
        ],
      },
      {
        title: "Everything else",
        items: [
          "Bring things to entertain yourself. A book, cards, a journal, headphones. There is a lot of downtime and not everyone likes to talk nonstop.",
          "Not all solar chargers are created equal. Invest in a strong power bank with multiple ports.",
          "It is very cold at night, so sleep with anything you do not want to die or freeze inside your sleeping bag.",
          "Things die at the peak, so bring something extra charged, or a disposable or film camera. It was below 0F on our summit day.",
          "The private toilet and the thicker mattress were the best money we spent. The campsite toilets are holes in the ground, so if you skip the private toilet, bring your own toilet paper.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
