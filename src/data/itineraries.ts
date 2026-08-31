import sanSebastian from "@/assets/san-sebastian.jpg";
import tunisia from "@/assets/tunisia.svg";
import berlin from "@/assets/berlin.svg";
import taipei from "@/assets/taipei.svg";
import amsterdam from "@/assets/amsterdam.svg";
import nashville from "@/assets/nashville.svg";
import paris from "@/assets/paris.svg";
import copenhagen from "@/assets/copenhagen.svg";
import budapest from "@/assets/budapest.svg";
import thailand from "@/assets/thailand.svg";
import singapore from "@/assets/singapore.svg";
import vietnam from "@/assets/vietnam.svg";
import cambodia from "@/assets/cambodia.svg";
import vienna from "@/assets/vienna.svg";
import ireland from "@/assets/ireland.svg";
import mallorca from "@/assets/mallorca.svg";
import maine from "@/assets/maine.svg";
import berkshires from "@/assets/berkshires.svg";
import milan from "@/assets/milan.svg";
import edinburgh from "@/assets/edinburgh.svg";
import brussels from "@/assets/brussels.svg";
import switzerland from "@/assets/switzerland.svg";
import lisbon from "@/assets/lisbon.svg";
import ecuador from "@/assets/ecuador.svg";
import japan from "@/assets/japan.svg";
import mexicoCity from "@/assets/mexico-city.svg";
import madeira from "@/assets/madeira.svg";
import helsinki from "@/assets/helsinki.svg";
import egypt from "@/assets/egypt.svg";
import istanbul from "@/assets/istanbul.svg";
import krakow from "@/assets/krakow.svg";
import tuscany from "@/assets/tuscany.svg";
import tromso from "@/assets/tromso.svg";
import seoul from "@/assets/seoul.svg";
import malta from "@/assets/malta.svg";

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
  cover: string;
  gated: boolean;
  /** A short intro shown for both free and gated itineraries. */
  teaser: string;
  /** Short food/activity hashtags shown as chips on feed cards. */
  tags: string[];
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
      "Two beaches, two hills, and as many pintxos bars as three nights allow. Basque country at full tilt.",
    cover: sanSebastian,
    gated: false,
    teaser:
      "San Sebastián is small enough to walk and dense enough that you never stop eating. This route climbs both headlands, swims both beaches, and spends every evening standing at a bar with a plate in one hand.",
    tags: ["#Pintxos", "#LaConcha", "#BasqueCheesecake"],
    highlights: [
      "Pintxos hopping through the Old Town, two nights running",
      "Monte Urgull at golden hour with a drink at the top",
      "Monte Igueldo's funicular, tower and clifftop amusement park",
      "Swimming at La Concha, Zurriola and Ondarreta",
      "Tortilla at Bar Antonio, first thing",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late, Sleep in the Old Town",
        activities: [
          {
            time: "21:00",
            description: "Land at Bilbao Airport.",
            places: [{ name: "Bilbao Airport", near: "Bilbao, Spain" }],
          },
          { description: "Bus from Bilbao to San Sebastián." },
          {
            description: "Check in and stay in Parte Vieja, the Old Town - everything below is walkable from there.",
            places: [{ name: "Parte Vieja" }],
          },
        ],
      },
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
            description: "Pintxos lunch at La Cuchara de San Telmo.",
            places: [{ name: "La Cuchara de San Telmo" }],
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
        title: "Tortilla, Monte Igueldo, and Zurriola",
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
            places: [
              { name: "Monte Igueldo Tower" },
              { name: "Monte Igueldo Amusement Park" },
            ],
          },
          {
            description: "Lunch at Ganbara, Anthony Bourdain's favourite spot.",
            places: [{ name: "Ganbara" }],
          },
          { description: "Beach time at Zurriola.", places: [{ name: "Zurriola" }] },
          { description: "Shower and change." },
          {
            time: "20:00",
            description: "Pintxos hopping, round two.",
            places: [
              { name: "Bar Sport" },
              { name: "Lanperna" },
              { name: "La Viña", note: "For the Basque cheesecake." },
              { name: "Gandarias" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One Last Swim, Then the Airport",
        activities: [
          { description: "Check out and leave your bags at the hotel." },
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
          {
            time: "18:45",
            description: "Leave San Sebastián for Bilbao Airport.",
            places: [{ name: "Bilbao Airport", near: "Bilbao, Spain" }],
          },
          { time: "20:00", description: "Arrive at Bilbao Airport." },
          { time: "21:40", description: "Flight departs." },
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
    summary:
      "Mosaics in the morning, Carthage in the afternoon, and a beach club an hour down the coast.",
    cover: tunisia,
    gated: false,
    teaser:
      "Based in Sidi Bou Said, with everything else reached by taxi: the Bardo and the Medina one day, Hammamet the next, and the blue-and-white streets saved for the walk to the airport.",
    tags: ["#Carthage", "#SidiBouSaid", "#Bambalouni"],
    highlights: [
      "The Bardo Museum's mosaics, first thing",
      "Souk El Attarine and the lanes around the Zitouna Mosque",
      "The Antonine Baths and Byrsa Hill at Carthage",
      "A whole day at Barberousse Beach Club in Hammamet",
      "A bambalouni in Sidi Bou Said before the flight",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late, Sleep in Sidi Bou Said",
        activities: [
          {
            time: "20:35",
            description: "Fly from London Gatwick.",
            places: [{ name: "London Gatwick", near: "London, UK" }],
          },
          {
            time: "23:25",
            description: "Land at Tunis-Carthage Airport.",
            places: [{ name: "Tunis-Carthage Airport", near: "Tunis, Tunisia" }],
          },
          {
            time: "00:00",
            description: "Taxi to Sidi Bou Said and check in.",
            places: [{ name: "Sidi Bou Said" }],
          },
        ],
      },
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
            description: "Explore the Zitouna Mosque area, Souk El Attarine and the lanes around them.",
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
      {
        day: "Day Two",
        title: "Hammamet, Then La Marsa",
        activities: [
          { description: "Wake up at leisure." },
          { description: "Breakfast at a cafe near the Airbnb." },
          {
            description: "Taxi to Hammamet, about an hour.",
            places: [{ name: "Hammamet", near: "Tunisia" }],
          },
          {
            description: "Lounge at Barberousse Beach Club, and eat lunch there too.",
            places: [{ name: "Barberousse Beach Club", near: "Hammamet, Tunisia" }],
          },
          { description: "Back to the Airbnb to change for dinner." },
          {
            description: "Taxi to La Marsa and walk along La Marsa Beach.",
            places: [
              { name: "La Marsa", near: "Tunisia" },
              { name: "La Marsa Beach", near: "La Marsa, Tunisia" },
            ],
          },
          {
            description: "Dinner at Le Golfe.",
            places: [{ name: "Le Golfe", near: "La Marsa, Tunisia" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Sidi Bou Said, Then the Airport",
        activities: [
          { description: "Check out and leave the luggage at the Airbnb." },
          {
            description: "Explore Sidi Bou Said.",
            places: [{ name: "Sidi Bou Said" }],
          },
          {
            description: "Visit Dar El Annabi.",
            places: [{ name: "Dar El Annabi", near: "Sidi Bou Said, Tunisia" }],
          },
          { description: "Eat a bambalouni." },
          {
            time: "13:00",
            description: "Taxi to Tunis-Carthage Airport.",
            places: [{ name: "Tunis-Carthage Airport", near: "Tunis, Tunisia" }],
          },
          { time: "16:15", description: "Fly to London Gatwick." },
          { time: "19:20", description: "Land in London." },
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
    summary:
      "A kebab straight off the plane, a nap before dinner, and two nights out on consecutive days.",
    cover: berlin,
    gated: false,
    teaser:
      "Three days built around the nightlife rather than the museums. The days are deliberately light because the nights are not: KitKat on the first, Berghain and an after party on the second.",
    tags: ["#Doner", "#Berghain", "#StreetFoodThursday"],
    highlights: [
      "Rüyam Gemüse Kebab within an hour of landing",
      "A two-hour walking tour from the Quadriga at Pariser Platz",
      "Doors at KitKat, and joining the queue at 23:30",
      "Street Food Thursday at Markthalle Neun",
      "Säule at Berghain, then ://about blank",
    ],
    days: [
      {
        day: "Day One",
        title: "Kebab, a Walking Tour, and KitKat",
        activities: [
          {
            time: "10:50",
            description: "Land at Berlin Brandenburg Airport.",
            places: [{ name: "Berlin Brandenburg Airport" }],
          },
          { time: "12:00", description: "Drop bags at the hotel." },
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
            description: "Two-hour walking tour, meeting at the Quadriga on Pariser Platz.",
            places: [{ name: "Quadriga" }],
          },
          { time: "17:00", description: "Nap." },
          {
            time: "19:00",
            description: "Dinner at Schwarzwaldstuben.",
            places: [{ name: "Schwarzwaldstuben" }],
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
            description: "Late brunch at Annelie's.",
            places: [{ name: "Annelie's" }],
          },
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
          { time: "11:00", description: "Check out of the hotel." },
          {
            description: "Time to fill before the airport. Any of these.",
            places: [
              { name: "LIU Nudelhaus" },
              { name: "Museum Island" },
              { name: "Alexanderplatz" },
              { name: "Vabali Spa" },
              { name: "Café am Neuen See" },
              { name: "Holzmarkt" },
            ],
          },
          {
            time: "17:15",
            description: "Climb the Reichstag. Tickets have to be applied for in advance.",
            places: [{ name: "Reichstag" }],
          },
          { time: "19:15", description: "Leave for the airport." },
          {
            time: "21:45",
            description: "Flight from Berlin Brandenburg Airport.",
            places: [{ name: "Berlin Brandenburg Airport" }],
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
    teaser:
      "Three days walked rather than ridden: Yongkang Street and Shida on the first, Songshan and Elephant Mountain on the second, Longshan Temple squeezed in before the airport on the third.",
    tags: ["#NightMarket", "#ElephantMountain", "#DinTaiFung"],
    highlights: [
      "A three and a half hour food tour through Shida Night Market",
      "Yongkang Street and the Da'an lanes",
      "Elephant Mountain timed for sunset",
      "Din Tai Fung at Taipei 101, with drinks while you wait for the table",
      "Longshan Temple and Bopiliao on the way out",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, Da'an, and Shida Night Market",
        activities: [
          {
            time: "09:00",
            description: "Land at Taoyuan International Airport.",
            places: [{ name: "Taoyuan International Airport", near: "Taoyuan, Taiwan" }],
          },
          {
            time: "11:30",
            description: "Arrive at the Regent Taipei.",
            places: [{ name: "Regent Taipei" }],
          },
          {
            description: "Lunch at Azie on the hotel credit, then check in and rest.",
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
            description: "Put your name down at Din Tai Fung Taipei 101, then drink at UNO Taipei while you wait.",
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
        title: "Longshan Temple, Then Hong Kong",
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
          { description: "Head back to the hotel." },
          {
            time: "14:00",
            description: "Leave for Taoyuan International Airport.",
            places: [{ name: "Taoyuan International Airport", near: "Taoyuan, Taiwan" }],
          },
          { time: "17:40", description: "Fly to Hong Kong." },
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
    summary:
      "Van Gogh in the morning, a canal cruise at dusk, and a Saturday with nothing scheduled at all.",
    cover: amsterdam,
    gated: false,
    teaser:
      "Two tightly timed days either side of one left deliberately open. Museums and a booze cruise on the first, drift on the second, a food tour and the Anne Frank House before the flight home.",
    tags: ["#VanGogh", "#DePijp", "#Vondelpark"],
    highlights: [
      "The Van Gogh Museum first thing, then De Pijp on foot",
      "A booze cruise on the canal from Prins Hendrikkade",
      "The Lindengracht market, Saturdays only",
      "An afternoon in Vondelpark with nothing planned",
      "A Secret Food Tour, then the Anne Frank House",
    ],
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
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late, Snack if You Survive It",
        activities: [
          {
            time: "18:55",
            description: "Flight departs London Luton.",
            places: [{ name: "London Luton", near: "Luton, UK" }],
          },
          {
            time: "21:05",
            description: "Land at Schiphol Airport.",
            places: [{ name: "Schiphol Airport", near: "Amsterdam, Netherlands" }],
          },
          { time: "21:30", description: "Through the airport and on to the hotel." },
          {
            description:
              "Arrive at The Alfred Hotel. A quick snack or drink nearby if there is anything left in the tank, otherwise sleep.",
            places: [{ name: "The Alfred Hotel" }],
          },
        ],
      },
      {
        day: "Day One",
        title: "Van Gogh, De Pijp, and the Canal",
        activities: [
          {
            time: "10:00",
            description: "Coffee at Mood's, then walk to the Van Gogh Museum.",
            places: [{ name: "Mood's" }, { name: "Van Gogh Museum" }],
          },
          {
            time: "10:45",
            description: "Van Gogh Museum until 12:30.",
            places: [{ name: "Van Gogh Museum" }],
          },
          {
            time: "12:30",
            description: "Quick walk across Museumplein.",
            places: [{ name: "Museumplein" }],
          },
          {
            time: "13:15",
            description: "Sit-down brunch at Little Collins.",
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
            description: "Dinner at Kikkie van de Prinsensluis.",
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
            description: "Sandwich and a matcha at Chun Spuistraat.",
            places: [{ name: "Chun Spuistraat" }],
          },
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
            description: "Make custom bars at Tony's Chocolonely.",
            places: [{ name: "Tony's Chocolonely" }],
          },
          {
            description: "Fiona's for lunch if hungry, snacks and a drink if not.",
            places: [{ name: "Fiona's" }],
          },
          {
            description: "Walk through Vondelpark, then stay in it. Painting and sitting.",
            places: [{ name: "Vondelpark" }],
          },
          {
            description: "See where the day takes it. Drinks, dinner and going out, at leisure.",
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
        title: "Food Tour, Anne Frank, Then Home",
        activities: [
          {
            description: "Check out and leave the bags at The Alfred Hotel.",
            places: [{ name: "The Alfred Hotel" }],
          },
          { description: "If time allows, coffee and a long walk to the food tour." },
          { time: "11:00", description: "Secret Food Tour until 13:00." },
          {
            time: "13:30",
            description: "Wander the Jordaan and the Nine Streets. Boutiques, coffee, canals, and beers at Waterkant.",
            places: [
              { name: "Jordaan" },
              { name: "Nine Streets" },
              { name: "Waterkant", note: "Waterfront beers." },
            ],
          },
          {
            time: "14:45",
            description: "Head to the Anne Frank House, and go in at 15:15.",
            places: [{ name: "Anne Frank House" }],
          },
          {
            time: "16:30",
            description: "The Harry Styles Together Together Pop-Up on Looiergracht, open 12:00 to 19:00.",
            places: [
              { name: "Together Together Pop-Up" },
            ],
          },
          {
            description: "Quick dinner or drinks in the Jordaan, or up at A'DAM Lookout.",
            places: [{ name: "A'DAM Lookout" }],
          },
          { time: "19:15", description: "Back to the hotel to collect the bags." },
          {
            time: "19:30",
            description: "Head to Schiphol Airport.",
            places: [{ name: "Schiphol Airport", near: "Amsterdam, Netherlands" }],
          },
          { time: "21:30", description: "Flight departs Amsterdam." },
          { time: "21:50", description: "Land at London Luton." },
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
    teaser:
      "Based near campus, with the eating planned tightly and the drinking not planned at all. Two things need booking ahead: Kayne Prime, and the massages at Woodhouse.",
    tags: ["#Broadway", "#12South", "#ListeningRoom"],
    highlights: [
      "Rolf & Daughters, then the Listening Room the same night",
      "Massages at Woodhouse and a slow morning after",
      "Edley's barbecue and a walk around 12 South",
      "Brunch at Monell's",
      "Kayne Prime, booked well in advance",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, Campus, and the Listening Room",
        activities: [
          {
            time: "10:00",
            description: "Land at Nashville International Airport.",
            places: [{ name: "Nashville International Airport" }],
          },
          {
            description: "Drop bags at the Aertson Hotel.",
            places: [{ name: "Aertson Hotel" }],
          },
          { time: "12:00", description: "Early check in." },
          {
            description: "Walk around the Vanderbilt University campus.",
            places: [{ name: "Vanderbilt University" }],
          },
          { description: "Back to change for dinner." },
          {
            time: "18:15",
            description: "Dinner at Rolf & Daughters.",
            places: [{ name: "Rolf & Daughters" }],
          },
          {
            time: "20:30",
            description: "The Listening Room.",
            places: [{ name: "The Listening Room" }],
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
            places: [{ name: "12 South" }, { name: "Five Daughters Bakery" }],
          },
          {
            time: "19:30",
            description: "Dinner at Chauhan.",
            places: [{ name: "Chauhan" }],
          },
          {
            description: "Drinking on Broadway.",
            places: [{ name: "Broadway" }],
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
            places: [{ name: "Monell's" }],
          },
          {
            description: "Drinking on Broadway.",
            places: [{ name: "Broadway" }],
          },
          {
            description: "If hungry, snacks and live music at 5th & Broadway.",
            places: [{ name: "5th & Broadway" }],
          },
          {
            time: "20:00",
            description: "Dinner at Kayne Prime. Needs booking.",
            places: [{ name: "Kayne Prime" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "One Last Brunch, Then the Airport",
        activities: [
          {
            time: "11:45",
            description: "Adele's.",
            places: [{ name: "Adele's" }],
          },
          {
            time: "16:10",
            description: "Flight out of Nashville International Airport.",
            places: [{ name: "Nashville International Airport" }],
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
    summary:
      "Roland-Garros, a day in Champagne, and the rest of Paris covered on foot.",
    cover: paris,
    gated: false,
    teaser:
      "Five days with two anchors: a full day at Roland-Garros and a day trip to Reims for the Champagne houses. Everything between them is the Marais, Montmartre, the Left Bank and a lot of walking.",
    tags: ["#RolandGarros", "#Champagne", "#LeMarais"],
    notes: [
      "This only works in May if you want Roland-Garros. Everything else here is fine any time of year, so move the tennis day out and the rest still stands.",
    ],
    highlights: [
      "A full day at Roland-Garros, third-round matches and the outside courts",
      "A day trip to Reims for Ruinart and Veuve Clicquot",
      "Le Marais on foot, then up to Sacré-Coeur and through Montmartre",
      "A baguette from La Parisienne with butter from La Grande Épicerie, eaten on Pont Neuf",
      "A burlesque show at Crazy Horse",
    ],
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
            description:
              "Keep watching the third-round matches and wander the outside courts.",
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
            description: "Walk up to Sacré-Coeur. The views from the steps are the point.",
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
              { name: "La Grande Épicerie de Paris", note: "Gourmet grocer. Get the French butter." },
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
        title: "One Last Baguette, Then the Train",
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
          { time: "14:00", description: "Pick up the luggage at the hotel." },
          { time: "18:00", description: "Thirty minute walk to the train." },
          {
            time: "18:30",
            description: "Get to Paris Gare du Nord.",
            places: [{ name: "Gare du Nord" }],
          },
          { time: "19:00", description: "Check-in for the train closes." },
          { time: "20:00", description: "Late train to London." },
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
    summary:
      "A packed first day on foot, a boat and Tivoli on the second, and a burger queue on the third.",
    cover: copenhagen,
    gated: false,
    teaser:
      "Copenhagen is small enough that day one can be almost entirely walked. Day two is a boat, a bike ride and five hours in Tivoli. Day three is one very good burger before the airport.",
    tags: ["#Tivoli", "#Reffen", "#RoundTower"],
    extras: [
      {
        title: "Also worth seeing",
        places: [
          { name: "Nyhavn" },
          { name: "The Little Mermaid", note: "Just walk by." },
          { name: "Superkilen" },
          { name: "Hørsholm" },
          { name: "Sidecar", note: "Brunch." },
        ],
      },
    ],
    highlights: [
      "The Round Tower, fifteen minutes up and worth it",
      "A picnic from the Glass Market on the castle grounds",
      "Hot tubs at La Banchina and Hot Tub Copenhagen",
      "Five hours in Tivoli Gardens",
      "Queueing for Gasoline Grill from half ten",
    ],
    days: [
      {
        day: "Day One",
        title: "The Whole City on Foot",
        activities: [
          { time: "09:00", description: "Land, drop the suitcases at the hotel and change." },
          {
            description: "Coffee at Union Kitchen.",
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
            description: "The Round Tower. Fifteen minutes to climb.",
            places: [{ name: "Round Tower" }],
          },
          {
            description:
              "Walk through the Glass Market, pick up wine and a snack, and picnic on the grounds. Or sit and eat at Slurp Ramen instead.",
            places: [{ name: "Glass Market" }, { name: "Slurp Ramen" }],
          },
          {
            description: "The Botanical Garden, for as long as you fancy the free areas.",
            places: [{ name: "Botanical Garden" }],
          },
          {
            description: "Rosenborg Castle.",
            places: [{ name: "Rosenborg Castle" }],
          },
          {
            description: "Drinks at La Banchina, and the sauna if you want it.",
            places: [{ name: "La Banchina" }],
          },
          {
            description: "Hot Tub Copenhagen. You can go at 17:00 or 18:00.",
            places: [{ name: "Hot Tub Copenhagen" }],
          },
          {
            description: "Dinner at the Reffen stalls.",
            places: [{ name: "Reffen" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Boat, Bikes, and Tivoli",
        activities: [
          { time: "10:00", description: "Boat, until 11:00." },
          {
            time: "11:30",
            description: "Six minute Uber to Wulff & Konstali for brunch. Book it.",
            places: [{ name: "Wulff & Konstali" }],
          },
          {
            description: "Superkilen, on bikes.",
            places: [{ name: "Superkilen" }],
          },
          {
            description: "Designmuseum Danmark. Most people spend about two hours.",
            places: [{ name: "Designmuseum Danmark" }],
          },
          {
            description:
              "Walk Strøget, the main shopping street, and past Christiansborg Palace on the way to Tivoli.",
            places: [{ name: "Strøget" }, { name: "Christiansborg Palace" }],
          },
          {
            description:
              "Tivoli Gardens. People spend around five hours, and there is a food hall inside.",
            places: [{ name: "Tivoli Gardens" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "One Burger, Then the Airport",
        activities: [
          {
            time: "11:00",
            description: "Gasoline Grill. Start queueing at about 10:30.",
            places: [{ name: "Gasoline Grill" }],
          },
          {
            description: "Buka Bakery, if a burger is not the move.",
            places: [{ name: "Buka Bakery" }],
          },
          {
            description:
              "If there is time, Christiania and the Church of Our Saviour. Good view, but it is the other side of town.",
            places: [{ name: "Christiania" }, { name: "Church of Our Saviour" }],
          },
          { description: "Leave thirty minutes to reach the airport by train." },
          { time: "15:40", description: "Flight." },
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
    teaser:
      "Two full days either side of a late landing. The first is Buda, the museums and a night in the ruin bars. The second is deliberately slow: sandwiches, several hours in the baths, and dinner.",
    cover: budapest,
    gated: false,
    tags: ["#RuinBars", "#TheBaths", "#CastleHill"],
    days: [
      {
        day: "Arrival",
        title: "Land Late, Eat at Karaván",
        activities: [
          { time: "17:35", description: "Land in Budapest." },
          {
            description:
              "Express bus from the airport, every twenty minutes, about forty minutes into town.",
          },
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
      {
        day: "Departure",
        title: "Train Out",
        activities: [
          { time: "12:40", description: "Train onward, arriving 15:20." },
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
    teaser:
      "Six days on Phuket, four in Chiang Mai, three in Bangkok. Most of the big days are booked tours, so this one needs planning well ahead rather than deciding on the morning.",
    tags: ["#PhiPhi", "#ChiangMai", "#Ayutthaya"],
    highlights: [
      "Phi Phi and Bamboo Islands on a small group boat",
      "A half-day Thai cooking class with the local market tour",
      "A day as an elephant caregiver at Patara Elephant Farm",
      "The Monk's Trail up to Wat Phra That Doi Suthep",
      "Ayutthaya and the floating market as a day trip from Bangkok",
    ],
    days: [
      {
        day: "Day One",
        title: "Land in Phuket",
        activities: [
          {
            time: "09:20",
            description: "Arrive in Phuket.",
            places: [{ name: "Phuket International Airport", near: "Phuket, Thailand" }],
          },
          { description: "Check in after 14:00. We stayed in Patong.", places: [{ name: "Patong" }] },
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
            description:
              "Small group Phi Phi and Bamboo Islands tour with lunch, back at 18:30.",
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
        title: "Fly to Chiang Mai",
        activities: [
          {
            time: "08:45",
            description: "Flight to Chiang Mai, landing 10:40.",
            places: [{ name: "Chiang Mai" }],
          },
          { description: "Check in at 14:00. Take the rest of the day at leisure." },
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
        title: "Fly to Bangkok",
        activities: [
          {
            time: "08:25",
            description: "Flight to Bangkok, landing 09:35.",
            places: [{ name: "Bangkok" }],
          },
          { description: "Check in at 15:00." },
          { description: "Walk the temples." },
          {
            description:
              "Maeklong Railway Market. You need to book a shuttle if you want to go.",
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
      {
        day: "Day Thirteen",
        title: "Breakfast, Then Singapore",
        activities: [
          { description: "Breakfast and a chill morning." },
          { time: "09:45", description: "Flight to Singapore." },
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
    teaser:
      "Three days based at Marina Bay Sands, walked hard. A hike through MacRitchie in the middle of the city, hawker food on Haji Lane, and the light show at Gardens by the Bay.",
    tags: ["#GardensByTheBay", "#MacRitchie", "#HajiLane"],
    notes: [
      "The first night here happened to be New Year's Eve, which is the only reason there are fireworks on it. Any other time of year that is just dinner.",
    ],
    highlights: [
      "The Botanic Gardens, open until midnight",
      "MacRitchie, a three to four hour hike with monkeys",
      "Lunch on Haji Lane, Arab Street and Little India",
      "The free Spectra light show at Marina Bay",
      "Walking the Henderson Waves before the flight",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, Orchard Road, Fireworks",
        activities: [
          {
            description: "Land and check in at Marina Bay Sands.",
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
        title: "Henderson Waves, Then Out",
        activities: [
          {
            description: "Walk the Henderson Waves.",
            places: [{ name: "Henderson Waves" }],
          },
          { description: "Breakfast somewhere around there." },
          { description: "Check out." },
          { time: "15:00", description: "Flight." },
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
    teaser:
      "Split between Hanoi and Ho Chi Minh City, with an overnight boat in the middle. The two best things on it were both booked: the Ha Long Bay cruise and the motorbike street food tour.",
    tags: ["#HaLongBay", "#OldQuarter", "#StreetFood"],
    highlights: [
      "The Old Quarter's 36 streets, each once dedicated to one trade",
      "An overnight cruise on Ha Long Bay",
      "Bun cha at the place Bourdain and Obama ate at",
      "A motorbike street food tour with ten tastings",
      "Dinner in complete darkness at NOIR",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land in Hanoi",
        activities: [
          { time: "17:30", description: "Land, check in, sleep." },
          { description: "Book the airport taxi in advance." },
        ],
      },
      {
        day: "Day One",
        title: "The Old Quarter",
        activities: [
          {
            description:
              "Coffee, then walk the Old Quarter. It is the heart of Hanoi, 36 streets each once dedicated to a single trade: haberdashery, hardware, porcelain.",
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
              "The Ha Long Bay overnight cruise starts. Thousands of individual islands, and one of the most famous stretches of water in Asia.",
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
        title: "Fly South, Then Eat From a Motorbike",
        activities: [
          {
            time: "09:00",
            description: "Flight from Hanoi, landing in Ho Chi Minh City at 11:15.",
            places: [{ name: "Ho Chi Minh City" }],
          },
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
            description:
              "Dinner at NOIR, eaten in pitch black and led by visually impaired staff.",
            places: [{ name: "NOIR Dining in the Dark", near: "Ho Chi Minh City, Vietnam" }],
          },
        ],
      },
      {
        day: "Departure",
        title: "On to Cambodia",
        activities: [
          { description: "Check out." },
          { time: "08:20", description: "Flight to Siem Reap." },
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
    teaser:
      "Three days in Siem Reap, with the two big ones booked well ahead: sunrise at Angkor Wat, and a morning bike tour out through the rice fields.",
    tags: ["#AngkorWat", "#SiemReap", "#PubStreet"],
    highlights: [
      "A 04:30 pickup to reach Angkor Wat for sunrise",
      "A pottery class at the Khmer Fine Art Center",
      "A countryside bike tour past a mushroom field and a rice wine distillery",
      "A Khmer cooking class in the evening",
      "Old Market for dinner and Pub Street after",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, Old Market, Pub Street",
        activities: [
          {
            time: "13:40",
            description: "Land at Siem Reap.",
            places: [{ name: "Siem Reap" }],
          },
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
      {
        day: "Departure",
        title: "Leave the Country",
        activities: [{ description: "Leave the country, reluctantly." }],
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
    teaser:
      "Three days: churches and cheap opera tickets on the first, Salzburg on the second, and the big museums, the Naschmarkt and the oldest sausage stand in the city on the third.",
    tags: ["#StateOpera", "#Salzburg", "#Wurstelstand"],
    notes: ["Bring cash. Most places are cash only."],
    highlights: [
      "State Opera tickets from 16 euros, with two intervals if you want to slip out",
      "A day trip to Salzburg, and the cable car up to the castle",
      "One to three hours in the Kunsthistorisches Museum",
      "Leo's Würstelstand, the oldest sausage stand in Vienna",
      "The Austrian National Library, on the way to breakfast",
    ],
    days: [
      {
        day: "Day One",
        title: "Churches, the Opera, and Bars",
        activities: [
          { time: "12:40", description: "Train in, arriving 15:20." },
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
            places: [{ name: "Volksgarten" }, { name: "Prater Dome" }],
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
      {
        day: "Departure",
        title: "Fly Out",
        activities: [{ description: "Fly out." }],
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
    teaser:
      "Three days in Dublin over St Patrick's Day, two in Galway with a full day out at the Cliffs of Moher, and two in Cork for Blarney Castle. All of it by train.",
    tags: ["#StPatricks", "#CliffsOfMoher", "#Blarney"],
    notes: [
      "The Dublin days are timed for St Patrick's Day. Everything else here works any time of year.",
    ],
    highlights: [
      "St Patrick's Day in Dublin",
      "The Guinness Storehouse tour",
      "A full day tour out to the Cliffs of Moher",
      "Blarney Castle, and two to three hours to kiss the stone",
      "Climbing St Anne's for the panorama over Cork",
    ],
    days: [
      {
        day: "Day One",
        title: "Land in Dublin",
        activities: [
          { time: "08:45", description: "Arrive and check in." },
          {
            time: "13:00",
            description: "Guinness Storehouse tour, until 15:00.",
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
            description: "Walk into Leo Burdock's for the famous fish and chips.",
            places: [{ name: "Leo Burdock", near: "Dublin, Ireland" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Dublin to Galway",
        activities: [
          { time: "11:30", description: "Late check out." },
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
            description:
              "Walk Quay Street and the Latin Quarter, and watch the street performers.",
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
            description: "Picked up for the full day Cliffs of Moher tour, back in Galway at 17:30.",
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
        title: "St Anne's, Then Back to Dublin",
        activities: [
          {
            description: "Climb St Anne's Church for the panoramic views.",
            places: [{ name: "St Anne's Church Shandon", near: "Cork, Ireland" }],
          },
          { description: "Three hour bus from Cork to Dublin Airport." },
        ],
      },
      {
        day: "Day Eight",
        title: "Fly Home",
        activities: [
          { description: "Airport shuttle from the hotel, around 08:00." },
          { time: "10:25", description: "Fly out." },
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
    teaser:
      "Driven up from New York with a night in Portsmouth and a long stop in Portland. The third day starts at 03:00 for sunrise on Cadillac Mountain and does not really stop.",
    tags: ["#Acadia", "#CadillacMountain", "#Lobster"],
    notes: [
      "Cadillac Mountain sunrise tickets are released well in advance and go fast. Set an alarm for the morning they drop.",
    ],
    highlights: [
      "Sunrise from Cadillac Mountain, after a 03:00 alarm",
      "The Beehive Trail straight afterwards",
      "The land bridge over to Bar Island, at low tide",
      "Jordan Pond Path and the Bubbles",
      "A long afternoon of eating your way through Portland",
    ],
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
            description: "Arrive in Portland and eat your way along Commercial Street and Old Port.",
            places: [
              { name: "Portland", near: "Maine" },
              { name: "Luke's Lobster", near: "Portland, Maine" },
              { name: "Good Mood Matcha", near: "Portland, Maine" },
              { name: "Saltyard", near: "Portland, Maine" },
              { name: "Post Supply", near: "Portland, Maine" },
              { name: "Blanche + Mimi", near: "Portland, Maine" },
              { name: "Holy Donut", near: "Portland, Maine" },
              { name: "Tandem Bakery", near: "Portland, Maine" },
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
            description: "Dinner at Peekytoe Provisions in Bar Harbor.",
            places: [{ name: "Peekytoe Provisions", near: "Bar Harbor, Maine" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Jordan Pond and the Bubbles",
        activities: [
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
            description:
              "Drinks at Atlantic Brewing Company, blueberry ale and soda. Or Geddy's.",
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
        title: "One Last Trail, Then Home",
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
          { time: "13:00", description: "Drive home." },
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
    teaser:
      "Five days in the north of Mallorca with a villa to cook in, then three in Ibiza built entirely around what is on at the clubs. The Ibiza half is deliberately not scheduled.",
    tags: ["#Pollenca", "#BoatDay", "#Ibiza"],
    notes: [
      "The Ibiza nights depend entirely on who is playing that week, so this lists the clubs rather than a schedule. Check the line-ups before you book anything.",
    ],
    highlights: [
      "The Sunday market at Santa Maria for ensaimadas and cheese",
      "A boat day in the south, and the beaches after it",
      "Sóller, Deià and Valldemossa in the north",
      "The Calvari steps in Pollença",
      "Ibiza, planned around the line-ups rather than the days",
    ],
    days: [
      {
        day: "Day One",
        title: "Into Pollença",
        activities: [
          { description: "Fly into Mallorca and transfer north." },
          { time: "14:00", description: "Check in at Pollença.", places: [{ name: "Pollença" }] },
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
        title: "Check Out, Fly to Ibiza",
        activities: [
          { time: "10:00", description: "Check out." },
          {
            description: "The Port de Pollença market on the way out, 09:00 to 13:00.",
            places: [{ name: "Port de Pollença Market", near: "Mallorca" }],
          },
          { time: "14:20", description: "Fly to Ibiza, landing 15:00.", places: [{ name: "Ibiza" }] },
          { description: "Check in, then out to whichever club has the better line-up." },
        ],
      },
      {
        day: "Day Six",
        title: "Ibiza",
        activities: [{ description: "Whatever is on. See the clubs below." }],
      },
      {
        day: "Day Seven",
        title: "Ibiza, Then Home",
        activities: [
          { description: "Check out and transfer back to Barcelona." },
          { description: "Fly on from there." },
        ],
      },
    ],
    extras: [
      {
        title: "Ibiza clubs",
        note: "Which night you go where depends on the line-up, so these are the rooms rather than a plan.",
        places: [
          { name: "Hï Ibiza" },
          { name: "Pacha Ibiza" },
          { name: "Ushuaïa Ibiza" },
          { name: "UNVRS Ibiza" },
        ],
      },
      {
        title: "Around Pollença",
        note: "Wine is a booming industry in Mallorca, so look for a tour and tasting. Pa amb oli is the local thing to eat: toast with tomato, cheese and toppings.",
        places: [
          { name: "La Trobada", near: "Pollença, Mallorca", note: "Very authentic Mallorcan food." },
          { name: "Bar Gorreta", near: "Pollença, Mallorca", note: "Casual, cheap, drinks come with tapas." },
          { name: "Cal Patró", near: "Cala Sant Vicenç, Mallorca", note: "Family seafood place north of Pollença, highly recommended." },
          { name: "La Fonda", near: "Pollença, Mallorca", note: "Really good lamb, another local speciality. Book ahead." },
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
    teaser:
      "Two and a half hours from New York, and deliberately unambitious. Brunch, a spa appointment, and a run of small cafes, with hikes and a lake on hand if the mood changes.",
    tags: ["#Lenox", "#Spa", "#Hikes"],
    highlights: [
      "Brunch at Haven Cafe in Lenox on the way in",
      "A spa afternoon at Seven Salon Spa",
      "The Berkshire Grown winter farmers market",
      "Free bike rentals at the inn",
      "Five hikes within easy reach, if you want them",
    ],
    days: [
      {
        day: "Day One",
        title: "Drive Up, Spa, Dinner",
        activities: [
          { description: "Two and a half hour drive up from New York." },
          {
            time: "11:45",
            description: "Brunch at Haven Cafe in Lenox, until 12:45.",
            places: [{ name: "Haven Cafe", near: "Lenox, Massachusetts" }],
          },
          {
            description: "Five minute drive to Seven Hills Inn, and check in.",
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
        title: "One More Coffee, Then Home",
        activities: [
          {
            description: "Continental breakfast, or Electra's Cafe eight minutes away.",
            places: [{ name: "Electra's Cafe", near: "Pittsfield, Massachusetts" }],
          },
          {
            description: "Lunch at Shots Cafe, five minutes away.",
            places: [{ name: "Shots Cafe", near: "Lenox, Massachusetts" }],
          },
          { description: "Two and a half hour drive back to New York." },
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
          { name: "Onota Lake", near: "Pittsfield, Massachusetts", note: "Kayak rentals, about twenty minutes away." },
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
    summary:
      "One day of Milan on foot, then two in Venice doing the famous things back to back.",
    cover: milan,
    gated: false,
    teaser:
      "A weekend split across two cities. Milan is the Duomo and an afternoon of shopping; Venice is timed almost to the minute because everything is a five minute walk from everything else.",
    tags: ["#Duomo", "#Venice", "#Navigli"],
    highlights: [
      "Turning three times on the bull's mosaic in the Galleria",
      "The Duomo, with the afternoon free afterwards",
      "Going out in Navigli and Colonne di San Lorenzo",
      "Doge's Palace and the Bridge of Sighs",
      "Pasta to go from Dal Moro's on the way to the airport",
    ],
    days: [
      {
        day: "Day One",
        title: "Milan on Foot",
        activities: [
          { time: "08:45", description: "Flight in, landing at 11:00. About 45 minutes to the centre." },
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
          { time: "15:45", description: "Arrive in Venice, check in and get settled." },
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
            description: "Back to the hotel, grabbing pasta to go from Dal Moro's.",
            places: [{ name: "Dal Moro's Fresh Pasta To Go", near: "Venice, Italy" }],
          },
          { time: "17:30", description: "Water taxi to the airport." },
          { time: "20:30", description: "Flight out." },
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
    summary:
      "A night out in Glasgow, a full day tour, and the castle before the flight home.",
    cover: edinburgh,
    gated: false,
    teaser:
      "Based in Edinburgh, with the first night spent over in Glasgow. The bars below are almost all student bars, which is the point.",
    tags: ["#Glasgow", "#EdinburghCastle", "#StudentBars"],
    highlights: [
      "Dinner in Merchant City, Glasgow",
      "A full day tour, eight until eight",
      "Edinburgh Castle at eleven",
      "Lunch at I.J. Mellis Cheesemonger",
      "A very long list of student bars",
    ],
    days: [
      {
        day: "Day One",
        title: "Straight to Glasgow",
        activities: [
          { time: "14:55", description: "Land in Edinburgh. About 28 minutes to the flat." },
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
        title: "A Full Day Tour",
        activities: [
          { time: "08:00", description: "Tour, until 20:00." },
          { description: "Out afterwards. The Edinburgh bars are listed below." },
        ],
      },
      {
        day: "Day Three",
        title: "The Castle, Then Home",
        activities: [
          { time: "09:30", description: "Wake up." },
          {
            time: "11:00",
            description: "Edinburgh Castle.",
            places: [{ name: "Edinburgh Castle" }],
          },
          {
            description: "Lunch at I.J. Mellis Cheesemonger.",
            places: [{ name: "I.J. Mellis Cheesemonger", near: "Edinburgh, Scotland" }],
          },
          { time: "14:15", description: "Leave the flat." },
          { time: "15:45", description: "Take off." },
        ],
      },
    ],
    extras: [
      {
        title: "Glasgow bars",
        places: [
          { name: "Revolution Glasgow", note: "Popular student bar, party atmosphere." },
          { name: "Vodka Wodka", near: "Glasgow, Scotland", note: "One of the busiest student bars, next to the university, with a beer garden." },
          { name: "Tingle Shooter Bar", near: "Glasgow, Scotland", note: "Pre-club student bar, specialises in cheap fancy shots." },
          { name: "Firewater", near: "Glasgow, Scotland", note: "Busy student bar, indie rock, cheap cocktail pitchers." },
          { name: "Bloc+", near: "Glasgow, Scotland", note: "Another student bar. Free entry before midnight." },
        ],
      },
      {
        title: "Edinburgh bars",
        places: [
          { name: "McSorleys", near: "Edinburgh, Scotland", note: "Party atmosphere, popular with sports teams." },
          { name: "Cabaret Voltaire", near: "Edinburgh, Scotland", note: "Cheap entry and cheap drinks, popular with students." },
          { name: "The Mash House", near: "Edinburgh, Scotland", note: "Live music, three floors." },
          { name: "The Hive", near: "Edinburgh, Scotland", note: "Ugly, cheap, student discounts." },
          { name: "Big Cheese", near: "Edinburgh, Scotland", note: "The biggest student club night, and the music is pure cheese." },
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
    summary:
      "A walking tour, a chocolate tasting, and a full day out in Ghent and Bruges.",
    cover: brussels,
    gated: false,
    teaser:
      "Two nights, reached by train from London. The first day is the Grand Place and chocolate, the second is entirely Ghent and Bruges, and the waffles are non-negotiable.",
    tags: ["#GrandPlace", "#Bruges", "#Waffles"],
    highlights: [
      "A two hour walking tour from the Grand Place",
      "A chocolate tasting straight afterwards",
      "A full day tour of Ghent and Bruges",
      "Waffles at Chez Albert in Bruges",
      "The nightlife is all within a few minutes of the centre",
    ],
    days: [
      {
        day: "Day One",
        title: "The Grand Place and Chocolate",
        activities: [
          { time: "06:47", description: "Train from London, arriving 10:07." },
          { description: "Check in and settle. Six minute walk to the Grand Place." },
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
            places: [{ name: "Ghent", near: "Belgium" }, { name: "Bruges", near: "Belgium" }],
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
      {
        day: "Day Three",
        title: "Train Home",
        activities: [
          { time: "08:50", description: "Leave the hotel." },
          { time: "09:22", description: "Train back to London." },
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
    summary:
      "A long travel day into Interlaken, and one very full day in Zurich on the way back.",
    cover: switzerland,
    gated: false,
    teaser:
      "Zurich to Interlaken and back, with the Zurich day timed tightly: Uetliberg, Bahnhofstrasse, a lake cruise and fondue, all before the evening flight.",
    tags: ["#Interlaken", "#Uetliberg", "#Fondue"],
    notes: [
      "Sunday counts as a public holiday in Zurich and a lot of the shops close. The Zurich day below is built around that.",
      "The middle day in Interlaken was never written down, so this covers the travel day out and the day in Zurich.",
    ],
    highlights: [
      "The train from Zurich down to Interlaken",
      "Uetliberg, reached on tram line 13",
      "Sprüngli on Bahnhofstrasse",
      "A cruise on Lake Zurich",
      "Fondue at Raclette Stube before the flight",
    ],
    days: [
      {
        day: "Day One",
        title: "London to Interlaken",
        activities: [
          { time: "04:30", description: "Wake up. It is a long morning." },
          { time: "06:50", description: "Flight to Zurich, landing 09:30." },
          { description: "Fifteen minute bus to the train station." },
          {
            time: "11:22",
            description: "Train from Zurich to Interlaken, arriving 13:38.",
            places: [{ name: "Interlaken" }],
          },
          { description: "Eleven minute bus to the hostel. Check in, drop everything, get lunch." },
        ],
      },
      {
        day: "Day Two",
        title: "Interlaken",
        activities: [
          { description: "Not recorded. Whatever Interlaken gives you." },
        ],
      },
      {
        day: "Day Three",
        title: "Zurich in a Day",
        activities: [
          { time: "07:19", description: "Train from Interlaken back to Zurich, arriving 09:28." },
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
          { time: "21:25", description: "Flight out." },
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
    teaser:
      "One day in the old city, one long day out at Sintra and the western edge of Europe, and a very hilly walking tour in between. Wear comfortable shoes, seriously.",
    tags: ["#Alfama", "#Sintra", "#PasteisDeBelem"],
    notes: [
      "The Alfama walking tour is very hilly. Wear comfortable shoes.",
    ],
    highlights: [
      "A free 90 minute walking tour of Alfama",
      "Saint George's Castle for the best views of the city",
      "Landeau for the best chocolate cake",
      "Pena Palace, Cabo da Roca and Belém in one day",
      "Dinner at the Time Out Market",
    ],
    days: [
      {
        day: "Day One",
        title: "Alfama on Foot",
        activities: [
          { time: "07:55", description: "Flight from London Luton, landing 10:40." },
          { description: "Pick up the unlimited travel card." },
          { time: "11:15", description: "Train into the centre, about 33 minutes." },
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
            description: "Uber to Cabo da Roca, the westernmost point of Europe. Half an hour there.",
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
              "Red Frog speakeasy afterwards, about 25 minutes' walk. A get-a-drink-and-chill place rather than a night out.",
            places: [{ name: "Red Frog Speakeasy", near: "Lisbon, Portugal" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Out Early",
        activities: [
          { time: "07:00", description: "Breakfast, then the 33 minute train to the airport." },
          { time: "10:55", description: "Flight back to London." },
        ],
      },
    ],
  },
  {
    slug: "ecuador",
    title: "Ten Days in Ecuador and the Galápagos",
    destination: "Ecuador",
    country: "Ecuador",
    coords: { lat: -0.7437, lon: -90.3139 },
    duration: "10 days",
    season: "March",
    summary:
      "A day in Quito, then island-hopping between Santa Cruz and San Cristóbal by ferry, snorkelling everything.",
    cover: ecuador,
    gated: false,
    teaser:
      "One day at altitude in Quito, then eight in the Galápagos across three stays and two ferries. The tips at the bottom are the part worth reading twice.",
    tags: ["#Galapagos", "#Snorkelling", "#SeaLions"],
    notes: [
      "Costs here are what we paid on this trip, so treat them as a rough shape rather than current prices.",
    ],
    highlights: [
      "Standing on the equator at Mitad del Mundo",
      "Biking 13 miles to the giant tortoises at La Ruta de la Tortuga",
      "Tortuga Bay, reached on foot along a mile and a half of paved trail",
      "The Cerro Tijeretas and Playa Baquerizo hike, given a whole day",
      "Snorkelling with sea lions at La Lobería",
    ],
    days: [
      {
        day: "Day One",
        title: "Quito, and the Equator",
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
      {
        day: "Day Two",
        title: "Fly to Santa Cruz",
        activities: [
          { description: "An hour to the airport, and two hours for the forms." },
          {
            description: "Land and settle in. Get to the hotel at least two hours after landing.",
            places: [{ name: "Santa Cruz Island", near: "Galápagos" }],
          },
          {
            description: "Drinks at Finch Bay, dinner at Ayora.",
            places: [
              { name: "Finch Bay", near: "Puerto Ayora, Galápagos" },
              { name: "Ayora", near: "Puerto Ayora, Galápagos" },
            ],
          },
          {
            description: "Santa Cruz pier at night, to see the sharks.",
            places: [{ name: "Santa Cruz Pier", near: "Puerto Ayora, Galápagos" }],
          },
        ],
      },
      {
        day: "Day Three",
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
      {
        day: "Day Four",
        title: "Tortuga Bay, Then the Ferry",
        activities: [
          {
            description:
              "Tortuga Bay in the morning. Head to the western end of Charles Binford Avenue in Puerto Ayora and follow the flat paved trail about a mile and a half to the entrance. A 45 minute hike, then lounging and snorkelling.",
            places: [{ name: "Tortuga Bay", near: "Santa Cruz Island, Galápagos" }],
          },
          {
            description: "Lunch at 1835.",
            places: [{ name: "1835 Coffee Lab", near: "Puerto Ayora, Galápagos" }],
          },
          {
            time: "15:00",
            description: "Ferry to San Cristóbal, until 18:00. Be at the dock an hour early.",
            places: [{ name: "San Cristóbal Island", near: "Galápagos" }],
          },
          {
            description: "Happy hour drinks in town, then dinner at Umami.",
            places: [{ name: "Umami", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Cerro Tijeretas, All Day",
        activities: [
          {
            description: "Pastries, coffee and lunch from Kachi Tanta.",
            places: [{ name: "Kachi Tanta", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
          {
            description:
              "The Cerro Tijeretas and Playa Baquerizo hike. Read a map and plan to spend most of the day: there are watering holes, snorkel spots and observation decks, and it is worth exploring every offshoot.",
            places: [
              { name: "Cerro Tijeretas", near: "San Cristóbal, Galápagos" },
              { name: "Playa Baquerizo", near: "San Cristóbal, Galápagos" },
            ],
          },
          {
            description: "Sunset at Playa Mann as you walk back into town.",
            places: [{ name: "Playa Mann", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
          {
            description: "Dinner at Iska Pizza.",
            places: [{ name: "Iska Pizza", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
          {
            description:
              "Go to Galapagos Eco Fishing to pay the rest of the tour deposit and try on wetsuits.",
          },
        ],
      },
      {
        day: "Day Six",
        title: "The 360 Tour",
        activities: [
          { description: "360 tour of San Cristóbal." },
          {
            description: "Dinner at Giuseppe's.",
            places: [{ name: "Giuseppe's", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "Sea Lions, Then Back to Santa Cruz",
        activities: [
          {
            description:
              "Coffee and croissants at Ranti Kamak. Locally sourced, absolutely delicious, and you choose how the coffee is brewed.",
            places: [{ name: "Ranti Kamak", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
          {
            description: "Taxi to La Lobería, to snorkel and swim with sea lions.",
            places: [{ name: "La Lobería", near: "San Cristóbal, Galápagos" }],
          },
          {
            description: "Lunch and cheap cocktails at La Pescadería.",
            places: [{ name: "La Pescadería", near: "Puerto Baquerizo Moreno, Galápagos" }],
          },
          { time: "15:00", description: "Ferry back, until 18:00." },
          {
            description: "Dinner at The Point, where you can see rays and sharks from the pier.",
            places: [{ name: "The Point", near: "Puerto Ayora, Galápagos" }],
          },
        ],
      },
      {
        day: "Day Eight",
        title: "Kayaks and One Last Swim",
        activities: [
          {
            description: "Coffee and breakfast at Island Coffee.",
            places: [{ name: "Island Coffee", near: "Puerto Ayora, Galápagos" }],
          },
          {
            description: "Playa Los Alemanes, for a swim and a snorkel.",
            places: [{ name: "Playa Los Alemanes", near: "Santa Cruz Island, Galápagos" }],
          },
          { description: "Rent kayaks next to Finch Bay." },
          {
            description: "Las Grietas. You can skip this one, honestly.",
            places: [{ name: "Las Grietas", near: "Santa Cruz Island, Galápagos" }],
          },
          {
            description: "Lunch at Oy. Highly recommend.",
            places: [{ name: "Oy", near: "Puerto Ayora, Galápagos" }],
          },
          {
            description: "Drinks at Bahia Mar, dinner at Midori.",
            places: [
              { name: "Bahia Mar", near: "Puerto Ayora, Galápagos" },
              { name: "Midori", near: "Puerto Ayora, Galápagos" },
            ],
          },
        ],
      },
      {
        day: "Day Nine",
        title: "Fly Out",
        activities: [{ description: "Fly out." }],
      },
    ],
    extras: [
      {
        title: "Tips and tricks",
        items: [
          "In Quito, go to the TelefériQo first thing. Quito is known for afternoon fog.",
          "Arrive at both airports with plenty of time. Quito and the Galápagos airports are each about an hour from where you would stay.",
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
          "Every Airbnb was generous about letting us leave luggage after check out. Just ask.",
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
    summary:
      "Tokyo, Kyoto and Osaka, organised almost entirely around what and where to eat next.",
    cover: japan,
    gated: false,
    teaser:
      "Four days in Tokyo, three in Kyoto, two in Osaka, then back to Tokyo. Standing sushi bars, a 5am tuna auction, Golden Gai, and a lot of walking between meals.",
    tags: ["#GoldenGai", "#Kyoto", "#Tsukiji"],
    highlights: [
      "The Toyosu and Tsukiji tuna auction, starting at 05:00",
      "Golden Gai and Omoide Yokocho on the first night",
      "The Arashiyama monkey park and bamboo grove",
      "Feeding the deer at Nara on the way to Osaka",
      "Go-karting through Shibuya",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, and Straight Into Shinjuku",
        activities: [
          { time: "16:00", description: "Land." },
          {
            description: "Dinner, drinks and a night out in Shinjuku.",
            places: [
              { name: "Godzilla Head", near: "Shinjuku, Tokyo" },
              { name: "Udon Shin", near: "Tokyo, Japan" },
              { name: "Uogashi Nihon-Ichi", near: "Tokyo, Japan", note: "Standing sushi bar." },
              { name: "Omoide Yokocho", near: "Shinjuku, Tokyo", note: "Memory Lane. Food stalls." },
              { name: "Golden Gai", near: "Shinjuku, Tokyo", note: "All the tiny bars, for hopping around." },
              { name: "The Open Book", near: "Shinjuku, Tokyo", note: "Order lemon sours." },
              { name: "Albatross", near: "Shinjuku, Tokyo" },
              { name: "Deathmatch in Hell", near: "Shinjuku, Tokyo", note: "Death metal bar." },
              { name: "Nikuto", near: "Shinjuku, Tokyo", note: "Beef and chicken over charcoal. The kimchi beef." },
              { name: "One Coin Bar Champion", near: "Shinjuku, Tokyo", note: "Karaoke." },
              { name: "Ramen Nagi", near: "Shinjuku, Tokyo", note: "Tokusei niboshi ramen. Most people eat ramen as late night drunk food, so go here last. It is on the second floor." },
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
            description: "Toyosu and Tsukiji market with the tuna auction, until 09:00. Sushi for breakfast.",
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
            description: "Kappabashi kitchen street until 11:00. Opening times vary, so leave room to come back.",
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
              { name: "Gyukatsu Kyoto Katsugyu", near: "Kyoto, Japan", note: "The original branch." },
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
              { name: "Gion Kitagawa Hanbei Honten", near: "Kyoto, Japan", note: "Matcha desserts. Needs a reservation." },
              { name: "Motoi Gyoza", near: "Kyoto, Japan", note: "Walk in only." },
              { name: "Men-ya Inoichi", near: "Kyoto, Japan", note: "Bib gourmand ramen. Queue at 11:00 for a ticket." },
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
            description: "Nara Park, to feed the wild deer, then Todai-ji and the Great Buddha Hall.",
            places: [
              { name: "Nara Park", near: "Nara, Japan" },
              { name: "Todai-ji", near: "Nara, Japan" },
            ],
          },
          {
            description: "Afternoon pick-me-up at Salon Naramachi, a traditional green tea house.",
            places: [{ name: "Salon Naramachi", near: "Nara, Japan" }],
          },
          { time: "14:00", description: "Hour-long train on to Osaka.", places: [{ name: "Osaka" }] },
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
      {
        day: "Day Twelve",
        title: "Fly Out",
        activities: [{ time: "09:55", description: "Flight out." }],
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
    summary:
      "A taco crawl, Rosetta, and a free walking tour of the historic centre, at altitude.",
    cover: mexicoCity,
    gated: false,
    teaser:
      "Four days, one of which is given over entirely to tacos. The first day is deliberately slow while you get used to the altitude.",
    tags: ["#Tacos", "#Rosetta", "#Roma"],
    notes: [
      "Mid 60s to low 70s during the day and high 50s to low 60s at night, so bring layers.",
    ],
    highlights: [
      "A taco crawl with a must-eat list and an if-still-hungry list",
      "Dinner at Rosetta, and pastries from its bakery the night before",
      "Chapultepec, twice the size of Central Park",
      "A free walking tour of the historic centre",
      "A mezcal mixology class to finish",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late",
        activities: [
          { time: "16:52", description: "Flight out." },
          { time: "22:00", description: "Land, check in, sleep." },
        ],
      },
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
            description: "Lunch at Entremar, the sister restaurant to the famous seafood one, same menu.",
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
            description: "Churros at El Moro, famous since 1935. The original is in the historic centre.",
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
        title: "La Condesa, Then Home",
        activities: [
          { description: "Wake up at leisure. You will need the rest after that weekend." },
          { description: "Brunch." },
          {
            description: "Casually explore La Condesa: vintage shops and design stores.",
            places: [{ name: "La Condesa", near: "Mexico City" }],
          },
          { time: "13:00", description: "Check out." },
          { time: "13:15", description: "Leave for the airport, about twenty minutes." },
          { time: "15:35", description: "Flight out." },
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
    summary:
      "Whale watching, a wicker toboggan down a hill, and a sunrise hike between the two highest peaks.",
    cover: madeira,
    gated: false,
    teaser:
      "Three days out of Funchal and hard-run: a boat, a cable car, a jeep tour of the north, and a 06:00 bus to catch sunrise on Pico do Arieiro before walking to Pico Ruivo.",
    tags: ["#PicoDoArieiro", "#Toboggan", "#Levada"],
    highlights: [
      "Sunrise at Pico do Arieiro, then the PR1 across to Pico Ruivo",
      "The wicker toboggan down from Monte",
      "Whale watching out of Funchal marina",
      "A jeep tour of Porto Moniz, Seixal and the Fanal Forest",
      "Two dinners by the same chef, at either end of the trip",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land in Funchal",
        activities: [{ time: "18:40", description: "Land, and get to Funchal." }],
      },
      {
        day: "Day One",
        title: "Whales, a Toboggan, and a Levada",
        activities: [
          {
            time: "08:00",
            description: "Coffee and matcha at Motya Coffee Shop.",
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
            description: "Queue for the toboggan, and ride it down to Livramento.",
            places: [{ name: "Monte Toboggan Run", near: "Funchal, Madeira" }],
          },
          {
            description: "Lunch at Restaurante Alta Vista, five to ten minutes away.",
            places: [{ name: "Restaurante Alta Vista", near: "Funchal, Madeira" }],
          },
          {
            description: "The Levada dos Tornos, an hour and a half out and back.",
            places: [{ name: "Levada dos Tornos", near: "Madeira" }],
          },
          {
            time: "20:45",
            description: "Dinner at Akua.",
            places: [{ name: "Akua", near: "Funchal, Madeira" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "The North, by Jeep",
        activities: [
          {
            time: "08:00",
            description: "Coffee and sandwiches at Leque.",
            places: [{ name: "Leque", near: "Funchal, Madeira" }],
          },
          {
            time: "09:00",
            description:
              "Jeep tour until 17:00: Porto Moniz, Seixal, the Fanal Forest and the Cabo Girão skywalk.",
            places: [
              { name: "Porto Moniz", near: "Madeira" },
              { name: "Seixal", near: "Madeira" },
              { name: "Fanal Forest", near: "Madeira" },
              { name: "Cabo Girão", near: "Madeira" },
            ],
          },
          {
            time: "17:30",
            description: "Put your name down at Restaurante Informal.",
            places: [{ name: "Restaurante Informal", near: "Funchal, Madeira" }],
          },
          {
            time: "17:45",
            description: "Wine tasting at Blandy's Wine Lodge. It closes at 18:30.",
            places: [{ name: "Blandy's Wine Lodge", near: "Funchal, Madeira" }],
          },
          {
            description: "Dinner at Restaurante Informal, then drinks at Revolucion Cocktail Bar.",
            places: [{ name: "Revolucion Cocktail Bar", near: "Funchal, Madeira" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Sunrise on Pico do Arieiro",
        activities: [
          { time: "06:00", description: "Bus to the Pico do Arieiro car park, arriving 06:45." },
          {
            time: "07:10",
            description: "Walk to the main viewpoint, and sunrise at 07:35.",
            places: [{ name: "Pico do Arieiro", near: "Madeira" }],
          },
          {
            time: "07:50",
            description: "Start the PR1 toward Pico Ruivo, reaching the summit around 10:45.",
            places: [{ name: "Pico Ruivo", near: "Madeira" }],
          },
          {
            time: "11:45",
            description: "Leave the summit, finishing at Achada do Teixeira around 13:00.",
            places: [{ name: "Achada do Teixeira", near: "Madeira" }],
          },
          {
            time: "14:00",
            description: "Late lunch at Kampo.",
            places: [{ name: "Kampo", near: "Funchal, Madeira" }],
          },
          {
            description: "The Madeira Botanical Garden, if there is anything left in you.",
            places: [{ name: "Madeira Botanical Garden", near: "Funchal, Madeira" }],
          },
          { time: "16:45", description: "Leave for the airport, about twenty minutes." },
          { time: "19:10", description: "Flight out." },
        ],
      },
    ],
  },
  {
    slug: "helsinki",
    title: "Helsinki and Tallinn",
    destination: "Helsinki",
    country: "Finland",
    coords: { lat: 60.1699, lon: 24.9384 },
    duration: "3 days",
    season: "Winter",
    summary:
      "Two Christmas markets, a sauna, and a two hour ferry between two countries.",
    cover: helsinki,
    gated: false,
    teaser:
      "A day and a half in Helsinki, a ferry across, and a day and a half in Tallinn. Built around the Christmas markets, which is the only part that has to be December.",
    tags: ["#ChristmasMarket", "#Loyly", "#Tallinn"],
    notes: [
      "The Christmas markets are the spine of this one, so it only really works in late November and December. Everything else holds year round.",
    ],
    highlights: [
      "Löyly sauna on the Helsinki waterfront",
      "The Helsinki Christmas market at Senate Square",
      "A two hour ferry from Helsinki to Tallinn",
      "The Tallinn Christmas market, eaten as dinner",
      "Ice skating at the Harju Street rink",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land Late in Helsinki",
        activities: [
          { time: "21:55", description: "Land in Helsinki." },
          { time: "22:40", description: "Into town by train." },
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
        title: "Helsinki, and the Market",
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
            description: "Explore the Design District shops.",
            places: [{ name: "Design District Helsinki" }],
          },
          {
            time: "14:00",
            description: "Löyly sauna, until 16:00.",
            places: [{ name: "Löyly", near: "Helsinki, Finland" }],
          },
          {
            time: "18:00",
            description:
              "The Helsinki Christmas market at Senate Square. It closes at 20:00, and the alcohol stops at 22:00.",
            places: [{ name: "Senate Square", near: "Helsinki, Finland" }],
          },
        ],
      },
      {
        day: "Day Two",
        title: "Ferry to Tallinn",
        activities: [
          {
            time: "10:00",
            description: "Walk to Cafe Regatta.",
            places: [{ name: "Cafe Regatta", near: "Helsinki, Finland" }],
          },
          { time: "12:45", description: "Be at the ferry." },
          { time: "13:30", description: "Ferry to Tallinn, until 15:30.", places: [{ name: "Tallinn" }] },
          { time: "16:00", description: "Drop bags at the hotel." },
          {
            time: "16:30",
            description: "The Tallinn Christmas market at Town Hall Square. This is dinner.",
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
        day: "Day Three",
        title: "Tallinn",
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
      {
        day: "Departure",
        title: "Out of Tallinn",
        activities: [
          { time: "09:30", description: "Twenty minute taxi to the airport." },
          { time: "11:45", description: "Flight out." },
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
    teaser:
      "Four nights on a Nile cruise doing the temples, then three in Cairo for the pyramids and Old Cairo. The cruise and the guides are all booked ahead; the free morning in Zamalek is not.",
    tags: ["#Nile", "#Giza", "#AbuSimbel"],
    notes: [
      "Do not drink the tap water, and do not eat anything unwashed or uncooked unless you really trust the source. Just being careful about food poisoning.",
      "Modest dress is needed for the guided days in Cairo.",
    ],
    highlights: [
      "A four night cruise from Aswan back down to Luxor",
      "Abu Simbel",
      "The High Dam and Philae Temple",
      "Giza and the Grand Egyptian Museum with a full day guide",
      "An Old Cairo walking tour with street bites",
    ],
    days: [
      {
        day: "Day One",
        title: "Land in Luxor",
        activities: [
          {
            time: "10:00",
            description: "Flight from London, landing in Luxor at 16:25.",
            places: [{ name: "Luxor", near: "Egypt" }],
          },
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
            description: "Pick up the Nile cruise at Aswan.",
            places: [{ name: "Aswan", near: "Egypt" }],
          },
          {
            time: "14:00",
            description: "Tour of the High Dam and Philae Temple.",
            places: [
              { name: "Aswan High Dam", near: "Egypt" },
              { name: "Philae Temple", near: "Aswan, Egypt" },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Abu Simbel",
        activities: [
          {
            description: "Abu Simbel.",
            places: [{ name: "Abu Simbel", near: "Egypt" }],
          },
        ],
      },
      {
        day: "Day Four",
        title: "Edfu",
        activities: [
          {
            description: "Edfu Temple.",
            places: [{ name: "Temple of Edfu", near: "Egypt" }],
          },
        ],
      },
      {
        day: "Day Five",
        title: "Off the Boat, On to Cairo",
        activities: [
          {
            description: "Tombs of the Nobles.",
            places: [{ name: "Tombs of the Nobles", near: "Luxor, Egypt" }],
          },
          { time: "14:00", description: "Leave the cruise." },
          { time: "16:00", description: "Transfer to the airport." },
          { time: "21:10", description: "Flight from Luxor to Cairo.", places: [{ name: "Cairo" }] },
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
            description: "Old Cairo guided walking tour until 17:00: history, culture and street bites.",
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
        title: "The Pool, Then Home",
        activities: [
          { description: "Breakfast at the hotel." },
          { description: "Enjoy the hotel: heated pool, gym." },
          { description: "Late lunch nearby, and any last sites." },
          { time: "15:00", description: "Leave the hotel." },
          { time: "17:15", description: "Flight out." },
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
    summary:
      "The old city in one morning, sunset up in Bebek, and a ferry over to the Asian side.",
    cover: istanbul,
    gated: false,
    teaser:
      "The famous sights are done in a single tight morning so the rest of the trip can be Bebek at sunset, the Asian side, and Balat. There are late nights built in.",
    tags: ["#HagiaSophia", "#Bebek", "#Balat"],
    highlights: [
      "The Spice Bazaar, Hagia Sophia, the Cistern and the Blue Mosque before lunch",
      "Sunset along the waterfront at Bebek",
      "A hammam near Galata",
      "The ferry to Üsküdar and the markets in Kadıköy",
      "Turkish breakfast at Privato, then the top of Galata Tower",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land, Then Out",
        activities: [
          { time: "20:30", description: "Land in Istanbul, and get in by 21:30." },
          { description: "Casual dinner nearby." },
          {
            description: "Cocktails at Biz Istanbul, then out.",
            places: [
              { name: "Biz Istanbul" },
              { name: "Upperist", near: "Istanbul, Turkey" },
              { name: "Komun Galataport", near: "Istanbul, Turkey" },
              { name: "Sail Loft Vakkorama", near: "Istanbul, Turkey" },
              { name: "Geyik Cihangir", near: "Istanbul, Turkey", note: "A few more bars right next to it." },
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
            description:
              "Street food along the way: maraş ice cream, simit, baklava.",
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
              { name: "Alexandra Arnavutkoy", near: "Istanbul, Turkey", note: "Another drink option." },
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
            description: "Ferry over to the Asian side, and explore Üsküdar, stopping at Beylerbeyi Palace.",
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
          { time: "18:45", description: "Leave for the airport." },
          { time: "21:10", description: "Take off." },
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
    teaser:
      "Three days, one of which is a seven hour tour to Auschwitz. The last day is deliberately all food: obwarzanek, zapiekanka, pączki and a traditional milk bar.",
    tags: ["#Kazimierz", "#Pierogi", "#MilkBar"],
    highlights: [
      "Late night pierogi straight off the plane",
      "A day at Auschwitz",
      "Live jazz at The Artist Bar, then a vodka tasting",
      "Kazimierz, the Jewish quarter, on foot",
      "A traditional milk bar, and potato pancakes",
    ],
    days: [
      {
        day: "Day One",
        title: "Land, and Eat Pierogi",
        activities: [
          { time: "10:05", description: "Land in Kraków." },
          {
            description:
              "Twenty minutes by car, or 33 by train, into town. Bolt is cheaper than Uber here.",
          },
          {
            description: "Late night pierogi at Przystanek Pierogarnia, on Szewska in the Old Town.",
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
            description: "Walk Kazimierz, the Jewish quarter, and the Schindler's List passage on Józefa.",
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
          { time: "16:30", description: "Leave for the airport." },
          { time: "20:40", description: "Take off." },
        ],
      },
    ],
  },
  {
    slug: "tuscany",
    title: "Three Days in Tuscany",
    destination: "Tuscany",
    country: "Italy",
    coords: { lat: 43.7228, lon: 10.4017 },
    duration: "3 days",
    season: "Autumn",
    summary:
      "A villa, a wine tour, and a private chef. Pisa on the way in and out.",
    cover: tuscany,
    gated: false,
    teaser:
      "Not really a sightseeing trip. An afternoon in Pisa while the villa gets ready, then two days of a pool, a wine tour, four course dinners and a tennis tournament.",
    tags: ["#Villa", "#WineTour", "#Pisa"],
    highlights: [
      "An afternoon in Pisa while the villa is being made ready",
      "A four course dinner at i'Bacco Toscano",
      "A wine tour and lunch",
      "A private chef cooking four courses at the house",
      "A tennis tournament nobody planned properly",
    ],
    days: [
      {
        day: "Day One",
        title: "Pisa, Then the Villa",
        activities: [
          { description: "Cars from the airport, timed to the flights. One goes early for the grocery and alcohol run." },
          {
            description: "Explore Pisa until the villa is ready. Thirteen minutes to the city centre.",
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
          { time: "15:00", description: "Check in. An hour's drive to the villa." },
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
        title: "Brunch, Tennis, Home",
        activities: [
          { time: "10:00", description: "Check out of one villa and move to the next." },
          { description: "Brunch, cooked at the house." },
          { description: "Tennis tournament." },
          { time: "16:45", description: "Leave for Pisa airport." },
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
    summary:
      "Northern lights, a fjord cruise, and dog sledding, with a sauna and cold plunge in between.",
    cover: tromso,
    gated: false,
    teaser:
      "Three days inside the Arctic Circle with one big booked thing each day. The town itself takes an afternoon, and the rest is weather.",
    tags: ["#NorthernLights", "#DogSledding", "#Fjords"],
    notes: [
      "The northern lights need dark winter nights, so this only works between roughly late September and late March.",
    ],
    highlights: [
      "A northern lights tour running from late afternoon to 23:00",
      "A fjord cruise out of the pier behind Nerstranda",
      "Dog sledding",
      "Sauna and cold plunge at Pust",
      "The northernmost McDonald's, Hard Rock and brewery in the world",
    ],
    days: [
      {
        day: "Arrival",
        title: "Land, and Sleep",
        activities: [{ description: "Land, and go straight to sleep." }],
      },
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
      {
        day: "Day Two",
        title: "Fjords",
        activities: [
          {
            time: "10:40",
            description: "Meet at the pier behind the Nerstranda shopping centre.",
            places: [{ name: "Nerstranda", near: "Tromsø, Norway" }],
          },
          { time: "11:00", description: "Fjords cruise, disembarking at 14:30." },
          {
            description: "Then whatever fits.",
            places: [
              { name: "Pust", near: "Tromsø, Norway", note: "Sauna and cold plunge." },
              { name: "Arctic Cathedral", near: "Tromsø, Norway" },
              { name: "Ice Bar", near: "Tromsø, Norway" },
              { name: "Mack Brewery", near: "Tromsø, Norway", note: "The northernmost brewery. There is also a northernmost McDonald's and Hard Rock." },
            ],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Dog Sledding, Then Out",
        activities: [
          { time: "11:30", description: "Dog sledding." },
          { time: "16:30", description: "Dinner in town." },
          { time: "18:00", description: "Head to the airport." },
          { time: "20:00", description: "Flight out." },
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
    teaser:
      "Based in Hongdae. One day is entirely the DMZ, one is a four to six hour hike, and one ends with ramen on the Han River at sunset. Two things need booking well ahead.",
    tags: ["#Hongdae", "#DMZ", "#HanRiver"],
    highlights: [
      "A full day DMZ tour with the world's longest suspension bridge",
      "Gyeongbokgung Palace, free if you rent a hanbok",
      "Hiking Bukhansan National Park",
      "Ramen on the Han River at sunset, with blankets for sale",
      "A baseball game at Jamsil, tickets from the kiosk on the day",
    ],
    days: [
      {
        day: "Day One",
        title: "Hongdae",
        activities: [
          { description: "Land, and settle in." },
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
            description: "Hanbok rental, optional. Wearing traditional dress gets you into the palace free.",
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
            description: "Explore Myeongdong, then eat at Myeongdong Kyoja. Michelin Guide, four menu items, expect a wait.",
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
            description: "Banpo Hangang Park, optional. The light show runs at 19:30, 20:00, 20:30 and 21:00.",
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
            description: "Baseball at Jamsil. Apparently sick fried chicken and all round good vibes.",
            places: [{ name: "Jamsil Baseball Stadium", near: "Seoul, South Korea" }],
          },
        ],
      },
      {
        day: "Day Seven",
        title: "One Museum, Then Home",
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
          { time: "13:00", description: "Leave for the airport." },
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
    summary:
      "Valletta in a day, a boat out to the Blue Lagoon, and the coastline path to Dingli Cliffs.",
    cover: malta,
    gated: false,
    teaser:
      "Based in St Julian's. One day of Valletta and Mdina at sunset, one whole day on a boat around Comino and Gozo, and one of cliffs and beaches before the late flight.",
    tags: ["#Valletta", "#BlueLagoon", "#Mdina"],
    highlights: [
      "The midday cannon salute from the Barrakka Gardens",
      "Mdina at sunset, and Serkin for cheesecake on the way out",
      "A full day boat to the Blue Lagoon, the caves and the Gozo coastline",
      "The coastline path from the Blue Grotto to Dingli Cliffs",
      "Paceville, when you still have it in you",
    ],
    days: [
      {
        day: "Day One",
        title: "Valletta, Then Mdina at Sunset",
        activities: [
          { time: "09:35", description: "Land, and twenty minutes to St Julian's to drop bags.", places: [{ name: "St Julian's", near: "Malta" }] },
          {
            description: "Walk to Sliema, about 25 minutes, grabbing coffee on the way, then the ten minute ferry to Valletta.",
            places: [{ name: "Sliema", near: "Malta" }, { name: "Valletta", near: "Malta" }],
          },
          {
            description: "The Valletta highlights.",
            places: [
              { name: "Triton Fountain", near: "Valletta, Malta" },
              { name: "City Gate", near: "Valletta, Malta" },
              { name: "St John's Co-Cathedral", near: "Valletta, Malta" },
              { name: "Grandmaster's Palace", near: "Valletta, Malta" },
              { name: "Upper Barrakka Gardens", near: "Valletta, Malta", note: "Views, and the cannon salute at noon." },
              { name: "MUZA", near: "Valletta, Malta", note: "Art museum." },
              { name: "Valletta Waterfront", near: "Malta" },
            ],
          },
          {
            description: "Lunch at Rubino, traditional Maltese, or Rampila, built into the bastions.",
            places: [
              { name: "Rubino", near: "Valletta, Malta" },
              { name: "Rampila", near: "Valletta, Malta" },
            ],
          },
          {
            description: "Gelato and coffee at Lot Sixty One.",
            places: [{ name: "Lot Sixty One", near: "Valletta, Malta" }],
          },
          {
            description:
              "If you skip the Valletta sights, the beach at St Paul's Bay is nearer the flat. Or ferry over to the Three Cities.",
            places: [
              { name: "St Paul's Bay", near: "Malta" },
              { name: "The Three Cities", near: "Malta", note: "Birgu, Senglea and Cospicua." },
            ],
          },
          {
            description: "Taxi to Mdina for sunset.",
            places: [{ name: "Mdina", near: "Malta" }],
          },
          {
            description: "Dinner in Mdina.",
            places: [
              { name: "Coogi's", near: "Mdina, Malta" },
              { name: "Scala", near: "Mdina, Malta" },
              { name: "Golden Fork", near: "Mdina, Malta" },
              { name: "Trattoria AD 1530", near: "Mdina, Malta" },
            ],
          },
          {
            description: "Stop at Serkin for the famous Maltese cheesecake, to go.",
            places: [{ name: "Crystal Palace Serkin", near: "Rabat, Malta" }],
          },
          {
            description: "Pregame, then the bars and clubs in Paceville.",
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
        title: "Boat Day",
        activities: [
          {
            time: "10:00",
            description:
              "Boat day until 18:00: the Blue Lagoon at Comino, the caves, and the Gozo coastline.",
            places: [
              { name: "Blue Lagoon", near: "Comino, Malta" },
              { name: "Gozo", near: "Malta" },
            ],
          },
          {
            description: "Dinner at Spinola Bay in St Julian's, then out again.",
            places: [{ name: "Spinola Bay", near: "St Julian's, Malta" }],
          },
        ],
      },
      {
        day: "Day Three",
        title: "Cliffs, Beach, Then the Late Flight",
        activities: [
          {
            description: "Pick up a Gambrinus ftira, the ring-shaped sourdough with fillings.",
            places: [{ name: "Gambrinus", near: "Malta" }],
          },
          {
            description: "Uber to the Blue Grotto.",
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
          { description: "Back to pack, and a quick dinner." },
          { time: "22:30", description: "Leave St Julian's for the airport." },
        ],
      },
    ],
    extras: [
      {
        title: "Eat and drink",
        places: [
          { name: "Cafe Society", near: "Valletta, Malta" },
          { name: "Paranga" },
          { name: "Rafael's" },
          { name: "Villa Bologna Restaurant" },
          { name: "LOA" },
          { name: "Beef Bar" },
          { name: "Taproom" },
        ],
      },
    ],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
