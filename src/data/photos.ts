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

  // Thailand.
  "thailand/01.jpg": "Longtails pulled up in the shallows, on the Phi Phi boat day.",
  "thailand/02-w.jpg": "Masks on, in the water under the Phi Phi cliffs.",
  "thailand/03.jpg": "A macaque on the beach, posing better than either of us.",
  "thailand/04.jpg": "Matching hearts, at the village on the Chiang Rai day.",
  "thailand/05-w.jpg": "Between two elephants at Patara, on caregiver day.",

  // Kilimanjaro.
  "kilimanjaro/01-w.jpg": "The group and some of the crew, before the off in Moshi.",
  "kilimanjaro/02-w.jpg": "Shira Camp, day two, still with the legs to jump.",
  "kilimanjaro/03-w.jpg": "Single file, with Mawenzi in the cloud behind.",
  "kilimanjaro/04.jpg": "Breakfast in the mess tent, almost always the highlight.",
  "kilimanjaro/05-w.jpg": "Camp pitched above the cloud line.",
  "kilimanjaro/06.jpg": "Up before the sun, with the tents still frozen.",
  "kilimanjaro/07.jpg": "Sunrise on the ridge, on a summit day that never got above 0F.",
  "kilimanjaro/08.jpg": "A hug near the top, which was most of what got anyone there.",
  "kilimanjaro/09-w.jpg": "The mountain throwing its own shadow across the cloud, and one of the last glaciers.",
  "kilimanjaro/10.jpg": "Uhuru Peak, 5,895m, and the sign the whole thing is for.",

  // Vietnam.
  "vietnam/01.jpg": "Pho at Pho Thin in Hanoi, eaten at a steel table.",
  "vietnam/02.jpg": "A drink at Cloud Sky Bar, looking out over Hanoi's rooftops.",
  "vietnam/03.jpg": "Kayaking between the karsts in Ha Long Bay.",
  "vietnam/04.jpg": "The Café Apartments on Nguyen Hue, a cafe or shop on every balcony.",
  "vietnam/05.jpg": "The firing range at the Cu Chi Tunnels, ear defenders on.",

  // Cambodia.
  "cambodia/01.jpg": "A fish pedicure in Siem Reap, which tickles more than it should.",
  "cambodia/02.jpg": "Macaques holding court on the fallen stones at Angkor.",
  "cambodia/03.jpg": "Wat Bo, on the walk to the pottery class.",
  "cambodia/04.jpg": "A cow and her calf by the lotus pond, on the countryside bike ride.",
  "cambodia/05-w.jpg": "Hats on for the Khmer gourmet cooking class.",
  "cambodia/06.jpg": "Fresh spring rolls with a peanut dipping sauce, made in class.",
  "cambodia/07-w.jpg": "Certified in basic Khmer cooking, officially.",

  // Mexico City. Named where the shot clearly matches a stop in the itinerary;
  // the rest describe the frame until Lexie says where it was.
  "mexico-city/01.jpg": "A box of pastries to start, almond croissant and a pecan roll.",
  "mexico-city/02.jpg": "The European rooms at Museo Soumaya.",
  "mexico-city/03.jpg": "Tuna in a pool of soy and jalapeño, at lunch.",
  "mexico-city/04.jpg": "Stirring a drink at the bar, under the watercolours.",
  "mexico-city/05.jpg": "A tostada buried under radish, peas and dill.",
  "mexico-city/06.jpg": "A box from Odette, carried out to the car.",
  "mexico-city/07.jpg": "On the steps of the Maya facade at the Anthropology Museum in Chapultepec.",
  "mexico-city/08.jpg": "Through the cactus garden in Chapultepec.",
  "mexico-city/09.jpg": "Blue corn quesadillas off the comal, the taco crawl's first stop.",
  "mexico-city/10.jpg": "Six trays and every salsa on the table.",
  "mexico-city/11.jpg": "El Pescadito, famous for the shrimp tacos.",
  "mexico-city/12.jpg": "Which is why the shrimp taco got a Corona.",
  "mexico-city/13.jpg": "A margarita with a blue sugared rim.",
  "mexico-city/14-w.jpg": "One churro at El Moro, shared the only fair way.",
  "mexico-city/15-w.jpg": "Outside the Palacio de Bellas Artes.",
  "mexico-city/16.jpg": "Last drinks in the red light, with View-Masters on the table.",

  // Istanbul.
  "istanbul/01-w.jpg": "Dressed and ready on the balcony, the first night.",
  "istanbul/02.jpg": "On a rooftop over the Golden Horn, with the New Mosque lit up behind.",
  "istanbul/03.jpg": "A round of shots, which was how the night went on.",
  "istanbul/04.jpg": "Outside Hagia Sophia.",
  "istanbul/05.jpg": "Inside Hagia Sophia, from the upper gallery.",
  "istanbul/06.jpg": "Iznik tiles and stained glass at Topkapi Palace.",
  "istanbul/07.jpg": "A mixed grill, with bulgur and every sauce.",
  "istanbul/08-w.jpg": "On the Galata Bridge, with Galata Tower on the hill behind.",
  "istanbul/09.jpg": "Turkish breakfast, near Galata Tower.",
  "istanbul/10.jpg": "The coloured houses of Balat.",
  "istanbul/11.jpg": "A ceramics shop in Balat.",

  // Tunisia.
  "tunisia/01.jpg": "Over the ruins at Carthage to the Gulf of Tunis.",
  "tunisia/02.jpg": "Under the arches of the Antonine Baths.",
  "tunisia/03.jpg": "Black tacos and tuna in a yellow sauce, at Cult Bistro.",
  "tunisia/04.jpg": "The chef bringing the card machine over himself.",
  "tunisia/05.jpg": "Jellyfish in the shallows, which kept the swimming brief.",
  "tunisia/06.jpg": "A white horse along the water's edge.",
  "tunisia/07.jpg": "Picked up on the beach, mid-laugh.",
  "tunisia/08.jpg": "Two on a jet ski, one hand off.",
  "tunisia/09.jpg": "Octopus carpaccio with pink peppercorns, for lunch.",
  "tunisia/10.jpg": "The pool going still as the light dropped.",
  "tunisia/11.jpg": "Straw umbrellas on the dunes, at dusk.",
  "tunisia/12.jpg": "Bougainvillea over a white wall in Sidi Bou Said.",
  "tunisia/13.jpg": "The marina below Sidi Bou Said.",
  "tunisia/14.jpg": "On the wall above the bay, with a mint tea.",

  // Singapore.
  "singapore/01.jpg": "The Rain Vortex at Jewel, the first thing off the plane.",
  "singapore/02.jpg": "New Year's Eve at the top of Marina Bay Sands, tiara on.",
  "singapore/03-w.jpg": "The bay from the top of Marina Bay Sands, waiting on midnight.",
  "singapore/04-w.jpg": "All four of us under the waterfall in the Cloud Forest.",
  "singapore/05.jpg": "A stream through the ferns, inside the Cloud Forest.",
  "singapore/06-w.jpg": "Marina Bay Sands and the Supertrees, through the Cloud Forest glass.",

  // Saudi Arabia.
  "saudi-arabia/01.jpg": "Sunset on the dunes, barefoot and turning round for the photo.",
  "saudi-arabia/02-w.jpg": "On top of a dune, with nothing else for miles.",
  "saudi-arabia/03.jpg": "Footprints in red sand, everyone in white trousers for some reason.",
  "saudi-arabia/04.jpg": "Archery at the desert camp, after dark.",
  "saudi-arabia/05.jpg": "A white falcon, perched on the glove.",
  "saudi-arabia/06.jpg": "Qasr al-Farid at Hegra, the lone tomb cut from one rock.",
  "saudi-arabia/07.jpg": "In a tomb doorway at Hegra, under the eagle the Nabataeans carved there.",
  "saudi-arabia/08.jpg": "Sandstone and a mackerel sky, around Hegra.",
  "saudi-arabia/09.jpg": "The pool at the resort, under the cliffs.",

  // Victoria Falls.
  "victoria-falls/01-w.jpg": "Loretta's Coffee and Smoothie Caravan, in town.",
  "victoria-falls/02.jpg": "The falls from the Zimbabwe side, with the spray coming off the gorge.",
  "victoria-falls/03-w.jpg": "Sunset over the waterhole from the Victoria Falls Safari Lodge.",
  "victoria-falls/04.jpg": "High tea at the Victoria Falls Hotel: scones, sandwiches and red macarons.",
  "victoria-falls/05.jpg": "The hotel lawn, with the spray and the bridge out past the trees.",

  // Quito.
  "quito/01.jpg": "Holding up the globe at Mitad del Mundo, one foot either side of the line.",
  "quito/02.jpg": "In the heart at the foot of the monument.",
  "quito/03-w.jpg": "0° 0' 0\", pointed at for the avoidance of doubt.",
  "quito/04-w.jpg": "At the big letters, with half of Quito's teenagers.",
  "quito/05.jpg": "Standing on the cacao map of Ecuador.",
  "quito/06-w.jpg": "A llama, unimpressed by the selfie.",
  "quito/07.jpg": "A beer with a monk who had already started.",
  "quito/08.jpg": "Crudo in a yellow chilli sauce.",

  // Seoul.
  "seoul/01.jpg": "The Gangnam Style sculpture, two giant gold fists.",
  "seoul/02-w.jpg": "Under the shelves at Starfield Library in COEX.",
  "seoul/03.jpg": "A machine matching foundation shade, 19C1 it decided.",
  "seoul/04.jpg": "Every angle of the face, measured to the decimal.",
  "seoul/05.jpg": "The aqua facial, from inside the bubble.",
  "seoul/06.jpg": "In hanbok at Gyeongbokgung, which gets you in free.",
  "seoul/07.jpg": "Duck on a chilli cream pasta, and beef on the bone.",
  "seoul/08.jpg": "Dumplings, kalguksu and cold spicy noodles at Myeongdong Kyoja.",
  "seoul/09.jpg": "Next to a Stanley cup taller than me.",

  // Reykjavik.
  "reykjavik/01.jpg": "Hallgrímskirkja at blue hour, with snow still on the ground.",
  "reykjavik/02.jpg": "In the Blue Lagoon, with the steam coming off the lava field.",
  "reykjavik/03.jpg": "Gullfoss, mostly frozen.",
  "reykjavik/04.jpg": "Arms out at the bottom of Skógafoss, in the spray.",
  "reykjavik/05.jpg": "Quad bikes out across the black sand.",
  "reykjavik/06.jpg": "Stepping out of the plane wreck at Sólheimasandur.",
  "reykjavik/07-w.jpg": "Both of us in the orange suits, on the black beach.",

  // Malta.
  "malta/01.jpg": "Valletta's closed balconies, all the way down the hill.",
  "malta/02.jpg": "By the palm and the monument, next to the church portico in Valletta.",
  "malta/03.jpg": "Calamari, burrata and white wine with ice in it, for lunch.",
  "malta/04.jpg": "The plate at Villa Bologna.",
  "malta/05.jpg": "Under the cliffs on the boat day, with the water going green.",
  "malta/06.jpg": "Off the boat and into the deep blue.",
  "malta/07.jpg": "Outside Andrew's Bar, est. 1909.",
  "malta/08.jpg": "Three pizzas and a bowl of potatoes.",
  "malta/09.jpg": "Sunset over the bay.",

  // Madeira.
  "madeira/01.jpg": "The toboggan run down from Monte, with the photos to prove it.",
  "madeira/02.jpg": "Chicken, rice, chips and a fried egg.",
  "madeira/03.jpg": "In the back of the jeep, on the day out to the north.",
  "madeira/04.jpg": "The town hall on Praça do Município, in Funchal.",
  "madeira/05.jpg": "Sunrise on Pico do Arieiro, above the cloud.",
  "madeira/06.jpg": "The Botanical Garden, with Funchal and the sea below.",

  // Switzerland.
  "switzerland/01.jpg": "Coffee in an old red gondola, number 48.",
  "switzerland/02.jpg": "A bowl of momos, with the chilli on the side.",
  "switzerland/03-w.jpg": "Across the Rhône in Geneva, on a grey day.",

  // Vienna.
  "vienna/01.jpg": "St Stephen's Cathedral, and its tiled roof.",
  "vienna/02.jpg": "Three of us under the spire of St Stephen's.",
  "vienna/03-w.jpg": "In front of the Hofburg, on the walk through the grounds.",
  "vienna/04.jpg": "Sat in front of a Lichtenstein bedroom.",
  "vienna/05-w.jpg": "The sausage stop at Leo's Würstelstand.",
  "vienna/06.jpg": "Strudel and a coffee with ice cream in it, at Café Hawelka.",
  "vienna/07.jpg": "A kebab for the road, with the whole counter smiling.",

  // Budapest.
  "budapest/01-w.jpg": "At Fisherman's Bastion, with a paper cutout along for the trip.",
  "budapest/02.jpg": "Up on Castle Hill, with Pest and the Danube behind.",
  "budapest/03.jpg": "Prosecco on the cruise, past the Parliament lit up.",
  "budapest/04.jpg": "Arms out in the outdoor pool at Széchenyi.",
  "budapest/05-w.jpg": "In the water at the baths.",
  "budapest/06.jpg": "A drink at For Sale Pub, under the notes on every wall.",

  // Copenhagen.
  "copenhagen/01-w.jpg": "Nyhavn, with the coloured houses behind.",
  "copenhagen/02-w.jpg": "Mid-air on the trampolines set into the pavement.",
  "copenhagen/03.jpg": "A tray of cinnamon pastries.",
  "copenhagen/04.jpg": "The spire of the Church of Our Saviour, the one you climb from outside.",
  "copenhagen/05-w.jpg": "From the top of Our Saviour, over the red roofs.",
  "copenhagen/06-w.jpg": "Christiania, where the houses are painted top to bottom.",
  "copenhagen/07.jpg": "Brisket, sausage, ribs, slaw and mac and cheese, with cheesecake after.",
  "copenhagen/08.jpg": "Sat on the white lines at Superkilen.",
  "copenhagen/09.jpg": "Standing in the stripes at Superkilen.",
  "copenhagen/10.jpg": "Both of us at Superkilen, on a grey day.",
  "copenhagen/11.jpg": "The burger at Gasoline Grill.",

  // Paris.
  "paris/01.jpg": "The chocolate mousse at Chez Janou, served by the scoop.",
  "paris/02.jpg": "On the grass below Sacré-Coeur.",
  "paris/03.jpg": "In the Jardin du Luxembourg, with the palace behind.",
  "paris/04-w.jpg": "In front of Starry Night Over the Rhône, at the Musée d'Orsay.",
  "paris/05.jpg": "A glass of white at Bar du Marché.",
  "paris/06.jpg": "Roast chicken, gratin, mash and a green salad.",
  "paris/07.jpg": "Rigatoni with morels in a cream sauce.",
  "paris/08.jpg": "A baguette, a croissant and a flan, for the train.",
  "paris/09.jpg": "The Eiffel Tower from the Trocadéro.",

  // Berlin.
  "berlin/01.jpg": "A vegetable kebab with feta and roast potatoes.",
  "berlin/02.jpg": "Between the stelae at the Memorial to the Murdered Jews of Europe.",
  "berlin/03.jpg": "The Brandenburg Gate, with the Quadriga on top.",
  "berlin/04.jpg": "Curry at the Wall, and the Welt balloon behind it.",
  "berlin/05.jpg": "All in black in the lift, before going out.",
  "berlin/06.jpg": "Outside, late, against a tagged-up window.",
  "berlin/07-w.jpg": "A kebab on the way home, bunny ears still on.",
  "berlin/08.jpg": "The Fraternal Kiss, at the East Side Gallery.",
  "berlin/09.jpg": "Two pizzas and two espresso martinis.",

  // Krakow.
  "krakow/01.jpg": "Pierogi with fried onions, under the notes on the wall.",
  "krakow/02.jpg": "Make pierogi, not war.",
  "krakow/03.jpg": "The memorial plaque at Auschwitz-Birkenau.",
  "krakow/04.jpg": "The Barbican, the old gate into the city.",
  "krakow/05.jpg": "Pijarska Street, under the bridge to the Czartoryski Museum.",
  "krakow/06.jpg": "By the old city walls.",
  "krakow/07.jpg": "Kielbasa, skewers and pork knuckle on the grill.",

  // Tuscany.
  "tuscany/01.jpg": "Holding up the Leaning Tower, as required.",
  "tuscany/02-w.jpg": "Coffee in hand by the Baptistery and the Duomo in Pisa.",
  "tuscany/03.jpg": "The terrace at the villa, with the cypresses and the hills.",
  "tuscany/04.jpg": "Two trays of cheese, salami, prosciutto and fruit.",
  "tuscany/05.jpg": "A walk between the vineyards.",
  "tuscany/06.jpg": "A hill town above the vines and olive groves.",
  "tuscany/07.jpg": "Dressed in white for dinner, under the arches.",
  "tuscany/08.jpg": "Three of us at the end of dinner, glasses still full.",
  "tuscany/09.jpg": "The Principe di Piemonte in Viareggio, lit up at dusk.",

  // Amsterdam.
  "amsterdam/01.jpg": "Self-Portrait with Grey Felt Hat, at the Van Gogh Museum.",
  "amsterdam/02.jpg": "A drink in the sun on Eerste Sweelinckstraat, in De Pijp.",
  "amsterdam/03.jpg": "Salmon, steak with béarnaise, a burger and a glass of orange wine.",
  "amsterdam/04.jpg": "On the canal boat, drinks in hand.",
  "amsterdam/05-w.jpg": "Gabled houses and houseboats, from the water.",
  "amsterdam/06.jpg": "Boats tied up along a canal, under the trees.",
  "amsterdam/07.jpg": "Poffertjes under a pile of icing sugar, at the Pancake Bakery.",
  "amsterdam/08.jpg": "A stroopwafel outside Hans Egstorf, est. 1898.",
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
