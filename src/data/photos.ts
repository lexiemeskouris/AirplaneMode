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
