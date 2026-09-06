/**
 * Camera roll shots, attached to a page by folder name.
 *
 * Drop files into src/assets/photos/<key>/ and they appear on the page whose
 * key that is. The key is the itinerary or guide slug, except for a section of
 * a bigger page (a day trip inside United Kingdom, say), which sets its own
 * photoKey.
 *
 * Files are picked up automatically, so adding a photo is a file copy plus a
 * caption below. Name them 01.jpg, 02.jpg and so on: they show in filename
 * order, which is the only ordering the folder can carry. Suffix a landscape
 * shot with -w (11-w.jpg) and it takes a double-width tile instead of being
 * cropped to a portrait one.
 */
const files = import.meta.glob("../assets/photos/*/*.{jpg,jpeg,JPG,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/**
 * What was happening in the shot, keyed by "<folder>/<filename>". A photo with
 * nothing here still shows; it just runs without a line under it.
 */
const CAPTIONS: Record<string, string> = {
  // San Sebastian. These describe what is in the frame and are waiting to be
  // replaced with what Lexie actually remembers about each one.
  "san-sebastian/01.jpg": "Tortilla and a coffee, standing at the bar.",
  "san-sebastian/02.jpg": "Outside Bar Néstor, in the queue.",
  "san-sebastian/03.jpg": "Outside Ganbara.",
  "san-sebastian/04.jpg": "Tomato salad, one pintxo and two glasses of white.",
  "san-sebastian/05.jpg": "Golden hour on the waterfront.",
  "san-sebastian/06.jpg": "Beef cheek and potato puree.",
  "san-sebastian/07.jpg": "The Buen Pastor cathedral.",

  // Japan. Where the shot clearly matches a stop in the itinerary it is named;
  // the rest describe the frame until Lexie says what was going on.
  "japan/01.jpg": "Strawberry daifuku, one red bean and one custard.",
  "japan/02.jpg": "Wagyu skewers going onto the griddle.",
  "japan/03.jpg": "Fatty tuna at Maguroya Kurogin.",
  "japan/04.jpg": "The 3D cat billboard in Shinjuku.",
  "japan/05.jpg": "A 3D latte at Hat Coffee in Asakusa.",
  "japan/06.jpg": "A margherita, twelve days deep.",
  "japan/07.jpg": "Harry's hedgehog cafe, off Nakamise.",
  "japan/08.jpg": "The truffle shoyu ramen at Ginza Kagari.",
  "japan/09.jpg": "A deer at Nara Park.",
  "japan/10.jpg": "Picking patches, Harajuku denim shopping.",
  "japan/11-w.jpg": "Dotonbori in the middle of the day.",
  "japan/12.jpg": "A plate of one-bite gyoza.",
  "japan/13-w.jpg": "Go-karting through Shibuya, 19:30 start.",
  "japan/14.jpg": "Baseball at the Tokyo Dome.",
  "japan/15.jpg": "Carbonara udon, under all that foam.",

  // Peru.
  "peru/01.jpg": "Cusco, from the hills above the centre.",
  "peru/02.jpg": "Udon, maki and karaage, a long way from Japan.",
  "peru/03.jpg": "Feeding an alpaca at a weaving demonstration.",
  "peru/04.jpg": "Horses waiting on the Rainbow Mountain trail, for anyone who has had enough.",
  "peru/05.jpg": "The trailhead at Chachabamba, where the short Inca Trail starts.",
  "peru/06-w.jpg": "Machu Picchu, with Huayna Picchu behind.",
  "peru/07-w.jpg": "The top of Rainbow Mountain, and an alpaca in sunglasses.",
  "peru/08-w.jpg": "Somewhere on the Inca Trail.",
  "peru/09-w.jpg": "A sit-down on the trail steps.",
  "peru/10-w.jpg": "Machu Picchu, and one of the alpacas that keeps the terraces down.",

  // Morocco.
  "morocco/01.jpg": "Zellij and carved plaster, in the Marrakech medina.",
  "morocco/02.jpg": "The cactus garden at Jardin Majorelle.",
  "morocco/03-w.jpg": "Before lift-off, the balloon over the Atlas.",
  "morocco/04.jpg": "Mint tea in the Berber tent afterwards.",
  "morocco/05.jpg": "The hat, and something cold.",
  "morocco/06.jpg": "A salon with the hills out of the window.",
  "morocco/07-w.jpg": "Sitting out with the camels in the Sahara.",
  "morocco/08.jpg": "Riding out into the dunes.",
  "morocco/09.jpg": "A blue door in the medina.",
  "morocco/10.jpg": "Wrapped up against the sand.",
  "morocco/11.jpg": "Looking out over the dunes.",
  "morocco/12.jpg": "The pool, and nowhere in particular to be.",
  "morocco/13.jpg": "The riad courtyard, from the floor above.",
  "morocco/14.jpg": "A courtyard in Fes, through the door.",
  "morocco/15.jpg": "A tile and plaster workshop, above the city.",
  "morocco/16.jpg": "A drink on a Chefchaouen rooftop.",
  "morocco/17.jpg": "The blue steps of Chefchaouen.",
  "morocco/18.jpg": "Sunset cocktails, looking out over the city.",

  // South Africa.
  "south-africa/01-w.jpg": "A seal colony, and what looks like every gull in the Cape.",
  "south-africa/02.jpg": "Looking down on Dias Beach from Cape Point.",
  "south-africa/03-w.jpg": "Two of the Boulders Beach penguins, and their shadows.",
  "south-africa/04.jpg": "The painted houses of Bo-Kaap.",
  "south-africa/05.jpg": "The top of Table Mountain, after Platteklip Gorge.",
  "south-africa/06.jpg": "Out in the vines, on the wine tour.",
  "south-africa/07.jpg": "Kitted up for the shark dive.",
  "south-africa/08.jpg": "Inside the Cango Caves, on the Garden Route.",
  "south-africa/09-w.jpg": "The lodge on the Garden Route, and the view off the deck.",
  "south-africa/10-w.jpg": "Going off the platform.",
  "south-africa/11-w.jpg": "Two elephants, on the 4x4 safari.",
  "south-africa/12-w.jpg": "The bridge over the gorge, at sunset.",
  "south-africa/13-w.jpg": "A lion and a lioness, from the truck.",

  // Egypt.
  "egypt/01.jpg": "The Sphinx at Giza.",
  "egypt/02.jpg": "On camels at Giza.",
  "egypt/03-w.jpg": "In a temple courtyard, somewhere along the cruise.",
  "egypt/04.jpg": "The pylon at the Temple of Horus in Edfu.",
  "egypt/05.jpg": "Henna, done at the temple.",
  "egypt/06.jpg": "Kom Ombo at dusk, with everyone else off the boats.",

  // Galapagos.
  "galapagos/01-w.jpg": "The trail down to the beach, with the surf already in earshot.",
  "galapagos/02.jpg": "The coast, from up on the lava rocks.",
  "galapagos/03-w.jpg": "A cove on the walk, and the water you end up in.",
  "galapagos/04.jpg": "Tuna ceviche.",
  "galapagos/05.jpg": "Kicker Rock, from the boat.",
  "galapagos/06-w.jpg": "White sand, and nobody else on it.",
  "galapagos/07-w.jpg": "Under a tortoise shell, which is bigger than it sounds.",
  "galapagos/08.jpg": "A giant tortoise, getting on with its day.",
  "galapagos/09.jpg": "Tacos, soup and croquettes.",
};

export type Photo = { src: string; alt: string; caption?: string; wide?: boolean };

const byKey = (() => {
  const map = new Map<string, Photo[]>();
  for (const path of Object.keys(files).sort()) {
    const match = path.match(/photos\/([^/]+)\/([^/]+)$/);
    if (!match) continue;
    const [, key, file] = match as unknown as [string, string, string];
    const caption = CAPTIONS[`${key}/${file}`];
    const photo: Photo = {
      src: files[path]!,
      alt: caption ?? "",
      ...(caption ? { caption } : {}),
      ...(/-w\.[a-z]+$/i.test(file) ? { wide: true } : {}),
    };
    const list = map.get(key);
    if (list) list.push(photo);
    else map.set(key, [photo]);
  }
  return map;
})();

export function photosFor(key: string | undefined): Photo[] {
  if (!key) return [];
  return byKey.get(key) ?? [];
}
