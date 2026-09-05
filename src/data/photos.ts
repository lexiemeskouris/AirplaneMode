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
 * order, which is the only ordering the folder can carry.
 */
const files = import.meta.glob("../assets/photos/*/*.{jpg,jpeg,JPG,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/**
 * What was happening in the shot, keyed by "<folder>/<filename>". A photo with
 * nothing here still shows; it just runs without a line under it.
 */
const CAPTIONS: Record<string, string> = {};

export type Photo = { src: string; alt: string; caption?: string };

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
