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
   * list of recommendations that comes back from a trip.
   */
  extras?: { title: string; places: Place[] };
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
    extras: {
      title: "Not on the plan, but worth knowing",
      places: [
        { name: "Cafe Baskets", note: "Coffee." },
        { name: "Louf", note: "Bakery." },
        { name: "Samuals", note: "Wine, apero, dinner." },
        { name: "Broodje Gerald", note: "Coffee and sandwiches." },
        { name: "Oeuf", note: "Brunch." },
      ],
    },
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
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
