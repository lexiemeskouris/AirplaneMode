import type { Place } from "./itineraries";
import vienna from "@/assets/vienna.svg";
import kilimanjaro from "@/assets/kilimanjaro.svg";
import barcelona from "@/assets/barcelona.svg";
import malta from "@/assets/malta.svg";
import miami from "@/assets/miami.svg";
import reykjavik from "@/assets/reykjavik.svg";
import bordeaux from "@/assets/bordeaux.svg";
import nice from "@/assets/nice.svg";
import charleston from "@/assets/charleston.svg";
import dover from "@/assets/dover.svg";

/**
 * A city I have opinions about but no itinerary for. Same links and the same
 * tiles as an itinerary, without pretending there is a plan: no days, no
 * duration, no season, because none of those are true of a list.
 */
export type GuideSection = {
  title: string;
  /** Lead-in line for the section. */
  note?: string;
  places?: Place[];
  /** Lines that are not a place you can pin on a map. */
  items?: string[];
  /** Renders as a warning rather than a recommendation. */
  avoid?: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  destination: string;
  country: string;
  cover: string;
  /** Where the pin goes on the A-Z map. */
  coords: { lat: number; lon: number };
  summary: string;
  teaser: string;
  tags: string[];
  /**
   * Tile chip. "RECS" for a list of places; something else when the page is
   * mostly advice, which "RECS" would undersell.
   */
  label?: string;
  /** Practical things to know before you go, e.g. cash only. */
  notes?: string[];
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "vienna",
    title: "Vienna Recommendations",
    destination: "Vienna",
    country: "Austria",
    coords: { lat: 48.2082, lon: 16.3738 },
    cover: vienna,
    summary:
      "No itinerary, just the list. Where to drink, what to eat, which museums earn it and which one does not.",
    teaser:
      "Vienna without a plan attached. The bars and clubs worth the night, the sausage stand worth going back to three times, the three museums that earn their entry fee, and the one to skip.",
    tags: ["#Wurstelstand", "#Volksgarten", "#Albertina"],
    notes: ["Bring cash. Most places are cash only."],
    sections: [
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
      {
        title: "Day trip to Salzburg",
        note: "Worth the trip out.",
        places: [
          { name: "Salzburg", near: "Austria" },
          { name: "Hohensalzburg Fortress", near: "Salzburg, Austria" },
        ],
        items: [
          "Walk through the town.",
          "Take the cable car up to the castle.",
          "Take 1900s photos.",
        ],
      },
    ],
  },
  {
    slug: "kilimanjaro",
    title: "Climbing Kilimanjaro",
    destination: "Kilimanjaro",
    country: "Tanzania",
    coords: { lat: -3.0674, lon: 37.3556 },
    cover: kilimanjaro,
    label: "GUIDE",
    summary:
      "Eight days on the Northern Lemosho route, and everything worth knowing before you book it.",
    teaser:
      "Not an itinerary. This is the practical half: which route and why, what to buy before you go, what goes in the medical kit, and the small decisions that made the biggest difference on the mountain.",
    tags: ["#NorthernLemosho", "#Goretex", "#Diamox"],
    notes: [
      "Bring more cash than you normally would, in USD, and enough for the whole trip. Service and bank access are patchy, and card machines often will not connect.",
      "Start Diamox the day before you land. Moshi and Arusha sit at around 6,000 feet, and it cannot help you once you are already sick.",
    ],
    sections: [
      {
        title: "The trek",
        places: [
          { name: "Monkey Adventures", near: "Moshi, Tanzania" },
          { name: "Mount Kilimanjaro", near: "Tanzania" },
        ],
        items: [
          "We did the 8-day Northern Lemosho route with Monkey Adventures. They were great.",
          "A team of three guides, one cook and sixteen porters. They are amazing and really take care of you, especially on summit day.",
          "It is longer than what most people do, but we wanted to give ourselves the best possible shot at acclimatising.",
          "It is also a newer, quieter route. On days three to six we were the only group at the campsite. It is one of the longest because it literally circles the mountain, and you get a great view of Nairobi from one of the campsites.",
          "There are shorter routes, the shortest being five days, and some where you sleep in ranger or tea houses. Those are more crowded and harder, because you climb vertically at a much faster pace.",
          "We hiked at the tail end of rainy season, so it rained on days one, two, part of three, and seven. Kilimanjaro is unpredictable, so be prepared whatever time of year you go. It has its own climate zones.",
          "Some days were easier than expected and some were harder.",
          "The food was solid. Three meals a day, some really good and some bad. Breakfast was almost always the highlight.",
        ],
      },
      {
        title: "Tipping",
        items: [
          "A real cost on top of the trek itself, and worth budgeting for separately.",
          "Each company posts its recommended amounts, generally per person, per position, per day.",
        ],
      },
      {
        title: "Packing and gear",
        items: [
          "If you do not already have hiking gear, this is an expensive trip to REI.",
          "Invest in Goretex. Rain trousers, rain jacket, backpack. It can rain almost every day, and if you are not in Goretex then either you or all of your things will get wet. If your backpack is not Goretex, put a dry bag inside it.",
          "Prioritise layering. The weather varies through the day and you start hiking early, so you go from three layers to something thin.",
          "Bring extra layers in case the ones you are wearing get wet.",
          "It gets freezing at night regardless of altitude. Rent the warmest sleeping bag, and bring your warmest gloves in multiple layers, plus hats, warmers, a balaclava and wool socks.",
          "Rent the hiking poles. It would not have been possible without them, especially going downhill.",
          "Bring a bladder for your backpack so you can drink without stopping, and a second water bottle, because the bladder freezes on summit day. Something light and plastic, not a Hydro Flask - they are too heavy.",
          "A quick-dry towel, for wiping things down and as a makeshift pillow.",
          "Wipes, wipes, wipes, and hand sanitiser. You will need to pee, or worse, while hiking.",
        ],
      },
      {
        title: "Medication",
        items: [
          "Talk to a doctor before you go. What follows is what I took and what worked for me, not medical advice.",
          "Bring anything and everything you think you might need. The guides carry oxygen, but taking care of yourself is on you.",
          "What I brought: Advil, Tylenol, a steroid pack, malaria pills, a Z-Pak, Cipro, Diamox, nausea medication, plasters, my daily medication, instant cold packs, a callous and blister cushion, itch cream, Benadryl and an ace bandage.",
          "I definitely went overboard, and almost all of it was used by me or my friends. Everything except the ace bandage. I was called a walking pharmacy.",
          "Diamox is the altitude sickness medication. Altitude sickness does not discriminate, no matter what training you have done. Some of the people in the best cardio and hiking shape got it worst.",
          "For headaches, reach for Tylenol first.",
          "Malaria tablets do not make you as sick as you think. Take them with food.",
          "There are some bugs on the mountain, but only at the beginning and the end of the hike.",
          "Bring both Tylenol and Advil. You may need to max out both if you get a headache, because the hike is extremely dehydrating and altitude makes it worse.",
          "Tums, Pepto and Imodium for nausea, a bad stomach or diarrhoea. Someone in the group will need them.",
          "The general symptoms of altitude sickness are headache, diarrhoea and nausea. Be prepared for those and you will be golden.",
        ],
      },
      {
        title: "Where we stayed",
        places: [{ name: "Chanya Lodge", near: "Moshi, Tanzania" }],
        items: [
          "We stayed at Chanya Lodge before and after the hike, and they stored our luggage while we were on the mountain.",
          "Make sure wherever you stay has air conditioning, mosquito nets and good showers. Nothing will feel as good as that first shower.",
          "It is outside 'central' Moshi, in quotes because Moshi is more of a small town, but it is nice. We ate all of our meals there before and after the hike.",
          "It was much busier after the hike in June, when the busy season on the mountain picks up.",
        ],
      },
      {
        title: "Training",
        items: [
          "There is an array of options. The best thing is altitude training, but you can only really do that in the month before.",
          "Strengthen your legs as much as you can and work on your breathing. I used an altitude mask at the gym. I looked like an idiot but I think it helped.",
          "Work your arms and back too, for the backpack and the poles. Carrying a pack uphill for eight hours a day is a bitch.",
        ],
      },
      {
        title: "Everything else",
        items: [
          "Bring things to entertain yourself. A book, cards, a journal, headphones. There is a lot of downtime and not everyone likes to talk nonstop.",
          "Not all solar chargers are created equal. Invest in a strong power bank with multiple ports.",
          "It is very cold at night, so sleep with anything you do not want to die or freeze inside your sleeping bag.",
          "Things die at the peak, so bring something extra charged, or a disposable or film camera. It was below 0F on our summit day.",
          "The private toilet and the thicker mattress were the best money we spent. The campsite toilets are holes in the ground, so if you skip the private toilet, bring your own toilet paper.",
        ],
      },
    ],
  },
  {
    slug: "barcelona",
    title: "Barcelona Recommendations",
    destination: "Barcelona",
    country: "Spain",
    coords: { lat: 41.3874, lon: 2.1686 },
    cover: barcelona,
    summary:
      "Montserrat, the Bunkers at sunset, the Gaudí worth queuing for, and two places to eat.",
    teaser:
      "What to see and where to eat in Barcelona, with no plan attached. Take the bits you want.",
    tags: ["#Gaudi", "#LaBoqueria", "#Montserrat"],
    sections: [
      {
        title: "Do",
        places: [
          { name: "Montserrat", near: "Catalonia, Spain", note: "For the monastery and the mountain hiking." },
          { name: "Bunkers del Carmel", note: "Hike up and bring drinks for sunset." },
          { name: "La Boqueria Market" },
          { name: "Montjuïc", note: "Take the cable car up." },
          { name: "Sagrada Família" },
        ],
      },
      {
        title: "Gaudí",
        places: [
          { name: "Park Güell" },
          { name: "Gaudí House Museum", note: "Inside Park Güell." },
          { name: "Casa Batlló" },
        ],
      },
      {
        title: "Food",
        places: [{ name: "Berbena" }, { name: "Bar Cañete" }],
      },
    ],
  },
  {
    slug: "malta",
    title: "Malta Recommendations",
    destination: "Malta",
    country: "Malta",
    coords: { lat: 35.9375, lon: 14.3754 },
    cover: malta,
    summary: "A short list of places to eat and drink, from Valletta outwards.",
    teaser:
      "No itinerary for Malta, just the places worth booking. Cafe Society is in Valletta; the rest are spread around the island.",
    tags: ["#Valletta", "#BeefBar", "#Paranga"],
    sections: [
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
  {
    slug: "miami",
    title: "Miami Recommendations",
    destination: "Miami",
    country: "United States",
    coords: { lat: 25.7617, lon: -80.1918 },
    cover: miami,
    summary:
      "Where to eat, where it turns into a club, and the order we did it in over three nights.",
    teaser:
      "Miami as a set of nights rather than days. Dinners that run late and rooms that turn into clubs, plus how we actually sequenced them.",
    tags: ["#Marion", "#LosFuegos", "#SouthBeach"],
    sections: [
      {
        title: "Go out",
        places: [
          { name: "Marion", note: "Turns into a club, like Bagatelle or Maison Close." },
          { name: "Baoli" },
          { name: "Mila" },
        ],
      },
      {
        title: "Eat",
        places: [
          { name: "Los Fuegos", note: "Then drinks at Living Room after." },
          { name: "Living Room" },
          { name: "La Leggenda Pizzeria" },
        ],
      },
      {
        title: "How we sequenced it",
        items: [
          "La Leggenda Pizzeria on the first night, at leisure.",
          "Marion at 22:30.",
          "Los Fuegos at 22:30, then Living Room for drinks after.",
        ],
      },
    ],
  },
  {
    slug: "reykjavik",
    title: "Reykjavík Restaurants",
    destination: "Reykjavík",
    country: "Iceland",
    coords: { lat: 64.1466, lon: -21.9426 },
    cover: reykjavik,
    summary: "Six places to eat in Reykjavík, and the one that stood out.",
    teaser:
      "Not a plan, just where we ate. Rök is the one to book if you only get one dinner.",
    tags: ["#Rok", "#Sandholt", "#Hlemmur"],
    sections: [
      {
        title: "Where to eat",
        places: [
          {
            name: "Rök",
            note: "The standout. Wide variety of good tapas and a nice restaurant. We had duck, steak, asparagus, bruschetta, risotto and potatoes.",
          },
          { name: "The Laundromat", note: "Great brunch, cool coffee shop vibes." },
          { name: "Flatey Pizza", note: "Brick oven pizza. Just don't get the meatballs." },
          {
            name: "Sandholt Bakery",
            note: "We went at least three times. The only place open in the morning. Great pastries, and sandwiches we picked up for a day tour.",
          },
          { name: "Skál", note: "Michelin rated, inside the Hlemmur food hall." },
          { name: "Hlemmur Mathöll" },
          { name: "Brauð & Co", note: "A croissant pretzel for breakfast before a tour, and it was divine." },
        ],
      },
    ],
  },
  {
    slug: "bordeaux",
    title: "Bordeaux Recommendations",
    destination: "Bordeaux",
    country: "France",
    coords: { lat: 44.8378, lon: -0.5792 },
    cover: bordeaux,
    summary:
      "One vineyard hotel worth the whole trip, a tasting menu in the city, and a day out in Saint-Émilion.",
    teaser:
      "Wine country without a schedule. Where to stay, where to eat in the city, the town to spend a day in, and the châteaux worth tasting at.",
    tags: ["#Caudalie", "#SaintEmilion", "#Wine"],
    sections: [
      {
        title: "Stay",
        places: [
          {
            name: "Les Sources de Caudalie",
            note: "Best vineyard. Beautiful hotel, an amazing Michelin-starred restaurant, and bikes you can ride around the property.",
          },
        ],
      },
      {
        title: "In the city",
        places: [
          { name: "Berthus", note: "Seasonal tasting menu in the city centre. So cute, and tasty." },
        ],
      },
      {
        title: "Day trip",
        places: [
          {
            name: "Saint-Émilion",
            near: "France",
            note: "Adorable town outside Bordeaux with lots of vineyards and historical landmarks. We had brunch, tasted some wines and walked around.",
          },
        ],
      },
      {
        title: "Other tastings and restaurants",
        places: [
          { name: "Château d'Yquem", near: "Sauternes, France" },
          { name: "Château Smith Haut Lafitte" },
          { name: "La Table de Vigne" },
          { name: "Château Troplong Mondot", near: "Saint-Émilion, France" },
          { name: "Château Haut-Bailly" },
        ],
      },
    ],
  },
  {
    slug: "nice",
    title: "Nice Recommendations",
    destination: "Nice",
    country: "France",
    coords: { lat: 43.7102, lon: 7.262 },
    cover: nice,
    summary:
      "Tours worth booking, three restaurants in the old town, and the beach club to spend a day at.",
    teaser:
      "Nice as a menu rather than a plan: the tours worth taking, where to eat in the old town, and the day trips along the coast.",
    tags: ["#OldNice", "#Riviera", "#Monaco"],
    sections: [
      {
        title: "Things to do",
        places: [
          {
            name: "La Réserve de la Mala",
            url: "https://www.lareservedelamala.com/",
            note: "Beach club outside Nice. Yachts, restaurants, good vibes.",
          },
        ],
        items: [
          "Wine tour.",
          "Lavender fields tour.",
          "French Riviera day trip.",
          "Walking tour of the old town.",
          "Food tour.",
          "Boat cruise, with or without cocktails or snorkelling.",
          "Electric bike tour.",
          "Train ride through the Alps.",
        ],
      },
      {
        title: "Restaurants",
        places: [
          {
            name: "Carmela",
            url: "https://www.carmela-restaurant.com/",
            note: "Italian, in Old Nice.",
          },
          {
            name: "Marinette",
            url: "http://www.restaurantmarinette.fr/",
            note: "Breakfast, in Old Nice.",
          },
          {
            name: "La Petite Maison",
            url: "https://www.instagram.com/lapetitemaison_nice/?hl=en",
            note: "Mediterranean, in Old Nice. Amazing vibes, ok food.",
          },
        ],
      },
      {
        title: "Where we stayed",
        places: [{ name: "Le Méridien Nice" }],
      },
      {
        title: "Day trips",
        places: [
          { name: "Monaco", near: "France" },
          { name: "Saint-Tropez", near: "France" },
          { name: "Cannes", near: "France" },
        ],
      },
    ],
  },
  {
    slug: "charleston",
    title: "Charleston Recommendations",
    destination: "Charleston",
    country: "United States",
    coords: { lat: 32.7765, lon: -79.9311 },
    cover: charleston,
    summary:
      "The reservations worth chasing, the casual places I went back to, and where to drink.",
    teaser:
      "Charleston sorted by how much effort it takes to get in: the ones you queue or book for, the ones you just walk into, and the bars.",
    tags: ["#ChubbyFish", "#LewisBarbecue", "#Vintage"],
    sections: [
      {
        title: "Restaurants",
        places: [
          {
            name: "Chubby Fish",
            note: "Seafood, and literally my favourite restaurant. You cannot get a reservation, so be there at opening at 17:00 to put your name down.",
          },
          {
            name: "Chez Nous",
            note: "French. The menu changes every day, so follow their Instagram and pop in if that day looks good. They usually take walk-ins outside.",
          },
          { name: "Maison", note: "French food, and so amazing." },
          {
            name: "The Post House",
            note: "Super cute, over in Mount Pleasant. My favourite brunch in Charleston, in a really cute neighbourhood you can walk around after.",
          },
          {
            name: "The Obstinate Daughter",
            note: "You need a reservation. Get the farro or the Old Danger. If you cannot get one they take walk-ins, so put your name down and walk along the beach.",
          },
          {
            name: "Farfalle",
            note: "Phenomenal pasta and vibes, and the outside seating is so cute. Famous for the whipped ricotta. Across the street from a dope ice cream shop.",
          },
        ],
      },
      {
        title: "Casual",
        places: [
          {
            name: "Cru Cafe",
            note: "The best lowkey restaurant downtown. Get the Asian salad, it's insane.",
          },
          {
            name: "Queen Street Grocery",
            note: "Super casual, mostly crepes and sandwiches, but so good and in a really cute part of Charleston.",
          },
          { name: "Harken Cafe", note: "Coffee shop with a small breakfast menu." },
          { name: "Brown's Court Bakery", note: "I came here almost every morning. Best bakery." },
          { name: "Lewis Barbecue", note: "My favourite spot, though some people prefer Rodney Scott's." },
          { name: "Rodney Scott's BBQ", note: "The other camp." },
        ],
      },
      {
        title: "Drinks",
        places: [
          { name: "Citrus Club", note: "Rooftop bar overlooking Charleston." },
          { name: "The Cocktail Club", note: "Good drinks, older scene." },
          {
            name: "Vintage Lounge",
            note: "Really dope vibes and drinks. Voted prettiest bar in America, I'm pretty sure.",
          },
          {
            name: "The Royal American",
            note: "Great live music usually. Quintessential Charleston bar.",
          },
          {
            name: "Faculty Lounge",
            note: "A speakeasy, kind of off the beaten path. One of my favourites.",
          },
        ],
      },
    ],
  },
  {
    slug: "dover",
    title: "Dover, Vermont Recommendations",
    destination: "Dover, Vermont",
    country: "United States",
    coords: { lat: 42.96, lon: -72.89 },
    cover: dover,
    summary:
      "Where to eat around Mount Snow in southern Vermont, four hikes graded by effort, and the shops worth a detour.",
    teaser:
      "Dover and West Dover, at the Mount Snow end of southern Vermont. Dive bars and breakfast places, four hikes from beginner to moderately difficult, and a nearby town for a farmers' market.",
    tags: ["#MountSnow", "#Vermont", "#Hikes"],
    sections: [
      {
        title: "Eat and drink",
        places: [
          { name: "Dover Bar and Grill", near: "Dover, Vermont", note: "Local dive bar." },
          { name: "The Last Chair", near: "West Dover, Vermont" },
          { name: "Valley View Saloon", near: "West Dover, Vermont" },
          { name: "1846 Tavern", near: "West Dover, Vermont" },
          { name: "TC's Family Restaurant", near: "Wilmington, Vermont" },
          { name: "Betsey's Dots of Dover", near: "Dover, Vermont", note: "Breakfast." },
          { name: "Sawmill Bar and Table", near: "West Dover, Vermont", note: "Breakfast." },
          { name: "Snow Republic Brewing", near: "West Dover, Vermont", note: "Brewery." },
        ],
      },
      {
        title: "More, from someone who lived there",
        places: [
          { name: "Sticky Fingers Bakery", near: "Vermont" },
          { name: "American Flatbread", near: "Vermont" },
        ],
      },
      {
        title: "Hikes",
        places: [
          { name: "Crystal Cascade Falls", near: "Vermont", note: "2.1 miles, beginner." },
          { name: "Bucklin Trail", near: "Vermont", note: "7.2 miles, moderately difficult." },
          { name: "Valley Trail", near: "West Dover, Vermont", note: "5 miles, easier." },
          { name: "Haystack Mountain", near: "Wilmington, Vermont", note: "5 miles, medium." },
        ],
      },
      {
        title: "Shops and things",
        places: [
          { name: "Clothespins Consignment Boutique", near: "Vermont" },
          { name: "King Arthur Baking", near: "Norwich, Vermont" },
          { name: "Sheep Shed and Worn", near: "Vermont", note: "Collectible store." },
          { name: "Snow Mountain Market", near: "West Dover, Vermont" },
          { name: "Mount Snow", near: "West Dover, Vermont", note: "They run a summer block party." },
        ],
      },
      {
        title: "Nearby",
        places: [
          {
            name: "Brattleboro",
            near: "Vermont",
            note: "Cute town nearby, with a farmers' market and such.",
          },
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
