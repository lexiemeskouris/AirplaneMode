import lisbon from "@/assets/lisbon.jpg";
import kyoto from "@/assets/kyoto.jpg";
import amalfi from "@/assets/amalfi.jpg";
import marrakech from "@/assets/marrakech.jpg";
import iceland from "@/assets/iceland.jpg";
import oaxaca from "@/assets/oaxaca.jpg";
import sanSebastian from "@/assets/san-sebastian.svg";

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
    slug: "lisbon-three-days",
    title: "Three Days in Lisbon",
    destination: "Lisbon",
    country: "Portugal",
    duration: "3 days",
    season: "Spring",
    summary:
      "A slow wander through Lisbon's tiled hills - pastel streets, fado nights, and the best pastéis de nata you'll ever eat.",
    cover: lisbon,
    gated: false,
    teaser:
      "Lisbon rewards the unhurried. This route threads the old Moorish Alfama with breezy riverfront afternoons and late-night fado in a candlelit tasca.",
    tags: ["#PastelDeNata", "#Tram28", "#FadoNights"],
    highlights: [
      "Sunrise miradouro over the terracotta roofs",
      "Tram 28 from Graça to Estrela",
      "A fado dinner in Alfama",
      "Day trip to Sintra's palaces",
    ],
    days: [
      {
        day: "Day 1",
        title: "The Old Hills",
        activities: [
          {
            time: "08:30",
            description: "Pastel de nata + bica at Manteigaria, Praça do Comércio side.",
            places: [{ name: "Manteigaria" }, { name: "Praça do Comércio" }],
          },
          {
            time: "10:00",
            description: "Wander Alfama's alleys down to Sé Cathedral.",
            places: [{ name: "Alfama" }, { name: "Sé de Lisboa" }],
          },
          {
            time: "13:00",
            description: "Lunch of grilled sardines at a tasca in Graça.",
            places: [{ name: "Graça" }],
          },
          {
            time: "17:00",
            description: "Miradouro da Senhora do Monte for golden hour.",
            places: [{ name: "Miradouro da Senhora do Monte" }],
          },
          {
            time: "20:30",
            description: "Fado dinner at Tasca do Chico.",
            places: [{ name: "Tasca do Chico" }],
          },
        ],
      },
      {
        day: "Day 2",
        title: "River & Tile",
        activities: [
          {
            time: "09:00",
            description: "Tram 25 to Belém - monastery and riverside walk.",
            places: [{ name: "Belém" }, { name: "Jerónimos Monastery" }],
          },
          {
            time: "11:30",
            description: "Original Pastéis de Belém (worth the queue).",
            places: [{ name: "Pastéis de Belém" }],
          },
          {
            time: "14:00",
            description: "MAAT museum and the 25 de Abril bridge view.",
            places: [{ name: "MAAT" }, { name: "Ponte 25 de Abril" }],
          },
          {
            time: "19:00",
            description: "Time Out Market for a grazing dinner.",
            places: [{ name: "Time Out Market" }],
          },
        ],
      },
      {
        day: "Day 3",
        title: "Sintra Day Trip",
        activities: [
          {
            time: "08:00",
            description: "Train from Rossio to Sintra.",
            places: [{ name: "Rossio Station" }, { name: "Sintra" }],
          },
          {
            time: "09:30",
            description: "Pena Palace before the crowds.",
            places: [{ name: "Pena Palace" }],
          },
          {
            time: "12:30",
            description: "Quinta da Regaleira's mossy well spiral.",
            places: [{ name: "Quinta da Regaleira" }],
          },
          {
            time: "15:00",
            description: "Cabo da Roca - westernmost point of Europe.",
            places: [{ name: "Cabo da Roca" }],
          },
          {
            time: "18:30",
            description: "Back to Lisbon, farewell dinner in Bairro Alto.",
            places: [{ name: "Bairro Alto" }],
          },
        ],
      },
    ],
  },
  {
    slug: "slow-week-kyoto",
    title: "A Slow Week in Kyoto",
    destination: "Kyoto",
    country: "Japan",
    duration: "7 days",
    season: "Autumn",
    summary:
      "Temples at dawn, tea ceremonies, and the quiet discipline of moss gardens. The full week unfolds slowly - exactly as Kyoto intends.",
    cover: kyoto,
    gated: true,
    bmcUrl: BMC_URL,
    teaser:
      "Kyoto is not a checklist. This itinerary is paced for stillness: early-morning temples before the crowds, a private tea ceremony, and a day walking the Philosopher's Path as the maples turn. Day 1 below is free to read - the full seven-day plan unlocks with a coffee.",
    tags: ["#TempleDawn", "#TeaCeremony", "#MapleWalk"],
    highlights: [
      "Fushimi Inari at first light",
      "Private tea ceremony in Higashiyama",
      "Dawn at Saihō-ji moss temple",
      "Arima onsen overnight",
    ],
    days: [
      {
        day: "Day 1",
        title: "Arrival & Eastern Temples",
        activities: [
          {
            time: "07:00",
            description: "Kiyomizu-dera before the gates fill.",
            places: [{ name: "Kiyomizu-dera" }],
          },
          {
            time: "10:30",
            description: "Wander Sannenzaka & Ninenzaka, matcha soft serve.",
            places: [{ name: "Sannenzaka" }, { name: "Ninenzaka" }],
          },
          { time: "13:00", description: "Lunch - yudofu (tofu hotpot) in a temple garden." },
          {
            time: "16:00",
            description: "Kodai-ji's bamboo grove at dusk.",
            places: [{ name: "Kodai-ji" }],
          },
          {
            time: "19:00",
            description: "Gion lantern-lit dinner, maiko-spotting.",
            places: [{ name: "Gion" }],
          },
        ],
      },
    ],
  },
  {
    slug: "amalfi-road-trip",
    title: "Road Tripping the Amalfi Coast",
    destination: "Amalfi Coast",
    country: "Italy",
    duration: "4 days",
    season: "Late Spring",
    summary:
      "Cliff-hugging switchbacks, lemon groves, and swims in hidden coves. A driver's itinerary with the best stops timed to beat the crowds.",
    cover: amalfi,
    gated: false,
    teaser:
      "The SS163 is one of the world's great drives - but it punishes the rushed. This route times each stop to light and traffic, with a swim before lunch and a spritz at the right hour.",
    tags: ["#CliffDrive", "#PathOfGods", "#LemonSpritz"],
    highlights: [
      "Positano from the sea",
      "Ravello gardens at sunset",
      "Path of the Gods hike",
      "Lemon grove lunch in Minori",
    ],
    days: [
      {
        day: "Day 1",
        title: "Into the Cliffs",
        activities: [
          {
            time: "09:00",
            description: "Pick up the car in Salerno, drive west.",
            places: [{ name: "Salerno" }],
          },
          {
            time: "11:00",
            description: "First stop: Vietri sul Mare for ceramics.",
            places: [{ name: "Vietri sul Mare" }],
          },
          {
            time: "13:00",
            description: "Lunch in Cetara - anchovy colatura pasta.",
            places: [{ name: "Cetara" }],
          },
          {
            time: "16:00",
            description: "Arrive Positano, check in, walk to Spiaggia Grande.",
            places: [{ name: "Positano" }, { name: "Spiaggia Grande" }],
          },
          { time: "20:00", description: "Dinner at a cliffside terrace, watch the lights climb." },
        ],
      },
      {
        day: "Day 2",
        title: "Path of the Gods",
        activities: [
          {
            time: "07:30",
            description: "Boats to Praiano, start the Sentiero degli Dei.",
            places: [{ name: "Praiano" }, { name: "Sentiero degli Dei" }],
          },
          {
            time: "12:00",
            description: "Trail ends in Nocelle - reward lunch.",
            places: [{ name: "Nocelle" }],
          },
          {
            time: "15:00",
            description: "Afternoon swim at Fornillo beach.",
            places: [{ name: "Spiaggia di Fornillo" }],
          },
          {
            time: "19:30",
            description: "Lemon spritz and pizza in Positano.",
            places: [{ name: "Positano" }],
          },
        ],
      },
      {
        day: "Day 3",
        title: "Ravello & Amalfi",
        activities: [
          {
            time: "09:00",
            description: "Drive up to Ravello, Villa Cimbrone gardens.",
            places: [{ name: "Ravello" }, { name: "Villa Cimbrone" }],
          },
          {
            time: "12:30",
            description: "Down to Amalfi - cathedral and paper museum.",
            places: [{ name: "Amalfi Cathedral" }, { name: "Museo della Carta" }],
          },
          {
            time: "15:00",
            description: "Emerald Grotto by boat.",
            places: [{ name: "Grotta dello Smeraldo" }],
          },
          {
            time: "20:00",
            description: "Seafood dinner in Atrani, the quiet neighbor.",
            places: [{ name: "Atrani" }],
          },
        ],
      },
      {
        day: "Day 4",
        title: "Capelli & Capri",
        activities: [
          {
            time: "08:00",
            description: "Ferry to Capri from Amalfi.",
            places: [{ name: "Capri" }],
          },
          {
            time: "10:00",
            description: "Boat tour of the Faraglioni.",
            places: [{ name: "Faraglioni" }],
          },
          {
            time: "13:00",
            description: "Chairlift up Monte Solaro.",
            places: [{ name: "Monte Solaro" }],
          },
          {
            time: "18:00",
            description: "Return ferry, farewell dinner in Minori.",
            places: [{ name: "Minori" }],
          },
        ],
      },
    ],
  },
  {
    slug: "marrakech-five-days",
    title: "Five Days in Marrakech",
    destination: "Marrakech",
    country: "Morocco",
    duration: "5 days",
    season: "Autumn",
    summary:
      "Souks, riads, and a night in the Agafay desert. The full plan maps the medina's maze and gets you out of the city for stars and silence.",
    cover: marrakech,
    gated: true,
    bmcUrl: BMC_URL,
    teaser:
      "Marrakech overwhelms the senses by design. This itinerary pairs a guided souk route with the quiet of a hammam, a cookery class, and a desert night under the stars. Day 1 is free below; the full five-day plan unlocks with a coffee.",
    tags: ["#SoukMaze", "#Hammam", "#DesertStars"],
    highlights: [
      "Jemaa el-Fnaa at dusk",
      "A traditional hammam ritual",
      "Agafay desert overnight",
      "Yves Saint Laurent's Majorelle Garden",
    ],
    days: [
      {
        day: "Day 1",
        title: "Into the Medina",
        activities: [
          { time: "10:00", description: "Settle into the riad, mint tea on the roof." },
          {
            time: "12:00",
            description: "First wander into the souks - get lost on purpose.",
            places: [{ name: "Souks of Marrakech" }],
          },
          {
            time: "15:00",
            description: "Ben Youssef Madrasa's zellige tilework.",
            places: [{ name: "Ben Youssef Madrasa" }],
          },
          {
            time: "17:30",
            description: "Jemaa el-Fnaa as the storytellers wake.",
            places: [{ name: "Jemaa el-Fnaa" }],
          },
          { time: "20:00", description: "Tagine dinner at a rooftop restaurant." },
        ],
      },
    ],
  },
  {
    slug: "iceland-ring-road",
    title: "Iceland's Ring Road",
    destination: "Ring Road",
    country: "Iceland",
    duration: "7 days",
    season: "Summer",
    summary:
      "One road, one lap, one unforgettable island. Waterfalls, black sand, geothermal pools, and 24-hour light to chase it all in.",
    cover: iceland,
    gated: false,
    teaser:
      "Route 1 circles the island and rarely disappoints. This seven-day loop is paced to the midnight sun - early starts, long detours, and soaks in remote pools after the day-trippers leave.",
    tags: ["#RingRoad", "#WaterfallChase", "#MidnightSun"],
    highlights: [
      "Sunrise at Jökulsárlón glacier lagoon",
      "Diamond Beach ice diamonds",
      "Soak in the Secret Lagoon",
      "Hverir's bubbling mud pools",
    ],
    days: [
      {
        day: "Day 1",
        title: "Golden Circle Start",
        activities: [
          {
            time: "08:00",
            description: "Pick up the 4x4 in Reykjavík.",
            places: [{ name: "Reykjavík" }],
          },
          {
            time: "10:00",
            description: "Þingvellir - walk between continents.",
            places: [{ name: "Þingvellir National Park" }],
          },
          {
            time: "12:30",
            description: "Geysir and Gullfoss.",
            places: [{ name: "Geysir" }, { name: "Gullfoss" }],
          },
          {
            time: "16:00",
            description: "Secret Lagoon soak in Flúðir.",
            places: [{ name: "Secret Lagoon" }, { name: "Flúðir" }],
          },
          {
            time: "19:00",
            description: "Sleep in Hella.",
            places: [{ name: "Hella" }],
          },
        ],
      },
      {
        day: "Day 2",
        title: "South Coast Falls",
        activities: [
          {
            time: "09:00",
            description: "Seljalandsfoss - walk behind the falls.",
            places: [{ name: "Seljalandsfoss" }],
          },
          {
            time: "11:00",
            description: "Skógafoss and the nearby folk museum.",
            places: [{ name: "Skógafoss" }, { name: "Skógar Museum" }],
          },
          {
            time: "14:00",
            description: "Reynisfjara black sand beach (keep off the waves).",
            places: [{ name: "Reynisfjara" }],
          },
          {
            time: "18:00",
            description: "Dyrhólaey at golden hour, sleep in Vík.",
            places: [{ name: "Dyrhólaey" }, { name: "Vík í Mýrdal" }],
          },
        ],
      },
      {
        day: "Day 3",
        title: "Glacier Lagoon",
        activities: [
          { time: "08:00", description: "Drive east along the lava coast." },
          {
            time: "12:00",
            description: "Jökulsárlón - kayak among the bergs.",
            places: [{ name: "Jökulsárlón" }],
          },
          {
            time: "14:00",
            description: "Diamond Beach, then continue to Höfn.",
            places: [{ name: "Diamond Beach" }, { name: "Höfn" }],
          },
          {
            time: "19:00",
            description: "Langoustine dinner in Höfn.",
            places: [{ name: "Höfn" }],
          },
        ],
      },
      {
        day: "Day 4",
        title: "East Fjords",
        activities: [
          {
            time: "09:00",
            description: "Wind through the fjords to Egilsstaðir.",
            places: [{ name: "Egilsstaðir" }],
          },
          {
            time: "13:00",
            description: "Hengifoss waterfall hike.",
            places: [{ name: "Hengifoss" }],
          },
          { time: "16:00", description: "Lunch at a fjordside village." },
        ],
      },
      {
        day: "Day 5",
        title: "North & Mývatn",
        activities: [
          {
            time: "08:00",
            description: "Dettifoss - Europe's most powerful waterfall.",
            places: [{ name: "Dettifoss" }],
          },
          {
            time: "11:00",
            description: "Mývatn geothermal area, Hverir mud pools.",
            places: [{ name: "Mývatn" }, { name: "Hverir" }],
          },
          {
            time: "15:00",
            description: "Mývatn Nature Baths.",
            places: [{ name: "Mývatn Nature Baths" }],
          },
        ],
      },
      {
        day: "Day 6",
        title: "Whales & Gods",
        activities: [
          {
            time: "09:00",
            description: "Húsavík whale watching.",
            places: [{ name: "Húsavík" }],
          },
          {
            time: "13:00",
            description: "Ásbyrgi canyon walk.",
            places: [{ name: "Ásbyrgi" }],
          },
          {
            time: "17:00",
            description: "Goðafoss, drive toward Akureyri.",
            places: [{ name: "Goðafoss" }, { name: "Akureyri" }],
          },
        ],
      },
      {
        day: "Day 7",
        title: "Back to Reykjavík",
        activities: [
          {
            time: "09:00",
            description: "Akureyri morning, church and botanical garden.",
            places: [{ name: "Akureyrarkirkja" }, { name: "Akureyri Botanical Garden" }],
          },
          {
            time: "12:00",
            description: "Long drive west through the Skagafjörður.",
            places: [{ name: "Skagafjörður" }],
          },
          {
            time: "18:00",
            description: "Return to Reykjavík, farewell soak at Sky Lagoon.",
            places: [{ name: "Sky Lagoon" }],
          },
        ],
      },
    ],
  },
  {
    slug: "oaxaca-72-hours",
    title: "Oaxaca in 72 Hours",
    destination: "Oaxaca",
    country: "Mexico",
    duration: "3 days",
    season: "Autumn",
    summary:
      "Mole markets, mezcal palenques, and the ruins above the valley. Oaxaca in three perfectly spiced days.",
    cover: oaxaca,
    gated: true,
    bmcUrl: BMC_URL,
    teaser:
      "Oaxaca is Mexico's deepest flavor. This plan threads the markets, a mezcal tasting, a cookery class, and Monte Albán above the valley. Day 1 is free to read - the full 72-hour plan opens with a coffee.",
    tags: ["#MoleMarkets", "#Mezcal", "#MonteAlban"],
    highlights: [
      "Mercado 20 de Noviembre's pasillo de humo",
      "Mezcal tasting at a family palenque",
      "Monte Albán at the Zapotec zenith",
      "Alebrije wood-carving village",
    ],
    days: [
      {
        day: "Day 1",
        title: "Markets & Mole",
        activities: [
          {
            time: "09:00",
            description: "Tlayuda breakfast in Mercado 20 de Noviembre.",
            places: [{ name: "Mercado 20 de Noviembre" }],
          },
          { time: "11:00", description: "Walk the smoke alley (pasillo de humo)." },
          { time: "14:00", description: "Mole tasting lunch - seven moles." },
          {
            time: "16:00",
            description: "Templo de Santo Domingo and botanical garden.",
            places: [{ name: "Templo de Santo Domingo" }, { name: "Jardín Etnobotánico de Oaxaca" }],
          },
          { time: "20:00", description: "Mezcal bar on a rooftop in the centro." },
        ],
      },
    ],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
