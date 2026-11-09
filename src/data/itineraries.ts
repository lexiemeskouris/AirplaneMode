import sanSebastian from "@/assets/san-sebastian.jpg";
import tunisia from "@/assets/tunisia.jpg";
import berlin from "@/assets/berlin.jpg";
import taipei from "@/assets/taipei.jpg";
import amsterdam from "@/assets/amsterdam.jpg";
import nashville from "@/assets/nashville.jpg";
import paris from "@/assets/paris.jpg";
import copenhagen from "@/assets/copenhagen.jpg";
import budapest from "@/assets/budapest.jpg";
import thailand from "@/assets/thailand.jpg";
import singapore from "@/assets/singapore.jpg";
import vietnam from "@/assets/vietnam.jpg";
import cambodia from "@/assets/cambodia.jpg";
import vienna from "@/assets/vienna.jpg";
import ireland from "@/assets/ireland.jpg";
import mallorca from "@/assets/mallorca.jpg";
import maine from "@/assets/maine.jpg";
import berkshires from "@/assets/berkshires.jpg";
import milan from "@/assets/milan.jpg";
import edinburgh from "@/assets/edinburgh.jpg";
import brussels from "@/assets/brussels.jpg";
import switzerland from "@/assets/switzerland.jpg";
import lisbon from "@/assets/lisbon.jpg";
import quito from "@/assets/quito.jpg";
import galapagos from "@/assets/galapagos.jpg";
import japan from "@/assets/japan.jpg";
import mexicoCity from "@/assets/mexico-city.jpg";
import madeira from "@/assets/madeira.jpg";
import helsinki from "@/assets/helsinki.jpg";
import tallinn from "@/assets/tallinn.jpg";
import egypt from "@/assets/egypt.jpg";
import istanbul from "@/assets/istanbul.jpg";
import krakow from "@/assets/krakow.jpg";
import tuscany from "@/assets/tuscany.jpg";
import tromso from "@/assets/tromso.jpg";
import seoul from "@/assets/seoul.jpg";
import malta from "@/assets/malta.jpg";
import southAfrica from "@/assets/south-africa.jpg";
import victoriaFalls from "@/assets/victoria-falls.jpg";
import stockholm from "@/assets/stockholm.jpg";
import morocco from "@/assets/morocco.jpg";
import cardiff from "@/assets/cardiff.jpg";
import peru from "@/assets/peru.jpg";
import saudiArabia from "@/assets/saudi-arabia.jpg";
import slovenia from "@/assets/slovenia.jpg";
import romania from "@/assets/romania.jpg";

/** A named venue, with its map link if we have a real one. */
export type Place = {
  name: string;
  /** Map link. Rendered as the place's link when present. */
  url?: string;
  /** Short aside, e.g. why it is worth going or where it sits in the night. */
  note?: string;
  /**
   * City to search near, when it is not the itinerary's own destination.
   * Bilbao Airport belongs to a San Sebastian trip but is not in San Sebastian.
   */
  near?: string;
};

export type Activity = {
  /** 24-hour, e.g. "20:00". Omitted when the plan is deliberately loose. */
  time?: string;
  description: string;
  /** Venues for this activity, e.g. the stops on a pintxos crawl. */
  places?: Place[];
};

export type ItineraryDay = {
  day: string;
  title: string;
  activities: Activity[];
};

export type Itinerary = {
  slug: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  /** Where the pin goes on the A-Z map. */
  coords: { lat: number; lon: number };
  season: string;
  summary: string;
  /** Optional: an itinerary can go up before a photo for it exists. */
  cover?: string;
  gated: boolean;
  /**
   * Listed on the site but not open yet: the card says so and the page shows
   * the intro without the plan. Kept out of the spin wheel and the free count.
   */
  comingSoon?: boolean;
  /** A short intro shown for both free and gated itineraries. */
  teaser: string;
  /** Short food/activity hashtags shown as chips on feed cards. */
  tags: string[];
  /**
   * What the place is about, in a word or two each ("Barbecue", "Live
   * music"). Shown as chips under the title, each linking to its part of the
   * plan. General to the area, not commentary: that lives in the plan.
   */
  highlights: string[];
  /** Full day-by-day plan. Omitted/abbreviated for gated itineraries. */
  days?: ItineraryDay[];
  /** Buy Me a Coffee link for gated itineraries. */
  bmcUrl?: string;
  /**
   * Things that constrain the whole trip rather than one stop, e.g. a date
   * this only works on. Shown up front, before the day-by-day.
   */
  notes?: string[];
  /** Another page on the site that bolts onto this trip. */
  /** A TikTok of the trip, linked from the top of the page. */
  tiktok?: string | import("@/components/PhotoStrip").TikTok[];
  seeAlso?: {
    slug: string;
    kind: "itinerary" | "recommendation";
    title: string;
    note: string;
  };
  /**
   * Places worth knowing about that are not pinned to any day: the running
   * list of recommendations that comes back from a trip. Grouped, because a
   * city's bars, museums and the things to skip are not one list.
   */
  extras?: {
    title: string;
    note?: string;
    places?: Place[];
    /** Lines that are not a place, e.g. what to know before you go. */
    items?: string[];
    /** Renders muted, as a warning rather than a recommendation. */
    avoid?: boolean;
  }[];
};

export const BMC_URL = "https://buymeacoffee.com/lexiemeskouris";

/**
 * Google Maps search for a place name near its destination.
 *
 * Deliberately a *search*, not a pinned location: we only ever hardcode a
 * `url` on a Place when we have a real link for it. Guessing a specific map
 * pin would send people to a confidently wrong address, whereas a search for
 * the name in the right city either finds it or visibly finds nothing.
 */
export function mapsSearch(name: string, near: string): string {
  const query = encodeURIComponent(`${name}, ${near}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export const itineraries: Itinerary[] = [
  {
    slug: "san-sebastian",
    title: "Three Days in San Sebastián",
    destination: "San Sebastián",
    country: "Spain",
    coords: { lat: 43.3183, lon: -1.9812 },
    duration: "3 days",
    season: "Summer",
    summary:
      "Two beaches, two hills, and as many Basque pintxos bars as you can fit into three nights.",
    cover: sanSebastian,
    gated: false,
    teaser: "Stay in Parte Vieja, the Old Town: everything is walkable from there.",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7682108674856242445",
    tags: ["#Pintxos", "#LaConcha", "#BasqueCheesecake"],
    highlights: ["Pintxos", "Basque cheesecake", "La Concha", "Monte Urgull", "Monte Igueldo"],
    days: [
      {
        day: "Day One",
        title: "La Concha, Monte Urgull, and the First Crawl",
        activities: [
          { description: "Wake up at leisure." },
          {
            description: "Coffee at Simona, then walk the length of the La Concha promenade.",
            places: [{ name: "Simona" }, { name: "La Concha promenade" }],
          },
          { description: "Beach time at La Concha.", places: [{ name: "La Concha" }] },
          {
            description:
              "Pintxos lunch at La Cuchara de San Telmo. It was closed when we went, so we ended up at Bar Sport and bopping around pintxos bars that were not on our list.",
            places: [{ name: "La Cuchara de San Telmo" }, { name: "Bar Sport" }],
          },
          {
            time: "14:00",
            description:
              "Hike up Monte Urgull, about a 1.5 hour round trip, with a drink at the top at Urgulleko Polboriña.",
            places: [{ name: "Monte Urgull" }, { name: "Urgulleko Polboriña" }],
          },
          { description: "Shower and reset at the hotel." },
          {
            time: "19:00",
            description: "Pintxos hopping, in this order.",
            places: [
              {
                name: "Casa Valles",
                url: "https://goo.gl/maps/b8UnGGnGeJEm4aUEA",
              },
              {
                name: "KATA4",
                url: "https://goo.gl/maps/Wa4azttoVbzpSD5A6",
              },
              {
                name: "Bar El Pícaro",
                url: "https://share.google/7wJXv0hk0OUaNb865",
              },
              {
                name: "Curdelón",
                url: "https://goo.gl/maps/HSHsKqeE9XkfqY2a6",
              },
              {
                name: "Casa Senra Donostia",
                url: "https://goo.gl/maps/gryTHyA7TUjrxJJ29",
                note: "Ending spot.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Tortilla, Monte Igueldo, and a Long Lunch",
        activities: [
          {
            time: "08:00",
            description: "Get to Bar Antonio.",
            places: [{ name: "Bar Antonio" }],
          },
          { time: "09:00", description: "Eat tortilla at Bar Antonio." },
          {
            description: "Hike to the top of Monte Igueldo.",
            places: [{ name: "Monte Igueldo" }],
          },
          {
            description: "Visit the Monte Igueldo Tower and the Monte Igueldo Amusement Park.",
            places: [{ name: "Monte Igueldo Tower" }, { name: "Monte Igueldo Amusement Park" }],
          },
          {
            description: "Lunch at Ganbara, Anthony Bourdain's favourite spot.",
            places: [{ name: "Ganbara" }],
          },
          {
            description: "Pintxos hopping, round two, carrying straight on from lunch.",
            places: [
              { name: "Lanperna" },
              { name: "La Viña", note: "For the Basque cheesecake." },
              { name: "Gandarias" },
            ],
          },
          { description: "Beach time at La Concha again, the main beach closest to the Old Town." },
          { description: "Shower and change." },
          {
            time: "20:00",
            description:
              "Dinner at Bar Néstor. We queued about two hours before to make sure we were one of the 16 people who get tortilla.",
            places: [{ name: "Bar Néstor" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One Last Swim",
        activities: [
          {
            description: "Coffee and a walk along the La Concha promenade.",
            places: [{ name: "La Concha promenade" }],
          },
          { description: "Lunch at Casa Urola.", places: [{ name: "Casa Urola" }] },
          { description: "Beach time at Ondarreta.", places: [{ name: "Ondarreta" }] },
          {
            description: "Shopping at Zara, Calzedonia and El Ganso.",
            places: [{ name: "Zara" }, { name: "Calzedonia" }, { name: "El Ganso" }],
          },
        ],
      },
    ],
  },
  {
    slug: "tunisia",
    title: "Three Days in Tunisia",
    destination: "Tunisia",
    country: "Tunisia",
    coords: { lat: 36.8065, lon: 10.1815 },
    duration: "3 days",
    season: "Autumn",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7693668918862384397",
    summary:
      "Mosaics in the morning, Carthage in the afternoon, and a beach club an hour down the coast.",
    cover: tunisia,
    gated: true,
    bmcUrl: "https://buymeacoffee.com/lexiemeskouris/e/584146",
    teaser: "Based in Sidi Bou Said, with everything else a taxi ride away.",
    tags: ["#Carthage", "#SidiBouSaid", "#Bambalouni"],
    highlights: ["Carthage", "Sidi Bou Said", "The medina", "Beach clubs", "Bambalouni"],
    days: [
      {
        day: "Day One",
        title: "The Bardo, the Medina, and Carthage",
        activities: [
          {
            description: "Visit the Bardo Museum.",
            places: [{ name: "Bardo Museum", near: "Tunis, Tunisia" }],
          },
          {
            description: "Taxi to the Medina of Tunis.",
            places: [{ name: "Medina of Tunis", near: "Tunis, Tunisia" }],
          },
          {
            description:
              "Explore the Zitouna Mosque area, Souk El Attarine and the lanes around them.",
            places: [
              { name: "Zitouna Mosque", near: "Tunis, Tunisia" },
              { name: "Souk El Attarine", near: "Tunis, Tunisia" },
            ],
          },
          {
            description: "Lunch at Dar Slah.",
            places: [{ name: "Dar Slah", near: "Tunis, Tunisia" }],
          },
          { description: "Taxi to Carthage.", places: [{ name: "Carthage" }] },
          {
            description: "Visit the Antonine Baths.",
            places: [{ name: "Antonine Baths", near: "Carthage, Tunisia" }],
          },
          {
            description: "Visit Byrsa Hill if there is still energy for it.",
            places: [{ name: "Byrsa Hill", near: "Carthage, Tunisia" }],
          },
          { description: "Back to the Airbnb to get ready." },
          {
            description: "Dinner at Cult Bistro.",
            places: [{ name: "Cult Bistro", near: "Tunis, Tunisia" }],
          },
        ],
      },
    ],
  },
  {
    slug: "berlin",
    title: "Three Days in Berlin",
    destination: "Berlin",
    country: "Germany",
    coords: { lat: 52.52, lon: 13.405 },
    duration: "3 days",
    season: "Late Summer",
    tiktok: [
      {
        url: "https://www.tiktok.com/@lexiemesko/video/7693188499339627789",
        label: "48 hours in Berlin on TikTok",
      },
      {
        url: "https://www.tiktok.com/@lexiemesko/video/7694621358025723150",
        label: "Getting into Berghain on TikTok",
      },
    ],
    summary: "Two nights out, with light days in between.",
    cover: berlin,
    gated: false,
    teaser: "",
    tags: ["#Doner", "#Berghain", "#StreetFoodThursday"],
    highlights: ["Kebab", "Clubs", "Cold War history", "Street food", "Berghain"],
    extras: [
      {
        title: "Skip these",
        avoid: true,
        places: [
          {
            name: "Annelie's",
            note: "Terrible. Cold food and flies everywhere. Instagrammable, but the food is mid.",
          },
        ],
      },
    ],
    days: [
      {
        day: "Day One",
        title: "Kebab, a Walking Tour, and KitKat",
        activities: [
          {
            description: "Kebab at Rüyam Gemüse Kebab.",
            places: [
              {
                name: "Rüyam Gemüse Kebab",
              },
            ],
          },
          {
            description: "Ice cream at Jones Ice Cream.",
            places: [{ name: "Jones Ice Cream" }],
          },
          {
            time: "14:00",
            description:
              "Berlin 2-hour Third Reich and Cold War Combo Tour, booked through Viator. Meet at the Quadriga on Pariser Platz. Insider Tour runs it, and code LEXIE10 gets 10% off any tour booked on their own site.",
            places: [
              {
                name: "Berlin 2-hour Third Reich and Cold War Combo Tour",
                url: "https://www.viator.com/en-GB/tours/Berlin/Berlin-2-hour-Third-Reich-Cold-War-Combo-Tour/d488-5560P48",
              },
              { name: "Quadriga" },
            ],
          },
          { time: "17:00", description: "Nap." },
          {
            time: "19:00",
            description: "Dinner at 60 Seconds to Napoli. Highly recommend.",
            places: [{ name: "60 Seconds to Napoli" }],
          },
          { description: "Change into club fits." },
          {
            time: "22:00",
            description: "Doors open at KitKat.",
            places: [{ name: "KitKat" }],
          },
          { time: "23:30", description: "Queue." },
        ],
      },
      {
        day: "Day Two",
        title: "East Side, Day Drinks, and Berghain",
        activities: [
          { description: "Sleep in." },
          {
            description: "Explore the area, including the East Side Gallery.",
            places: [{ name: "East Side Gallery" }],
          },
          {
            description: "Day drinks at Cassiopeia Sommergarten.",
            places: [{ name: "Cassiopeia" }],
          },
          {
            time: "17:00",
            description: "Street Food Thursday at Markthalle Neun in Kreuzberg.",
            places: [{ name: "Markthalle Neun" }],
          },
          {
            time: "22:00",
            description: "Säule at Berghain.",
            places: [{ name: "Berghain" }],
          },
          {
            description: "After party at ://about blank.",
            places: [{ name: "about blank" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Fill the Day, Then the Reichstag",
        activities: [
          {
            description: "Any of these, depending on what you want.",
            places: [
              {
                name: "Vabali Spa",
                note: "A whole day if you want one. Pools, saunas and a massage. Honestly the most relaxing option.",
              },
              {
                name: "Museum Island",
                note: "Five museums on one island. For anyone who loves art and history and wants to actually learn something. You can do just one of them.",
              },
              {
                name: "Café am Neuen See",
                note: "A beer garden on the lake in the Tiergarten. Somewhere to sit with a drink, and you can take a rowing boat out.",
              },
              {
                name: "Holzmarkt",
                note: "A riverside village of bars, workshops and studios on the Spree. Somewhere to drift about for an hour without a plan.",
              },
              {
                name: "Alexanderplatz",
                note: "The TV tower, the world clock and the big shops. The place to go if you still have things to buy.",
              },
              {
                name: "LIU Nudelhaus",
                note: "Hand-pulled noodles. This is what we did, and it cured our hangover.",
              },
              {
                name: "ACID Mitte",
                note: "A good bun. The coffee and matcha were horrible, so just get the pastry, then walk round Mitte and shop.",
              },
            ],
          },
          {
            time: "17:15",
            description:
              "Climb the Reichstag. Tickets have to be applied for in advance, and they are free.",
            places: [{ name: "Reichstag", url: "https://www.bundestag.de/en/visittheBundestag" }],
          },
        ],
      },
    ],
  },
  {
    slug: "taipei",
    title: "Three Days in Taipei",
    destination: "Taipei",
    country: "Taiwan",
    coords: { lat: 25.033, lon: 121.5654 },
    duration: "3 days",
    season: "Spring",
    summary:
      "A night market food tour, a sunset hike, and dumplings at Taipei 101. Mostly done on foot.",
    cover: taipei,
    gated: false,
    comingSoon: true,
    teaser: "Almost all of it is on foot.",
    tags: ["#NightMarket", "#ElephantMountain", "#DinTaiFung"],
    highlights: ["Night markets", "Elephant Mountain", "Dumplings", "Temples"],
    days: [
      {
        day: "Day One",
        title: "Da'an and Shida Night Market",
        activities: [
          {
            description: "Lunch at Azie, in the Regent Taipei.",
            places: [{ name: "Azie" }],
          },
          {
            time: "14:45",
            description: "Walk to the Da'an area.",
            places: [{ name: "Da'an" }],
          },
          {
            time: "15:45",
            description: "Explore Yongkang Street.",
            places: [{ name: "Yongkang Street" }],
          },
          {
            time: "17:00",
            description: "Three and a half hour food tour through Shida Night Market.",
            places: [{ name: "Shida Night Market" }],
          },
          { time: "20:30", description: "Food tour ends. Head back towards the hotel." },
          {
            time: "21:30",
            description: "Drinks at Bar Seed or Bitter Burro.",
            places: [{ name: "Bar Seed" }, { name: "Bitter Burro" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Songshan, Elephant Mountain, and Dumplings",
        activities: [
          { time: "09:00", description: "Breakfast at the hotel." },
          {
            description: "Visit the Miniatures Museum of Taiwan.",
            places: [{ name: "Miniatures Museum of Taiwan" }],
          },
          {
            description: "Long walk to Songshan Cultural and Creative Park.",
            places: [{ name: "Songshan Cultural and Creative Park" }],
          },
          {
            description: "Snack at Bandao Beef Noodle if hungry.",
            places: [{ name: "Bandao Beef Noodle" }],
          },
          {
            description: "Tiramisu at Coffee Law.",
            places: [{ name: "Coffee Law" }],
          },
          {
            time: "17:00",
            description: "Hike up Elephant Mountain for the sunset at 17:59.",
            places: [{ name: "Elephant Mountain" }],
          },
          {
            description:
              "Put your name down at Din Tai Fung Taipei 101, then drink at UNO Taipei while you wait.",
            places: [{ name: "Din Tai Fung Taipei 101" }, { name: "UNO Taipei" }],
          },
          {
            description: "Dinner at Din Tai Fung Taipei 101.",
            places: [{ name: "Din Tai Fung Taipei 101" }],
          },
          {
            description: "Drinks at Draft Land, or KOR, or both.",
            places: [{ name: "Draft Land" }, { name: "KOR" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Longshan Temple and Bopiliao",
        activities: [
          { description: "Breakfast at the hotel." },
          {
            description: "Fifty minute walk to Longshan Temple.",
            places: [{ name: "Longshan Temple" }],
          },
          {
            description: "Walk through Bopiliao Historical Block.",
            places: [{ name: "Bopiliao Historical Block" }],
          },
        ],
      },
    ],
  },
  {
    slug: "amsterdam",
    title: "Three Days in Amsterdam",
    destination: "Amsterdam",
    country: "Netherlands",
    coords: { lat: 52.3676, lon: 4.9041 },
    duration: "3 days",
    season: "Early Summer",
    summary: "Museums, a booze cruise, a food tour, and a whole day of wandering.",
    cover: amsterdam,
    gated: false,
    teaser: "",
    tags: ["#VanGogh", "#DePijp", "#Vondelpark"],
    highlights: ["Van Gogh", "Canals", "De Pijp", "Vondelpark", "Anne Frank House"],
    extras: [
      {
        title: "Not on the plan, but worth knowing",
        places: [
          { name: "Cafe Baskets", note: "Coffee." },
          { name: "Louf", note: "Bakery." },
          { name: "Samuals", note: "Wine, apero, dinner." },
          { name: "Broodje Gerald", note: "Coffee and sandwiches." },
          { name: "Oeuf", note: "Brunch." },
        ],
      },
      {
        title: "Skip these",
        avoid: true,
        places: [
          { name: "Chun Spuistraat", note: "Horrible. Super touristy, a long line and cold food." },
          { name: "Hans Egstorf", note: "The stroopwafel was messy and not that tasty." },
        ],
      },
    ],
    days: [
      {
        day: "Day One",
        title: "Van Gogh, De Pijp, and the Canal",
        activities: [
          {
            time: "10:00",
            description: "Coffee at Mood's.",
            places: [{ name: "Mood's" }],
          },
          {
            time: "10:45",
            description: "The Van Gogh Museum.",
            places: [{ name: "Van Gogh Museum" }],
          },
          {
            time: "12:30",
            description: "Quick walk across Museumplein.",
            places: [{ name: "Museumplein" }],
          },
          {
            time: "13:15",
            description: "Sit-down brunch at Little Collins. Get the short rib.",
            places: [{ name: "Little Collins" }],
          },
          {
            description: "Explore De Pijp.",
            places: [
              { name: "Gerard Doustraat", note: "Boutiques." },
              { name: "Ceintuurbaan", note: "Boutiques." },
              { name: "Albert Cuyp Markt" },
              { name: "Sarphatipark" },
              { name: "Glou Glou", note: "Wine bar." },
            ],
          },
          { time: "17:30", description: "Hotel break, shower, get ready." },
          {
            time: "18:45",
            description: "Transfer to Prins Hendrikkade 33A for the cruise.",
            places: [{ name: "Prins Hendrikkade 33A" }],
          },
          { time: "19:30", description: "Booze cruise on the canal until 20:30." },
          {
            time: "21:00",
            description:
              "Dinner at Kikkie van de Prinsensluis. The burger was unbelievable. Sit outside with a drink while you wait for your table.",
            places: [{ name: "Kikkie van de Prinsensluis" }],
          },
          {
            time: "22:30",
            description: "Walk through the Red Light District.",
            places: [{ name: "Red Light District" }],
          },
          { time: "00:30", description: "Bars if there is still energy, otherwise home." },
        ],
      },
      {
        day: "Day Two",
        title: "At Leisure",
        activities: [
          {
            description: "Walk through the Lindengracht market. Saturdays only.",
            places: [{ name: "Lindengracht market" }],
          },
          {
            description: "Apple pie at Winkel 43, or a pancake at the Pancake Bakery.",
            places: [{ name: "Winkel 43" }, { name: "Pancake Bakery" }],
          },
          {
            description: "Walk through the Bloemenmarkt, the floating flower market.",
            places: [{ name: "Bloemenmarkt" }],
          },
          {
            description:
              "Make custom bars at Tony's Chocolonely. Quick, fun, and worth it for the souvenir.",
            places: [{ name: "Tony's Chocolonely" }],
          },
          {
            description: "Walk through Vondelpark, then stay in it. Painting and sitting.",
            places: [{ name: "Vondelpark" }],
          },
          {
            description: "See where the day goes. Drinks, dinner and going out, at leisure.",
            places: [
              { name: "Buurtcafé De Tros", note: "Dinner." },
              { name: "Jazz Café Alto", note: "Jazz bar." },
              { name: "Paradiso", note: "Club." },
              { name: "Supperclub", note: "Club." },
              { name: "Basement", note: "Techno club." },
              { name: "Raeion", note: "Club." },
              { name: "Bret", note: "Disco club." },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Food Tour and the Anne Frank House",
        activities: [
          { description: "Coffee and a long walk to the food tour." },
          { time: "11:00", description: "Secret Food Tour until 13:00." },
          {
            time: "13:30",
            description:
              "Wander the Jordaan and the Nine Streets. Boutiques, coffee, canals, and beers at Waterkant.",
            places: [
              { name: "Jordaan" },
              { name: "Nine Streets" },
              { name: "Waterkant", note: "Waterfront beers." },
            ],
          },
          {
            time: "14:45",
            description:
              "Head to the Anne Frank House, and go in at 15:15. Tickets drop six weeks ahead and sell out within minutes, so plan for it.",
            places: [{ name: "Anne Frank House" }],
          },
          {
            description:
              "Optional: a quick dinner or drinks in the Jordaan, or A'DAM Lookout if that is your thing. It is across the water by ferry. We skipped the lookout and had a drink at the pub at the bottom of it.",
            places: [{ name: "A'DAM Lookout" }],
          },
        ],
      },
    ],
  },
  {
    slug: "nashville",
    title: "Four Days in Nashville",
    destination: "Nashville",
    country: "United States",
    coords: { lat: 36.1627, lon: -86.7816 },
    duration: "4 days",
    season: "Winter",
    summary:
      "Four dinners worth booking, a spa morning to recover, and as much of Broadway as you can take.",
    cover: nashville,
    gated: false,
    teaser: "Book Kayne Prime and the massages at Woodhouse ahead.",
    tags: ["#Broadway", "#12South", "#ListeningRoom"],
    highlights: ["Barbecue", "Broadway", "Live music", "12 South", "Brunch"],
    extras: [
      {
        title: "BBQ",
        places: [
          { name: "Peg Leg Porker" },
          { name: "Martin's Bar-B-Que Joint" },
          { name: "Jack's Bar-B-Que", note: "The Broadway one." },
        ],
      },
      {
        title: "Fried chicken",
        places: [
          { name: "Hattie B's" },
          { name: "Prince's Hot Chicken", note: "There is a branch at 6th & Peabody." },
        ],
      },
      {
        title: "Coffee, breakfast and brunch",
        places: [
          { name: "Dozen Bakery", note: "Favourite bakery." },
          { name: "Fido", note: "Sit down, fast casual breakfast." },
          { name: "Big Al's Deli", note: "Underrated spot in Germantown." },
          { name: "Sky Blue Cafe", note: "East Nashville." },
          { name: "H&S Bagels" },
          { name: "Proper Bagel" },
          { name: "Marsh House", note: "In the Gulch." },
          { name: "Lady Bird Taco", note: "Breakfast tacos." },
          { name: "Frothy Monkey" },
          { name: "Biscuit Love", note: "The classic touristy one." },
        ],
      },
      {
        title: "Lunch",
        places: [
          { name: "Grekko", note: "Casual Greek." },
          { name: "The Greenery", note: "Make your own salad." },
          { name: "51st Deli", note: "Sandwiches." },
          { name: "Mitchell Delicatessen", note: "Sandwiches." },
          { name: "Burger Up", note: "Burgers and salads." },
          { name: "Taco Mama" },
          { name: "Assembly Food Hall", note: "Food court on Broadway." },
          { name: "Little Hats Market", note: "Italian deli in Germantown." },
          { name: "Cava" },
        ],
      },
      {
        title: "Dinner",
        places: [
          {
            name: "Twelve Thirty Club",
            note: "On Broadway. Both a bar and a sit-down restaurant, with live music.",
          },
          { name: "Luogo", note: "Italian in the Gulch." },
          { name: "Butchertown Hall", note: "Nicer tacos, in Germantown." },
          { name: "5th & Taylor" },
          { name: "Butcher & Bee", note: "Mediterranean." },
          { name: "Noko", note: "So good. Asian." },
          { name: "Urban Cowboy", note: "Drinks and pizza." },
          { name: "Pinewood Social" },
          { name: "The Pharmacy Burger Parlor", note: "Cute burger place." },
          { name: "Sunda", note: "Asian, in the Gulch." },
          { name: "Ernest Bar & Hideaway" },
          { name: "Pastaria" },
          { name: "Barcelona Wine Bar", note: "Tapas." },
          { name: "Sadie's", note: "Mediterranean." },
          { name: "The Optimist" },
          { name: "Saint Añejo" },
          { name: "Oku" },
          { name: "Two Ten Jack" },
          { name: "Moto" },
          { name: "Yolan" },
          { name: "Bourbon Steak" },
        ],
      },
      {
        title: "Drinks",
        places: [
          {
            name: "6th & Peabody",
            note: "Outdoor moonshine distillery and brewery, with a hot dog stand and a taco shop.",
          },
          { name: "Tennessee Brew Works", note: "Brewery with a rooftop." },
          { name: "L.A. Jackson", note: "Rooftop on the Thompson." },
          { name: "Attaboy", note: "Speakeasy." },
          { name: "Old Glory", note: "Speakeasy." },
          { name: "Rare Bird", note: "Rooftop." },
          { name: "Von Elrod's", note: "Beer garden." },
          { name: "Golden Pony", note: "East Nashville, and it does food." },
          { name: "Rosemary", note: "Bar in East Nashville." },
          { name: "Mother's Ruin" },
          { name: "The Patterson House", note: "Speakeasy." },
          { name: "TailGate Brewery" },
          { name: "Neighbors", note: "Sports bar." },
          { name: "Sonny's", note: "Sports bar." },
        ],
      },
      {
        title: "Dessert",
        places: [
          { name: "Baked Bear" },
          { name: "Koko's", note: "Vegan ice cream that is actually good." },
          { name: "Jeni's" },
          { name: "NoBaked Cookie Dough" },
        ],
      },
      {
        title: "Live music, and somewhere to eat while you listen",
        places: [
          { name: "3rd and Lindsley" },
          { name: "City Winery" },
          { name: "The Row Kitchen & Pub", note: "Live music and good lunch food." },
        ],
      },
      {
        title: "Neighbourhoods to walk and shop",
        places: [
          { name: "Hillsboro Village" },
          { name: "The Gulch" },
          { name: "Germantown" },
          { name: "Wedgewood-Houston" },
        ],
      },
      {
        title: "Parks and markets",
        places: [
          { name: "Bicentennial Capitol Mall State Park" },
          { name: "Centennial Park" },
          { name: "Sevier Park" },
          { name: "Richland Park Farmers Market", note: "Saturdays until noon." },
        ],
      },
      {
        title: "Games and other things",
        places: [
          { name: "First Horizon Park", note: "Sounds games. Minor league baseball." },
          { name: "Geodis Park", note: "Soccer." },
          { name: "Bridgestone Arena", note: "Preds games. Hockey." },
          { name: "Nissan Stadium", note: "Titans games. Football." },
          { name: "Pins Mechanical", note: "Bowling, with an outdoor bar." },
        ],
      },
    ],
    days: [
      {
        day: "Day One",
        title: "Campus and the Listening Room",
        activities: [
          {
            description: "Walk around the Vanderbilt University campus.",
            places: [{ name: "Vanderbilt University" }],
          },
          { description: "Back to change for dinner." },
          {
            time: "18:15",
            description: "Dinner at Rolf & Daughters.",
            places: [{ name: "Rolf & Daughters", note: "Favourite restaurant." }],
          },
          {
            time: "20:30",
            description: "The Listening Room.",
            places: [
              {
                name: "The Listening Room",
                note: "Dinner and a show. The food is fair, the show is so fun.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Spa, Barbecue, and Broadway",
        activities: [
          { description: "Arrive ten to fifteen minutes early." },
          {
            time: "11:30",
            description: "Massages at Woodhouse.",
            places: [{ name: "Woodhouse" }],
          },
          { description: "Relax." },
          {
            time: "13:30",
            description: "Barbecue lunch at Edley's.",
            places: [{ name: "Edley's" }],
          },
          {
            description: "Walk around 12 South, and stop at Five Daughters Bakery.",
            places: [{ name: "12 South" }, { name: "Five Daughters Bakery", note: "Donuts." }],
          },
          {
            time: "19:30",
            description: "Dinner at Chauhan.",
            places: [{ name: "Chauhan" }],
          },
          {
            description: "Drinking on Broadway.",
            places: [{ name: "Broadway", note: "Anywhere along it." }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Monell's, Broadway, and Kayne Prime",
        activities: [
          {
            time: "10:00",
            description: "Brunch at Monell's.",
            places: [{ name: "Monell's", note: "Sit-down southern style brunch." }],
          },
          {
            description: "Drinking on Broadway.",
            places: [{ name: "Broadway" }],
          },
          {
            description: "If hungry, snacks and live music at 5th & Broadway.",
            places: [
              {
                name: "5th & Broadway",
                note: "Food court, shopping and a lot of the Nashville staples in one complex.",
              },
            ],
          },
          {
            time: "20:00",
            description: "Dinner at Kayne Prime. Needs booking.",
            places: [{ name: "Kayne Prime", note: "Steakhouse." }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Brunch at Adele's",
        activities: [
          {
            time: "11:45",
            description:
              "Brunch at Adele's. The all-you-can-eat buffet is Sunday only, and any other day you order off the menu. It is still the nicest brunch on this list, and it is a proper dinner restaurant too if you would rather go in the evening.",
            places: [
              {
                name: "Adele's",
                note: "The nicer brunch. The all-you-can-eat buffet runs on Sundays only, so time it for a Sunday if you want that. It is also a really good dinner spot the rest of the week, which most brunch places are not.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "paris",
    title: "Five Days in Paris",
    destination: "Paris",
    country: "France",
    coords: { lat: 48.8566, lon: 2.3522 },
    duration: "5 days",
    season: "Late Spring",
    summary: "Roland-Garros, a day in Champagne, and the rest of Paris covered on foot.",
    cover: paris,
    gated: false,
    teaser: "",
    tags: ["#RolandGarros", "#Champagne", "#LeMarais"],
    notes: [
      "This only works in May if you want Roland-Garros. Everything else here is fine any time of year, so move the tennis day out and the rest still stands.",
    ],
    highlights: ["Roland-Garros", "Champagne", "Le Marais", "Montmartre", "Baguettes"],
    days: [
      {
        day: "Day One",
        title: "Roland-Garros",
        activities: [
          { time: "08:00", description: "Croissants near the Airbnb." },
          {
            time: "09:00",
            description: "Metro to Roland-Garros.",
            places: [{ name: "Roland-Garros" }],
          },
          { time: "10:00", description: "Gates open." },
          { time: "12:00", description: "Daytime session." },
          {
            description: "Keep watching the third-round matches and wander the outside courts.",
          },
          { description: "Dinner, whenever play finishes. Leave it flexible." },
        ],
      },
      {
        day: "Day Two",
        title: "Le Marais, Then Montmartre",
        activities: [
          {
            description: "Pick up coffee at The Coffee for the walk.",
            places: [{ name: "The Coffee" }],
          },
          {
            time: "10:30",
            description: "Sandwiches at Chez Alain Miam Miam.",
            places: [{ name: "Chez Alain Miam Miam" }],
          },
          {
            description: "Walk through the Marché des Enfants Rouges.",
            places: [{ name: "Marché des Enfants Rouges" }],
          },
          {
            description: "Shop in Le Marais, the Jewish quarter, which has great shopping.",
            places: [
              { name: "Le Marais" },
              { name: "Rue des Francs-Bourgeois" },
              { name: "Rue de Turenne" },
              { name: "Rue Vieille du Temple" },
              { name: "Officine Universelle Buly 1803" },
              { name: "Merci" },
            ],
          },
          {
            time: "14:30",
            description: "Lunch at Chez Janou.",
            places: [{ name: "Chez Janou" }],
          },
          {
            description: "Walk up to Sacré-Coeur. Go for the views from the steps.",
            places: [{ name: "Sacré-Coeur" }],
          },
          {
            description: "Stroll through Montmartre.",
            places: [{ name: "Montmartre" }],
          },
          {
            description: "Passage des Panoramas.",
            places: [{ name: "Passage des Panoramas" }],
          },
          {
            time: "19:30",
            description: "Dinner at Le Coq & Fils.",
            places: [{ name: "Le Coq & Fils" }],
          },
          {
            time: "21:30",
            description: "Drinks at Le Très Particulier.",
            places: [{ name: "Le Très Particulier" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Left Bank, and a Late Show",
        activities: [
          {
            time: "11:30",
            description: "Walk to L'Entrecôte. It opens at 12:00.",
            places: [{ name: "L'Entrecôte" }],
          },
          {
            description: "Walk through the Jardin du Luxembourg.",
            places: [{ name: "Jardin du Luxembourg" }],
          },
          {
            description: "Shopping.",
            places: [
              { name: "Le Bon Marché", note: "Best department store, and a grocery." },
              { name: "Citypharma", note: "Biggest French pharmacy." },
              {
                name: "La Grande Épicerie de Paris",
                note: "Gourmet grocer. Get the French butter.",
              },
            ],
          },
          {
            description: "Stop into the Musée d'Orsay.",
            places: [{ name: "Musée d'Orsay" }],
          },
          {
            description: "Afternoon pick-me-up at Chapon et la Chocolaterie de l'Église.",
            places: [{ name: "Chapon" }, { name: "Chocolaterie de l'Église" }],
          },
          { description: "Back to the hotel to get ready for dinner." },
          {
            description: "Drink at Bar du Marché, if you fancy it.",
            places: [{ name: "Bar du Marché" }],
          },
          {
            time: "19:00",
            description: "Dinner at Petite Lutecia.",
            places: [{ name: "Petite Lutecia" }],
          },
          {
            time: "22:30",
            description: "Burlesque show at Crazy Horse.",
            places: [{ name: "Crazy Horse" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Champagne Country",
        activities: [
          {
            time: "07:45",
            description: "Taxi from the Airbnb to Paris Gare de l'Est.",
            places: [{ name: "Gare de l'Est" }],
          },
          {
            time: "08:30",
            description: "Direct TGV to Reims Centre.",
            places: [{ name: "Reims", near: "France" }],
          },
          { time: "09:15", description: "Arrive in Reims." },
          {
            time: "09:30",
            description: "Notre-Dame de Reims Cathedral.",
            places: [{ name: "Notre-Dame de Reims", near: "Reims, France" }],
          },
          { time: "10:30", description: "Travel out to Ruinart." },
          {
            time: "11:00",
            description: "Ruinart cellar tour and tasting.",
            places: [{ name: "Ruinart", near: "Reims, France" }],
          },
          { time: "13:15", description: "Lunch in Reims." },
          {
            time: "15:30",
            description: "Veuve Clicquot cellar tour and tasting.",
            places: [{ name: "Veuve Clicquot", near: "Reims, France" }],
          },
          { time: "17:15", description: "Back to central Reims." },
          { time: "17:30", description: "Walk the centre and shop for Champagne." },
          { time: "18:30", description: "Direct TGV back to Paris." },
          { time: "19:15", description: "Arrive at Paris Gare de l'Est." },
          {
            time: "20:30",
            description: "Dinner at La Fontaine de Mars.",
            places: [{ name: "La Fontaine de Mars" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "One Last Baguette",
        activities: [
          {
            description:
              "Stop at La Parisienne for the baguette that won best in Paris. Save butter from La Grande Épicerie for eating it along Pont Neuf.",
            places: [{ name: "La Parisienne" }],
          },
          {
            time: "10:00",
            description: "Breakfast at Les Deux Magots.",
            places: [{ name: "Les Deux Magots" }],
          },
          {
            time: "11:00",
            description: "Walk the Champs-Élysées.",
            places: [{ name: "Champs-Élysées" }],
          },
          { description: "Stroll along the Seine.", places: [{ name: "Seine" }] },
          {
            time: "13:00",
            description: "Walk to Pont Neuf.",
            places: [{ name: "Pont Neuf" }],
          },
        ],
      },
    ],
  },
  {
    slug: "copenhagen",
    title: "Three Days in Copenhagen",
    destination: "Copenhagen",
    country: "Denmark",
    coords: { lat: 55.6761, lon: 12.5683 },
    duration: "3 days",
    season: "Early Spring",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7703690095769029902",
    summary: "The whole city on foot, and one very good burger.",
    cover: copenhagen,
    gated: false,
    teaser: "Small enough to walk almost all of it.",
    tags: ["#Tivoli", "#Reffen", "#RoundTower"],
    extras: [
      {
        title: "Also worth seeing",
        places: [
          { name: "Nyhavn" },
          { name: "The Little Mermaid", note: "Just walk by." },
          { name: "Hørsholm" },
          { name: "Sidecar", note: "Brunch." },
        ],
      },
    ],
    highlights: ["Tivoli", "Street food", "Hot tubs", "The Round Tower", "Pastries"],
    days: [
      {
        day: "Day One",
        title: "The Whole City on Foot",
        activities: [
          {
            description: "Coffee at Union Kitchen. Get the one with a saying printed on top.",
            places: [{ name: "Union Kitchen" }],
          },
          {
            description:
              "Amalienborg. The changing of the guard is at 12:00, but it is not essential.",
            places: [{ name: "Amalienborg" }],
          },
          {
            description: "Havnegade Harbour Promenade.",
            places: [{ name: "Havnegade Harbour Promenade" }],
          },
          {
            description: "Pastries and coffee at Sankt Peders Bageri, the famous one.",
            places: [{ name: "Sankt Peders Bageri" }],
          },
          {
            description: "The Round Tower. Fifteen minutes to climb, and worth it for the views.",
            places: [{ name: "Round Tower" }],
          },
          {
            description:
              "Walk through the Glass Market and grab a drink, then queue for Slurp Ramen. The line moves fast and it is well worth it.",
            places: [{ name: "Glass Market" }, { name: "Slurp Ramen" }],
          },
          {
            description: "The Botanical Garden, for as long as you fancy the free areas.",
            places: [{ name: "Botanical Garden" }],
          },
          {
            description:
              "La Banchina, my favourite part of the trip. The pastries are to die for, it is cute and peaceful, and it turns into a wine bar at night, so it works at any time of day or year. The sauna is there if you want it.",
            places: [{ name: "La Banchina" }],
          },
          {
            description: "Hot Tub Copenhagen. You can go at 17:00 or 18:00.",
            places: [{ name: "Hot Tub Copenhagen" }],
          },
          {
            description:
              "Dinner at Reffen. So fun: a whole yard of food stalls, with fire pits in the winter.",
            places: [{ name: "Reffen" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Boat, Bikes, and Tivoli",
        activities: [
          {
            time: "10:00",
            description: "The Classic Canal Tour with Stromma, until 11:00.",
            places: [{ name: "Classic Canal Tour by Stromma" }],
          },
          {
            time: "11:30",
            description:
              "Six minute Uber to Wulff & Konstali for brunch. Book it. It is the classic Copenhagen brunch, where you pick a few small plates and build your ideal meal.",
            places: [{ name: "Wulff & Konstali" }],
          },
          {
            description:
              "Superkilen, on bikes. Honestly not worth it unless you want the pictures: it is out of the way and felt a bit sketchy.",
            places: [{ name: "Superkilen" }],
          },
          {
            description:
              "Designmuseum Danmark. Smaller than I imagined, but very up my alley. Most people spend about two hours, and I wish I had had longer.",
            places: [{ name: "Designmuseum Danmark" }],
          },
          {
            description:
              "Walk Strøget, the main shopping street, and past Christiansborg Palace on the way to Tivoli.",
            places: [{ name: "Strøget" }, { name: "Christiansborg Palace" }],
          },
          {
            description:
              "Tivoli Gardens. Great food, wine, rides and atmosphere. People spend around five hours, and there is a food hall inside.",
            places: [{ name: "Tivoli Gardens" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One Burger, Then Christiania",
        activities: [
          {
            time: "11:00",
            description:
              "Gasoline Grill. No need to queue now: there are loads of them and it is easy to get in.",
            places: [{ name: "Gasoline Grill" }],
          },
          {
            description:
              "Buka Bakery as well. It was delicious, so get both the burger and the bakery.",
            places: [{ name: "Buka Bakery" }],
          },
          {
            description:
              "Christiania and the Church of Our Saviour. So worth it. Talking to people in Christiania was fascinating, and we spent much longer walking round than we planned.",
            places: [{ name: "Christiania" }, { name: "Church of Our Saviour" }],
          },
        ],
      },
    ],
  },
  {
    slug: "budapest",
    title: "Three Days in Budapest",
    destination: "Budapest",
    country: "Hungary",
    coords: { lat: 47.4979, lon: 19.0402 },
    duration: "3 days",
    season: "Early Spring",
    summary:
      "Castle Hill and the heavy museums on one day, the baths and a long dinner on the next.",
    teaser: "",
    cover: budapest,
    gated: false,
    tags: ["#RuinBars", "#TheBaths", "#CastleHill"],
    highlights: ["Thermal baths", "Ruin bars", "Castle Hill", "The Danube"],
    days: [
      {
        day: "First Night",
        title: "Dinner at Karaván",
        activities: [
          {
            description: "Walk to Karaván for dinner from the food stalls.",
            places: [{ name: "Karaván Street Food" }],
          },
        ],
      },
      {
        day: "Day One",
        title: "Buda, the Museums, and the Ruin Bars",
        activities: [
          {
            time: "11:00",
            description: "Brunch at Franziska, over in Buda.",
            places: [{ name: "Franziska" }],
          },
          {
            description: "Fisherman's Bastion and Castle Hill.",
            places: [{ name: "Fisherman's Bastion" }, { name: "Castle Hill" }],
          },
          {
            description: "Hospital in the Rock, or the Semmelweis Museum.",
            places: [{ name: "Hospital in the Rock" }, { name: "Semmelweis Museum" }],
          },
          {
            description: "Shoes on the Danube Bank.",
            places: [{ name: "Shoes on the Danube Bank" }],
          },
          {
            description: "House of Terror, the communist museum. Ninety minutes.",
            places: [{ name: "House of Terror" }],
          },
          {
            time: "18:30",
            description: "Dinner at Mazel Tov.",
            places: [{ name: "Mazel Tov" }],
          },
          { time: "21:00", description: "Prosecco cruise." },
          {
            description: "Out at the ruin bars.",
            places: [
              { name: "Krimo Pub" },
              { name: "Szimpla Kert", note: "Go early." },
              { name: "Fotó Instant" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Sandwiches, the Baths, and a Long Dinner",
        activities: [
          { description: "Sleep in." },
          {
            description: "Pick up sandwiches from Bors and cookies from Cookie Beacon.",
            places: [{ name: "Bors GasztroBár" }, { name: "Cookie Beacon" }],
          },
          { description: "Train out to the baths." },
          {
            description: "Two to four hours at the baths. You can buy tickets there.",
          },
          { description: "Back to the hotel to change, shower and rest." },
          {
            description: "Walk to For Sale Pub for a drink.",
            places: [{ name: "For Sale Pub" }],
          },
          {
            time: "20:00",
            description: "Dinner at Dionysos Taverna.",
            places: [{ name: "Dionysos Taverna" }],
          },
          { description: "Go out again, if you want." },
        ],
      },
    ],
  },
  {
    slug: "thailand",
    title: "Thirteen Days in Thailand",
    destination: "Thailand",
    country: "Thailand",
    coords: { lat: 13.7563, lon: 100.5018 },
    duration: "13 days",
    season: "December",
    summary:
      "Phuket, Chiang Mai and Bangkok in one run: islands, elephants, temples and a lot of booked tours.",
    cover: thailand,
    gated: false,
    teaser: "Most of the big days are booked tours, so book well ahead.",
    tags: ["#PhiPhi", "#ChiangMai", "#Ayutthaya"],
    highlights: ["Islands", "Cooking class", "Elephants", "Temples", "Floating markets"],
    days: [
      {
        day: "Day One",
        title: "Patong and Bangla Road",
        activities: [
          { description: "We stayed in Patong.", places: [{ name: "Patong" }] },
          {
            description: "Relax, then dinner on Bangla Road.",
            places: [{ name: "Bangla Road", near: "Patong, Phuket" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Cooking Class and the Market",
        activities: [
          {
            time: "15:00",
            description: "Half-day Thai cooking class with a local market tour, until 19:00.",
          },
        ],
      },
      {
        day: "Day Three",
        title: "Phi Phi and Bamboo Islands",
        activities: [
          {
            time: "07:30",
            description: "Small group Phi Phi and Bamboo Islands tour with lunch, back at 18:30.",
            places: [
              { name: "Phi Phi Islands", near: "Thailand" },
              { name: "Bamboo Island", near: "Krabi, Thailand" },
            ],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Phuket City",
        activities: [
          {
            time: "13:00",
            description: "Half day Phuket city tour, until 19:00.",
            places: [{ name: "Phuket Old Town", near: "Phuket, Thailand" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Beach, Then Muay Thai",
        activities: [
          { description: "Beach." },
          { description: "Yoga, or a Muay Thai class, or both." },
        ],
      },
      {
        day: "Day Six",
        title: "Beach and the Night Market",
        activities: [
          { description: "Beach day." },
          {
            description: "The weekend night market.",
            places: [{ name: "Phuket Weekend Night Market", near: "Phuket, Thailand" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Into Chiang Mai",
        activities: [
          { description: "Take the rest of the day at leisure." },
          { description: "Ladyboy cabaret show." },
        ],
      },
      {
        day: "Day Eight",
        title: "Chiang Rai",
        activities: [
          {
            time: "06:00",
            description: "Picked up for Chiang Rai.",
            places: [{ name: "Chiang Rai" }],
          },
        ],
      },
      {
        day: "Day Nine",
        title: "A Day as an Elephant Caregiver",
        activities: [
          {
            time: "13:00",
            description:
              "Picked up for Patara Elephant Farm, caregiver for a day, back at 18:30. Check the booking email for what to bring.",
            places: [{ name: "Patara Elephant Farm", near: "Chiang Mai, Thailand" }],
          },
        ],
      },
      {
        day: "Day Ten",
        title: "The Monk's Trail",
        activities: [
          {
            description:
              "Walk one hour and seventeen minutes to the Monk's Trail trailhead at Wat Pha Lat, stopping for breakfast on the way.",
            places: [{ name: "Wat Pha Lat", near: "Chiang Mai, Thailand" }],
          },
          {
            description: "Pass Wat Suan Dok on the way.",
            places: [{ name: "Wat Suan Dok", near: "Chiang Mai, Thailand" }],
          },
          {
            description: "Fifty-three minutes further up to Wat Phra That Doi Suthep.",
            places: [{ name: "Wat Phra That Doi Suthep", near: "Chiang Mai, Thailand" }],
          },
          { description: "Stop for lunch or dinner on the way back down." },
        ],
      },
      {
        day: "Day Eleven",
        title: "Into Bangkok",
        activities: [
          { description: "Walk the temples." },
          {
            description: "Maeklong Railway Market. You need to book a shuttle if you want to go.",
            places: [{ name: "Maeklong Railway Market", near: "Samut Songkhram, Thailand" }],
          },
        ],
      },
      {
        day: "Day Twelve",
        title: "Ayutthaya and the Floating Market",
        activities: [
          {
            time: "09:50",
            description:
              "Ayutthaya and Ayothaya Floating Market day trip, until 18:50. Meeting point is by the McDonald's at Robinson Mall Sukhumvit, near BTS Asok. Get there ten minutes early.",
            places: [
              { name: "Ayutthaya", near: "Thailand" },
              { name: "Ayothaya Floating Market", near: "Ayutthaya, Thailand" },
              { name: "BTS Asok", near: "Bangkok, Thailand" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "singapore",
    title: "Three Days in Singapore",
    destination: "Singapore",
    country: "Singapore",
    coords: { lat: 1.3521, lon: 103.8198 },
    duration: "3 days",
    season: "January",
    summary:
      "Orchard Road and the Botanic Gardens, a jungle hike with monkeys, and Gardens by the Bay after dark.",
    cover: singapore,
    gated: false,
    teaser: "Based at Marina Bay Sands.",
    tags: ["#GardensByTheBay", "#MacRitchie", "#HajiLane"],
    notes: [
      "The first night here happened to be New Year's Eve, which is the only reason there are fireworks on it. Any other time of year that is just dinner.",
    ],
    highlights: ["Gardens by the Bay", "Haji Lane", "MacRitchie", "Light shows"],
    days: [
      {
        day: "Day One",
        title: "Orchard Road and Fireworks",
        activities: [
          {
            description: "Stay at Marina Bay Sands.",
            places: [{ name: "Marina Bay Sands" }],
          },
          {
            description:
              "Walk Orchard Road, the upscale shopping stretch, for the department stores, restaurants and coffee houses.",
            places: [{ name: "Orchard Road" }],
          },
          {
            description: "Walk the Botanic Gardens. They are open until midnight.",
            places: [{ name: "Singapore Botanic Gardens" }],
          },
          { description: "Dinner, then fireworks." },
        ],
      },
      {
        day: "Day Two",
        title: "MacRitchie, Haji Lane, Gardens by the Bay",
        activities: [
          {
            description: "Breakfast at Tiong Bahru Bakery.",
            places: [{ name: "Tiong Bahru Bakery" }],
          },
          {
            description: "The MacRitchie trail. Three to four hours, with monkeys.",
            places: [{ name: "MacRitchie Reservoir" }],
          },
          {
            description: "Lunch on Haji Lane, Arab Street or in Little India.",
            places: [{ name: "Haji Lane" }, { name: "Arab Street" }, { name: "Little India" }],
          },
          {
            description: "Gardens by the Bay.",
            places: [{ name: "Gardens by the Bay" }],
          },
          { description: "The Spectra light show. Free, fifteen minutes." },
          {
            time: "19:30",
            description: "Dinner at Spago, up in Marina Bay Sands.",
            places: [{ name: "Spago Singapore" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Henderson Waves",
        activities: [
          {
            description: "Walk the Henderson Waves.",
            places: [{ name: "Henderson Waves" }],
          },
          { description: "Breakfast somewhere around there." },
        ],
      },
    ],
  },
  {
    slug: "vietnam",
    title: "Seven Days in Vietnam",
    destination: "Vietnam",
    country: "Vietnam",
    coords: { lat: 21.0285, lon: 105.8542 },
    duration: "7 days",
    season: "January",
    summary:
      "Hanoi's Old Quarter, an overnight cruise on Ha Long Bay, then street food on the back of a motorbike in Saigon.",
    cover: vietnam,
    gated: false,
    teaser: "Book the cruise and the food tour ahead.",
    tags: ["#HaLongBay", "#OldQuarter", "#StreetFood"],
    highlights: ["Ha Long Bay", "Street food", "The Old Quarter", "Bun cha", "Coffee"],
    days: [
      {
        day: "Day One",
        title: "The Old Quarter",
        activities: [
          {
            description:
              "Coffee, then walk the Old Quarter, right in the middle of Hanoi. It's 36 streets that each used to belong to a single trade: haberdashery, hardware, porcelain.",
            places: [{ name: "Old Quarter", near: "Hanoi, Vietnam" }],
          },
          {
            description: "Hoan Kiem Lake and Train Street.",
            places: [
              { name: "Hoan Kiem Lake", near: "Hanoi, Vietnam" },
              { name: "Train Street", near: "Hanoi, Vietnam" },
            ],
          },
          {
            description: "Van Mieu, the 11th century Temple of Literature.",
            places: [{ name: "Van Mieu Temple of Literature", near: "Hanoi, Vietnam" }],
          },
          {
            description: "The Museum of Ethnology.",
            places: [{ name: "Vietnam Museum of Ethnology", near: "Hanoi, Vietnam" }],
          },
          {
            description:
              "Dinner at Bun Cha Huong Lien, where Anthony Bourdain and Obama shared pork noodles and fried spring rolls.",
            places: [{ name: "Bun Cha Huong Lien", near: "Hanoi, Vietnam" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Out to Ha Long Bay",
        activities: [
          {
            description: "Two hour minivan to Tuan Chau. Arrive thirty minutes before departure.",
            places: [{ name: "Tuan Chau", near: "Ha Long, Vietnam" }],
          },
          {
            time: "12:00",
            description:
              "The Ha Long Bay overnight cruise starts. There are thousands of islands out there, and it's one of the most famous stretches of water in Asia.",
            places: [{ name: "Ha Long Bay", near: "Vietnam" }],
          },
          {
            description: "Titop Island hike, swimming, kayaking, karaoke.",
            places: [{ name: "Titop Island", near: "Ha Long Bay, Vietnam" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "The Cruise, Then Back to Hanoi",
        activities: [
          { description: "Tai chi lesson on deck." },
          { description: "Explore the largest cave system in Vietnam." },
          { description: "Pass the Fighting Chicken rock, and hear its story." },
          { description: "Cooking class." },
          { time: "12:30", description: "Cruise ends." },
          {
            description:
              "There is no bus from Tuan Chau at a useful time, so take a fourteen minute taxi to Ha Long SB1 instead.",
          },
          { description: "Two hour minivan back to Hanoi, arriving around 19:00." },
        ],
      },
      {
        day: "Day Four",
        title: "Saigon From a Motorbike",
        activities: [
          {
            time: "18:00",
            description:
              "Motorbike street food tour until 22:00, picked up from the hotel. Ten tastings, no seafood.",
          },
        ],
      },
      {
        day: "Day Five",
        title: "The Post Office, and a Coffee Class",
        activities: [
          {
            description: "Seven minute walk to the Central Post Office.",
            places: [{ name: "Saigon Central Post Office", near: "Ho Chi Minh City, Vietnam" }],
          },
          {
            description:
              "Ten minutes further to the Café Apartments, an old apartment block where the owners rented their units out to cafes and shops.",
            places: [{ name: "Cafe Apartments", near: "Ho Chi Minh City, Vietnam" }],
          },
          {
            time: "13:30",
            description: "Coffee class on Nguyen Hue Boulevard, until 15:30.",
            places: [{ name: "Nguyen Hue Boulevard", near: "Ho Chi Minh City, Vietnam" }],
          },
        ],
      },
      {
        day: "Day Six",
        title: "War Remnants and Book Street",
        activities: [
          {
            description: "The War Remnants Museum.",
            places: [{ name: "War Remnants Museum", near: "Ho Chi Minh City, Vietnam" }],
          },
          {
            description: "Book Street.",
            places: [{ name: "Nguyen Van Binh Book Street", near: "Ho Chi Minh City, Vietnam" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Cu Chi Tunnels, Then Dinner in the Dark",
        activities: [
          {
            time: "07:30",
            description: "Cu Chi Tunnels and Mekong Delta full day tour, back at 18:30.",
            places: [
              { name: "Cu Chi Tunnels", near: "Ho Chi Minh City, Vietnam" },
              { name: "Mekong Delta", near: "Vietnam" },
            ],
          },
          {
            time: "19:00",
            description: "Dinner at NOIR, eaten in pitch black and led by visually impaired staff.",
            places: [{ name: "NOIR Dining in the Dark", near: "Ho Chi Minh City, Vietnam" }],
          },
        ],
      },
    ],
  },
  {
    slug: "cambodia",
    title: "Three Days in Cambodia",
    destination: "Cambodia",
    country: "Cambodia",
    coords: { lat: 13.3671, lon: 103.8448 },
    duration: "3 days",
    season: "January",
    summary:
      "Angkor Wat at sunrise, a pottery class, and a bike ride through the countryside from Siem Reap.",
    cover: cambodia,
    gated: false,
    teaser: "Book both tours well ahead.",
    tags: ["#AngkorWat", "#SiemReap", "#PubStreet"],
    highlights: ["Angkor Wat", "Pottery", "Cooking class", "Countryside by bike", "Pub Street"],
    days: [
      {
        day: "Day One",
        title: "Old Market and Pub Street",
        activities: [
          {
            description:
              "Walk King's Road, Old Market for dinner, and Pub Street for a drink after.",
            places: [
              { name: "King's Road Angkor", near: "Siem Reap, Cambodia" },
              { name: "Old Market", near: "Siem Reap, Cambodia" },
              { name: "Pub Street", near: "Siem Reap, Cambodia" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Angkor Wat at Sunrise, Then Pottery",
        activities: [
          {
            time: "04:30",
            description: "Picked up for the Angkor Wat small group tour and the sunrise hike.",
            places: [{ name: "Angkor Wat", near: "Siem Reap, Cambodia" }],
          },
          {
            description: "Walk to Wat Bo, near the pottery class.",
            places: [{ name: "Wat Bo", near: "Siem Reap, Cambodia" }],
          },
          {
            time: "16:00",
            description: "Pottery class at the Khmer Fine Art Center.",
            places: [{ name: "Khmer Fine Art Center", near: "Siem Reap, Cambodia" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Bikes, Then a Cooking Class",
        activities: [
          {
            time: "07:30",
            description:
              "Morning bike tour, picked up from the hotel and back by 12:30. A mushroom field, the countryside, and a rice wine distillery.",
          },
          {
            time: "17:00",
            description: "Picked up for a Khmer gourmet cooking class.",
          },
        ],
      },
    ],
  },
  {
    slug: "vienna",
    title: "Three Days in Vienna",
    destination: "Vienna",
    country: "Austria",
    coords: { lat: 48.2082, lon: 16.3738 },
    duration: "3 days",
    season: "Early Spring",
    summary:
      "Churches and the State Opera, a day trip to Salzburg, and the museums with the sausage stands taken seriously.",
    cover: vienna,
    gated: false,
    teaser: "",
    tags: ["#StateOpera", "#Salzburg", "#Wurstelstand"],
    notes: ["Bring cash. Most places are cash only."],
    highlights: ["The opera", "Salzburg", "Museums", "Sausage stands"],
    days: [
      {
        day: "Day One",
        title: "Churches, the Opera, and Bars",
        activities: [
          {
            description:
              "St Stephen's Cathedral, or St Peter's Church, or both. They are about ten minutes apart.",
            places: [{ name: "St Stephen's Cathedral" }, { name: "St Peter's Church" }],
          },
          {
            description: "Belvedere Palace, if there is time.",
            places: [{ name: "Belvedere Palace" }],
          },
          {
            time: "18:00",
            description:
              "Get tickets for the Vienna State Opera. They start at 16 euros, and there are two intervals, so you can leave whenever you like.",
            places: [{ name: "Vienna State Opera" }],
          },
          {
            time: "20:00",
            description: "Dinner at Glacis Beisl.",
            places: [{ name: "Glacis Beisl" }],
          },
          {
            time: "22:00",
            description: "Walk around the bars.",
            places: [
              { name: "Blue Mustard" },
              { name: "Leo Hillinger", note: "Wine shop and bar." },
              { name: "Jamie's Italian" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Salzburg",
        activities: [
          {
            description: "Day trip to Salzburg.",
            places: [{ name: "Salzburg", near: "Austria" }],
          },
          { description: "Walk through the town." },
          {
            description: "Take the cable car up to the castle.",
            places: [{ name: "Hohensalzburg Fortress", near: "Salzburg, Austria" }],
          },
          { description: "Grab a beer in a precious alley." },
          {
            description: "Go to Mozart's Birthplace.",
            places: [{ name: "Mozart's Birthplace", near: "Salzburg, Austria" }],
          },
          {
            description: "Out at one of the clubs afterwards.",
            places: [
              { name: "Volksgarten", note: "21+, and the best music ever." },
              { name: "Prater Dome" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Museums, the Naschmarkt, and a Sausage",
        activities: [
          { description: "Sleep in." },
          {
            description: "Stop at the Austrian National Library on the way to breakfast.",
            places: [{ name: "Austrian National Library" }],
          },
          {
            description: "Walk the grounds of the Hofburg Palace.",
            places: [{ name: "Hofburg Palace" }],
          },
          { description: "Brunch at Erich.", places: [{ name: "Erich" }] },
          {
            description: "Kunsthistorisches Museum Wien. One to three hours.",
            places: [{ name: "Kunsthistorisches Museum Wien" }],
          },
          {
            description: "Walk through the Naschmarkt, a cute open market.",
            places: [{ name: "Naschmarkt" }],
          },
          {
            description:
              "The Sigmund Freud Museum, which says it takes 45 minutes to an hour. Honestly, skip it: it does not describe his psychology at all, only his upbringing.",
            places: [{ name: "Sigmund Freud Museum" }],
          },
          {
            description:
              "Walk, and build up an appetite, to Leo's Würstelstand, the oldest sausage stand in Vienna.",
            places: [{ name: "Leo's Würstelstand" }],
          },
          { description: "Take a nap." },
          { time: "20:00", description: "Dinner at Mochi.", places: [{ name: "Mochi" }] },
          { description: "Go out again, if you dare." },
        ],
      },
    ],
    extras: [
      {
        title: "Bars",
        places: [
          { name: "Travel Shack", note: "You are going to die at this place, it's awesome." },
        ],
      },
      {
        title: "Eat",
        note: "Eat at every hot dog and kebab stand. They are so good.",
        places: [
          {
            // Lexie's own pin, so the link is the exact coordinates rather
            // than a search that could land on a different stand.
            name: "The kebab stand at Schwedenplatz",
            url: "https://www.google.com/maps/search/?api=1&query=48.21179,16.37670",
            note: "The best one. It literally changed my life. I ate it three times.",
          },
        ],
      },
      {
        title: "Museums",
        places: [{ name: "Albertina" }, { name: "Leopold Museum" }],
      },
    ],
  },
  {
    slug: "ireland",
    title: "Eight Days in Ireland",
    destination: "Ireland",
    country: "Ireland",
    coords: { lat: 53.3498, lon: -6.2603 },
    duration: "8 days",
    season: "March",
    summary:
      "Dublin for St Patrick's Day, then west to Galway for the Cliffs of Moher and south to Cork.",
    cover: ireland,
    gated: false,
    teaser: "All of it by train.",
    tags: ["#StPatricks", "#CliffsOfMoher", "#Blarney"],
    notes: [
      "The Dublin days are timed for St Patrick's Day. Everything else here works any time of year.",
    ],
    highlights: ["St Patrick's Day", "Guinness", "Cliffs of Moher", "Blarney Castle", "Cork"],
    days: [
      {
        day: "Day One",
        title: "The Guinness Storehouse",
        activities: [
          {
            time: "13:00",
            description:
              "Guinness Storehouse tour, until 15:00. The tour ends at the Gravity Bar on the top floor, which is where the views are, so do not rush the last part.",
            places: [{ name: "Guinness Storehouse", near: "Dublin, Ireland" }],
          },
          {
            description: "Anne's Lane, and the Arisu photo booth.",
            places: [{ name: "Anne's Lane", near: "Dublin, Ireland" }],
          },
          {
            time: "19:30",
            description: "Dinner at Krewe North.",
            places: [{ name: "Krewe North", near: "Dublin, Ireland" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "St Patrick's Day",
        activities: [
          {
            description: "Pastries at Bread41.",
            places: [{ name: "Bread41", near: "Dublin, Ireland" }],
          },
          {
            description: "Temple Bar and the Ha'penny Bridge.",
            places: [
              { name: "Temple Bar", near: "Dublin, Ireland" },
              { name: "Ha'penny Bridge", near: "Dublin, Ireland" },
            ],
          },
          { description: "St Patrick's Day festivities." },
          {
            description:
              "Walk into Leo Burdock's for the famous fish and chips. Open since 1913, and the portions are enormous, so one order between two is not unreasonable.",
            places: [{ name: "Leo Burdock", near: "Dublin, Ireland" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Dublin to Galway",
        activities: [
          {
            description: "Brunch at Spread Cafe.",
            places: [{ name: "Spread Cafe", near: "Dublin, Ireland" }],
          },
          {
            description: "Dubh Linn Gardens.",
            places: [{ name: "Dubh Linn Gardens", near: "Dublin, Ireland" }],
          },
          { time: "16:35", description: "Train to Galway." },
        ],
      },
      {
        day: "Day Four",
        title: "Galway",
        activities: [
          {
            description: "Coffee at Coffeewerk + Press.",
            places: [{ name: "Coffeewerk + Press", near: "Galway, Ireland" }],
          },
          {
            description: "Walk Quay Street and the Latin Quarter, and watch the street performers.",
            places: [
              { name: "Quay Street", near: "Galway, Ireland" },
              { name: "Latin Quarter", near: "Galway, Ireland" },
            ],
          },
          {
            description: "Acai bowls at Tribe Coffee.",
            places: [{ name: "Tribe Coffee", near: "Galway, Ireland" }],
          },
          {
            time: "18:00",
            description: "Dinner at Ruibin, then Murphy's ice cream for dessert.",
            places: [
              { name: "Ruibin", near: "Galway, Ireland" },
              { name: "Murphy's Ice Cream", near: "Galway, Ireland" },
            ],
          },
        ],
      },
      {
        day: "Day Five",
        title: "The Cliffs of Moher, Then Cork",
        activities: [
          {
            time: "09:15",
            description:
              "Picked up for the full day Cliffs of Moher tour, back in Galway at 17:30.",
            places: [{ name: "Cliffs of Moher", near: "County Clare, Ireland" }],
          },
          {
            time: "18:05",
            description: "Train to Cork. It is a tight turnaround, so be careful.",
          },
        ],
      },
      {
        day: "Day Six",
        title: "Blarney Castle",
        activities: [
          {
            description:
              "Blarney Castle, about a 31 minute bus from Cork city centre. Give it two to three hours to explore and kiss the stone.",
            places: [{ name: "Blarney Castle", near: "Cork, Ireland" }],
          },
          {
            description: "Walk through the English Market.",
            places: [{ name: "English Market", near: "Cork, Ireland" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "St Anne's Church",
        activities: [
          {
            description: "Climb St Anne's Church for the panoramic views.",
            places: [{ name: "St Anne's Church Shandon", near: "Cork, Ireland" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Getting around",
        items: [
          "The Leap Visitor Card is the one to buy: unlimited buses, trams and local trains for a set number of days, so you stop counting fares and just get on things.",
        ],
      },
      {
        title: "Dublin, beyond these three days",
        note: "None of this made it into the itinerary above, and all of it is walkable from the centre.",
        places: [
          {
            name: "Trinity College Dublin",
            near: "Dublin, Ireland",
            note: "The old library and the Book of Kells, plus a cobbled campus you can walk through for free if you do not want to queue for the book.",
          },
          {
            name: "Dublin Castle",
            near: "Dublin, Ireland",
            note: "State rooms and the medieval undercroft. The Dubh Linn Gardens on day three are round the back of it, so pair the two.",
          },
          {
            name: "Christ Church Cathedral",
            near: "Dublin, Ireland",
            note: "The older of the two cathedrals, with a crypt underneath that is the largest in Ireland.",
          },
          {
            name: "St Patrick's Cathedral",
            near: "Dublin, Ireland",
            note: "The bigger one, ten minutes' walk from Christ Church. Worth doing both only if you like cathedrals; otherwise pick one.",
          },
          {
            name: "St Stephen's Green",
            near: "Dublin, Ireland",
            note: "The park at the bottom of Grafton Street. Where to sit down when you have walked too far.",
          },
          {
            name: "Kilmainham Gaol",
            near: "Dublin, Ireland",
            note: "The prison where the 1916 leaders were executed. Guided tour only and it sells out, so book ahead, don't just turn up.",
          },
        ],
      },
      {
        title: "Streets to walk",
        places: [
          {
            name: "Grafton Street",
            near: "Dublin, Ireland",
            note: "The pedestrian shopping street, and where the buskers are. Duck into Anne's Lane off it for the umbrella ceiling.",
          },
          {
            name: "George's Street Arcade",
            near: "Dublin, Ireland",
            note: "A Victorian covered market: vintage, records, jewellery and a few food stalls, indoors when it rains.",
          },
          {
            name: "Pearse Street",
            near: "Dublin, Ireland",
            note: "Runs east from Trinity College down towards the docklands.",
          },
          {
            name: "Sheriff Street",
            near: "Dublin, Ireland",
            note: "North of the Liffey behind the docks, well off the tourist route.",
          },
        ],
      },
      {
        title: "Museums",
        places: [
          {
            name: "The Little Museum of Dublin",
            near: "Dublin, Ireland",
            note: "Twentieth-century Dublin in a Georgian townhouse on St Stephen's Green, told by a guide rather than by labels. Small and quick.",
          },
          {
            name: "EPIC The Irish Emigration Museum",
            near: "Dublin, Ireland",
            note: "The story of who left Ireland and where they ended up. Fully interactive, no artefacts, and better than that description makes it sound.",
          },
        ],
      },
      {
        title: "Live music and shows",
        note: "Temple Bar is the obvious one and it is on day two. These are the rest.",
        places: [
          {
            name: "Bad Bobs",
            near: "Temple Bar, Dublin, Ireland",
            note: "Live bands most nights over several floors. More of a night out than a sit-down listen.",
          },
          {
            name: "Celtic Nights",
            near: "Dublin, Ireland",
            note: "Dinner plus a full Irish music and dance show. The easy way to see step dancing if you want it all in one booking.",
          },
          {
            name: "The Sound House",
            near: "Dublin, Ireland",
            note: "Their secret sessions put on an artist you only find out about when you turn up. Good if you like not knowing who you're going to see.",
          },
        ],
      },
      {
        title: "Eat and drink",
        note: "Bread41 and Leo Burdock are already in the itinerary. These are the ones that are not.",
        items: [
          "A spice bag, from a Chinese takeaway rather than a restaurant. Chips, shredded chicken and spice mix tipped into a bag together. It is the Dublin thing to eat at the end of a night and it is not optional.",
        ],
        places: [
          {
            name: "L Mulligan Grocer",
            near: "Stoneybatter, Dublin, Ireland",
            note: "An upscale pub that does a proper dinner, not pub food. Go here when you want one real meal.",
          },
          {
            name: "Brother Hubbard",
            near: "Dublin, Ireland",
            note: "Middle Eastern and Mediterranean brunch, for when you can't face another full Irish.",
          },
          {
            name: "Bunsen",
            near: "Dublin, Ireland",
            note: "A small chain doing burgers and nothing else. The menu fits on a business card. Reliable and fast.",
          },
          {
            name: "The Oar House",
            near: "Howth, Dublin, Ireland",
            note: "Seafood by the harbour, for lunch. A reason to take the DART out to Howth for the afternoon.",
          },
          {
            name: "Daddy's",
            near: "Dublin, Ireland",
            note: "A cafe near the Irish Museum of Modern Art, so pair it with a walk round the museum and the grounds at Kilmainham.",
          },
        ],
      },
      {
        title: "Something different",
        places: [
          {
            name: "Eyemazy",
            near: "Dublin, Ireland",
            note: "Macro photography of your own iris, printed. Takes about half an hour and you walk out with the print.",
          },
        ],
      },
      {
        title: "Day trip: Glendalough",
        places: [
          {
            name: "Glendalough",
            near: "County Wicklow, Ireland",
            note: "A monastic settlement with a round tower in a glacial valley about an hour south of Dublin, with marked hikes from the car park ranging from a flat lakeside walk to a four-hour climb.",
          },
        ],
      },
      {
        title: "On the drive",
        places: [
          {
            name: "The Good House",
            near: "Ireland",
            note: "Over on the west coast near the cliffs, not in Dublin. A good stop to break up the drive.",
          },
        ],
      },
    ],
  },
  {
    slug: "maine",
    title: "Five Days in Maine",
    destination: "Maine",
    country: "United States",
    coords: { lat: 44.3386, lon: -68.2733 },
    duration: "5 days",
    season: "Summer",
    summary:
      "Acadia at its hardest: sunrise on Cadillac Mountain, the Beehive before breakfast, and a lot of lobster.",
    cover: maine,
    gated: false,
    teaser: "Driven up from New York.",
    tags: ["#Acadia", "#CadillacMountain", "#Lobster"],
    notes: [
      "Cadillac Mountain sunrise tickets are released well in advance and go fast. Set an alarm for the morning they drop.",
    ],
    highlights: ["Acadia", "Sunrise", "Hiking", "Lobster", "Portland"],
    days: [
      {
        day: "Day One",
        title: "Drive to Portsmouth",
        activities: [
          { time: "16:00", description: "Start the drive up." },
          {
            time: "21:00",
            description: "Arrive in Portsmouth.",
            places: [{ name: "Portsmouth", near: "New Hampshire" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Portland, Then Into Acadia",
        activities: [
          {
            time: "08:00",
            description: "Pastries at Greenery.",
            places: [{ name: "Greenery Cafe", near: "Portsmouth, New Hampshire" }],
          },
          { time: "09:00", description: "Leave for Acadia." },
          { time: "10:00", description: "Cadillac Mountain tickets are released." },
          {
            time: "11:00",
            description:
              "Arrive in Portland and eat your way along Commercial Street and Old Port.",
            places: [
              { name: "Portland", near: "Maine" },
              { name: "Luke's Lobster", near: "Portland, Maine" },
              { name: "Good Mood Matcha", near: "Portland, Maine" },
              { name: "Saltyard", near: "Portland, Maine" },
              { name: "Post Supply", near: "Portland, Maine" },
              { name: "Blanche + Mimi", near: "Portland, Maine" },
              { name: "Holy Donut", near: "Portland, Maine" },
              { name: "Tandem Bakery", near: "Portland, Maine" },
              { name: "Local Press", near: "Portland, Maine" },
              { name: "Indy's", near: "Portland, Maine" },
              { name: "Duckfat", near: "Portland, Maine" },
            ],
          },
          {
            time: "16:00",
            description: "Thunder Hole and Otter Cliffs.",
            places: [
              { name: "Thunder Hole", near: "Acadia National Park, Maine" },
              { name: "Otter Cliffs", near: "Acadia National Park, Maine" },
            ],
          },
          {
            description:
              "Base yourself in Trenton rather than in Bar Harbor. It is on the mainland just before the bridge onto Mount Desert Island, so everything in the park is a short drive and you are not paying Bar Harbor prices to sleep.",
            places: [{ name: "Trenton", near: "Maine" }],
          },
          {
            description: "Dinner at Peekytoe Provisions in Bar Harbor.",
            places: [{ name: "Peekytoe Provisions", near: "Bar Harbor, Maine" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Jordan Pond and the Bubbles",
        activities: [
          { time: "09:00", description: "Wake up. A late one, by the standards of this trip." },
          {
            time: "10:00",
            description: "Brunch at Jordan Pond House.",
            places: [{ name: "Jordan Pond House", near: "Acadia National Park, Maine" }],
          },
          {
            time: "11:00",
            description: "Jordan Pond Path.",
            places: [{ name: "Jordan Pond Path", near: "Acadia National Park, Maine" }],
          },
          {
            time: "13:00",
            description: "North Bubble, South Bubble, or both.",
            places: [{ name: "The Bubbles", near: "Acadia National Park, Maine" }],
          },
          {
            description: "Rent bikes and ride the Eagle Lake trail, if you fancy it.",
            places: [{ name: "Eagle Lake", near: "Acadia National Park, Maine" }],
          },
          {
            time: "17:00",
            description: "Drinks at Ivy Manor Inn.",
            places: [{ name: "Ivy Manor Inn", near: "Bar Harbor, Maine" }],
          },
          {
            time: "19:00",
            description: "Dinner at Side Street, with blueberry pie for dessert.",
            places: [{ name: "Side Street Cafe", near: "Bar Harbor, Maine" }],
          },
          { time: "20:30", description: "Early night. Tomorrow starts at 03:00." },
        ],
      },
      {
        day: "Day Four",
        title: "Sunrise on Cadillac, Then Everything Else",
        activities: [
          { time: "03:00", description: "Wake up." },
          {
            time: "03:20",
            description:
              "Leave for the mountain. The drive up takes most of the hour, which is why the alarm is that early.",
          },
          {
            time: "04:15",
            description: "Sunrise at Cadillac Mountain.",
            places: [{ name: "Cadillac Mountain", near: "Acadia National Park, Maine" }],
          },
          {
            time: "05:30",
            description:
              "The Beehive Trail. You can add the Gorham Mountain loop and push everything back a few hours.",
            places: [{ name: "Beehive Trail", near: "Acadia National Park, Maine" }],
          },
          {
            time: "08:00",
            description:
              "The land bridge over to Bar Island. Make sure you have twenty minutes of low tide.",
            places: [{ name: "Bar Island", near: "Bar Harbor, Maine" }],
          },
          {
            time: "09:30",
            description: "Breakfast at Cafe This Way.",
            places: [{ name: "Cafe This Way", near: "Bar Harbor, Maine" }],
          },
          {
            time: "10:30",
            description: "Explore downtown Bar Harbor.",
            places: [{ name: "Bar Harbor", near: "Maine" }],
          },
          {
            time: "12:00",
            description: "Lounge at Sand Beach.",
            places: [{ name: "Sand Beach", near: "Acadia National Park, Maine" }],
          },
          { time: "15:00", description: "Nap." },
          {
            description: "Dinner at Route 66 in Bar Harbor.",
            places: [{ name: "Route 66 Restaurant", near: "Bar Harbor, Maine" }],
          },
          {
            description: "Drinks at Atlantic Brewing Company, blueberry ale and soda. Or Geddy's.",
            places: [
              { name: "Atlantic Brewing Company", near: "Bar Harbor, Maine" },
              { name: "Geddy's", near: "Bar Harbor, Maine" },
            ],
          },
          { description: "Walk through town for ice cream or a drink at sunset." },
        ],
      },
      {
        day: "Day Five",
        title: "One Last Trail",
        activities: [
          {
            time: "07:00",
            description: "Witch Hole Path, three miles.",
            places: [{ name: "Witch Hole Pond", near: "Acadia National Park, Maine" }],
          },
          {
            time: "11:00",
            description: "Perkins Cove, and lunch at Footbridge.",
            places: [
              { name: "Perkins Cove", near: "Ogunquit, Maine" },
              { name: "Footbridge Lobster", near: "Ogunquit, Maine" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mallorca",
    title: "Seven Days in Mallorca and Ibiza",
    destination: "Mallorca",
    country: "Spain",
    coords: { lat: 39.6953, lon: 3.0176 },
    duration: "7 days",
    season: "Summer",
    summary:
      "Pollença as a base, a market day in Palma, a boat day in the south, then over to Ibiza for the clubs.",
    cover: mallorca,
    gated: false,
    teaser: "The Ibiza half is deliberately not scheduled.",
    tags: ["#Pollenca", "#BoatDay", "#Ibiza"],
    notes: [
      "The Ibiza nights depend entirely on who is playing that week, so this lists the clubs rather than a schedule. Check the line-ups before you book anything.",
    ],
    highlights: ["Pollença", "Boat day", "Markets", "Sóller and Deià", "Ibiza clubs"],
    days: [
      {
        day: "Day One",
        title: "Into Pollença",
        activities: [
          {
            time: "14:00",
            description: "Base yourself in Pollença.",
            places: [{ name: "Pollença" }],
          },
          {
            description: "Explore, and shop for groceries. Lidl is a ten minute walk.",
          },
          {
            description:
              "Plaça Major in the old town, about 25 minutes on foot or five by car, then the Calvari steps.",
            places: [
              { name: "Plaça Major", near: "Pollença, Mallorca" },
              { name: "Calvari Steps", near: "Pollença, Mallorca" },
            ],
          },
          {
            time: "21:00",
            description: "Dinner at La Font de Gall.",
            places: [{ name: "La Font del Gall", near: "Pollença, Mallorca" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Santa Maria Market, Then Palma",
        activities: [
          { description: "An early hike near the villa, if anyone is up for it." },
          {
            time: "12:00",
            description:
              "Drive to the Santa Maria market for ensaimadas, cheese and produce. It ends at 14:00.",
            places: [{ name: "Santa Maria del Camí", near: "Mallorca" }],
          },
          {
            description: "Drive to Palma for the rest of the day.",
            places: [{ name: "Palma", near: "Mallorca" }],
          },
          {
            time: "21:00",
            description: "Dinner at Sumailla.",
            places: [{ name: "Sumailla", near: "Palma, Mallorca" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Boat Day",
        activities: [
          { description: "Boat day in the south. Arrange cars in advance." },
          { description: "Beaches in the south afterwards." },
          { description: "Grill and cook dinner back at the house." },
        ],
      },
      {
        day: "Day Four",
        title: "Up North",
        activities: [
          {
            description: "Sóller, Deià and Valldemossa.",
            places: [
              { name: "Sóller", near: "Mallorca" },
              { name: "Deià", near: "Mallorca" },
              { name: "Valldemossa", near: "Mallorca" },
            ],
          },
          {
            description: "Dinner in Port de Pollença or somewhere else up north.",
            places: [{ name: "Port de Pollença", near: "Mallorca" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Market Morning, Then Ibiza",
        activities: [
          {
            description: "The Port de Pollença market, 09:00 to 13:00.",
            places: [{ name: "Port de Pollença Market", near: "Mallorca" }],
          },
          { description: "Out to whichever club has the better line-up." },
        ],
      },
      {
        day: "Day Six",
        title: "Ibiza",
        activities: [{ description: "Whatever is on. See the clubs below." }],
      },
    ],
    extras: [
      {
        title: "Ibiza clubs",
        note: "Which night you go where depends on the line-up, so these are just the clubs, not a plan.",
        places: [
          { name: "Hï Ibiza" },
          { name: "Pacha Ibiza" },
          { name: "Ushuaïa Ibiza" },
          { name: "UNVRS Ibiza" },
        ],
      },
      {
        title: "Around Pollença",
        note: "Wine is a big deal in Mallorca, so look for a tour and tasting. Pa amb oli is the local thing to eat: toast with tomato, cheese and toppings.",
        places: [
          {
            name: "La Trobada",
            near: "Pollença, Mallorca",
            note: "Very authentic Mallorcan food.",
          },
          {
            name: "Bar Gorreta",
            near: "Pollença, Mallorca",
            note: "Casual, cheap, drinks come with tapas.",
          },
          {
            name: "Cal Patró",
            near: "Cala Sant Vicenç, Mallorca",
            note: "Family seafood place north of Pollença, highly recommended.",
          },
          {
            name: "La Fonda",
            near: "Pollença, Mallorca",
            note: "Really good lamb, another local speciality. Book ahead.",
          },
          { name: "Ca'n Moixet", near: "Pollença, Mallorca", note: "More good tapas and pintxos." },
        ],
      },
      {
        title: "Around Palma",
        places: [
          { name: "Tast", near: "Palma, Mallorca", note: "Great tapas and pintxos." },
          { name: "Passeig del Born", near: "Palma, Mallorca", note: "Cute pedestrian street." },
          { name: "Santa Catalina", near: "Palma, Mallorca", note: "Another area, lots of cafes." },
        ],
      },
      {
        title: "Also in Pollença",
        items: [
          "There is an easy 2km hike in Pollença with a local restaurant at the top. Call ahead to check it is open.",
        ],
      },
    ],
  },
  {
    slug: "berkshires",
    title: "Three Days in the Berkshires",
    destination: "Berkshires",
    country: "United States",
    coords: { lat: 42.3601, lon: -73.2854 },
    duration: "3 days",
    season: "Spring",
    summary:
      "A slow weekend out of New York: a spa afternoon, a lot of cafes, and hikes if you want them.",
    cover: berkshires,
    gated: false,
    teaser: "",
    tags: ["#Lenox", "#Spa", "#Hikes"],
    highlights: ["Lenox", "Spa", "Farmers market", "Hikes"],
    days: [
      {
        day: "Day One",
        title: "Spa and Dinner",
        activities: [
          {
            time: "11:45",
            description: "Brunch at Haven Cafe in Lenox, until 12:45.",
            places: [{ name: "Haven Cafe", near: "Lenox, Massachusetts" }],
          },
          {
            description: "Stay at Seven Hills Inn, five minutes away.",
            places: [{ name: "Seven Hills Inn", near: "Lenox, Massachusetts" }],
          },
          {
            time: "13:15",
            description: "Spa appointment at Seven Salon Spa, until 14:20.",
            places: [{ name: "Seven Salon Spa", near: "Lenox, Massachusetts" }],
          },
          {
            time: "18:30",
            description: "Dinner at Frankie's Ristorante, five minutes from the hotel.",
            places: [{ name: "Frankie's Ristorante", near: "Lenox, Massachusetts" }],
          },
          {
            time: "20:00",
            description: "Berkshire Grown winter farmers market, until 22:00.",
          },
        ],
      },
      {
        day: "Day Two",
        title: "Cafes, and Not Much Else",
        activities: [
          {
            description:
              "Continental breakfast at the inn, or the Starving Artist Cafe and Creperie five minutes away.",
            places: [{ name: "Starving Artist Cafe and Creperie", near: "Lee, Massachusetts" }],
          },
          {
            description: "Lunch at Main Street Cafe, seven minutes away.",
            places: [{ name: "Main Street Cafe", near: "Lenox, Massachusetts" }],
          },
          {
            time: "18:30",
            description:
              "Dinner at Pizzeria Boema, four minutes away, or Truc's Orient Express, fifteen.",
            places: [
              { name: "Pizzeria Boema", near: "Lenox, Massachusetts" },
              { name: "Truc Orient Express", near: "West Stockbridge, Massachusetts" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One More Coffee",
        activities: [
          {
            description: "Continental breakfast, or Electra's Cafe eight minutes away.",
            places: [{ name: "Electra's Cafe", near: "Pittsfield, Massachusetts" }],
          },
          {
            description: "Lunch at Shots Cafe, five minutes away.",
            places: [{ name: "Shots Cafe", near: "Lenox, Massachusetts" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Hikes and outdoors",
        places: [
          { name: "Monument Mountain", near: "Great Barrington, Massachusetts" },
          { name: "Mount Greylock", near: "Massachusetts" },
          { name: "Bash Bish Falls State Park", near: "Massachusetts" },
          { name: "Pleasant Valley Wildlife Sanctuary", near: "Lenox, Massachusetts" },
          { name: "Natural Bridge State Park", near: "North Adams, Massachusetts" },
          {
            name: "Onota Lake",
            near: "Pittsfield, Massachusetts",
            note: "Kayak rentals, about twenty minutes away.",
          },
        ],
      },
      {
        title: "Worth knowing",
        items: [
          "The inn does free bike rentals.",
          "The Berkshires visitor site keeps a directory of the local wineries and breweries.",
        ],
      },
    ],
  },
  {
    slug: "milan",
    title: "Three Days in Milan and Venice",
    destination: "Milan",
    country: "Italy",
    coords: { lat: 45.4642, lon: 9.19 },
    duration: "3 days",
    season: "Any",
    summary: "One day of Milan on foot, then two in Venice doing the famous things back to back.",
    cover: milan,
    gated: false,
    teaser: "",
    tags: ["#Duomo", "#Venice", "#Navigli"],
    highlights: ["The Duomo", "Navigli", "Shopping", "Venice"],
    days: [
      {
        day: "Day One",
        title: "Milan on Foot",
        activities: [
          {
            description: "Lunch at Spontini, right next to the Duomo.",
            places: [{ name: "Spontini", near: "Milan, Italy" }],
          },
          {
            time: "13:30",
            description: "The Duomo, until 15:00.",
            places: [{ name: "Duomo di Milano" }],
          },
          {
            time: "15:00",
            description:
              "Shop until 20:00. Walk the Galleria Vittorio Emanuele first and turn three times on your heel on the bull's mosaic.",
            places: [{ name: "Galleria Vittorio Emanuele II", near: "Milan, Italy" }],
          },
          {
            description:
              "Past La Scala, then along Via Dante with Castello Sforzesco at the end of it, and shop the Quadrilatero d'Oro.",
            places: [
              { name: "La Scala", near: "Milan, Italy" },
              { name: "Via Dante", near: "Milan, Italy" },
              { name: "Castello Sforzesco", near: "Milan, Italy" },
              { name: "Quadrilatero della Moda", near: "Milan, Italy" },
            ],
          },
          {
            time: "20:00",
            description: "Dinner at Platina. Miscusi and Mani in Pasta are the other options.",
            places: [
              { name: "Platina", near: "Milan, Italy" },
              { name: "Miscusi", near: "Milan, Italy" },
              { name: "Mani in Pasta", near: "Milan, Italy" },
            ],
          },
          {
            description: "Out in Navigli and Colonne di San Lorenzo.",
            places: [
              { name: "Navigli", near: "Milan, Italy" },
              { name: "Colonne di San Lorenzo", near: "Milan, Italy" },
              { name: "Bar Rattazzo", near: "Milan, Italy" },
              { name: "La Bicicletta", near: "Milan, Italy" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Into Venice",
        activities: [
          {
            time: "16:15",
            description: "Six minute walk to the Ponte di Rialto, stopping at Gelatoteca Suso.",
            places: [
              { name: "Ponte di Rialto", near: "Venice, Italy" },
              { name: "Gelatoteca Suso", near: "Venice, Italy" },
            ],
          },
          {
            time: "16:35",
            description: "Seven minutes on to St Mark's Basilica. Go inside for ten minutes.",
            places: [{ name: "St Mark's Basilica", near: "Venice, Italy" }],
          },
          {
            time: "17:00",
            description: "Doge's Palace, until 18:30, then a minute's walk to the Bridge of Sighs.",
            places: [
              { name: "Doge's Palace", near: "Venice, Italy" },
              { name: "Bridge of Sighs", near: "Venice, Italy" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Venice, All of It",
        activities: [
          { time: "10:35", description: "St Mark's Basilica, until 11:45." },
          { time: "11:00", description: "Island cruise, until 15:30." },
          { time: "15:35", description: "Gondola ride, half an hour." },
          { time: "16:10", description: "Ponte di Rialto again." },
          { time: "16:35", description: "The Bridge of Sighs." },
          {
            time: "17:00",
            description: "Pasta to go from Dal Moro's.",
            places: [{ name: "Dal Moro's Fresh Pasta To Go", near: "Venice, Italy" }],
          },
        ],
      },
    ],
  },
  {
    slug: "edinburgh",
    title: "Three Days in Edinburgh and Glasgow",
    destination: "Edinburgh",
    country: "Scotland",
    coords: { lat: 55.9533, lon: -3.1883 },
    duration: "3 days",
    season: "Any",
    summary: "A night out in Glasgow, a day in the Highlands, and Edinburgh Castle.",
    cover: edinburgh,
    gated: false,
    teaser: "The bars below are almost all student bars, which is the point.",
    tags: ["#Glasgow", "#Glencoe", "#EdinburghCastle", "#StudentBars"],
    highlights: ["Edinburgh Castle", "The Highlands", "Glasgow", "Student bars"],
    days: [
      {
        day: "Day One",
        title: "Straight to Glasgow",
        activities: [
          { description: "Go over to Glasgow.", places: [{ name: "Glasgow" }] },
          {
            time: "19:30",
            description: "Dinner in Merchant City, at The Citizen.",
            places: [
              { name: "Merchant City", near: "Glasgow, Scotland" },
              { name: "The Citizen", near: "Glasgow, Scotland" },
            ],
          },
          { description: "Walk around, shop, drink. The Glasgow bars are listed below." },
        ],
      },
      {
        day: "Day Two",
        title: "A Full Day in the Highlands",
        activities: [
          { time: "08:00", description: "Highlands day tour from Edinburgh, until 20:00." },
          {
            description: "Past Loch Tulla on the edge of Rannoch Moor, with snow on the hills.",
            places: [{ name: "Loch Tulla", near: "Scotland" }],
          },
          {
            description: "Glencoe, and a stop under the Three Sisters.",
            places: [{ name: "Three Sisters", near: "Glencoe, Scotland" }],
          },
          {
            description:
              "Fort Augustus, at the bottom of Loch Ness, and the bridge over the River Oich.",
            places: [{ name: "Fort Augustus", near: "Loch Ness, Scotland" }],
          },
          { description: "Out afterwards. The Edinburgh bars are listed below." },
        ],
      },
      {
        day: "Day Three",
        title: "The Castle",
        activities: [
          {
            time: "11:00",
            description: "Edinburgh Castle.",
            places: [{ name: "Edinburgh Castle" }],
          },
          {
            description: "Lunch at I.J. Mellis Cheesemonger.",
            places: [{ name: "I.J. Mellis Cheesemonger", near: "Edinburgh, Scotland" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Glasgow bars",
        places: [
          { name: "Revolution Glasgow", note: "Popular student bar, party atmosphere." },
          {
            name: "Vodka Wodka",
            near: "Glasgow, Scotland",
            note: "One of the busiest student bars, next to the university, with a beer garden.",
          },
          {
            name: "Tingle Shooter Bar",
            near: "Glasgow, Scotland",
            note: "Pre-club student bar, specialises in cheap fancy shots.",
          },
          {
            name: "Firewater",
            near: "Glasgow, Scotland",
            note: "Busy student bar, indie rock, cheap cocktail pitchers.",
          },
          {
            name: "Bloc+",
            near: "Glasgow, Scotland",
            note: "Another student bar. Free entry before midnight.",
          },
        ],
      },
      {
        title: "Edinburgh bars",
        places: [
          {
            name: "McSorleys",
            near: "Edinburgh, Scotland",
            note: "Party atmosphere, popular with sports teams.",
          },
          {
            name: "Cabaret Voltaire",
            near: "Edinburgh, Scotland",
            note: "Cheap entry and cheap drinks, popular with students.",
          },
          {
            name: "The Mash House",
            near: "Edinburgh, Scotland",
            note: "Live music, three floors.",
          },
          {
            name: "The Hive",
            near: "Edinburgh, Scotland",
            note: "Ugly, cheap, student discounts.",
          },
          {
            name: "Big Cheese",
            near: "Edinburgh, Scotland",
            note: "The biggest student club night, and the music is pure cheese.",
          },
        ],
      },
    ],
  },
  {
    slug: "brussels",
    title: "Three Days in Brussels",
    destination: "Brussels",
    country: "Belgium",
    coords: { lat: 50.8503, lon: 4.3517 },
    duration: "3 days",
    season: "Any",
    summary: "A walking tour, a chocolate tasting, and a full day out in Ghent and Bruges.",
    cover: brussels,
    gated: false,
    teaser: "",
    tags: ["#GrandPlace", "#Bruges", "#Waffles"],
    highlights: ["Grand Place", "Chocolate", "Waffles", "Bruges", "Ghent"],
    days: [
      {
        day: "Day One",
        title: "The Grand Place and Chocolate",
        activities: [
          {
            time: "11:00",
            description:
              "Two hour walking tour, meeting at the orange umbrella in the Grand Place.",
            places: [{ name: "Grand Place", near: "Brussels, Belgium" }],
          },
          {
            time: "13:15",
            description: "Tonton Garby, until 14:15.",
            places: [{ name: "Tonton Garby", near: "Brussels, Belgium" }],
          },
          { time: "14:30", description: "Chocolate tasting, until 16:30." },
          { description: "Hang about, walk, nap." },
          {
            time: "19:00",
            description: "Dinner at Publico.",
            places: [{ name: "Publico", near: "Brussels, Belgium" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Ghent and Bruges",
        activities: [
          {
            time: "09:00",
            description: "Ghent and Bruges day tour, until 19:30.",
            places: [
              { name: "Ghent", near: "Belgium" },
              { name: "Bruges", near: "Belgium" },
            ],
          },
          {
            description: "Waffles in Bruges, at Chez Albert.",
            places: [{ name: "Chez Albert", near: "Bruges, Belgium" }],
          },
          {
            time: "20:00",
            description: "Dinner at Grimbergen Cafe, or Gazette Pasta.",
            places: [
              { name: "Grimbergen Cafe", near: "Brussels, Belgium" },
              { name: "Gazette Pasta", near: "Brussels, Belgium" },
            ],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Bars in the centre",
        note: "There is a lot of nightlife right by the centre, but if you need names:",
        places: [
          { name: "Celtica", near: "Brussels, Belgium" },
          { name: "Delirium Cafe", near: "Brussels, Belgium" },
          { name: "Madame Moustache", near: "Brussels, Belgium" },
        ],
      },
    ],
  },
  {
    slug: "switzerland",
    title: "Zurich and Interlaken",
    destination: "Switzerland",
    country: "Switzerland",
    coords: { lat: 47.3769, lon: 8.5417 },
    duration: "3 days",
    season: "Any",
    summary: "Interlaken, and one very full day in Zurich.",
    cover: switzerland,
    gated: false,
    teaser: "",
    tags: ["#Interlaken", "#Uetliberg", "#Fondue"],
    notes: [
      "Sunday counts as a public holiday in Zurich and a lot of the shops close. The Zurich day below is built around that.",
      "The middle day in Interlaken was never written down, so this is mostly the day in Zurich.",
    ],
    highlights: ["Interlaken", "Zurich", "Lake Zurich", "Chocolate", "Fondue"],
    days: [
      {
        day: "Day One",
        title: "Into Interlaken",
        activities: [
          {
            time: "11:22",
            description: "Train from Zurich to Interlaken.",
            places: [{ name: "Interlaken" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Interlaken",
        activities: [{ description: "Not recorded. Whatever Interlaken gives you." }],
      },
      {
        day: "Day Three",
        title: "Zurich in a Day",
        activities: [
          { time: "07:19", description: "Train back to Zurich." },
          {
            time: "09:45",
            description: "Brunch at Bubbles, until 10:45.",
            places: [{ name: "Bubbles", near: "Zurich, Switzerland" }],
          },
          {
            time: "11:18",
            description: "Uetliberg, on tram line 13.",
            places: [{ name: "Uetliberg", near: "Zurich, Switzerland" }],
          },
          {
            time: "12:15",
            description:
              "Walk down Bahnhofstrasse until 13:45, stopping at Sprüngli for the best Swiss chocolate.",
            places: [
              { name: "Bahnhofstrasse", near: "Zurich, Switzerland" },
              { name: "Sprüngli", near: "Zurich, Switzerland" },
            ],
          },
          {
            time: "14:00",
            description: "Cruise on Lake Zurich from Bürkliplatz, until 15:25.",
            places: [{ name: "Bürkliplatz", near: "Zurich, Switzerland" }],
          },
          {
            time: "15:35",
            description: "Grossmünster.",
            places: [{ name: "Grossmünster", near: "Zurich, Switzerland" }],
          },
          {
            time: "16:00",
            description: "Walk the Old Town until 17:15.",
            places: [{ name: "Zurich Old Town" }],
          },
          {
            time: "17:30",
            description: "Fondue at Raclette Stube.",
            places: [{ name: "Raclette Stube", near: "Zurich, Switzerland" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "If the shops are shut",
        places: [
          {
            name: "Kunsthaus Zürich",
            note: "Art museum in the Old Town, and open when most things are not.",
          },
        ],
      },
    ],
  },
  {
    slug: "lisbon",
    title: "Three Days in Lisbon",
    destination: "Lisbon",
    country: "Portugal",
    coords: { lat: 38.7223, lon: -9.1393 },
    duration: "3 days",
    season: "Any",
    summary:
      "Alfama on foot, a day out to Sintra and Cabo da Roca, and the best chocolate cake in the city.",
    cover: lisbon,
    gated: false,
    teaser: "Wear comfortable shoes, seriously.",
    tags: ["#Alfama", "#Sintra", "#PasteisDeBelem"],
    notes: ["The Alfama walking tour is very hilly. Wear comfortable shoes."],
    highlights: ["Alfama", "Sintra", "Belém", "Views", "Time Out Market"],
    days: [
      {
        day: "Day One",
        title: "Alfama on Foot",
        activities: [
          { description: "Pick up the unlimited travel card." },
          {
            time: "12:00",
            description: "Brunch at Nicolau, in Baixa.",
            places: [{ name: "Nicolau Lisboa", near: "Lisbon, Portugal" }],
          },
          {
            time: "13:30",
            description:
              "Saint George's Castle. Best views of the city, and an hour to an hour and a half is enough.",
            places: [{ name: "São Jorge Castle", near: "Lisbon, Portugal" }],
          },
          {
            time: "14:50",
            description:
              "Free 90 minute walking tour of Alfama, meeting at the castle and ending near the Fado Museum. Tip about 12 euros.",
            places: [
              { name: "Alfama", near: "Lisbon, Portugal" },
              { name: "Museu do Fado", near: "Lisbon, Portugal" },
            ],
          },
          {
            time: "16:30",
            description: "Landeau, for the best chocolate cake. Open 11:00 to 23:00.",
            places: [{ name: "Landeau Chocolate", near: "Lisbon, Portugal" }],
          },
          {
            description: "Dinner at Tapa Bucho in Bairro Alto, then out in Bairro Alto.",
            places: [
              { name: "Tapa Bucho", near: "Lisbon, Portugal" },
              { name: "Bairro Alto", near: "Lisbon, Portugal" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Sintra, Cabo da Roca, Belém",
        activities: [
          { time: "08:00", description: "Breakfast, then the hour-long train to Sintra." },
          {
            time: "09:45",
            description: "Arrive in Sintra, and take bus 434 up to Pena Palace, about 30 minutes.",
            places: [{ name: "Sintra", near: "Portugal" }],
          },
          {
            time: "11:30",
            description: "Pena Palace until 13:30. Just the palace is two hours.",
            places: [{ name: "Pena Palace", near: "Sintra, Portugal" }],
          },
          {
            time: "13:30",
            description:
              "Uber to Cabo da Roca, the westernmost point of Europe. Half an hour there.",
            places: [{ name: "Cabo da Roca", near: "Portugal" }],
          },
          {
            time: "15:30",
            description:
              "Jerónimos Monastery and Belém Tower, both closing at 17:00, and Pastéis de Belém, open until 23:00.",
            places: [
              { name: "Jerónimos Monastery", near: "Lisbon, Portugal" },
              { name: "Belém Tower", near: "Lisbon, Portugal" },
              { name: "Pastéis de Belém", near: "Lisbon, Portugal" },
            ],
          },
          {
            time: "19:00",
            description: "Dinner at the Time Out Market.",
            places: [{ name: "Time Out Market", near: "Lisbon, Portugal" }],
          },
          {
            description:
              "Red Frog speakeasy afterwards, about 25 minutes' walk. More of a get-a-drink-and-chill place than a night out.",
            places: [{ name: "Red Frog Speakeasy", near: "Lisbon, Portugal" }],
          },
        ],
      },
    ],
  },
  {
    slug: "quito",
    title: "A Day in Quito",
    destination: "Quito",
    country: "Ecuador",
    coords: { lat: -0.1807, lon: -78.4678 },
    duration: "1 day",
    season: "March",
    summary:
      "One day at altitude before the Galápagos: the equator, the cable car and the old town.",
    cover: quito,
    gated: false,
    teaser: "",
    tags: ["#MitadDelMundo", "#Teleferico", "#OldTown"],
    notes: [
      "Go to the TelefériQo first thing in the morning. Quito is known for afternoon fog, and by lunchtime the view has gone.",
    ],
    seeAlso: {
      slug: "galapagos",
      kind: "itinerary",
      title: "Eight Days in the Galápagos",
      note: "This was the front end of a longer trip. The other eight days, and all the practical stuff about getting to the islands, are here.",
    },
    highlights: ["The equator", "Cable car", "Old Town", "Ceviche"],
    days: [
      {
        day: "Day One",
        title: "The Equator, and the Cable Car",
        activities: [
          {
            description: "Pastries and coffee at FANKØR.",
            places: [{ name: "FANKØR Coffee", near: "Quito, Ecuador" }],
          },
          {
            description:
              "Forty-five minute Uber to Mitad del Mundo, and two to three hours there. A coffee museum, a beer museum, restaurants, alpacas, parks.",
            places: [{ name: "Mitad del Mundo", near: "Quito, Ecuador" }],
          },
          {
            description: "Uber to the TelefériQo cable car.",
            places: [{ name: "TelefériQo", near: "Quito, Ecuador" }],
          },
          {
            description: "Ceviche at Pezbela.",
            places: [{ name: "Pezbela", near: "Quito, Ecuador" }],
          },
          {
            description: "Old Town Quito, a UNESCO world heritage site, if there is time.",
            places: [{ name: "Old Town Quito" }],
          },
          {
            time: "20:00",
            description: "Dinner at Somos.",
            places: [{ name: "Somos Restaurante", near: "Quito, Ecuador" }],
          },
        ],
      },
    ],
  },
  {
    slug: "galapagos",
    title: "Eight Days in the Galápagos",
    destination: "Galápagos",
    country: "Ecuador",
    coords: { lat: -0.7437, lon: -90.3139 },
    duration: "8 days",
    season: "March",
    summary:
      "Island-hopping between Santa Cruz and San Cristóbal by ferry, snorkelling everything in between.",
    cover: galapagos,
    gated: true,
    bmcUrl: "https://buymeacoffee.com/lexiemeskouris/e/584143",
    teaser: "Read the tips at the bottom before you go.",
    tags: ["#Galapagos", "#Snorkelling", "#SeaLions"],
    notes: [
      "Costs here are what we paid on this trip, so treat them as a rough guide, not current prices.",
    ],
    seeAlso: {
      slug: "quito",
      kind: "itinerary",
      title: "A Day in Quito",
      note: "You fly in and out through Quito, and a day there is worth building in. Here is what to do with it.",
    },
    highlights: ["Giant tortoises", "Sea lions", "Snorkelling", "Beaches", "Hiking"],
    days: [
      {
        day: "Day Two",
        title: "Tortoises by Bike",
        activities: [
          {
            description: "Breakfast at Gelateria.",
            places: [{ name: "Gelateria", near: "Puerto Ayora, Galápagos" }],
          },
          {
            description:
              "Rent bikes and ride 13 miles to La Ruta de la Tortuga, a one to two hour tour of the giant tortoises' natural habitat. It closes at 17:30.",
            places: [{ name: "La Ruta de la Tortuga", near: "Santa Cruz Island, Galápagos" }],
          },
          { description: "The lava cave." },
          {
            description: "Late lunch at Agave.",
            places: [{ name: "Agave", near: "Puerto Ayora, Galápagos" }],
          },
          {
            description: "Walk the town, the art galleries, and eat Darwin's chocolate.",
          },
          {
            description: "Dinner at Rock.",
            places: [{ name: "The Rock", near: "Puerto Ayora, Galápagos" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Tips and tricks",
        items: [
          "In Quito, go to the TelefériQo first thing. Quito is known for afternoon fog.",
          "There is paperwork and security at Quito airport just to enter the Galápagos, so leave extra time in case of crowds.",
          "You need $20 for the transit card, and you have to get it BEFORE security at Quito airport.",
          "On arrival in the Galápagos you pay a national park entry fee.",
          "To get from the airport to civilisation everyone boards a $5 bus to a $1 taxi, then it is your choice: a $25 taxi to town or another $5 bus. We took the bus and it was easy.",
          "We packed reef safe sunscreen because Reddit told us to. Nobody thoroughly checked our bags.",
          "Bring lots of sunscreen, sun shirts, hats, sunglasses and linen. I am serious, the sun is so strong and sunscreen is extremely expensive there.",
          "Bring an underwater camera for the snorkelling.",
          "Buy your own snorkel gear before you go and carry it everywhere. You stumble on gorgeous spots and you always want to be ready. Rentals exist but you cannot predict the hours or the cleanliness.",
          "Respect the animals and stay two metres away. There have been incidents of sea lions biting tourists who crowd them.",
          "Go with the flow. Things close unexpectedly and restaurants run out of what is on the menu.",
          "Most restaurants take card, but carry petty cash for rentals and entrance fees. Some beaches charge, others are free.",
          "Always have a photo of your passport handy. You have to register at some of the beaches.",
          "Negotiate. Some of the bike rentals wanted double what we ended up paying.",
          "Taxis in town are a couple of dollars, so carry $1 coins.",
          "Water taxis are $1 each, even if you go one metre.",
          "Wear shoes you are happy to get wet and walk through mud in.",
          "Dress casually. Everyone is in athletic wear or casual linen, even at the fancier restaurants.",
          "Arrive at the ferry an hour early and hunt down your boat's captain. It is disorganised, and we almost got left behind.",
          "Bring reusable water bottles. You cannot drink the tap water, so most rooms have a filter you will want to fill from.",
        ],
      },
    ],
  },
  {
    slug: "japan",
    title: "Twelve Days in Japan",
    destination: "Japan",
    country: "Japan",
    coords: { lat: 35.6762, lon: 139.6503 },
    duration: "12 days",
    season: "Late Spring",
    summary: "Tokyo, Kyoto and Osaka, organised almost entirely around what and where to eat next.",
    cover: japan,
    gated: false,
    teaser: "",
    tags: ["#GoldenGai", "#Kyoto", "#Tsukiji"],
    highlights: ["Tokyo nightlife", "Fish market", "Kyoto", "Nara", "Go-karting"],
    days: [
      {
        day: "Day One",
        title: "Straight Into Shinjuku",
        activities: [
          {
            description: "Dinner, drinks and a night out in Shinjuku.",
            places: [
              { name: "Godzilla Head", near: "Shinjuku, Tokyo" },
              { name: "Udon Shin", near: "Tokyo, Japan" },
              { name: "Uogashi Nihon-Ichi", near: "Tokyo, Japan", note: "Standing sushi bar." },
              {
                name: "Omoide Yokocho",
                near: "Shinjuku, Tokyo",
                note: "Memory Lane. Food stalls.",
              },
              {
                name: "Golden Gai",
                near: "Shinjuku, Tokyo",
                note: "All the tiny bars, for hopping around.",
              },
              { name: "The Open Book", near: "Shinjuku, Tokyo", note: "Order lemon sours." },
              { name: "Albatross", near: "Shinjuku, Tokyo" },
              { name: "Deathmatch in Hell", near: "Shinjuku, Tokyo", note: "Death metal bar." },
              {
                name: "Nikuto",
                near: "Shinjuku, Tokyo",
                note: "Beef and chicken over charcoal. The kimchi beef.",
              },
              { name: "One Coin Bar Champion", near: "Shinjuku, Tokyo", note: "Karaoke." },
              {
                name: "Ramen Nagi",
                near: "Shinjuku, Tokyo",
                note: "Tokusei niboshi ramen. Most people eat ramen as late night drunk food, so go here last. It is on the second floor.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "The Tuna Auction, Then Ginza",
        activities: [
          {
            time: "05:00",
            description:
              "Toyosu and Tsukiji market with the tuna auction, until 09:00. Sushi for breakfast.",
            places: [
              { name: "Toyosu Market", near: "Tokyo, Japan" },
              { name: "Tsukiji Outer Market", near: "Tokyo, Japan" },
            ],
          },
          {
            time: "11:00",
            description: "Koffee Mameya Kakeru, omakase-style coffee.",
            places: [{ name: "Koffee Mameya Kakeru", near: "Tokyo, Japan" }],
          },
          {
            description: "Get a ticket from the Onitsuka pop-up, then shop Ginza Six.",
            places: [{ name: "Ginza Six", near: "Tokyo, Japan" }],
          },
          {
            description: "Truffle shoyu ramen at Ginza Kagari.",
            places: [{ name: "Ginza Kagari", near: "Tokyo, Japan" }],
          },
          {
            time: "17:45",
            description: "Appetisers at Kan Agari Hanare in Shinjuku, then bar and snack hop.",
          },
          {
            description:
              "Walk into Star Bar. Bar High Five, Tender Bar and Ginza Music Bar are the alternatives.",
            places: [
              { name: "Star Bar Ginza", near: "Tokyo, Japan" },
              { name: "Bar High Five", near: "Ginza, Tokyo" },
              { name: "Tender Bar", near: "Ginza, Tokyo" },
              { name: "Ginza Music Bar", near: "Tokyo, Japan" },
            ],
          },
          {
            description: "Ginza Stand sandwiches for a late night snack.",
            places: [{ name: "Ginza Stand", near: "Tokyo, Japan" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Asakusa",
        activities: [
          {
            time: "09:00",
            description:
              "Kappabashi kitchen street until 11:00. Opening times vary, so leave room to come back.",
            places: [{ name: "Kappabashi Street", near: "Tokyo, Japan" }],
          },
          {
            time: "11:00",
            description: "Hat Coffee, for the 3D lattes.",
            places: [{ name: "Hat Coffee", near: "Tokyo, Japan" }],
          },
          {
            time: "11:30",
            description: "Savoy Kaminarimon, open 11:30 to 15:00. Supposed to be the best.",
            places: [{ name: "Savoy Kaminarimon", near: "Tokyo, Japan" }],
          },
          {
            description: "Nakamise shopping street, and Harry's hedgehog cafe.",
            places: [{ name: "Nakamise Shopping Street", near: "Asakusa, Tokyo" }],
          },
          {
            description: "More food, if there is time.",
            places: [
              { name: "Asakusa Sarashina Horii", near: "Tokyo, Japan", note: "Soba." },
              { name: "Tonkatsu Oribe", near: "Tokyo, Japan" },
              { name: "Sushi Dokoro Suzu", near: "Tokyo, Japan" },
            ],
          },
          {
            description: "Ueno Park, if it fits: peony garden, pond, zoo, museums.",
            places: [{ name: "Ueno Park", near: "Tokyo, Japan" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Train to Kyoto, and Arashiyama",
        activities: [
          { time: "09:00", description: "Train to Kyoto.", places: [{ name: "Kyoto" }] },
          {
            description:
              "Arashiyama Monkey Park Iwatayama, then a fifteen minute walk to the bamboo grove. Two to three hours for both.",
            places: [
              { name: "Monkey Park Iwatayama", near: "Kyoto, Japan" },
              { name: "Arashiyama Bamboo Grove", near: "Kyoto, Japan" },
            ],
          },
          {
            description: "% Arabica, for the views and the beans.",
            places: [{ name: "% Arabica Arashiyama", near: "Kyoto, Japan" }],
          },
          {
            description: "Lunch at Tempura Koisus.",
            places: [{ name: "Tempura Koisus", near: "Kyoto, Japan" }],
          },
          {
            time: "17:00",
            description:
              "Pontocho Alley, six blocks of restaurants and bars to hop. Start early, there are no reservations.",
            places: [
              { name: "Pontocho Alley", near: "Kyoto, Japan" },
              { name: "Manten Kushiyaki", near: "Kyoto, Japan" },
              {
                name: "Gyukatsu Kyoto Katsugyu",
                near: "Kyoto, Japan",
                note: "The original branch.",
              },
              { name: "Hello Dolly", near: "Kyoto, Japan", note: "Jazz bar." },
            ],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Fushimi Inari, Nishiki, Gion",
        activities: [
          {
            description: "Le Labo cafe. The best matcha of the trip.",
            places: [{ name: "Le Labo Kyoto", near: "Kyoto, Japan" }],
          },
          {
            description: "Fushimi Inari Temple.",
            places: [{ name: "Fushimi Inari Taisha", near: "Kyoto, Japan" }],
          },
          {
            description: "Nishiki Market, and lunch in it. Aritsugu is the best knife shop.",
            places: [
              { name: "Nishiki Market", near: "Kyoto, Japan" },
              { name: "Aritsugu", near: "Kyoto, Japan" },
            ],
          },
          {
            description: "Walk through Gion, the geisha district.",
            places: [{ name: "Gion", near: "Kyoto, Japan" }],
          },
          {
            description: "Sweet potato ice cream at Imo Pippi.",
            places: [{ name: "Imo Pippi", near: "Kyoto, Japan" }],
          },
          {
            description: "Other food worth queueing for.",
            places: [
              {
                name: "Gion Kitagawa Hanbei Honten",
                near: "Kyoto, Japan",
                note: "Matcha desserts. Needs a reservation.",
              },
              { name: "Motoi Gyoza", near: "Kyoto, Japan", note: "Walk in only." },
              {
                name: "Men-ya Inoichi",
                near: "Kyoto, Japan",
                note: "Bib gourmand ramen. Queue at 11:00 for a ticket.",
              },
            ],
          },
          {
            description: "If you are not templed out, Kiyomizu-dera or Kinkaku-ji.",
            places: [
              { name: "Kiyomizu-dera", near: "Kyoto, Japan" },
              { name: "Kinkaku-ji", near: "Kyoto, Japan" },
            ],
          },
          {
            time: "18:30",
            description: "Drinks at K36 Rooftop.",
            places: [{ name: "K36 Rooftop", near: "Kyoto, Japan" }],
          },
          {
            time: "20:30",
            description: "Dinner at Mouyria Gion, then drinks at Bee's Knees.",
            places: [
              { name: "Mouriya Gion", near: "Kyoto, Japan" },
              { name: "Bee's Knees", near: "Kyoto, Japan" },
            ],
          },
        ],
      },
      {
        day: "Day Six",
        title: "The Philosopher's Path",
        activities: [
          {
            description:
              "Blue Bottle on the Philosopher's Path, then walk the path in reverse. Thirty minutes, with shops and cafes along it.",
            places: [
              { name: "Blue Bottle Coffee Kyoto", near: "Kyoto, Japan" },
              { name: "Philosopher's Path", near: "Kyoto, Japan" },
            ],
          },
          {
            description: "The afternoon freed up, so I got a massage and a haircut.",
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Nara, Then Osaka",
        activities: [
          {
            time: "08:00",
            description: "Coffee and pastries at Amam Dacotan, which opens at 08:00.",
            places: [{ name: "Amam Dacotan", near: "Kyoto, Japan" }],
          },
          {
            description: "Thirty minute train to Nara.",
            places: [{ name: "Nara", near: "Japan" }],
          },
          {
            description:
              "Nakatanidou for the famous mochi and the pounding demonstration, roughly every fifteen to twenty minutes. You will see the crowd form.",
            places: [{ name: "Nakatanidou", near: "Nara, Japan" }],
          },
          {
            description:
              "Nara Park, to feed the wild deer, then Todai-ji and the Great Buddha Hall.",
            places: [
              { name: "Nara Park", near: "Nara, Japan" },
              { name: "Todai-ji", near: "Nara, Japan" },
            ],
          },
          {
            description: "Afternoon pick-me-up at Salon Naramachi, a traditional green tea house.",
            places: [{ name: "Salon Naramachi", near: "Nara, Japan" }],
          },
          {
            time: "14:00",
            description: "Hour-long train on to Osaka.",
            places: [{ name: "Osaka" }],
          },
          {
            time: "17:30",
            description: "Walk into Alto Tritone when it opens. It sells out quickly.",
            places: [{ name: "Alto Tritone", near: "Osaka, Japan" }],
          },
          {
            description: "Post-dinner drinks at Bar K, or Bar Juniper.",
            places: [
              { name: "Bar K", near: "Osaka, Japan" },
              { name: "Bar Juniper", near: "Osaka, Japan" },
            ],
          },
        ],
      },
      {
        day: "Day Eight",
        title: "Osaka",
        activities: [
          {
            description: "Walk the castle grounds, if you are up early enough to walk there.",
            places: [{ name: "Osaka Castle" }],
          },
          {
            description: "Amerikamura, for shopping.",
            places: [{ name: "Amerikamura", near: "Osaka, Japan" }],
          },
          {
            description:
              "Kuromon Market, stopping at Maguroya Kurogin, where you pick your tuna and tell him how you want it.",
            places: [
              { name: "Kuromon Ichiba Market", near: "Osaka, Japan" },
              { name: "Maguroya Kurogin", near: "Osaka, Japan" },
            ],
          },
          {
            description: "Osaka Aquarium. Two to four hours.",
            places: [{ name: "Osaka Aquarium Kaiyukan" }],
          },
          {
            description: "Shopping. Supposedly the best luxury prices in Japan.",
            places: [
              { name: "QOO", near: "Osaka, Japan" },
              { name: "Brand Jungle", near: "Osaka, Japan" },
            ],
          },
          {
            description:
              "Dotonbori at night, stumbling into dinner, and a picture with the Glico running man.",
            places: [{ name: "Dotonbori", near: "Osaka, Japan" }],
          },
          {
            description: "Drinks at Nayuta, before or after dinner.",
            places: [{ name: "Nayuta", near: "Osaka, Japan" }],
          },
        ],
      },
      {
        day: "Day Nine",
        title: "Back Toward Tokyo",
        activities: [
          { description: "Namba theatre, and breakfast at My Neighbor." },
          {
            description:
              "We went back to Kyoto for the day for more Le Labo matcha ice cream and curry, and one more temple.",
          },
          {
            description: "Dinner at Tsujita, Shibuya Fukuras.",
            places: [{ name: "Tsujita Shibuya", near: "Tokyo, Japan" }],
          },
        ],
      },
      {
        day: "Day Ten",
        title: "Harajuku, Shibuya, Go-Karting",
        activities: [
          {
            time: "10:00",
            description: "Walk into Gyukatsu Motomura Shibuya when it opens.",
            places: [{ name: "Gyukatsu Motomura Shibuya", near: "Tokyo, Japan" }],
          },
          {
            description: "Yoyogi Park and the Meiji Shrine.",
            places: [
              { name: "Yoyogi Park", near: "Tokyo, Japan" },
              { name: "Meiji Shrine", near: "Tokyo, Japan" },
            ],
          },
          { description: "Tokyo Pride." },
          {
            description: "Lunch at Sen Sushi.",
            places: [{ name: "Sen Sushi", near: "Tokyo, Japan" }],
          },
          {
            description: "Harajuku shopping.",
            places: [
              { name: "The Real McCoy's", near: "Tokyo, Japan", note: "Men's americana." },
              { name: "Takeshita Street", near: "Tokyo, Japan", note: "Quirky shops, crepes." },
            ],
          },
          {
            description: "Shibuya crossing, then Shibuya shopping.",
            places: [
              { name: "Shibuya Crossing", near: "Tokyo, Japan" },
              { name: "Studio D'Artisan Tokyo", near: "Tokyo, Japan", note: "Denim." },
              { name: "The Flat Head", near: "Tokyo, Japan", note: "Denim." },
              { name: "Forget Me Nots", near: "Tokyo, Japan", note: "Women's clothing." },
              { name: "CAID", near: "Tokyo, Japan" },
            ],
          },
          { time: "20:00", description: "Go-karting in Shibuya. Be there at 19:30." },
          {
            description: "Drinks at SG Club.",
            places: [{ name: "SG Club", near: "Tokyo, Japan" }],
          },
        ],
      },
      {
        day: "Day Eleven",
        title: "Ebisu, and a Baseball Game",
        activities: [
          {
            description:
              "Free morning. We went back to Tsukiji and Ginza to get our shoes embroidered. The Imperial Palace would fit here too.",
            places: [{ name: "Imperial Palace", near: "Tokyo, Japan" }],
          },
          {
            description: "Baseball game at the Tokyo Dome.",
            places: [{ name: "Tokyo Dome" }],
          },
          {
            description: "Ebisu in the evening.",
            places: [
              { name: "Yebisu Brewery", near: "Tokyo, Japan" },
              { name: "Udon Shodai", near: "Ebisu, Tokyo" },
              { name: "Bar Trench", near: "Ebisu, Tokyo" },
              { name: "A10", near: "Ebisu, Tokyo" },
              { name: "Janai Coffee", near: "Ebisu, Tokyo" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "mexico-city",
    title: "Four Days in Mexico City",
    destination: "Mexico City",
    country: "Mexico",
    coords: { lat: 19.4326, lon: -99.1332 },
    duration: "4 days",
    season: "January",
    summary: "A taco crawl, Rosetta, and a free walking tour of the historic centre, at altitude.",
    cover: mexicoCity,
    gated: false,
    teaser: "Take it slow at first while you get used to the altitude.",
    tags: ["#Tacos", "#Rosetta", "#Roma"],
    notes: ["Mid 60s to low 70s during the day and high 50s to low 60s at night, so bring layers."],
    highlights: ["Tacos", "Rosetta", "Chapultepec", "The historic centre", "Mezcal"],
    days: [
      {
        day: "Day One",
        title: "Eat, and Get Used to the Altitude",
        activities: [
          {
            description: "Wake up at leisure and get coffee and pastries, maybe at Quentin Cafe.",
            places: [{ name: "Quentin Cafe", near: "Mexico City" }],
          },
          {
            time: "12:00",
            description: "Museo Soumaya. Free, and very good.",
            places: [{ name: "Museo Soumaya", near: "Mexico City" }],
          },
          {
            time: "14:00",
            description:
              "Lunch at Entremar, the sister restaurant to the famous seafood one, same menu.",
            places: [{ name: "Entremar", near: "Mexico City" }],
          },
          {
            time: "19:00",
            description:
              "Pick up pastries at Panadería Rosetta. Snack on them or save them for the morning.",
            places: [{ name: "Panadería Rosetta", near: "Mexico City" }],
          },
          {
            time: "19:30",
            description: "Drinks at Handshake.",
            places: [{ name: "Handshake Speakeasy", near: "Mexico City" }],
          },
          {
            time: "21:30",
            description: "Dinner at Rosetta, one of the World's 50 Best.",
            places: [{ name: "Rosetta", near: "Mexico City" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Roma, Chapultepec, and Jazz",
        activities: [
          {
            description: "Walk through Parque México, then coffee at Odette.",
            places: [
              { name: "Parque México", near: "Mexico City" },
              { name: "Odette", near: "Mexico City" },
            ],
          },
          {
            time: "10:00",
            description:
              "Brunch at Expendio de Maíz Sin Nombre. There is no menu, they just make you whatever is fresh until you stop being hungry.",
            places: [{ name: "Expendio de Maiz Sin Nombre", near: "Mexico City" }],
          },
          {
            description: "Walk the street art in Roma.",
            places: [{ name: "Colonia Roma", near: "Mexico City" }],
          },
          {
            description:
              "Chapultepec on foot or by bike. It is twice the size of Central Park, with a free zoo and a castle.",
            places: [{ name: "Chapultepec Park", near: "Mexico City" }],
          },
          {
            time: "16:45",
            description: "Get ready at the hotel, or drinks at Tlecān. Walk in.",
            places: [{ name: "Tlecan", near: "Mexico City" }],
          },
          {
            time: "19:00",
            description: "Dinner at Máximo Bistrot.",
            places: [{ name: "Maximo Bistrot", near: "Mexico City" }],
          },
          {
            time: "21:00",
            description:
              "Casa Franca, a jazz bar. Reserve over WhatsApp between 11:00 and 17:00 the same day. Small entry fee.",
            places: [{ name: "Casa Franca", near: "Mexico City" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "The Taco Crawl",
        activities: [
          { description: "Coffee, and relax at a cafe first. You will need the room." },
          {
            description: "The must-eat list, in order.",
            places: [
              { name: "Jenni's Quesadillas", near: "Mexico City" },
              { name: "Taqueria Orinoco", near: "Mexico City" },
              { name: "El Pescadito", near: "Mexico City", note: "Famous for shrimp tacos." },
            ],
          },
          {
            description: "If still hungry, keep going.",
            places: [
              { name: "Tacos del Juan", near: "Mexico City" },
              { name: "El Tizoncito", near: "Mexico City", note: "Birthplace of al pastor." },
              { name: "Taqueria El Turix", near: "Mexico City" },
              { name: "Siembra Taqueria", near: "Mexico City" },
            ],
          },
          {
            description: "Stop into the Palacio Postal for a picture.",
            places: [{ name: "Palacio Postal", near: "Mexico City" }],
          },
          {
            description:
              "Churros at El Moro, famous since 1935. The original is in the historic centre.",
            places: [{ name: "Churreria El Moro", near: "Mexico City" }],
          },
          {
            time: "14:30",
            description:
              "Free walking tour of the historic centre, two and a half hours, including the Palacio de Bellas Artes. Just tip the guide.",
            places: [
              { name: "Palacio de Bellas Artes", near: "Mexico City" },
              { name: "Alameda Central", near: "Mexico City" },
            ],
          },
          {
            time: "17:00",
            description: "A drink and a bite at Hanky Panky.",
            places: [{ name: "Hanky Panky Cocktail Bar", near: "Mexico City" }],
          },
          { time: "20:00", description: "Mezcal mixology masterclass." },
        ],
      },
      {
        day: "Day Four",
        title: "La Condesa",
        activities: [
          { description: "Wake up at leisure. You will need the rest after that weekend." },
          { description: "Brunch." },
          {
            description: "Casually explore La Condesa: vintage shops and design stores.",
            places: [{ name: "La Condesa", near: "Mexico City" }],
          },
        ],
      },
    ],
  },
  {
    slug: "madeira",
    title: "Three Days in Madeira",
    destination: "Madeira",
    country: "Portugal",
    coords: { lat: 32.6669, lon: -16.9241 },
    duration: "3 days",
    season: "Spring",
    tiktok: [
      {
        url: "https://www.tiktok.com/@lexiemesko/photo/7697657242669108493",
        label: "The Madeira itinerary on TikTok",
      },
      {
        url: "https://www.tiktok.com/@lexiemesko/video/7699502642627677454",
        label: "Restaurante Informal in Funchal on TikTok",
      },
    ],
    summary:
      "Whale watching, a wicker toboggan down a hill, and a sunrise hike between the two highest peaks.",
    cover: madeira,
    gated: true,
    bmcUrl: "https://buymeacoffee.com/lexiemeskouris/e/584147",
    teaser: "",
    tags: ["#PicoDoArieiro", "#Toboggan", "#Levada"],
    highlights: ["Sunrise hike", "Toboggan", "Whale watching", "Levadas"],
    days: [
      {
        day: "Day One",
        title: "Whales, a Toboggan, and a Levada",
        activities: [
          {
            time: "08:00",
            description:
              "Coffee and matcha at Motya Coffee Shop. Unbelievable. We went back three days in a row.",
            places: [{ name: "Motya Coffee Shop", near: "Funchal, Madeira" }],
          },
          {
            time: "08:30",
            description: "Be at Marina do Funchal, Gate 4.",
            places: [{ name: "Marina do Funchal" }],
          },
          { time: "09:00", description: "Whale watching tour, until 12:00." },
          {
            time: "13:00",
            description: "Cable car from Funchal up to Monte.",
            places: [{ name: "Monte", near: "Funchal, Madeira" }],
          },
          {
            time: "13:15",
            description: "Queue for the toboggan, and ride it down to Livramento. Cash only.",
            places: [{ name: "Monte Toboggan Run", near: "Funchal, Madeira" }],
          },
          {
            description:
              "Lunch at Restaurante Alta Vista, five to ten minutes away. The chicken was dry, but she gave us amazing sangria and the views were great. Very local, and I'm glad we went.",
            places: [{ name: "Restaurante Alta Vista", near: "Funchal, Madeira" }],
          },
          {
            description:
              "The Levada dos Tornos, an hour and a half out and back. Levadas are really hard to find: we used ChatGPT to pin down the exact coordinates of the start. They are also quite easy, so I would only do one if the PR hikes are too much for you.",
            places: [{ name: "Levada dos Tornos", near: "Madeira" }],
          },
          {
            time: "20:45",
            description: "Dinner at Akua.",
            places: [{ name: "Akua", near: "Funchal, Madeira" }],
          },
        ],
      },
    ],
  },
  {
    slug: "helsinki",
    title: "Two Days in Helsinki",
    destination: "Helsinki",
    country: "Finland",
    coords: { lat: 60.1699, lon: 24.9384 },
    duration: "2 days",
    season: "Winter",
    summary:
      "A library, a design museum, a sauna on the waterfront, and the Christmas market at Senate Square.",
    cover: helsinki,
    gated: false,
    teaser: "",
    tags: ["#ChristmasMarket", "#Loyly", "#DesignDistrict"],
    notes: [
      "This one is planned around the Christmas market, so it only really works in late November and December. Everything else is fine year round.",
    ],
    seeAlso: {
      slug: "tallinn",
      kind: "itinerary",
      title: "Two Days in Tallinn",
      note: "The ferry from Helsinki to Tallinn takes two hours, which makes the two easy to do back to back. Here is the other half.",
    },
    highlights: ["Sauna", "Christmas market", "Design District", "Oodi library"],
    days: [
      {
        day: "First Night",
        title: "Wine at Bardot",
        activities: [
          {
            description:
              "Bardot for wine and small plates, closing at midnight, or Liberty or Death, a speakeasy open until 02:00.",
            places: [
              { name: "Bardot", near: "Helsinki, Finland" },
              { name: "Liberty or Death", near: "Helsinki, Finland" },
            ],
          },
        ],
      },
      {
        day: "Day One",
        title: "Design, a Sauna, and the Market",
        activities: [
          {
            time: "10:30",
            description: "Walk by the Oodi library.",
            places: [{ name: "Oodi Helsinki Central Library" }],
          },
          {
            time: "12:00",
            description: "The Museum of Architecture and Design.",
            places: [{ name: "Museum of Finnish Architecture", near: "Helsinki, Finland" }],
          },
          {
            description:
              "Explore the Design District shops, and do not miss the Moomin exhibit. It sparked my Moomin obsession.",
            places: [
              { name: "Design District Helsinki" },
              { name: "Moomin exhibition", near: "Helsinki, Finland" },
            ],
          },
          {
            time: "14:00",
            description: "Löyly sauna, until 16:00.",
            places: [{ name: "Löyly", near: "Helsinki, Finland" }],
          },
          {
            time: "18:00",
            description:
              "The Christmas market at Senate Square. It closes at 20:00, and the alcohol stops at 22:00.",
            places: [{ name: "Senate Square", near: "Helsinki, Finland" }],
          },
        ],
      },
      {
        day: "Last Morning",
        title: "Coffee, Then the Ferry",
        activities: [
          {
            time: "10:00",
            description:
              "Walk to Cafe Regatta. So worth it: sausage, fresh cinnamon rolls and hot chocolate by the water.",
            places: [{ name: "Cafe Regatta", near: "Helsinki, Finland" }],
          },
          {
            time: "13:30",
            description:
              "Two hour ferry to Tallinn. It is basically a cruise. We spent the whole time exploring the boat, drinking champagne and shopping.",
            places: [{ name: "Tallinn", near: "Estonia" }],
          },
        ],
      },
    ],
  },
  {
    slug: "tallinn",
    title: "Two Days in Tallinn",
    destination: "Tallinn",
    country: "Estonia",
    coords: { lat: 59.437, lon: 24.7536 },
    duration: "2 days",
    season: "Winter",
    summary:
      "A Christmas market eaten as dinner, ice skating, and a medieval old town the next day.",
    cover: tallinn,
    gated: false,
    teaser: "Reached by ferry from Helsinki.",
    tags: ["#ChristmasMarket", "#OldTown", "#Telliskivi"],
    notes: [
      "The first evening needs the Christmas market and the rink, so this works best in late November and December.",
    ],
    seeAlso: {
      slug: "helsinki",
      kind: "itinerary",
      title: "Two Days in Helsinki",
      note: "We came in on the ferry from Helsinki, which takes two hours. Here is the other half.",
    },
    highlights: ["Christmas market", "Old Town", "Ice skating", "Telliskivi"],
    days: [
      {
        day: "First Night",
        title: "The Market for Dinner",
        activities: [
          {
            time: "16:30",
            description: "The Christmas market at Town Hall Square. This is dinner.",
            places: [{ name: "Town Hall Square", near: "Tallinn, Estonia" }],
          },
          {
            time: "20:00",
            description: "Ice skating at the Harju Street rink.",
            places: [{ name: "Harju Street Ice Rink", near: "Tallinn, Estonia" }],
          },
          { time: "21:30", description: "Walk around at night." },
        ],
      },
      {
        day: "Day One",
        title: "The Old Town, and Telliskivi",
        activities: [
          { description: "Sleep in, then sauna and steam at the hotel." },
          {
            description: "Coffee and pastries at Pulla Bakery.",
            places: [{ name: "Pulla Bakery", near: "Tallinn, Estonia" }],
          },
          {
            description: "St Olaf's Tower, for the panoramic view.",
            places: [{ name: "St Olaf's Church", near: "Tallinn, Estonia" }],
          },
          {
            description: "Alexander Nevsky Cathedral, and Toompea Hill if you fancy it.",
            places: [
              { name: "Alexander Nevsky Cathedral", near: "Tallinn, Estonia" },
              { name: "Toompea Hill", near: "Tallinn, Estonia" },
            ],
          },
          {
            description: "Telliskivi Creative City, a bohemian quarter of boutiques and murals.",
            places: [{ name: "Telliskivi Creative City", near: "Tallinn, Estonia" }],
          },
          {
            time: "19:30",
            description: "Dinner at Rataskaevu 16.",
            places: [{ name: "Rataskaevu 16", near: "Tallinn, Estonia" }],
          },
        ],
      },
    ],
  },
  {
    slug: "egypt",
    title: "Eight Days in Egypt",
    destination: "Egypt",
    country: "Egypt",
    coords: { lat: 30.0444, lon: 31.2357 },
    duration: "8 days",
    season: "Spring",
    summary:
      "Luxor, a four night cruise up the Nile to Aswan and Abu Simbel, then Giza and Cairo with a guide.",
    cover: egypt,
    gated: false,
    teaser: "Book the cruise and the guides ahead.",
    tags: ["#Nile", "#Giza", "#AbuSimbel"],
    notes: [
      "Do not drink the tap water, and do not eat anything unwashed or uncooked unless you really trust the source. Just being careful about food poisoning.",
      "Modest dress is needed for the guided days in Cairo.",
    ],
    highlights: [
      "Nile cruise",
      "The pyramids",
      "Abu Simbel",
      "Valley of the Kings",
      "Hot air balloon",
    ],
    days: [
      {
        day: "Day One",
        title: "Luxor",
        activities: [
          { time: "18:00", description: "Relax at the hotel." },
          {
            time: "19:30",
            description: "Dinner at Restaurant El-Kababgy, about seventeen minutes' walk.",
            places: [{ name: "El-Kababgy", near: "Luxor, Egypt" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Down to Aswan, and Onto the Boat",
        activities: [
          { time: "07:00", description: "Picked up from the hotel to transfer to Aswan." },
          {
            time: "11:30",
            description:
              "Board the Nile cruise at Aswan. Ours was the four day, three night Aswan to Luxor cruise with ImperialEgypt, with an Egyptology guide the whole way.",
            places: [{ name: "Aswan", near: "Egypt" }],
          },
          {
            time: "14:00",
            description: "The Aswan High Dam, then out by motor boat to Philae Temple.",
            places: [
              { name: "Aswan High Dam", near: "Egypt" },
              { name: "Philae Temple", near: "Aswan, Egypt" },
            ],
          },
          {
            description:
              "Lunch, afternoon tea and dinner on board, then a disco in the evening. You stay moored at Aswan overnight, so you can get off if you want to.",
          },
        ],
      },
      {
        day: "Day Three",
        title: "Abu Simbel, Then Kom Ombo",
        activities: [
          {
            time: "04:30",
            description:
              "Picked up for Abu Simbel in a small group, arriving around 08:00. The rock-cut temples Ramesses II built for himself and for Nefertari.",
            places: [{ name: "Abu Simbel", near: "Egypt" }],
          },
          { time: "12:00", description: "Back on board for lunch, then sail for Kom Ombo." },
          {
            description:
              "Kom Ombo, the double temple shared between Sobek the crocodile god and Horus the falcon god.",
            places: [{ name: "Temple of Kom Ombo", near: "Egypt" }],
          },
          { description: "Dinner on board, then sail on to Edfu overnight." },
        ],
      },
      {
        day: "Day Four",
        title: "Edfu, Then Luxor Temple",
        activities: [
          {
            description:
              "Early morning horse and carriage with the guide to the Temple of Horus at Edfu, the most complete and best preserved temple in Egypt. About two hours.",
            places: [{ name: "Temple of Edfu", near: "Egypt" }],
          },
          {
            description:
              "Late afternoon, dock at Luxor and cross to Luxor Temple on the East Bank, where the ancient Egyptian, Christian and Islamic layers all sit on top of each other.",
            places: [{ name: "Luxor Temple", near: "Egypt" }],
          },
          {
            description:
              "If you dock by 15:00 or 15:30 there is time for Karnak as well as Luxor Temple.",
          },
          { description: "Dinner on board with a belly dancing show. Overnight at Luxor." },
        ],
      },
      {
        day: "Day Five",
        title: "A Balloon, the West Bank, Then Cairo",
        activities: [
          { description: "Early morning balloon over the West Bank." },
          { description: "Breakfast, then check out of the cruise." },
          {
            description: "The Colossi of Memnon.",
            places: [{ name: "Colossi of Memnon", near: "Luxor, Egypt" }],
          },
          {
            description:
              "The Valley of the Kings, where the New Kingdom pharaohs cut their tombs into the mountain.",
            places: [{ name: "Valley of the Kings", near: "Luxor, Egypt" }],
          },
          {
            description: "The mortuary temple of Hatshepsut at Deir el-Bahari.",
            places: [{ name: "Temple of Hatshepsut", near: "Luxor, Egypt" }],
          },
          {
            description: "Tombs of the Nobles.",
            places: [{ name: "Tombs of the Nobles", near: "Luxor, Egypt" }],
          },
          {
            description:
              "Back to the East Bank for Karnak, the largest temple ever built, put up over 2,000 years and covering about 63 acres.",
            places: [{ name: "Karnak Temple", near: "Luxor, Egypt" }],
          },
          { time: "14:00", description: "Leave the cruise." },
          { time: "21:10", description: "Fly on to Cairo.", places: [{ name: "Cairo" }] },
        ],
      },
      {
        day: "Day Six",
        title: "Giza, With a Guide",
        activities: [
          {
            time: "07:30",
            description:
              "Full day guided tour until 15:30: the Pyramids of Giza, Khufu, Khafre and Menkaure, the Great Sphinx, and the Grand Egyptian Museum for the Tutankhamun treasures and the royal mummies.",
            places: [
              { name: "Pyramids of Giza", near: "Egypt" },
              { name: "Great Sphinx", near: "Giza, Egypt" },
              { name: "Grand Egyptian Museum", near: "Giza, Egypt" },
            ],
          },
          {
            description: "Dinner at Vivo.",
            places: [{ name: "Vivo", near: "Cairo, Egypt" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Zamalek, Then Old Cairo",
        activities: [
          { description: "Breakfast at the hotel, served until 11:00." },
          {
            description:
              "Free morning. Walk the Zamalek shops, the cafes, and the Cairo Marriott garden.",
            places: [
              { name: "Zamalek", near: "Cairo, Egypt" },
              { name: "Mounaya Gallery", near: "Cairo, Egypt" },
            ],
          },
          {
            time: "14:00",
            description:
              "Old Cairo guided walking tour until 17:00: history, culture and street bites.",
            places: [{ name: "Old Cairo" }],
          },
          {
            description:
              "Coptic Cairo afterwards, fifteen to twenty-five minutes away, if you have the energy.",
            places: [
              { name: "Hanging Church", near: "Cairo, Egypt" },
              { name: "Saints Sergius and Bacchus Church", near: "Cairo, Egypt" },
              { name: "Babylon Fortress", near: "Cairo, Egypt" },
              { name: "Coptic Museum", near: "Cairo, Egypt" },
            ],
          },
          {
            description: "Dinner at Pier 88 or Em Sherif Cafe.",
            places: [
              { name: "Pier 88", near: "Cairo, Egypt" },
              { name: "Em Sherif Cafe", near: "Cairo, Egypt" },
            ],
          },
        ],
      },
      {
        day: "Day Eight",
        title: "The Pool",
        activities: [
          { description: "Breakfast at the hotel." },
          { description: "Enjoy the hotel: heated pool, gym." },
          { description: "Late lunch nearby, and any last sites." },
        ],
      },
    ],
  },
  {
    slug: "istanbul",
    title: "Three Days in Istanbul",
    destination: "Istanbul",
    country: "Turkey",
    coords: { lat: 41.0082, lon: 28.9784 },
    duration: "3 days",
    season: "Early Autumn",
    summary: "The old city in one morning, sunset up in Bebek, and a ferry over to the Asian side.",
    cover: istanbul,
    gated: false,
    teaser: "There are late nights built in.",
    tags: ["#HagiaSophia", "#Bebek", "#Balat"],
    highlights: ["Hagia Sophia", "Bazaars", "Hammam", "The Asian side", "Turkish breakfast"],
    days: [
      {
        day: "First Night",
        title: "Straight Out",
        activities: [
          { description: "Casual dinner nearby." },
          {
            description: "Cocktails at Biz Istanbul, then out.",
            places: [
              { name: "Biz Istanbul" },
              { name: "Upperist", near: "Istanbul, Turkey" },
              { name: "Komun Galataport", near: "Istanbul, Turkey" },
              { name: "Sail Loft Vakkorama", near: "Istanbul, Turkey" },
              {
                name: "Geyik Cihangir",
                near: "Istanbul, Turkey",
                note: "A few more bars right next to it.",
              },
            ],
          },
        ],
      },
      {
        day: "Day One",
        title: "The Old City, Then Bebek",
        activities: [
          {
            time: "10:00",
            description: "The Spice Bazaar, with breakfast pastries and coffee nearby.",
            places: [{ name: "Spice Bazaar", near: "Istanbul, Turkey" }],
          },
          {
            description: "Street food along the way: maraş ice cream, simit, baklava.",
          },
          {
            time: "12:30",
            description: "Hagia Sophia.",
            places: [{ name: "Hagia Sophia" }],
          },
          {
            time: "13:00",
            description: "The Basilica Cistern, then the Blue Mosque at 13:30.",
            places: [
              { name: "Basilica Cistern", near: "Istanbul, Turkey" },
              { name: "Blue Mosque", near: "Istanbul, Turkey" },
            ],
          },
          {
            time: "14:00",
            description: "Walk Yerebatan Street, then the Grand Bazaar at 14:30.",
            places: [{ name: "Grand Bazaar", near: "Istanbul, Turkey" }],
          },
          {
            time: "15:00",
            description: "Topkapi Palace, if you want to go in.",
            places: [{ name: "Topkapi Palace", near: "Istanbul, Turkey" }],
          },
          { time: "16:00", description: "Back to change and relax." },
          {
            time: "17:00",
            description: "Up to Bebek, and a pre-dinner cocktail at Lucca. Book it.",
            places: [
              { name: "Bebek", near: "Istanbul, Turkey" },
              { name: "Lucca", near: "Bebek, Istanbul" },
            ],
          },
          {
            description:
              "Walk the waterfront to Momo for sunset. It sets at 18:53, so aim to be there by 18:15.",
            places: [{ name: "Momo", near: "Bebek, Istanbul" }],
          },
          {
            description:
              "Carry on down the waterfront to Goose 25 if there is time, then meander through Arnavutköy.",
            places: [
              { name: "Goose 25", near: "Istanbul, Turkey" },
              { name: "Arnavutköy", near: "Istanbul, Turkey" },
              {
                name: "Alexandra Arnavutkoy",
                near: "Istanbul, Turkey",
                note: "Another drink option.",
              },
            ],
          },
          {
            time: "21:00",
            description: "Dinner at Ali Ocakbaşı Karaköy, Michelin recommended.",
            places: [{ name: "Ali Ocakbasi Karakoy", near: "Istanbul, Turkey" }],
          },
          {
            time: "01:00",
            description: "Out. MiniMuzikhol, maybe.",
            places: [{ name: "MiniMuzikhol", near: "Istanbul, Turkey" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Hammam, and the Asian Side",
        activities: [
          {
            description:
              "Breakfast at Cuma, before or after the baths depending on when you surface.",
            places: [{ name: "Cuma", near: "Istanbul, Turkey" }],
          },
          { time: "11:00", description: "Turkish hammam and baths near Galata. Optional." },
          {
            description:
              "Ferry over to the Asian side, and explore Üsküdar, stopping at Beylerbeyi Palace.",
            places: [
              { name: "Üsküdar", near: "Istanbul, Turkey" },
              { name: "Beylerbeyi Palace", near: "Istanbul, Turkey" },
            ],
          },
          {
            time: "16:00",
            description: "Asian side street food tour in Kadıköy. Optional.",
            places: [{ name: "Kadıköy", near: "Istanbul, Turkey" }],
          },
          { time: "20:00", description: "The rest of the Kadıköy markets." },
          { time: "23:00", description: "Out again, if there is anything left." },
        ],
      },
      {
        day: "Day Three",
        title: "Galata, Then Balat",
        activities: [
          {
            time: "10:00",
            description: "Up to Taksim Square, then walk toward Galata along İstiklal Caddesi.",
            places: [
              { name: "Taksim Square", near: "Istanbul, Turkey" },
              { name: "İstiklal Caddesi", near: "Istanbul, Turkey" },
            ],
          },
          {
            time: "11:00",
            description: "Turkish breakfast at Privato Cafe.",
            places: [{ name: "Privato Cafe", near: "Istanbul, Turkey" }],
          },
          {
            time: "12:30",
            description: "The top of Galata Tower.",
            places: [{ name: "Galata Tower" }],
          },
          {
            time: "13:00",
            description:
              "Ferry across to Balat, for the coloured houses and the quirky cafes. Turkish coffee and pastries at Maison Balat.",
            places: [
              { name: "Balat", near: "Istanbul, Turkey" },
              { name: "Maison Balat", near: "Istanbul, Turkey" },
            ],
          },
          { time: "17:00", description: "Casual dinner in Balat or near the hotel." },
        ],
      },
    ],
  },
  {
    slug: "krakow",
    title: "Three Days in Kraków",
    destination: "Kraków",
    country: "Poland",
    coords: { lat: 50.0647, lon: 19.945 },
    duration: "3 days",
    season: "Autumn",
    summary:
      "Auschwitz on the middle day, and the rest given over to pierogi, milk bars and the Jewish quarter.",
    cover: krakow,
    gated: false,
    teaser: "",
    tags: ["#Kazimierz", "#Pierogi", "#MilkBar"],
    highlights: ["Pierogi", "Kazimierz", "Auschwitz", "Jazz", "Milk bars"],
    days: [
      {
        day: "Day One",
        title: "Pierogi in the Old Town",
        activities: [
          {
            description: "Bolt is cheaper than Uber here.",
          },
          {
            description:
              "Late night pierogi at Przystanek Pierogarnia, on Szewska in the Old Town.",
            places: [{ name: "Przystanek Pierogarnia", near: "Kraków, Poland" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Auschwitz",
        activities: [
          { description: "Early start, and walk the Old Town." },
          {
            time: "11:15",
            description: "Picked up for Auschwitz. The tour runs about seven hours.",
            places: [{ name: "Auschwitz-Birkenau Memorial and Museum", near: "Oświęcim, Poland" }],
          },
          {
            time: "19:00",
            description: "The Artist Bar, for live jazz and good cocktails.",
            places: [{ name: "The Artist Bar", near: "Kraków, Poland" }],
          },
          {
            time: "20:30",
            description: "Dinner at Moo Moo, or back at the hotel.",
            places: [{ name: "Moo Moo", near: "Kraków, Poland" }],
          },
          {
            time: "21:30",
            description: "Vodka tasting at Wódka Bar.",
            places: [{ name: "Wódka Bar", near: "Kraków, Poland" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Eat Your Way Out",
        activities: [
          {
            description: "Coffee at Pożegnanie z Afryką.",
            places: [{ name: "Pożegnanie z Afryką", near: "Kraków, Poland" }],
          },
          {
            description: "Walk to the Barbican, then through Stary Kleparz, the farmers market.",
            places: [
              { name: "Kraków Barbican" },
              { name: "Stary Kleparz", near: "Kraków, Poland" },
            ],
          },
          { description: "Eat an obwarzanek krakowski, the round bread." },
          {
            description:
              "Walk Kazimierz, the Jewish quarter, and the Schindler's List passage on Józefa.",
            places: [
              { name: "Kazimierz", near: "Kraków, Poland" },
              { name: "Józefa Street", near: "Kraków, Poland" },
            ],
          },
          {
            description: "Pączki donuts at Confectionery Under Arcades, on Krakowska.",
            places: [{ name: "Cukiernia Pod Arkadami", near: "Kraków, Poland" }],
          },
          {
            description: "Zapiekanka at Endzior.",
            places: [{ name: "Endzior", near: "Kraków, Poland" }],
          },
          {
            description:
              "Eat at a traditional milk bar. Bar mleczny Pod Temidą came recommended. Get the placki ziemniaczane, potato pancakes.",
            places: [{ name: "Bar mleczny Pod Temidą", near: "Kraków, Poland" }],
          },
          {
            description: "Otherwise, a late lunch at Tbilisuri.",
            places: [{ name: "Tbilisuri", near: "Kraków, Poland" }],
          },
        ],
      },
    ],
  },
  {
    slug: "tuscany",
    title: "Six Days in Tuscany and Cinque Terre",
    destination: "Tuscany",
    country: "Italy",
    coords: { lat: 43.7228, lon: 10.4017 },
    duration: "6 days",
    season: "Autumn",
    summary:
      "A villa, vineyards and a private chef, then the train up the coast to Viareggio and La Spezia for the Cinque Terre.",
    cover: tuscany,
    gated: false,
    teaser: "",
    tags: ["#Villa", "#Viareggio", "#CinqueTerre"],
    highlights: ["Wine tours", "Villa life", "Cinque Terre", "Private chef", "Gelato"],
    days: [
      {
        day: "Day One",
        title: "Pisa, Then the Villa",
        activities: [
          {
            description: "Explore Pisa.",
            places: [{ name: "Pisa", near: "Italy" }],
          },
          {
            time: "12:30",
            description: "Lunch at L'Ostellino.",
            places: [{ name: "L'Ostellino", near: "Pisa, Italy" }],
          },
          {
            description: "A quick photo with the leaning tower, and a walk around the piazza.",
            places: [{ name: "Leaning Tower of Pisa" }],
          },
          { time: "15:00", description: "An hour's drive to the villa." },
          {
            time: "20:00",
            description: "Dinner at i'Bacco Toscano. Four courses, paid at the restaurant.",
            places: [{ name: "i'Bacco Toscano", near: "Tuscany, Italy" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Wine, Pool, Private Chef",
        activities: [
          { time: "12:00", description: "Wine tour and lunch, until 16:00, if you booked it." },
          { time: "14:00", description: "The private chef arrives to prep." },
          { time: "16:00", description: "Back to the villa to lounge by the pool." },
          { time: "20:00", description: "Private chef at the house. Four courses." },
        ],
      },
      {
        day: "Day Three",
        title: "Brunch, Tennis, Viareggio",
        activities: [
          { time: "10:00", description: "Check out of one villa and move to the next." },
          { description: "Brunch, cooked at the house." },
          { description: "Tennis tournament." },
          {
            description: "Back to Pisa and the train up the coast to Viareggio.",
            places: [{ name: "Viareggio", near: "Italy" }],
          },
          {
            description: "One night at the Grand Hotel Principe di Piemonte.",
            places: [{ name: "Grand Hotel Principe di Piemonte", near: "Viareggio, Italy" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Breakfast, Then La Spezia",
        activities: [
          {
            description:
              "The breakfast buffet at the hotel. The best breakfast in Italy, and worth the night on its own.",
            places: [{ name: "Grand Hotel Principe di Piemonte", near: "Viareggio, Italy" }],
          },
          {
            description: "Train to La Spezia, the base for the Cinque Terre.",
            places: [{ name: "La Spezia", near: "Italy" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Vernazza",
        activities: [
          { description: "Train out from La Spezia and hike." },
          {
            description:
              "Cannoli at Il Pirata delle Cinque Terre, up the steps on the path out of Vernazza towards Corniglia. Literally unbelievable.",
            places: [{ name: "Il Pirata delle Cinque Terre", near: "Vernazza, Italy" }],
          },
          {
            description: "A wine tasting at Cinque Sensi.",
            places: [{ name: "Cinque Sensi", near: "Vernazza, Italy" }],
          },
        ],
      },
      {
        day: "Day Six",
        title: "Manarola and Corniglia",
        activities: [
          { description: "More hiking from the La Spezia base." },
          {
            description: "A pesto-making class at Nessun Dorma, looking out over Manarola.",
            places: [{ name: "Nessun Dorma", near: "Manarola, Italy" }],
          },
          {
            description: "Gelato at Alberto, there since 1999.",
            places: [{ name: "Alberto Gelateria", near: "Corniglia, Italy" }],
          },
        ],
      },
    ],
  },
  {
    slug: "tromso",
    title: "Three Days in Tromsø",
    destination: "Tromsø",
    country: "Norway",
    coords: { lat: 69.6492, lon: 18.9553 },
    duration: "3 days",
    season: "Winter",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7700411977352367373",
    summary:
      "Northern lights, a fjord cruise, and dog sledding, with a sauna and cold plunge in between.",
    cover: tromso,
    gated: true,
    bmcUrl: "https://buymeacoffee.com/lexiemeskouris/e/584148",
    teaser: "The town itself takes an afternoon, and the rest depends on the weather.",
    tags: ["#NorthernLights", "#DogSledding", "#Fjords"],
    notes: [
      "The northern lights need dark winter nights, so this only works between roughly late September and late March.",
    ],
    highlights: ["Northern Lights", "Dog sledding", "Fjords", "Sauna"],
    days: [
      {
        day: "Day One",
        title: "The Town, Then the Lights",
        activities: [
          { description: "Wake up at leisure." },
          {
            description: "Walk the Tromsø city centre: the harbourfront, the cafes, the shops.",
            places: [{ name: "Tromsø Harbour" }],
          },
          { time: "14:30", description: "A full lunch. You will want it." },
          { time: "16:30", description: "Northern lights tour, until 23:00." },
        ],
      },
    ],
  },
  {
    slug: "seoul",
    title: "Seven Days in Seoul",
    destination: "Seoul",
    country: "South Korea",
    coords: { lat: 37.5665, lon: 126.978 },
    duration: "7 days",
    season: "Early Summer",
    summary:
      "Palaces, a DMZ day, a mountain hike, a baseball game, and a skin analysis in Gangnam.",
    cover: seoul,
    gated: false,
    teaser: "Based in Hongdae. Two things need booking well ahead.",
    tags: ["#Hongdae", "#DMZ", "#HanRiver"],
    highlights: ["The DMZ", "Palaces", "Bukhansan", "Han River", "Baseball"],
    days: [
      {
        day: "Day One",
        title: "Hongdae",
        activities: [
          {
            description:
              "Peruse Hongdae Street: clothing stalls, vintage shops, art studios, street art.",
            places: [{ name: "Hongdae", near: "Seoul, South Korea" }],
          },
          {
            description: "Korean barbecue at Doma Hongdae. Walk in, and prepare for a line.",
            places: [{ name: "Doma Hongdae", near: "Seoul, South Korea" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Gangnam",
        activities: [
          {
            description: "Walk by the Gangnam Style sculpture.",
            places: [{ name: "Gangnam Style Statue", near: "Seoul, South Korea" }],
          },
          {
            time: "11:00",
            description: "Colour and skeletal analysis at Mood Collect in Gangnam, until 13:50.",
            places: [{ name: "Mood Collect", near: "Seoul, South Korea" }],
          },
          { time: "14:30", description: "AI skin analysis and an aqua facial, until 16:30." },
          {
            description: "Mini croissants at NUDAKE Haus Dosan.",
            places: [{ name: "NUDAKE Haus Dosan", near: "Seoul, South Korea" }],
          },
          {
            time: "18:00",
            description: "Cocktails at Alice Cheongdam.",
            places: [{ name: "Alice Cheongdam", near: "Seoul, South Korea" }],
          },
          {
            time: "20:00",
            description: "Cocktails and light bites at Zest.",
            places: [{ name: "Zest", near: "Seoul, South Korea" }],
          },
          {
            description: "Late night food.",
            places: [
              { name: "Kkanbu Chicken", near: "Seoul, South Korea" },
              { name: "The Booth", near: "Seoul, South Korea" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Palaces, Markets, and the Tower",
        activities: [
          {
            description:
              "Hanbok rental, optional. Wearing traditional dress gets you into the palace free.",
          },
          {
            time: "09:00",
            description: "Gyeongbokgung Palace. Two to three hours.",
            places: [{ name: "Gyeongbokgung Palace" }],
          },
          {
            time: "12:00",
            description: "Eat at Ikseon Chihyang when it opens.",
            places: [{ name: "Ikseon Chihyang", near: "Seoul, South Korea" }],
          },
          {
            description:
              "Walk Ikseon-dong, a quaint street of traditional Korean homes turned into cafes, then along the Cheonggyecheon stream.",
            places: [
              { name: "Ikseon-dong", near: "Seoul, South Korea" },
              { name: "Cheonggyecheon", near: "Seoul, South Korea" },
            ],
          },
          {
            description:
              "Explore Myeongdong, then eat at Myeongdong Kyoja. Michelin Guide, four menu items, expect a wait.",
            places: [
              { name: "Myeongdong", near: "Seoul, South Korea" },
              { name: "Myeongdong Kyoja", near: "Seoul, South Korea" },
            ],
          },
          {
            description:
              "Namdaemun Market, one of the most popular in Seoul. Trinkets, street food.",
            places: [{ name: "Namdaemun Market", near: "Seoul, South Korea" }],
          },
          {
            time: "18:30",
            description:
              "Cable car up to N Seoul Tower for the observatory. Sunset is at 19:54, so head up around 18:30.",
            places: [{ name: "N Seoul Tower" }],
          },
          { description: "Pick up pastries or sandwiches for tomorrow." },
        ],
      },
      {
        day: "Day Four",
        title: "The DMZ",
        activities: [
          {
            time: "07:00",
            description:
              "Full day DMZ tour until 15:00, with the optional suspension bridge, the longest in the world. Meeting point is Myeongdong station, exit 5.",
            places: [{ name: "DMZ", near: "South Korea" }],
          },
          { description: "Afternoon nap." },
          { time: "19:00", description: "Street food tour, until 21:00." },
        ],
      },
      {
        day: "Day Five",
        title: "Bukhansan, Then the River",
        activities: [
          { time: "10:00", description: "On the train, an hour out of the city." },
          {
            description: "Hike Bukhansan National Park. Four to six hours.",
            places: [{ name: "Bukhansan National Park", near: "South Korea" }],
          },
          {
            description: "Shopping at Dongdaemun Market: 26 malls and 30,000 shops.",
            places: [{ name: "Dongdaemun Market", near: "Seoul, South Korea" }],
          },
          {
            description:
              "Han River ramen at sunset, from exit 3 at Yeouinaru station. They sell picnic blankets there.",
            places: [{ name: "Yeouinaru Station", near: "Seoul, South Korea" }],
          },
          {
            description:
              "Banpo Hangang Park, optional. The light show runs at 19:30, 20:00, 20:30 and 21:00.",
            places: [{ name: "Banpo Hangang Park", near: "Seoul, South Korea" }],
          },
        ],
      },
      {
        day: "Day Six",
        title: "Seongsu, and a Baseball Game",
        activities: [
          {
            description:
              "Jayeondo Sogeumppang for the viral salt bread. You have to buy a drink with it, so go for breakfast.",
            places: [{ name: "Jayeondo Sogeumppang", near: "Seoul, South Korea" }],
          },
          {
            description: "Explore Seongsu, the Brooklyn of Korea. Pop ups and very cool cafes.",
            places: [{ name: "Seongsu-dong", near: "Seoul, South Korea" }],
          },
          {
            description: "Seoul Forest Park, one to two hours.",
            places: [{ name: "Seoul Forest" }],
          },
          {
            description: "Lunch at Solsot Pot Rice House.",
            places: [{ name: "Solsot Pot Rice House", near: "Seoul, South Korea" }],
          },
          {
            time: "16:00",
            description:
              "Check the ticket kiosk at the ballpark entrance. Tickets go on sale an hour before the game at weekends and can sell out, so queue before the kiosk opens at 17:30.",
          },
          {
            time: "18:30",
            description:
              "Baseball at Jamsil. Apparently sick fried chicken and all round good vibes.",
            places: [{ name: "Jamsil Baseball Stadium", near: "Seoul, South Korea" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "One Museum",
        activities: [
          { description: "Leisure, and any last exploring." },
          {
            description:
              "The War Memorial or the National Museum of Korea. Both are free entry, and the War Memorial does free hour-long tours at 10:00 and 14:00.",
            places: [
              { name: "War Memorial of Korea", near: "Seoul, South Korea" },
              { name: "National Museum of Korea", near: "Seoul, South Korea" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "malta",
    title: "Three Days in Malta",
    destination: "Malta",
    country: "Malta",
    coords: { lat: 35.8997, lon: 14.5146 },
    duration: "3 days",
    season: "Summer",
    tiktok: "https://www.tiktok.com/@lexiemesko/photo/7697221905467723022",
    summary: "Valletta in a day, big nights in Paceville, and a boat into the Blue Grotto.",
    cover: malta,
    gated: false,
    teaser:
      "Based at the InterContinental in St George's Bay, St Julian's. Our boat day got rained off, so it and everything else we did not get to is at the bottom.",
    tags: ["#Valletta", "#Paceville", "#BlueGrotto"],
    highlights: ["Valletta", "Paceville", "Blue Grotto", "Dingli Cliffs"],
    days: [
      {
        day: "Day One",
        title: "Valletta, Then Paceville",
        activities: [
          {
            description:
              "Walk to Sliema, about 25 minutes, grabbing coffee on the way, then the ten minute ferry to Valletta.",
            places: [
              { name: "Sliema", near: "Malta" },
              { name: "Valletta", near: "Malta" },
            ],
          },
          {
            description: "The Valletta highlights.",
            places: [
              { name: "Triton Fountain", near: "Valletta, Malta" },
              { name: "City Gate", near: "Valletta, Malta" },
              { name: "St John's Co-Cathedral", near: "Valletta, Malta" },
              { name: "Grandmaster's Palace", near: "Valletta, Malta" },
              {
                name: "Upper Barrakka Gardens",
                near: "Valletta, Malta",
                note: "Views, and the cannon salute at noon.",
              },
              { name: "MUZA", near: "Valletta, Malta", note: "Art museum." },
              { name: "Valletta Waterfront", near: "Malta" },
            ],
          },
          {
            description: "Dinner at Villa Bologna Restaurant.",
            places: [{ name: "Villa Bologna Restaurant", near: "Malta" }],
          },
          {
            description:
              "Pregame, then the bars and clubs in Paceville. We went out big time and probably hit all of these.",
            places: [
              { name: "Paceville", near: "Malta" },
              { name: "Havana Club", near: "Paceville, Malta" },
              { name: "Uno", near: "Paceville, Malta" },
              { name: "Toy Room Supper Club", near: "Paceville, Malta" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Rained Off, Then Out Again",
        activities: [
          {
            description:
              "This was meant to be the boat day, but it rained and the boat was cancelled. It is in the list at the bottom.",
          },
          { description: "Dinner at a Georgian restaurant, then out again." },
        ],
      },
      {
        day: "Day Three",
        title: "Cliffs and Beaches",
        activities: [
          {
            description:
              "Uber to the Blue Grotto. You can pay 10 euros each to take a boat in, and it is well worth it. There is an ice cream shop and some food nearby.",
            places: [{ name: "Blue Grotto", near: "Malta" }],
          },
          {
            description: "Hike the coastline path to Dingli Cliffs.",
            places: [{ name: "Dingli Cliffs", near: "Malta" }],
          },
          {
            description:
              "Afternoon beach at Għajn Tuffieħa, which is more natural, or Golden Bay, which is easier with sunbeds.",
            places: [
              { name: "Ghajn Tuffieha", near: "Malta" },
              { name: "Golden Bay", near: "Malta" },
            ],
          },
        ],
      },
    ],
    extras: [
      {
        title: "If you have another day",
        note: "We did not get to these. The boat day got rained off.",
        places: [
          {
            name: "Boat day",
            url: "https://www.google.com/maps/search/?api=1&query=Blue+Lagoon+Comino+Malta",
            note: "The Blue Lagoon at Comino, the caves and the Gozo coastline, 10:00 to 18:00",
          },
          {
            name: "Rubino",
            near: "Valletta, Malta",
            note: "Traditional Maltese, for lunch in Valletta",
          },
          { name: "Rampila", near: "Valletta, Malta", note: "Built into the bastions" },
          { name: "Lot Sixty One", near: "Valletta, Malta", note: "Gelato and coffee" },
          { name: "St Paul's Bay", near: "Malta", note: "The beach" },
          {
            name: "The Three Cities",
            near: "Malta",
            note: "Birgu, Senglea and Cospicua, a ferry from Valletta",
          },
          { name: "Mdina", near: "Malta", note: "Get a taxi there for sunset" },
          {
            name: "Coogi's",
            near: "Mdina, Malta",
            note: "Dinner in Mdina, like Scala, Golden Fork or Trattoria AD 1530",
          },
          {
            name: "Crystal Palace Serkin",
            near: "Rabat, Malta",
            note: "The famous Maltese cheesecake, to go, on the way back from Mdina",
          },
          {
            name: "Gambrinus",
            near: "Malta",
            note: "A ftira, the ring-shaped sourdough with fillings",
          },
        ],
      },
      {
        title: "Eat and drink",
        places: [
          { name: "Cafe Society", near: "Triq San Gwann, Valletta, Malta" },
          { name: "Paranga" },
          { name: "Rafael's" },
          { name: "LOA" },
          { name: "Beef Bar" },
          { name: "Taproom" },
        ],
      },
    ],
  },
  {
    slug: "south-africa",
    title: "Ten Days in South Africa",
    destination: "South Africa",
    country: "South Africa",
    coords: { lat: -33.9249, lon: 18.4241 },
    duration: "10 days",
    season: "May",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7700609283372666125",
    summary:
      "Cape Town for six days, the Garden Route with a 4x4 safari, and a day in Johannesburg for Soweto.",
    cover: southAfrica,
    gated: false,
    teaser: "",
    tags: ["#TableMountain", "#Soweto", "#VictoriaFalls"],
    notes: ["May is autumn in South Africa, not spring."],
    seeAlso: {
      slug: "victoria-falls",
      kind: "itinerary",
      title: "Victoria Falls, Zambia and Zimbabwe",
      note: "A good little add-on if you have two or three days at the end. It is easy to add from Johannesburg, and it uses both sides of the border.",
    },
    highlights: ["Table Mountain", "Shark diving", "Garden Route", "Safari", "Soweto"],
    days: [
      {
        day: "Day One",
        title: "Sharks, Then Lion's Head",
        activities: [
          { time: "08:00", description: "Shark diving." },
          {
            time: "12:00",
            description:
              "Neighbourgoods Market for lunch. Walk around, eat, and pick up food for the hike.",
            places: [{ name: "Neighbourgoods Market", near: "Cape Town, South Africa" }],
          },
          {
            time: "14:00",
            description:
              "Lion's Head. Three miles, no guide needed. Reckon on an hour and a half up, an hour at the top, and 45 minutes down.",
            places: [{ name: "Lion's Head", near: "Cape Town, South Africa" }],
          },
          {
            time: "19:00",
            description:
              "Dinner at The Dog's Bullocks at YARD. Casual, several restaurants on one front, near the hotel. No reservation needed.",
            places: [{ name: "YARD", near: "Cape Town, South Africa" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Table Mountain",
        activities: [
          {
            time: "08:00",
            description: "Breakfast at Arnolds. Omelettes, pancakes, near the hotel.",
            places: [{ name: "Arnolds", near: "Cape Town, South Africa" }],
          },
          {
            time: "10:00",
            description:
              "Table Mountain. Hike up the Platteklip Gorge trail and take the cable car down. The cable car can close at any moment without notice in heavy winds, so leave enough time to walk down instead.",
            places: [
              { name: "Table Mountain", near: "Cape Town, South Africa" },
              { name: "Platteklip Gorge", near: "Cape Town, South Africa" },
            ],
          },
          {
            time: "16:00",
            description: "Kirstenbosch Botanical Gardens. They close at 17:30.",
            places: [{ name: "Kirstenbosch Botanical Garden", near: "Cape Town, South Africa" }],
          },
          {
            time: "19:30",
            description: "Dinner at Kloof Street House.",
            places: [{ name: "Kloof Street House", near: "Cape Town, South Africa" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Wine Tour",
        activities: [
          {
            time: "07:30",
            description: "Pastries at Oswalds Bakery, which has a huge range of loaves.",
            places: [{ name: "Oswalds Bakery", near: "Cape Town, South Africa" }],
          },
          { time: "08:30", description: "Picked up for the wine tour." },
          { time: "17:00", description: "Rest and change." },
          {
            time: "19:30",
            description: "Dinner at Aubergine.",
            places: [{ name: "Aubergine", near: "Cape Town, South Africa" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Cape of Good Hope and the Penguins",
        activities: [
          {
            time: "08:00",
            description:
              "Breakfast at Liquorice & Lime if you are up early enough, which opens at 07:00. Otherwise back to Oswalds.",
            places: [{ name: "Liquorice & Lime", near: "Cape Town, South Africa" }],
          },
          {
            time: "09:00",
            description: "Picked up for the Cape of Good Hope and penguins tour.",
            places: [
              { name: "Cape of Good Hope", near: "South Africa" },
              { name: "Boulders Beach", near: "Simon's Town, South Africa" },
            ],
          },
          { time: "18:00", description: "Rest and change." },
          {
            time: "19:30",
            description: "Dinner at Bouchon Bistro.",
            places: [{ name: "Bouchon Bistro", near: "Cape Town, South Africa" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Robben Island and Bo-Kaap",
        activities: [
          {
            time: "08:00",
            description: "Breakfast at Egghead Diner.",
            places: [{ name: "Egghead Diner", near: "Cape Town, South Africa" }],
          },
          {
            time: "11:00",
            description:
              "Robben Island tour, about four hours. The ferry leaves the Nelson Mandela Gateway at the V&A Waterfront at 11:00 daily, so arrive ten to fifteen minutes early.",
            places: [
              { name: "Robben Island", near: "Cape Town, South Africa" },
              { name: "Nelson Mandela Gateway", near: "Cape Town, South Africa" },
            ],
          },
          {
            time: "16:00",
            description:
              "Walk Bo-Kaap, all narrow cobbled streets and coloured houses. The Bo-Kaap Museum is worth a stop.",
            places: [
              { name: "Bo-Kaap", near: "Cape Town, South Africa" },
              { name: "Bo-Kaap Museum", near: "Cape Town, South Africa" },
            ],
          },
          {
            time: "20:30",
            description: "Dinner at FYN.",
            places: [{ name: "FYN Restaurant", near: "Cape Town, South Africa" }],
          },
        ],
      },
      {
        day: "Days Six to Eight",
        title: "The Garden Route",
        activities: [
          {
            description:
              "Three Day Garden Route Highlights with 4x4 Safari, a small group tour booked through TripAdvisor.",
            places: [{ name: "Garden Route", near: "South Africa" }],
          },
        ],
      },
      {
        day: "Day Nine",
        title: "Johannesburg and Soweto",
        activities: [
          {
            time: "11:00",
            description: "Try to make the 11:00 guided tour at Constitution Hill. It runs an hour.",
            places: [{ name: "Constitution Hill", near: "Johannesburg, South Africa" }],
          },
          {
            time: "13:00",
            description:
              "Meet in Orlando West, Soweto, about 24 minutes' drive, for the Soweto tour.",
            places: [{ name: "Orlando West", near: "Soweto, South Africa" }],
          },
          {
            time: "17:00",
            description:
              "A quick bite at Sakhumzi, traditional Soweto food, eight minutes' walk from the end of the tour.",
            places: [{ name: "Sakhumzi Restaurant", near: "Soweto, South Africa" }],
          },
          {
            time: "19:00",
            description:
              "Street food and art walking tour, meeting at the City Lodge in Newtown, about twenty minutes' drive.",
            places: [{ name: "Newtown", near: "Johannesburg, South Africa" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "What the cruise covered",
        note: "Booked through ImperialEgypt. Useful to know what is and is not in the price, because the entrance fees are not.",
        items: [
          "Three nights on a five-star Nile cruise from Aswan to Luxor, with a qualified Egyptology guide throughout.",
          "Every meal from lunch on the first day to breakfast on the last: three lunches, three dinners, three breakfasts.",
          "Abu Simbel with an English-speaking guide, both banks at Luxor, and the horse and carriage at Edfu.",
          "Transfers in air-conditioned vehicles, local taxes and porterage.",
          "NOT included: entrance fees to the sites, which came to roughly $110 per person for all of them.",
          "NOT included: tips for the guide, the drivers and the cruise crew.",
          "NOT included: water and drinks on the cruise.",
        ],
      },
      {
        title: "Before you go",
        items: [
          "The Apartheid Museum is closed on Mondays and Tuesdays. We were in Johannesburg on a Tuesday and missed it, so plan that day around it.",
          "The Table Mountain cable car closes without warning in high wind, so always have the time to walk down.",
        ],
      },
    ],
  },
  {
    slug: "victoria-falls",
    title: "Victoria Falls, Zambia and Zimbabwe",
    destination: "Victoria Falls",
    country: "Zimbabwe and Zambia",
    coords: { lat: -17.9243, lon: 25.8572 },
    duration: "4 days",
    season: "May",
    summary:
      "The falls from the Zimbabwe side, rafting from the Zambian side, and high tea in between.",
    cover: victoriaFalls,
    gated: false,
    teaser: "",
    tags: ["#VictoriaFalls", "#Rafting", "#Zambezi"],
    notes: [
      "You cross the border for the rafting, so get a double entry visa for Zimbabwe rather than a single. The US is category B, which is a visa on arrival, but check the current rules and prices before you go.",
      "The entrance fee for the falls is separate from the tour price.",
    ],
    highlights: ["The falls", "Rafting", "Massages", "High tea"],
    days: [
      {
        day: "Day One",
        title: "The Town",
        activities: [
          {
            time: "16:00",
            description: "Late lunch or early dinner at The Three Monkeys.",
            places: [{ name: "The Three Monkeys", near: "Victoria Falls, Zimbabwe" }],
          },
          {
            time: "18:00",
            description:
              "Walk around Victoria Falls town and the Elephant's Walk Shopping Village.",
            places: [
              { name: "Elephant's Walk Shopping Village", near: "Victoria Falls, Zimbabwe" },
            ],
          },
        ],
      },
      {
        day: "Day Two",
        title: "The Falls, Then Massages",
        activities: [
          {
            time: "10:30",
            description:
              "Check in for the tour of the falls, on the Zimbabwe side. The entrance fee is not included in the tour.",
          },
          { time: "13:00", description: "Move on to the massages." },
          {
            time: "15:00",
            description: "Ninety minute massages at the Victoria Falls Safari Lodge.",
            places: [{ name: "Victoria Falls Safari Lodge", near: "Zimbabwe" }],
          },
          {
            time: "19:00",
            description: "Dinner at MaKuwa Kuwa, at the same lodge.",
            places: [{ name: "MaKuwa Kuwa Restaurant", near: "Victoria Falls, Zimbabwe" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Cross to Zambia, Then Back for Tea",
        activities: [
          {
            description:
              "Cross into Zambia. This is the day the double entry visa pays for itself.",
            places: [{ name: "Livingstone", near: "Zambia" }],
          },
          {
            time: "11:00",
            description: "White water rafting on the Zambezi, from the Zambian side.",
            places: [{ name: "Zambezi River", near: "Livingstone, Zambia" }],
          },
          {
            time: "16:00",
            description:
              "Back over to Zimbabwe for high tea at the Victoria Falls Hotel. It's a famous hotel, and you can watch the sunset. It runs 15:00 to 18:00.",
            places: [{ name: "Victoria Falls Hotel", near: "Zimbabwe" }],
          },
          {
            time: "19:00",
            description: "Walk the hotel grounds, and eat again if you are still hungry.",
          },
        ],
      },
    ],
    extras: [
      {
        title: "Worth knowing",
        items: [
          "Skip the sunset cruise. The sun goes down about thirty minutes after you embark, and then you are sitting on a boat in the dark.",
          "Botswana charges its own visa fee if you add a day trip across that border too.",
          "Park and site entrance fees are separate from most tour prices, and they go up. Budget for them on top.",
        ],
      },
    ],
  },
  {
    slug: "stockholm",
    title: "Three Days in Stockholm",
    destination: "Stockholm",
    country: "Sweden",
    coords: { lat: 59.3293, lon: 18.0686 },
    duration: "3 days",
    season: "Summer",
    summary:
      "Gamla Stan on foot, ABBA and a food hall, and a park at ten at night while the sun is still going down.",
    cover: stockholm,
    gated: false,
    teaser: "Almost all of it is walkable.",
    tags: ["#GamlaStan", "#ABBA", "#Fika"],
    notes: [
      "The late evenings only work in summer. At 22:00 the sun is still going down, which is the whole reason for the park at the end of the first night.",
    ],
    highlights: ["Gamla Stan", "Fika", "ABBA", "Food halls"],
    days: [
      {
        day: "Day One",
        title: "Gamla Stan, and a Park at Ten",
        activities: [
          {
            time: "13:00",
            description:
              "Lunch and drinks at Glashuset, about twelve minutes away. On the waterfront, and an easy first stop.",
            places: [{ name: "Glashuset", near: "Stockholm, Sweden" }],
          },
          {
            time: "14:30",
            description:
              "Walk to Gamla Stan through Kungsträdgården, past the Royal Swedish Opera, and over Norrbro with the Royal Palace and Parliament on either side.",
            places: [
              { name: "Kungsträdgården", near: "Stockholm, Sweden" },
              { name: "Royal Swedish Opera", near: "Stockholm, Sweden" },
              { name: "Norrbro", near: "Stockholm, Sweden" },
            ],
          },
          {
            time: "15:00",
            description:
              "Explore Gamla Stan. The cobbled streets and hidden alleys, Stortorget, the Royal Palace.",
            places: [
              { name: "Gamla Stan", near: "Stockholm, Sweden" },
              { name: "Stortorget", near: "Stockholm, Sweden" },
              { name: "Royal Palace", near: "Stockholm, Sweden" },
            ],
          },
          {
            description: "Shops worth going into.",
            places: [
              {
                name: "HildaHilda",
                near: "Stockholm, Sweden",
                note: "Swedish-made textiles and gifts.",
              },
              { name: "Made in Stockholm", near: "Sweden" },
            ],
          },
          {
            description: "Fika.",
            places: [
              { name: "Sundbergs Konditori", near: "Stockholm, Sweden" },
              { name: "Fabrique", near: "Stockholm, Sweden" },
              { name: "Kaffekoppen", near: "Stockholm, Sweden", note: "Overlooking Stortorget." },
            ],
          },
          { time: "17:00", description: "Back to the hotel to freshen up." },
          {
            time: "18:45",
            description: "Cocktails at the Cadier Bar in the Grand Hotel, overlooking the harbour.",
            places: [{ name: "Cadier Bar", near: "Stockholm, Sweden" }],
          },
          {
            time: "20:00",
            description:
              "Dinner at Ångbåtsbryggan, two minutes away. Waterfront, aboard a WWII-era steamboat.",
            places: [{ name: "Ångbåtsbryggan", near: "Stockholm, Sweden" }],
          },
          {
            time: "22:00",
            description:
              "Grab wine, beers or snacks from a convenience store, then walk up to Ivar Los park. Stay half an hour or an hour. The sun will still be going down.",
            places: [{ name: "Ivar Los Park", near: "Stockholm, Sweden" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "A Food Hall, ABBA, and the Match",
        activities: [
          {
            time: "09:45",
            description:
              "Breakfast and coffee at Östermalms Saluhall, one of Stockholm's best-known food halls. About fifteen minutes' walk.",
            places: [{ name: "Östermalms Saluhall", near: "Stockholm, Sweden" }],
          },
          {
            time: "10:45",
            description: "Free time until the museum. Any of these.",
            places: [
              {
                name: "Gamla Stan",
                near: "Stockholm, Sweden",
                note: "Old Town again: Stortorget, shops, coffee.",
              },
              {
                name: "Norrmalm",
                near: "Stockholm, Sweden",
                note: "Shopping. ARKIVET, Zara, H&M, Gina Tricot, Nelly.",
              },
              {
                name: "Vasa Museum",
                near: "Stockholm, Sweden",
                note: "The 17th century warship raised after 333 years underwater. Two minutes from ABBA.",
              },
              { name: "Strandvägen", near: "Stockholm, Sweden", note: "Waterfront walk." },
              { name: "Djurgården", near: "Stockholm, Sweden", note: "Waterfront walk." },
            ],
          },
          {
            time: "12:30",
            description: "ABBA Museum. Book the tickets in advance.",
            places: [{ name: "ABBA The Museum", near: "Stockholm, Sweden" }],
          },
          {
            time: "14:30",
            description: "Lunch and drinks at Strandbryggan, on the water.",
            places: [{ name: "Strandbryggan", near: "Stockholm, Sweden" }],
          },
          { time: "17:00", description: "Back to the hotel to freshen up." },
          {
            time: "19:00",
            description:
              "Rooftop screening of the football at Stockholm Under Stjärnorna, on top of Hotel At Six, two minutes from the hotel. Free entry, and national team shirts are fine but club shirts are not.",
            places: [{ name: "Stockholm Under Stjärnorna", near: "Stockholm, Sweden" }],
          },
          {
            time: "21:30",
            description:
              "Dinner at Pelikan, about twenty minutes by metro. It's a Stockholm institution, doing traditional Swedish food since the early 1900s, and people say it has the best meatballs in the city.",
            places: [{ name: "Pelikan", near: "Stockholm, Sweden" }],
          },
          {
            description: "Out afterwards, if you are still going.",
            places: [
              { name: "SPY Bar", near: "Stockholm, Sweden" },
              {
                name: "Spesso",
                near: "Stockholm, Sweden",
                note: "Rooftop, cocktails, views over the skyline.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Sunday, Left Open",
        activities: [
          {
            description: "Stora Bageriet.",
            places: [{ name: "Stora Bageriet", near: "Stockholm, Sweden" }],
          },
          {
            description:
              "The rest of the Sunday was deliberately left unplanned, and stayed that way.",
          },
        ],
      },
    ],
  },
  {
    slug: "morocco",
    title: "Ten Days in Morocco",
    destination: "Morocco",
    country: "Morocco",
    coords: { lat: 31.6295, lon: -7.9811 },
    duration: "10 days",
    season: "June",
    summary:
      "Marrakech at full tilt, three days in the desert, then Fes, with a day trip up to Chefchaouen.",
    cover: morocco,
    gated: false,
    teaser: "",
    tags: ["#Marrakech", "#Chefchaouen", "#Fes"],
    highlights: ["Hot air balloon", "Medinas", "Hammam", "Jardin Majorelle", "Chefchaouen"],
    days: [
      {
        day: "Day One",
        title: "Guided Marrakech",
        activities: [
          {
            time: "08:30",
            description: "Breakfast and coffee at Bacha Coffee.",
            places: [{ name: "Bacha Coffee", near: "Marrakech, Morocco" }],
          },
          {
            time: "09:30",
            description:
              "Guided tour of Marrakech until 13:30, meeting at the Koutoubia Mosque. It takes in the Jewish Quarter, the souks and the craft workshops, Ben Youssef, a herboriste for the Berber medicines, and Jemaa el-Fnaa.",
            places: [
              { name: "Koutoubia Mosque", near: "Marrakech, Morocco" },
              { name: "Mellah", near: "Marrakech, Morocco" },
              { name: "Ben Youssef Madrasa", near: "Marrakech, Morocco" },
              { name: "Jemaa el-Fnaa", near: "Marrakech, Morocco" },
            ],
          },
          {
            time: "13:30",
            description: "Lunch at Nomad. Try to sit on the rooftop.",
            places: [{ name: "Nomad", near: "Marrakech, Morocco" }],
          },
          {
            time: "15:30",
            description:
              "The Jardin Majorelle and the Yves Saint Laurent museum until 18:00. One to two hours is usual for the garden and the museum together. Buy tickets ahead.",
            places: [
              { name: "Jardin Majorelle", near: "Marrakech, Morocco" },
              { name: "Musée Yves Saint Laurent", near: "Marrakech, Morocco" },
            ],
          },
          {
            time: "19:00",
            description: "Dinner at L'Mida. Rooftop again.",
            places: [{ name: "L'Mida", near: "Marrakech, Morocco" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "A Balloon, a Hammam, and a Show",
        activities: [
          {
            time: "05:00",
            description:
              "Hot air balloon over the Atlas Mountains until 10:00, picked up from the hotel. Breakfast is included.",
            places: [{ name: "Atlas Mountains", near: "Morocco" }],
          },
          { time: "10:00", description: "Nap, and eat if you are hungry." },
          {
            time: "13:00",
            description: "Massages at La Mamounia until 15:00.",
            places: [{ name: "La Mamounia", near: "Marrakech, Morocco" }],
          },
          {
            time: "15:30",
            description: "Afternoon tea at the Royal Mansour until 17:00.",
            places: [{ name: "Royal Mansour", near: "Marrakech, Morocco" }],
          },
          {
            time: "18:30",
            description: "Cocktails at DarDar. Sit on the rooftop.",
            places: [{ name: "DarDar Rooftop", near: "Marrakech, Morocco" }],
          },
          {
            time: "20:00",
            description: "Dinner and a show at Dar Essalam, until 23:00.",
            places: [{ name: "Dar Essalam", near: "Marrakech, Morocco" }],
          },
        ],
      },
      {
        day: "Days Three to Five",
        title: "The Desert",
        activities: [
          {
            description:
              "Three days in the desert: camping, ATVs, and whatever else. There was no real schedule beyond that, on purpose.",
            places: [{ name: "Sahara Desert", near: "Morocco" }],
          },
        ],
      },
      {
        day: "Day Six",
        title: "Into Fes",
        activities: [
          {
            time: "10:00",
            description: "Guided tour of the medina until 13:00, meeting on Rue Talaa Kebira.",
            places: [
              { name: "Fes el Bali", near: "Fes, Morocco" },
              { name: "Talaa Kebira", near: "Fes, Morocco" },
            ],
          },
          { time: "13:00", description: "Brunch near the medina, or a food tour." },
          {
            time: "17:00",
            description: "Cooking class and market tour, also starting on Talaa Kebira.",
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Chefchaouen",
        activities: [
          {
            time: "08:00",
            description:
              "Day trip to Chefchaouen. Twelve hours all in, with about three hours' driving each way and stops on the route.",
            places: [{ name: "Chefchaouen", near: "Morocco" }],
          },
        ],
      },
      {
        day: "Day Eight",
        title: "Bread, Tanneries, and a Rooftop",
        activities: [
          {
            time: "10:00",
            description:
              "Bread making and a two course lunch in the garden, at the Ruined Garden in the riad.",
            places: [{ name: "The Ruined Garden", near: "Fes, Morocco" }],
          },
          {
            time: "13:30",
            description: "Explore and lounge until 17:00.",
            places: [
              {
                name: "Dar el Makhzen",
                near: "Fes, Morocco",
                note: "The doors of the Royal Palace.",
              },
              {
                name: "Chouara Tannery",
                near: "Fes, Morocco",
                note: "Leather goods, and a horrid smell.",
              },
              {
                name: "Art Naji",
                near: "Fes, Morocco",
                note: "Thirty minute free tour of the ceramics studio.",
              },
            ],
          },
          {
            time: "17:00",
            description: "Sunset cocktails at the Jungle Bar at Hotel Sahrai, then a nice dinner.",
            places: [{ name: "Hotel Sahrai", near: "Fes, Morocco" }],
          },
        ],
      },
    ],
  },
  {
    slug: "cardiff",
    title: "Two Days in Cardiff",
    destination: "Cardiff",
    country: "Wales",
    coords: { lat: 51.4816, lon: -3.1791 },
    duration: "2 days",
    season: "Early Autumn",
    summary:
      "The castle, the arcades and Cardiff Bay on the first day, then Pen y Fan and a rugby game on the second.",
    cover: cardiff,
    gated: false,
    teaser: "An easy weekend from London by train.",
    tags: ["#PenYFan", "#CardiffBay", "#Rugby"],
    highlights: ["Rugby", "Cardiff Castle", "Pen y Fan", "Live music"],
    days: [
      {
        day: "Day One",
        title: "The Castle, the Arcades, and the Bay",
        activities: [
          {
            time: "12:30",
            description: "Lunch at Fresh the Baguette Bar.",
            places: [{ name: "Fresh the Baguette Bar", near: "Cardiff, Wales" }],
          },
          {
            time: "13:30",
            description: "Cardiff Castle tour.",
            places: [{ name: "Cardiff Castle" }],
          },
          {
            time: "15:00",
            description: "Walk through central Cardiff.",
            places: [
              { name: "Bute Park", near: "Cardiff, Wales" },
              { name: "Cardiff Market", near: "Wales" },
              { name: "Cardiff Victorian Arcades", near: "Wales" },
            ],
          },
          {
            time: "19:00",
            description:
              "The Dock, for live music in Cardiff Bay. The Millennium Centre is right there, and so are a lot of restaurants and shops.",
            places: [
              { name: "The Dock", near: "Cardiff Bay, Wales" },
              { name: "Wales Millennium Centre", near: "Cardiff, Wales" },
              { name: "Cardiff Bay", near: "Wales" },
            ],
          },
          { time: "20:00", description: "Dinner somewhere in Cardiff Bay." },
          { description: "Drinks, and out, at leisure." },
        ],
      },
      {
        day: "Day Two",
        title: "Pen y Fan, Then the Rugby",
        activities: [
          { time: "09:00", description: "Quick coffee and breakfast." },
          { time: "10:00", description: "Uber or train out towards the hike." },
          {
            time: "11:00",
            description: "Pen y Fan. About a three hour round trip at a steady pace.",
            places: [{ name: "Pen y Fan", near: "Brecon Beacons, Wales" }],
          },
          { time: "15:00", description: "Back to Cardiff." },
          { time: "17:00", description: "Late pub lunch." },
          {
            description: "A rugby game at Cardiff Arms Park.",
            places: [{ name: "Cardiff Arms Park", near: "Wales" }],
          },
          { description: "Explore at leisure afterwards." },
        ],
      },
    ],
  },
  {
    slug: "peru",
    title: "Seven Days in Peru",
    destination: "Peru",
    country: "Peru",
    coords: { lat: -13.5319, lon: -71.9675 },
    duration: "7 days",
    season: "Late November",
    summary:
      "Rainbow Mountain at dawn, the two day Inca Trail into Machu Picchu, then Lima for the food.",
    cover: peru,
    gated: false,
    teaser: "",
    tags: ["#MachuPicchu", "#IncaTrail", "#RainbowMountain"],
    notes: [
      "Cusco sits at about 3,400 metres and Rainbow Mountain tops out above 5,000. This itinerary goes up on the second morning, which is fast. If you have the days, put a spare one in Cusco before the mountain, drink the coca tea, and see a doctor at home about altitude tablets before you fly.",
      "Two of the three big things here were booked in advance and both sell out: the Inca Trail permits are released months ahead and the Huayna Picchu slots go with them.",
    ],
    highlights: ["Machu Picchu", "Inca Trail", "Rainbow Mountain", "Lima food"],
    days: [
      {
        day: "Day One",
        title: "Up to Cusco",
        activities: [
          {
            time: "08:35",
            description:
              "Pack light: the trek company gives you a duffel and you leave the rest in Cusco anyway.",
            places: [{ name: "Cusco", near: "Peru" }],
          },
          {
            description:
              "Stay near the Plaza de Armas, and do nothing strenuous on the first day. The altitude usually hits about an hour after you arrive.",
            places: [{ name: "Plaza de Armas", near: "Cusco, Peru" }],
          },
          {
            description:
              "Free afternoon to walk the centre slowly: the cathedral, the Jesuit church on the far side of the square, and the Inca stonework in the streets behind it.",
            places: [
              { name: "Cusco Cathedral", near: "Cusco, Peru" },
              { name: "Iglesia de la Compañía de Jesús", near: "Cusco, Peru" },
              { name: "Hatun Rumiyoc", near: "Cusco, Peru" },
            ],
          },
          {
            description:
              "Early night. The Rainbow Mountain pickup is between 04:35 and 04:55 and they collect you from your hotel.",
          },
        ],
      },
      {
        day: "Day Two",
        title: "Rainbow Mountain",
        activities: [
          {
            time: "04:30",
            description:
              "Picked up from the hotel for the full day trip to Rainbow Mountain, which is Vinicunca, at 5,036 metres. The colours are real minerals in the rock and the walk up is short but brutal on no acclimatisation. Round trip transport and the drop back at your hotel are in the price. Booked through Viator and run by Chullos Travel Peru, so search Viator for the full day Rainbow Mountain excursion to Vinicunca.",
            places: [
              {
                name: "Rainbow Mountain",
                url: "https://www.viator.com/searchResults/all?text=Rainbow+Mountain+Vinicunca+full+day",
              },
            ],
          },
          {
            description:
              "Back in Cusco by evening. Second night in the same hotel, and pack the duffel for the trail.",
          },
        ],
      },
      {
        day: "Day Three",
        title: "The Inca Trail, Day One",
        activities: [
          {
            description:
              "Collected from the hotel for the two day Short Inca Trail with camping, run by Alpaca Expeditions as a group departure. Two days and one night in tents, rather than the version of the same trek that puts you in a hotel in Aguas Calientes. Their office is on Heladeros Street in Cusco if you need to find them in person.",
            places: [
              {
                name: "Short Inca Trail",
                url: "https://www.alpacaexpeditions.com/inca-trail-with-camping-2d1n/",
              },
            ],
          },
          {
            description:
              "Worth adding when you book: an air mattress, walking sticks and a sleeping bag rental, plus the Huayna Picchu permit. Write Lexie - Free rentals in Special Requests or Additional Comments and Alpaca adds the rental equipment free. The permit is a separate ticket with its own limited slots, so add it at the time or you will not get it later.",
          },
          { description: "Night in camp on the trail." },
        ],
      },
      {
        day: "Day Four",
        title: "Machu Picchu, and Huayna Picchu",
        activities: [
          {
            description:
              "The second day finishes at Machu Picchu on foot, coming in over the last stretch of trail rather than up the switchback road on a bus.",
            places: [{ name: "Machu Picchu", near: "Cusco Region, Peru" }],
          },
          {
            description:
              "The Huayna Picchu climb, on the permit added to the trek booking. It is the steep green peak in every photograph of the ruins, and it looks back down on them.",
            places: [{ name: "Huayna Picchu", near: "Machu Picchu, Peru" }],
          },
          {
            description:
              "Back to Cusco that evening. Somewhere with a proper bath is worth the money on this particular night.",
          },
        ],
      },
      {
        day: "Day Five",
        title: "Cusco to Lima",
        activities: [
          { time: "13:55", description: "Fly down to Lima." },
          {
            description:
              "Into Miraflores, which is where you want to be based: walkable, on the cliffs, and ten minutes from most of the eating.",
            places: [{ name: "Miraflores", near: "Lima, Peru" }],
          },
          {
            time: "18:00",
            description: "A table at Carnaval in San Isidro to start.",
            places: [
              {
                name: "Carnaval",
                near: "San Isidro, Lima, Peru",
                note: "One of the best known cocktail bars in the city, and it takes reservations, which is the only sane way to get in.",
              },
            ],
          },
        ],
      },
      {
        day: "Day Six",
        title: "Lima, for Lunch and Dinner",
        activities: [
          {
            description:
              "Lunch at La Mar Cebichería. It is a cevichería, it does not open in the evening, and it does not take bookings, so lunch is the whole plan.",
            places: [{ name: "La Mar Cebichería", near: "Miraflores, Lima, Peru" }],
          },
          {
            description:
              "Dinner at Maido, the Nikkei restaurant that put Japanese-Peruvian cooking on the map. Book this one weeks out, not days.",
            places: [{ name: "Maido", near: "Miraflores, Lima, Peru" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Booking the two big days",
        note: "Both of these were locked in long before the trip, and neither is something you can turn up and buy.",
        items: [
          "Rainbow Mountain went through Viator, with Chullos Travel Peru operating it. Hotel pickup and drop-off are included, which matters at 04:35.",
          "The Short Inca Trail went direct with Alpaca Expeditions, on their two day camping departure, as a group service rather than private.",
          "The Huayna Picchu permit was added to the trek booking. Machu Picchu entry and the train came through the same booking rather than being bought separately.",
        ],
      },
      {
        title: "Altitude",
        items: [
          "Cusco is around 3,400 metres and Rainbow Mountain is above 5,000. Going up the mountain on your second morning in the country is doable but not comfortable.",
          "Coca tea is everywhere and free in most hotel lobbies. It helps a little.",
          "Talk to a doctor at home about altitude sickness tablets before you fly, rather than buying something over a counter in Cusco.",
        ],
      },
    ],
  },
  {
    slug: "saudi-arabia",
    title: "Six Days in Saudi Arabia",
    destination: "Saudi Arabia",
    country: "Saudi Arabia",
    coords: { lat: 24.7136, lon: 46.6753 },
    duration: "6 days",
    season: "February",
    summary:
      "Riyadh and Diriyah, a night in the desert, then AlUla for Hegra, Maraya and the stars.",
    cover: saudiArabia,
    gated: true,
    bmcUrl: "https://buymeacoffee.com/lexiemeskouris/e/584145",
    teaser:
      "Three days in Riyadh and three in AlUla, run as a London Business School trek. Some of it you can copy exactly. One day of it you cannot, and I have said so where it comes up.",
    tags: ["#Hegra", "#AlUla", "#EmptyQuarter"],
    notes: [
      "This ran as a student trek through London Business School, arranged with the Saudi government. That matters for one day in particular: the visit to Shaybah in the Empty Quarter is not something you can book yourself, at any price. Everything else here is open to anyone.",
      "Tipping is not customary, though nobody minds it. Digital payments are the norm and Apple Pay works essentially everywhere. Plugs are type G, the same as the UK.",
      "February is the right time to go. Riyadh ran from about 25C down to 12C, AlUla from 22C down to 7C, so bring a jacket for the evenings and the desert.",
    ],
    highlights: ["AlUla", "Desert camp", "Hegra", "Diriyah", "Stargazing"],
    days: [
      {
        day: "Day One",
        title: "Diriyah and Riyadh",
        activities: [
          { time: "09:00", description: "Breakfast, if you want it." },
          {
            time: "10:00",
            description:
              "Masmak Fort, then Souq Al Zal. The fort is tied to the story of the country's unification, and the souq behind it has been trading for a very long time.",
            places: [
              { name: "Masmak Fort", near: "Riyadh, Saudi Arabia" },
              { name: "Souq Al Zal", near: "Riyadh, Saudi Arabia" },
            ],
          },
          {
            time: "15:00",
            description: "Lunch at Najdi Village.",
            places: [{ name: "Najdi Village", near: "Riyadh, Saudi Arabia" }],
          },
          {
            time: "17:30",
            description:
              "A tour of Diriyah, finishing at At-Turaif, the mud-brick UNESCO quarter where Saudi Arabia begins.",
            places: [
              { name: "Diriyah", near: "Riyadh, Saudi Arabia" },
              { name: "At-Turaif", near: "Riyadh, Saudi Arabia" },
            ],
          },
          {
            time: "21:30",
            description: "Dinner on Bujairi Terrace, looking across at At-Turaif lit up.",
            places: [{ name: "Bujairi Terrace", near: "Riyadh, Saudi Arabia" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "How this trip was put together",
        note: "Worth being clear about, because a lot of it is repeatable and one day of it is not.",
        items: [
          "It ran as a student trek through London Business School: fifty students, seven days, two internal flights, three nights in Riyadh and three in AlUla.",
          "Accommodation, internal flights, transport, airport transfers and all meals were included. Flights into and out of Saudi Arabia, the visa and insurance were not.",
          "The Shaybah day in the Empty Quarter was arranged with the Saudi government through the school. It cannot be booked by the public, through any operator, so plan the rest of your trip without it.",
          "Everything else on this page is open to anyone: Diriyah, the desert camp, Hegra, Maraya, Joud Farm and the stargazing.",
        ],
      },
      {
        title: "Getting around",
        items: [
          "Uber, Careem and the Riyadh metro all work in the city, and are the easiest way to move around on your own time.",
          "AlUla is spread out and you will want transport arranged rather than assuming you can hail something.",
        ],
      },
      {
        title: "Riyadh, if you have extra days",
        note: "Some of these need tickets in advance, and WeBook.com is where most of them are sold.",
        places: [
          {
            name: "Edge of the World",
            near: "Riyadh, Saudi Arabia",
            note: "A cliff escarpment out of the city with panoramic desert views and a walk along the top. The one to do if you only do one.",
          },
          {
            name: "Sky Bridge, Kingdom Centre",
            near: "Riyadh, Saudi Arabia",
            note: "The observation deck slung between the towers, with 360 degree views over the skyline.",
          },
          {
            name: "Diplomatic Quarter",
            near: "Riyadh, Saudi Arabia",
            note: "Embassies, green space, walking trails and some really good architecture. It's quiet, and that's the appeal.",
          },
          {
            name: "VIA Riyadh",
            near: "Riyadh, Saudi Arabia",
            note: "Upscale complex with boutiques, fine dining and cinemas.",
          },
          {
            name: "KAFD",
            near: "Riyadh, Saudi Arabia",
            note: "The financial district, and worth seeing for the architecture alone.",
          },
          {
            name: "Boulevard World",
            near: "Riyadh, Saudi Arabia",
            note: "A themed entertainment area split up by country, each with its own food and shows.",
          },
          {
            name: "Boulevard Riyadh City",
            near: "Riyadh, Saudi Arabia",
            note: "The big entertainment area, with restaurants, cafes, live shows and events.",
          },
          {
            name: "Sports Boulevard",
            near: "Riyadh, Saudi Arabia",
            note: "Cycling and walking trails running across the city, for a morning that is not indoors.",
          },
          {
            name: "Six Flags Qiddiya",
            near: "Riyadh, Saudi Arabia",
            note: "The theme park, with several record-breaking coasters.",
          },
          {
            name: "The Groves",
            near: "Riyadh, Saudi Arabia",
            note: "Outdoor dining and greenery, on the upscale end.",
          },
        ],
      },
      {
        title: "Riyadh restaurants, sit down",
        note: "From the trek's own list. Grouped the way it grouped them.",
        places: [
          {
            name: "Aseeb",
            near: "Riyadh, Saudi Arabia",
            note: "Modern Saudi, traditional flavours with a modern spin.",
          },
          {
            name: "Takya",
            near: "Riyadh, Saudi Arabia",
            note: "Upscale Saudi, cooking from old regional recipes.",
          },
          {
            name: "Taleed",
            near: "Riyadh, Saudi Arabia",
            note: "Fine dining Saudi, modern takes on local cooking.",
          },
          {
            name: "Villa Mamas",
            near: "Riyadh, Saudi Arabia",
            note: "Middle Eastern, Bahraini home-style cooking done properly.",
          },
          {
            name: "Signor Sassi",
            near: "Riyadh, Saudi Arabia",
            note: "Fancy Italian, classic dishes, a nice dining room.",
          },
          {
            name: "Agio",
            near: "Riyadh, Saudi Arabia",
            note: "Italian, traditional cooking in a modern setting.",
          },
          {
            name: "MAMO Michelangelo",
            near: "Riyadh, Saudi Arabia",
            note: "High-end Italian, Mediterranean end of it.",
          },
          {
            name: "Myazu",
            near: "Riyadh, Saudi Arabia",
            note: "High-end Japanese, traditional food plated in a modern way.",
          },
          {
            name: "Kuruu",
            near: "Riyadh, Saudi Arabia",
            note: "Modern Japanese, clean and minimal.",
          },
          {
            name: "Kayzo",
            near: "Riyadh, Saudi Arabia",
            note: "Contemporary Japanese, creative with the classics.",
          },
          {
            name: "Sasani",
            near: "Riyadh, Saudi Arabia",
            note: "Persian, traditional Iranian cooking, rich and aromatic.",
          },
          {
            name: "Koojah",
            near: "Riyadh, Saudi Arabia",
            note: "Modern Persian, built on regional Iranian recipes.",
          },
          {
            name: "LPM",
            near: "Riyadh, Saudi Arabia",
            note: "French Riviera style Mediterranean, on the dressy side.",
          },
          {
            name: "Le Maschou",
            near: "Riyadh, Saudi Arabia",
            note: "A classic French bistro, rich and cosy.",
          },
        ],
      },
      {
        title: "Riyadh, faster and cheaper",
        places: [
          { name: "PrimeCut", near: "Riyadh, Saudi Arabia", note: "Premium Angus beef burgers." },
          {
            name: "Section-B",
            near: "Riyadh, Saudi Arabia",
            note: "Homegrown burgers, made to order, never frozen.",
          },
          {
            name: "Marble",
            near: "Riyadh, Saudi Arabia",
            note: "Farm-to-table grill, steak cooked over an open fire.",
          },
          {
            name: "Nora Smashed Burgers",
            near: "Riyadh, Saudi Arabia",
            note: "No frills takeaway, crispy-edged Wagyu-blend patties.",
          },
          {
            name: "Jon & Vinny's",
            near: "Riyadh, Saudi Arabia",
            note: "Wood-fired pizza and fresh pasta.",
          },
          {
            name: "911 Pizza",
            near: "Riyadh, Saudi Arabia",
            note: "Thin crust, Chicago style, toppings edge to edge.",
          },
          {
            name: "Mama Noura",
            near: "Riyadh, Saudi Arabia",
            note: "Chicken shawarma, broasted chicken and fresh juice. The everyday one.",
          },
          {
            name: "Shiro",
            near: "Riyadh, Saudi Arabia",
            note: "Sushi, sashimi, noodles and tempura, in a quiet room.",
          },
          {
            name: "The Boiling Crab",
            near: "Riyadh, Saudi Arabia",
            note: "Seafood boiled in a bag with a lot of sauce.",
          },
          {
            name: "Twina",
            near: "Riyadh, Saudi Arabia",
            note: "Daily fresh seafood: calamari, shrimp, salted hamour.",
          },
          {
            name: "Pao",
            near: "Riyadh, Saudi Arabia",
            note: "Acai bowls, juices and sandwiches, for when you want something lighter.",
          },
        ],
      },
      {
        title: "Riyadh coffee and bakeries",
        note: "Names from the trek's own list, no ranking implied.",
        items: [
          "Coffee: Camel Step, Wacafe, Peaks, Good Neighbor, Veni, Green Bottle, Archi, Infuse, Pick, IOTA.",
          "Bakeries and brunch: Flour & Firewood, Mama's Bagel, Lunchroom, Easy Bakery, Croi Bakehouse, Brunch and Cake, Urth Caffe, Secret Pot Bakery, Lazy Cat, Beit Al Mounah.",
        ],
      },
      {
        title: "Riyadh dining hubs",
        note: "Useful when you cannot decide, or when the group cannot.",
        places: [
          {
            name: "Al Mamlaka Social Dining",
            near: "Riyadh, Saudi Arabia",
            note: "A food hall in the Kingdom Centre with 21 kitchens across 13 cuisines.",
          },
          {
            name: "Laysen Valley",
            near: "Riyadh, Saudi Arabia",
            note: "Mixed-use development with high-end international restaurants and cafes.",
          },
          {
            name: "The Zone",
            near: "Riyadh, Saudi Arabia",
            note: "Outdoor shopping and dining on Al Takhassousi Street, half indoors and half out.",
          },
          { name: "U Walk", near: "Riyadh, Saudi Arabia" },
          { name: "Roshn Front", near: "Riyadh, Saudi Arabia" },
        ],
      },
      {
        title: "A few words that go a long way",
        items: [
          "Ahlan, hello. Al salam alykum, peace be upon you, and w alykum al salam back.",
          "Shukran, thank you. Law samaht or law samahti, please. Ma'a salama, goodbye.",
          "Yalla, let's go, which you will hear constantly and start saying yourself.",
        ],
      },
    ],
  },
  {
    slug: "slovenia",
    title: "Three Days in Ljubljana and Lake Bled",
    destination: "Ljubljana",
    country: "Slovenia",
    coords: { lat: 46.0569, lon: 14.5058 },
    duration: "3 days",
    season: "Autumn",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7699872648536280333",
    summary:
      "Two evenings in Ljubljana either side of a day trip to Lake Bled, with cream cake and the view over the island.",
    teaser: "Based in Ljubljana.",
    cover: slovenia,
    gated: false,
    tags: ["#LakeBled", "#Ljubljana", "#BledCake"],
    highlights: ["Lake Bled", "Bled cake", "Ljubljana", "Hiking"],
    days: [
      {
        day: "First Night",
        title: "Dinner at Julija",
        activities: [
          {
            time: "20:00",
            description:
              "Dinner at Julija. Unbelievable. Get the soup of the day, any of the beef dishes and the shrimp risotto.",
            places: [{ name: "Julija", near: "Ljubljana, Slovenia" }],
          },
        ],
      },
      {
        day: "Day One",
        title: "Lake Bled",
        activities: [
          { description: "Wake up at leisure." },
          {
            description:
              "Brunch at Lana's Corner. Nothing to write home about, and the matcha was the worst I have ever had. You could do better.",
            places: [{ name: "Lana's Corner", near: "Ljubljana, Slovenia" }],
          },
          {
            description: "Bus to Lake Bled, an hour to an hour and a half.",
            places: [{ name: "Lake Bled", near: "Slovenia" }],
          },
          { description: "Walk around the lake at an easy pace. The full circuit is 6 km." },
          {
            description:
              "Climb Ojstrica for the classic view over the island. It is short but steep, about twenty minutes uphill through the forest.",
            places: [{ name: "Ojstrica", near: "Bled, Slovenia" }],
          },
          {
            time: "16:00",
            description: "Wine and cheese at Čarman.",
            places: [{ name: "Wine Bar & Restaurant Čarman", near: "Bled, Slovenia" }],
          },
          {
            description: "Traditional Bled cream cake at Zima.",
            places: [{ name: "Slaščičarna Zima", near: "Bled, Slovenia" }],
          },
          { description: "Bus back to Ljubljana, an hour to an hour and a half." },
          {
            description: "Dinner at Aftr.",
            places: [{ name: "Aftr", near: "Ljubljana, Slovenia" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "The Old Town",
        activities: [
          { description: "Wake up at leisure." },
          {
            description: "Matcha at Munchies. Skip Stow 2 Go: my latte there was atrocious.",
            places: [{ name: "Munchies", near: "Ljubljana, Slovenia" }],
          },
          {
            description:
              "Brunch at Le Petit Café. Cute, a little out of the way, and the croque monsieur was a let-down, but it did the trick hungover. Afterwards we walked the canals nearby and found £5 drinks.",
            places: [{ name: "Le Petit Café", near: "Ljubljana, Slovenia" }],
          },
          {
            description:
              "Walk through the Old Town, past the Franciscan Church and over the Triple Bridge.",
            places: [
              { name: "Franciscan Church of the Annunciation", near: "Ljubljana, Slovenia" },
              { name: "Triple Bridge", near: "Ljubljana, Slovenia" },
            ],
          },
          {
            description: "Snacks at the Central Market.",
            places: [{ name: "Central Market", near: "Ljubljana, Slovenia" }],
          },
          {
            description: "The Dragon Bridge.",
            places: [{ name: "Dragon Bridge", near: "Ljubljana, Slovenia" }],
          },
        ],
      },
    ],
    extras: [
      {
        title: "Other dinners",
        places: [
          { name: "Landerik", near: "Ljubljana, Slovenia" },
          { name: "Breg", near: "Ljubljana, Slovenia" },
        ],
      },
      {
        title: "Late night food",
        places: [
          {
            name: "Burek Olimpija",
            near: "Ljubljana, Slovenia",
            note: "Delicious. Open 24 hours, very cheap, and a million flavours.",
          },
        ],
      },
    ],
  },
  {
    slug: "romania",
    title: "Four Days in Brașov and Bucharest",
    destination: "Brașov",
    country: "Romania",
    coords: { lat: 45.5152, lon: 25.3672 },
    duration: "4 days",
    season: "Autumn",
    tiktok: "https://www.tiktok.com/@lexiemesko/video/7702860780349230349",
    summary:
      "Halloween at Bran Castle, with a day in Brașov before it and a day in Bucharest after.",
    teaser:
      "Built around the Halloween party at Bran Castle, which was obviously the main attraction. Brașov was adorable. Bucharest was not my favourite city.",
    cover: romania,
    gated: false,
    tags: ["#Halloween", "#BranCastle", "#Brasov"],
    notes: [
      "The party only happens on Halloween, so the whole trip hangs off 31 October.",
      "I only needed two nights here. The third was excessive.",
      "Pre-book your transport to and from the party. Taxis out at Bran are very hard to come by.",
    ],
    highlights: ["Halloween", "Bran Castle", "Brașov", "Bucharest"],
    days: [
      {
        day: "Day One",
        title: "Brașov, Then Halloween at Bran Castle",
        activities: [
          { description: "Wake up at leisure." },
          {
            description: "Breakfast at Brunch House on Piața Sfatului.",
            places: [{ name: "Brunch House", near: "Brașov, Romania" }],
          },
          {
            description: "Walk the old town.",
            places: [
              { name: "Piața Sfatului", near: "Brașov, Romania" },
              { name: "Black Church", near: "Brașov, Romania" },
              { name: "Strada Sforii", near: "Brașov, Romania" },
              { name: "Catherine's Gate", near: "Brașov, Romania" },
              { name: "White Tower", near: "Brașov, Romania", note: "Walk up for the view." },
              {
                name: "Black Tower",
                near: "Brașov, Romania",
                note: "Another viewpoint over the old town.",
              },
            ],
          },
          { time: "15:00", description: "Back to the Airbnb to rest and get ready for Halloween." },
          {
            time: "18:00",
            description:
              "Adrian picks you up in his minivan in Brașov and drives you to Bran. 20 euro each, round trip.",
            places: [
              {
                name: "Adrian, Taxi Brașov",
                url: "https://wa.me/40747928060",
                note: "WhatsApp +40 747 928 060. Book him ahead for both directions.",
              },
            ],
          },
          {
            time: "19:00",
            description:
              "The castle tour. The Blood Moon ticket lets you pick an 18:00 or 19:00 slot. We took 19:00 to leave enough time to get ready. The tour is really lame and kitschy, but don't let that deter you.",
            places: [{ name: "Bran Castle", near: "Bran, Romania" }],
          },
          {
            description:
              "The neighbourhood at the base of the castle: stands to eat and drink, DJs, and last-minute Halloween costumes. Everyone goes all out on their costumes.",
            places: [
              {
                name: "Restaurant Panoramic",
                near: "Bran, Romania",
                note: "Or a drink anywhere near the castle.",
              },
            ],
          },
          {
            time: "21:00",
            description:
              "The party in the tent. It is heated and there is a free coat check, and it wasn't super cold out anyway, with a few drinks keeping us warm. The DJs are incredible, and the music only stops for the costume contest. It is not an open bar, but drinks are really inexpensive: a couple of dollars for a shot, and under $10 for a double vodka soda.",
          },
          {
            description:
              "There is one food truck outside the party, and the rest of the food is down in the neighbourhood. That truck does smash burgers and they were delicious. We indulged so we'd have the fuel to keep going.",
          },
          {
            description:
              "The crowd is a mixed bag, all ages and all backgrounds, and everyone is super social. Lots of Americans: the ones in their 20s mostly live somewhere in Europe and fly in for it, and the ones around 50 come over from the States out of a pure passion for Halloween. We met Bulgarians too.",
          },
          {
            time: "02:30",
            description:
              "Adrian picks you up. He gives an hour's flexibility either way. We easily could have stayed longer.",
          },
        ],
      },
      {
        day: "Day Two",
        title: "Train to Bucharest",
        activities: [
          {
            description: "Coffee at UP Specialty Coffee x Brunch before you leave Brașov. It was unbelievable.",
            places: [{ name: "UP Specialty Coffee x Brunch", near: "Brașov, Romania" }],
          },
          {
            description:
              "Train to Bucharest. Be flexible on times: on peak weekends the train can sell out, and we had to wait half an hour for the next one.",
          },
          {
            description: "Stay at the InterContinental Athénée Palace.",
            places: [
              { name: "InterContinental Athénée Palace Bucharest", near: "Bucharest, Romania" },
            ],
          },
          {
            description: "Walk the city, ending in the Old Town.",
            places: [
              { name: "Romanian Athenaeum", near: "Bucharest, Romania" },
              { name: "Calea Victoriei", near: "Bucharest, Romania" },
              { name: "Revolution Square", near: "Bucharest, Romania" },
              { name: "Macca-Villacrosse Passage", near: "Bucharest, Romania" },
              { name: "Stavropoleos Monastery", near: "Bucharest, Romania" },
              { name: "Cărturești Carusel", near: "Bucharest, Romania" },
              { name: "Cișmigiu Gardens", near: "Bucharest, Romania" },
            ],
          },
          { description: "Back to the hotel to get ready for dinner." },
          {
            description: "Drinks first, if you want them.",
            places: [{ name: "Linea / Closer to the Moon", near: "Bucharest, Romania" }],
          },
          {
            time: "20:00",
            description: "Dinner at Hanu' lui Manuc.",
            places: [{ name: "Hanu' lui Manuc", near: "Bucharest, Romania" }],
          },
          {
            time: "22:00",
            description: "Drinks around Calea Victoriei or the Old Town, if you're still going.",
          },
        ],
      },
    ],
    extras: [
      {
        title: "Also in Bucharest",
        places: [
          {
            name: "Sharkia",
            near: "Park Inn by Radisson, Bucharest, Romania",
            note: "Another dinner option, in the Park Inn by Radisson.",
          },
        ],
      },
    ],
  },
];

/**
 * The place an itinerary covers, from its title: "Six Days in Tuscany and
 * Cinque Terre" becomes "Tuscany and Cinque Terre". Home page cards show this,
 * since the length is already in the duration chip.
 */
export function placeName(title: string): string {
  const place = title.replace(/^\S+ (Days?|Nights?) in /, "");
  return place.charAt(0).toUpperCase() + place.slice(1);
}

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
