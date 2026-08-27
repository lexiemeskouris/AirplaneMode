import lisbon from "@/assets/lisbon.jpg";
import kyoto from "@/assets/kyoto.jpg";
import amalfi from "@/assets/amalfi.jpg";
import marrakech from "@/assets/marrakech.jpg";
import iceland from "@/assets/iceland.jpg";
import oaxaca from "@/assets/oaxaca.jpg";

export type Activity = {
  time: string;
  description: string;
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
  highlights: string[];
  /** Full day-by-day plan. Omitted/abbreviated for gated itineraries. */
  days?: ItineraryDay[];
  /** Buy Me a Coffee link for gated itineraries. */
  bmcUrl?: string;
};

export const BMC_URL = "https://www.buymeacoffee.com/";

export const itineraries: Itinerary[] = [
  {
    slug: "lisbon-three-days",
    title: "Three Days in Lisbon",
    destination: "Lisbon",
    country: "Portugal",
    duration: "3 days",
    season: "Spring",
    summary:
      "A slow wander through Lisbon's tiled hills — pastel streets, fado nights, and the best pastéis de nata you'll ever eat.",
    cover: lisbon,
    gated: false,
    teaser:
      "Lisbon rewards the unhurried. This route threads the old Moorish Alfama with breezy riverfront afternoons and late-night fado in a candlelit tasca.",
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
          { time: "08:30", description: "Pastel de nata + bica at Manteigaria, Praça do Comércio side." },
          { time: "10:00", description: "Wander Alfama's alleys down to Sé Cathedral." },
          { time: "13:00", description: "Lunch of grilled sardines at a tasca in Graça." },
          { time: "17:00", description: "Miradouro da Senhora do Monte for golden hour." },
          { time: "20:30", description: "Fado dinner at Tasca do Chico." },
        ],
      },
      {
        day: "Day 2",
        title: "River & Tile",
        activities: [
          { time: "09:00", description: "Tram 25 to Belém — monastery and riverside walk." },
          { time: "11:30", description: "Original Pastéis de Belém (worth the queue)." },
          { time: "14:00", description: "MAAT museum and the 25 de Abril bridge view." },
          { time: "19:00", description: "Time Out Market for a grazing dinner." },
        ],
      },
      {
        day: "Day 3",
        title: "Sintra Day Trip",
        activities: [
          { time: "08:00", description: "Train from Rossio to Sintra." },
          { time: "09:30", description: "Pena Palace before the crowds." },
          { time: "12:30", description: "Quinta da Regalela's mossy well spiral." },
          { time: "15:00", description: "Cabo da Roca — westernmost point of Europe." },
          { time: "18:30", description: "Back to Lisbon, farewell dinner in Bairro Alto." },
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
      "Temples at dawn, tea ceremonies, and the quiet discipline of moss gardens. The full week unfolds slowly — exactly as Kyoto intends.",
    cover: kyoto,
    gated: true,
    bmcUrl: BMC_URL,
    teaser:
      "Kyoto is not a checklist. This itinerary is paced for stillness: early-morning temples before the crowds, a private tea ceremony, and a day walking the Philosopher's Path as the maples turn. Day 1 below is free to read — the full seven-day plan unlocks with a coffee.",
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
          { time: "07:00", description: "Kiyomizu-dera before the gates fill." },
          { time: "10:30", description: "Wander Sannenzaka & Ninenzaka, matcha soft serve." },
          { time: "13:00", description: "Lunch — yudofu (tofu hotpot) in a temple garden." },
          { time: "16:00", description: "Kodai-ji's bamboo grove at dusk." },
          { time: "19:00", description: "Gion lantern-lit dinner, maiko-spotting." },
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
      "The SS163 is one of the world's great drives — but it punishes the rushed. This route times each stop to light and traffic, with a swim before lunch and a spritz at the right hour.",
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
          { time: "09:00", description: "Pick up the car in Salerno, drive west." },
          { time: "11:00", description: "First stop: Vietri sul Mare for ceramics." },
          { time: "13:00", description: "Lunch in Cetara — anchovy colatura pasta." },
          { time: "16:00", description: "Arrive Positano, check in, walk to Spiaggia Grande." },
          { time: "20:00", description: "Dinner at a cliffside terrace, watch the lights climb." },
        ],
      },
      {
        day: "Day 2",
        title: "Path of the Gods",
        activities: [
          { time: "07:30", description: "Boats to Praiano, start the Sentiero degli Dei." },
          { time: "12:00", description: "Trail ends in Nocelle — reward lunch." },
          { time: "15:00", description: "Afternoon swim at Fornillo beach." },
          { time: "19:30", description: "Lemon spritz and pizza in Positano." },
        ],
      },
      {
        day: "Day 3",
        title: "Ravello & Amalfi",
        activities: [
          { time: "09:00", description: "Drive up to Ravello, Villa Cimbrone gardens." },
          { time: "12:30", description: "Down to Amalfi — cathedral and paper museum." },
          { time: "15:00", description: "Emerald Grotto by boat." },
          { time: "20:00", description: "Seafood dinner in Atrani, the quiet neighbor." },
        ],
      },
      {
        day: "Day 4",
        title: "Capelli & Capri",
        activities: [
          { time: "08:00", description: "Ferry to Capri from Amalfi." },
          { time: "10:00", description: "Boat tour of the Faraglioni." },
          { time: "13:00", description: "Chairlift up Monte Solaro." },
          { time: "18:00", description: "Return ferry, farewell dinner in Minori." },
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
          { time: "12:00", description: "First wander into the souks — get lost on purpose." },
          { time: "15:00", description: "Ben Youssef Madrasa's zellige tilework." },
          { time: "17:30", description: "Jemaa el-Fnaa as the storytellers wake." },
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
      "Route 1 circles the island and rarely disappoints. This seven-day loop is paced to the midnight sun — early starts, long detours, and soaks in remote pools after the day-trippers leave.",
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
          { time: "08:00", description: "Pick up the 4x4 in Reykjavík." },
          { time: "10:00", description: "Þingvellir — walk between continents." },
          { time: "12:30", description: "Geysir and Gullfoss." },
          { time: "16:00", description: "Secret Lagoon soak in Flúðir." },
          { time: "19:00", description: "Sleep in Hella." },
        ],
      },
      {
        day: "Day 2",
        title: "South Coast Falls",
        activities: [
          { time: "09:00", description: "Seljalandsfoss — walk behind the falls." },
          { time: "11:00", description: "Skógafoss and the nearby folk museum." },
          { time: "14:00", description: "Reynisfjara black sand beach (keep off the waves)." },
          { time: "18:00", description: "Dyrhólaey at golden hour, sleep in Vík." },
        ],
      },
      {
        day: "Day 3",
        title: "Glacier Lagoon",
        activities: [
          { time: "08:00", description: "Drive east along the lava coast." },
          { time: "12:00", description: "Jökulsárlón — kayak among the bergs." },
          { time: "14:00", description: "Diamond Beach, then continue to Höfn." },
          { time: "19:00", description: "Langoustine dinner in Höfn." },
        ],
      },
      {
        day: "Day 4",
        title: "East Fjords",
        activities: [
          { time: "09:00", description: "Wind through the fjords to Egilsstaðir." },
          { time: "13:00", description: "Hengifoss waterfall hike." },
          { time: "16:00", description: "Lunch at a fjordside village." },
        ],
      },
      {
        day: "Day 5",
        title: "North & Mývatn",
        activities: [
          { time: "08:00", description: "Dettifoss — Europe's most powerful waterfall." },
          { time: "11:00", description: "Mývatn geothermal area, Hverir mud pools." },
          { time: "15:00", description: "Mývatn Nature Baths." },
        ],
      },
      {
        day: "Day 6",
        title: "Whales & Gods",
        activities: [
          { time: "09:00", description: "Húsavík whale watching." },
          { time: "13:00", description: "Ásbyrgi canyon walk." },
          { time: "17:00", description: "Goðafoss, drive toward Akureyri." },
        ],
      },
      {
        day: "Day 7",
        title: "Back to Reykjavík",
        activities: [
          { time: "09:00", description: "Akureyri morning, church and botanical garden." },
          { time: "12:00", description: "Long drive west through the Skagafjörður." },
          { time: "18:00", description: "Return to Reykjavík, farewell soak at Sky Lagoon." },
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
      "Oaxaca is Mexico's deepest flavor. This plan threads the markets, a mezcal tasting, a cookery class, and Monte Albán above the valley. Day 1 is free to read — the full 72-hour plan opens with a coffee.",
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
          { time: "09:00", description: "Tlayuda breakfast in Mercado 20 de Noviembre." },
          { time: "11:00", description: "Walk the smoke alley (pasillo de humo)." },
          { time: "14:00", description: "Mole tasting lunch — seven moles." },
          { time: "16:00", description: "Templo de Santo Domingo and botanical garden." },
          { time: "20:00", description: "Mezcal bar on a rooftop in the centro." },
        ],
      },
    ],
  },
];

export function getItinerary(slug: string): Itinerary | undefined {
  return itineraries.find((i) => i.slug === slug);
}
