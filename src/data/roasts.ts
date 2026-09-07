/**
 * The Sunday roast spreadsheet, as scored.
 *
 * Every category is out of 5. A zero in the sheet does not mean nul points: it
 * means the pub did not offer that thing at all, so the weighted average drops
 * that category and renormalises the rest. That is why a pub with no pudding
 * is not punished for it. Rendered as "n/a".
 */
export type RoastScores = {
  meat: number;
  greens: number;
  potatoes: number;
  roastVeg: number;
  yorkshire: number;
  gravy: number;
  sides: number;
  pudding: number;
  portion: number;
  vibe: number;
};

export type Roast = {
  pub: string;
  area: string;
  scores: RoastScores;
  comment: string;
  /** The weighted average from the sheet. */
  score: number;
};

/** How much each category counts toward the final score. Adds to 100. */
export const ROAST_WEIGHTS: { key: keyof RoastScores; label: string; weight: number }[] = [
  { key: "meat", label: "Beef or chicken", weight: 20 },
  { key: "greens", label: "Greens", weight: 8 },
  { key: "potatoes", label: "Potatoes", weight: 8 },
  { key: "roastVeg", label: "Roast veg", weight: 8 },
  { key: "yorkshire", label: "Yorkshire", weight: 8 },
  { key: "gravy", label: "Gravy", weight: 10 },
  { key: "sides", label: "Sides", weight: 8 },
  { key: "pudding", label: "Pudding", weight: 10 },
  { key: "portion", label: "Portion", weight: 10 },
  { key: "vibe", label: "Vibe", weight: 10 },
];

function r(
  pub: string,
  area: string,
  nums: [number, number, number, number, number, number, number, number, number, number],
  score: number,
  comment: string,
): Roast {
  const [meat, greens, potatoes, roastVeg, yorkshire, gravy, sides, pudding, portion, vibe] = nums;
  return {
    pub,
    area,
    scores: { meat, greens, potatoes, roastVeg, yorkshire, gravy, sides, pudding, portion, vibe },
    comment,
    score,
  };
}

// In the order they were eaten. The page sorts them.
export const roasts: Roast[] = [
  r("Coachmaker's Arms", "Marylebone", [3, 3, 2, 3, 3, 3, 0, 0, 4, 3], 3.02,
    "They were out of most options. Nothing was spectacular."),
  r("Larrick", "Lisson Grove", [4, 5, 5, 3, 4, 4, 0, 5, 4, 5], 4.30,
    "Kale, sadly."),
  r("Elgin", "Maida Vale", [3, 2, 5, 3, 4, 3, 3, 0, 3, 3], 3.18,
    "Order the chicken. The beef was bad. Live music lifted the vibe, and without it there is no vibe at all. Kale instead of cabbage here too."),
  r("Walmer Castle", "Notting Hill", [4, 3, 4, 3, 5, 5, 5, 5, 3, 5], 4.20,
    "Tomahawk. I wish I had more meat."),
  r("Cadogan Arms", "Chelsea", [4, 3, 5, 2, 4, 5, 5, 2, 4, 4], 3.82,
    "Truffle mayo and creamed spinach."),
  r("Hereford Arms", "South Kensington", [4, 4, 4, 5, 3, 3, 4, 4, 4, 4], 3.90,
    "Large variety of sides, and the roast itself came with cauliflower cheese."),
  r("Mall Tavern", "Notting Hill Gate", [5, 5, 5, 5, 5, 5, 5, 5, 5, 5], 5.00,
    "Epic vibes, live music in the basement, and brisket croquettes. Straight fives."),
  r("Blacklock", "Carnaby", [5, 5, 5, 5, 4, 5, 5, 5, 5, 5], 4.92,
    "No sticky toffee pudding, but the bread pudding and the white chocolate cheesecake were insane."),
  r("Duke of Wellington", "Marylebone", [3, 2, 5, 3, 3, 3, 4, 5, 3, 3], 3.36,
    "Some weird cabbage."),
  r("No. Fifty Cheyne", "Chelsea", [3, 3, 5, 4, 2, 2, 0, 5, 4, 5], 3.61,
    "Famous for the beef wellington, but it was mid. Gorgeous interior and clientele though."),
  r("Hollywood Arms", "Chelsea", [3, 3, 3, 4, 4, 4, 3, 5, 4, 3], 3.56,
    "Came together well, but nothing was standout. The cauliflower cheese was watery and tasted of no truffle oil at all. The meat was thinly sliced, cooked all the way through, and difficult to cut."),
  r("The Cleveland Arms", "Paddington", [4, 5, 4, 5, 3, 4, 5, 0, 5, 4], 4.29,
    "The broccoli and cauliflower soup was bomb, and one of the best cauliflower cheeses going. No sticky toffee pudding."),
  r("The Royal Oak", "Bethnal Green", [4, 5, 3, 5, 4, 4, 4, 4, 3, 3], 3.88,
    "Bonus points for a gluten free sticky toffee pudding for my friend, though it was VERY sweet. Meat cooked to perfection. Very loud."),
  r("The Duke of Clarence", "South Kensington", [4, 4, 3, 4, 2, 3, 2, 0, 2, 2], 3.00,
    "Out of sticky toffee pudding. So loud, because of the giant flat screens with the game on. The roasts were not consistent: mine was cooked perfectly and my friend's was overcooked. Not enough gravy."),
  r("Bridge House", "Little Venice", [2, 3, 3, 3, 2, 4, 4, 0, 4, 3], 3.00,
    "The knife was so dull I could not cut anything, including the overcooked meat. Vibes were nothing special, but they gave about ten potatoes and a lot of veg."),
  r("The George", "Fitzrovia", [5, 5, 5, 5, 5, 5, 4, 3, 4, 3], 4.42,
    "Meat cooked to perfection. Only lost points because the sticky toffee pudding came with cream rather than ice cream, and the vibes were not life-altering."),
  r("The Devonshire", "Soho", [5, 5, 5, 5, 4, 4, 5, 5, 3, 3], 4.42,
    "Incredibly loud, but impeccable food, unique sides, and free bread to start."),
  r("Camberwell Arms", "Camberwell", [5, 3, 4, 4, 0, 2, 2, 0, 4, 3], 3.59,
    "The meat was perfect, but this was not a traditional roast. No Yorkshire, no gravy, everything family style. The vibe was cold."),
  r("Prince Alfred", "Maida Vale", [3, 4, 4, 4, 3, 4, 5, 3, 3, 4], 3.60,
    "Meat overdone. Gravy a little salty, which is saying something coming from me. The sticky toffee pudding was like a loaf of banana bread. The Yorkshire was mid and they would not give extra gravy to soak it up."),
  r("Ladbroke Arms", "Kensington", [5, 4, 4, 5, 3, 4, 5, 5, 5, 5], 4.58,
    "The sweet potato puree was insane."),
  r("Crown & Anchor", "Eastbourne", [2, 2, 3, 2, 3, 3, 2, 0, 4, 3], 2.62,
    "The variety of potatoes was good. That is the compliment."),
  r("The Parakeet", "Kentish Town", [5, 2, 4, 3, 5, 4, 0, 5, 4, 4], 4.15,
    "Beautiful pub, very solid roast."),
  r("The Holland", "Notting Hill", [4, 4, 4, 3, 3, 3, 3, 5, 2, 3], 3.46,
    "Non-traditional roast. Absolutely killer dessert, though not a sticky toffee pudding."),
  r("The Mitre", "Notting Hill", [3, 3, 3, 4, 3, 4, 2, 4, 4, 3], 3.30,
    "The little piece of stuffing on the side was great."),
  r("The Cavendish", "Marylebone", [4, 3, 2, 4, 3, 3, 5, 0, 3, 2], 3.29,
    "The cauliflower cheese was tiny, but delicious. The horseradish was incredible."),
  r("The Surprise", "Chelsea", [5, 4, 2, 5, 5, 5, 3, 5, 4, 5], 4.42,
    "Amazing vibes and the best beef and chicken, and my favourite Yorkshire ever. Very small protein portion though, and a large veg one."),
  r("The Pig & Butcher", "Islington", [5, 5, 2, 5, 3, 5, 5, 5, 5, 4], 4.50,
    "Incredibly solid from the meal to the sides to the pudding, and the horseradish was amazing. I am shocked at how bad the potatoes were."),
  r("The Portman", "Marylebone", [4, 4, 3, 4, 2, 4, 2, 3, 3, 3], 3.30,
    "Solid, and the one I would take if I needed an emergency roast nearby. You can sit outside, which is nice, but it was average. Everything needed salt and the horseradish had no flavour."),
  r("Hunter's Moon", "South Kensington", [4, 3, 4, 4, 3, 3, 4, 5, 3, 3], 3.64,
    "Quality ingredients, but a very small portion. The potatoes were almost impossible to cut, though soft inside. The service was god awful."),
];
