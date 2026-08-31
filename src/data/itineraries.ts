import sanSebastian from "@/assets/san-sebastian.jpg";
import tunisia from "@/assets/tunisia.svg";
import berlin from "@/assets/berlin.svg";
import taipei from "@/assets/taipei.svg";
import amsterdam from "@/assets/amsterdam.svg";
import nashville from "@/assets/nashville.svg";

/** A named venue, with the map link and address if we have them. */
export type Place = {
  name: string;
  /** Map link. Rendered as the place's link when present. */
  url?: string;
  address?: string;
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
            description: "Land in Bilbao.",
            places: [{ name: "Bilbao Airport", near: "Bilbao, Spain" }],
          },
          { description: "Bus from Bilbao to San Sebastián." },
          {
            description: "Check in and stay in the Old Town - everything below is walkable from there.",
            places: [{ name: "Parte Vieja (Old Town)" }],
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
            places: [{ name: "Simona Cafe" }, { name: "Paseo de La Concha" }],
          },
          { description: "Beach time at La Concha.", places: [{ name: "La Concha Beach" }] },
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
                address: "Calle Los Reyes Católicos, 10, 20006 Donostia-San Sebastian, Gipuzkoa, Spain",
              },
              {
                name: "KATA4",
                url: "https://goo.gl/maps/Wa4azttoVbzpSD5A6",
                address: "Santa Catalina Plazatxoa, 4, 20004 Donostia, Gipuzkoa, Spain",
              },
              {
                name: "Bar El Pícaro",
                url: "https://share.google/7wJXv0hk0OUaNb865",
              },
              {
                name: "Curdelón",
                url: "https://goo.gl/maps/HSHsKqeE9XkfqY2a6",
                address: "Kolon Pasealekua, 35, 20002 Donostia, Gipuzkoa",
              },
              {
                name: "Casa Senra Donostia",
                url: "https://goo.gl/maps/gryTHyA7TUjrxJJ29",
                address: "San Francisco Kalea, 20002 Donostia, Gipuzkoa, Spain",
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
            description: "Visit the tower and the amusement park.",
            places: [
              { name: "Torreón de Monte Igueldo" },
              { name: "Parque de Atracciones Monte Igueldo" },
            ],
          },
          {
            description: "Lunch at Ganbara.",
            places: [{ name: "Ganbara", note: "Anthony Bourdain's favourite spot." }],
          },
          { description: "Beach time at Zurriola.", places: [{ name: "Zurriola Beach" }] },
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
            places: [{ name: "Paseo de La Concha" }],
          },
          { description: "Lunch at Casa Urola.", places: [{ name: "Casa Urola" }] },
          { description: "Beach time at Ondarreta.", places: [{ name: "Ondarreta Beach" }] },
          {
            description: "Shopping.",
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
            places: [{ name: "London Gatwick Airport", near: "London, UK" }],
          },
          {
            time: "23:25",
            description: "Land in Tunis.",
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
            places: [{ name: "Bardo National Museum", near: "Tunis, Tunisia" }],
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
            description: "Taxi to La Marsa and walk along the beach.",
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
            description: "Land.",
            places: [{ name: "Berlin Brandenburg Airport" }],
          },
          { time: "12:00", description: "Drop bags at the hotel." },
          {
            description: "Kebab at Rüyam Gemüse Kebab.",
            places: [
              {
                name: "Rüyam Gemüse Kebab",
                address: "Hauptstraße 36, 10827 Berlin, Germany",
              },
            ],
          },
          {
            description: "Ice cream at Jones Ice Cream.",
            places: [{ name: "Jones Ice Cream" }],
          },
          {
            time: "14:00",
            description: "Two-hour walking tour, meeting at the Quadriga.",
            places: [{ name: "Quadriga", address: "Pariser Platz, 10117 Berlin, Germany" }],
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
            places: [{ name: "KitKatClub" }],
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
            places: [{ name: "Annelies" }],
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
              { name: "Holzmarkt", address: "Holzmarktstraße 25, Berlin, Germany" },
            ],
          },
          {
            time: "17:15",
            description: "Climb the Reichstag building. Tickets have to be applied for in advance.",
            places: [{ name: "Reichstag Building" }],
          },
          { time: "19:15", description: "Leave for the airport." },
          {
            time: "21:45",
            description: "Flight from Berlin Brandenburg.",
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
            description: "Land at TPE.",
            places: [{ name: "Taoyuan International Airport", near: "Taoyuan, Taiwan" }],
          },
          {
            time: "11:30",
            description: "Arrive at the Regent Taipei.",
            places: [{ name: "Regent Taipei" }],
          },
          {
            description: "Lunch at Azie on the hotel credit, then check in and rest.",
            places: [{ name: "Azie Regent Taipei" }],
          },
          {
            time: "14:45",
            description: "Walk to the Da'an area.",
            places: [{ name: "Da'an District" }],
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
            description: "Taipei Miniature Museum.",
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
            description: "Put your name down at Din Tai Fung, then drink at UNO Taipei while you wait.",
            places: [{ name: "Din Tai Fung Taipei 101" }, { name: "UNO Taipei" }],
          },
          {
            description: "Dinner at Din Tai Fung at Taipei 101.",
            places: [{ name: "Din Tai Fung Taipei 101" }],
          },
          {
            description: "Drinks at Draft Land, or KOR, or both.",
            places: [{ name: "Draft Land" }, { name: "KOR Taipei" }],
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
            description: "Leave for TPE.",
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
            places: [{ name: "London Luton Airport", near: "Luton, UK" }],
          },
          {
            time: "21:05",
            description: "Land in Amsterdam.",
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
            description: "Transfer for the cruise.",
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
            places: [{ name: "De Wallen" }],
          },
          { time: "23:30", description: "Sex show in the Red Light District." },
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
            places: [{ name: "Lindengracht Market" }],
          },
          {
            description: "Apple pie at Winkel 43, or a pancake at the Pancake Bakery.",
            places: [{ name: "Winkel 43" }, { name: "The Pancake Bakery" }],
          },
          {
            description: "Pick up shrooms at Tatanka Smartshop.",
            places: [{ name: "Tatanka Smartshop" }],
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
            description: "Walk through Vondelpark, then stay in it. Shrooms, painting, sitting.",
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
            description: "Wander the Jordaan and the Nine Streets. Boutiques, coffee, canals.",
            places: [
              { name: "Jordaan" },
              { name: "The Nine Streets" },
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
            description: "Harry Styles Together, Together pop-up.",
            places: [
              {
                name: "Together Together Pop-Up",
                address: "Looiergracht 60, 1016 VT Amsterdam",
                note: "Public hours 12:00 to 19:00.",
              },
            ],
          },
          {
            description: "Quick dinner or drinks in the Jordaan, or up at A'DAM Lookout.",
            places: [{ name: "A'DAM Lookout" }],
          },
          { time: "19:15", description: "Back to the hotel to collect the bags." },
          {
            time: "19:30",
            description: "Head to Schiphol.",
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
            description: "Land.",
            places: [{ name: "Nashville International Airport" }],
          },
          {
            description: "Drop bags at the Aertson Hotel.",
            places: [{ name: "Aertson Hotel" }],
          },
          { time: "12:00", description: "Early check in." },
          {
            description: "Walk around campus.",
            places: [{ name: "Vanderbilt University" }],
          },
          { description: "Back to change for dinner." },
          {
            time: "18:15",
            description: "Dinner at Rolf & Daughters.",
            places: [{ name: "Rolf and Daughters" }],
          },
          {
            time: "20:30",
            description: "The Listening Room.",
            places: [{ name: "The Listening Room Cafe" }],
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
            places: [{ name: "Woodhouse Spa" }],
          },
          { description: "Relax." },
          {
            time: "13:30",
            description: "Barbecue lunch at Edley's.",
            places: [{ name: "Edley's Bar-B-Que" }],
          },
          {
            description: "Walk around 12 South, and stop at Five Daughters Bakery.",
            places: [{ name: "12 South" }, { name: "Five Daughters Bakery" }],
          },
          {
            time: "19:30",
            description: "Dinner at Chauhan.",
            places: [{ name: "Chauhan Ale and Masala House" }],
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
            places: [{ name: "Fifth + Broadway" }],
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
            description: "Flight.",
            places: [{ name: "Nashville International Airport" }],
          },
        ],
      },
    ],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
