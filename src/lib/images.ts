// Centralized image registry for the site.
// Grouped by domain to keep usage consistent and avoid scattered string paths.

const brandImages = {
  logo: '/images/brand/whitehorse-logo.png',
  building: '/images/slideshow/whitehorsebuilding.png',
} as const;

const homeImages = {
  heroExteriorDay: '/images/white-horse/exterior/white-horse-pub-exterior-frontage-bright-sky-landscape.jpeg',
  heroExteriorWide: '/images/white-horse/exterior/white-horse-pub-exterior-wide-frontage-landscape.jpeg',
  heroBar: '/images/white-horse/interior/bar-counter-cozy-lighting-taps-and-shelves-landscape.jpeg',
  heroCommunity: '/images/white-horse/interior/bar-counter-front-view-taps-and-bottles-landscape.jpeg',
  heroDish: '/images/white-horse/dishes/sizzler-mixed-grill-with-lemon-landscape.jpeg',
  diningNook: '/images/white-horse/interior/cozy-dining-nook-glass-chandelier-portrait.jpeg',
  splitLevelSeating: '/images/white-horse/interior/split-level-seating-wood-and-tile-floors-portrait.jpeg',
  gardenPatio: '/images/white-horse/garden/patio-terrace-wicker-chairs-and-parasols-portrait.jpeg',
  beerGarden: '/images/white-horse/garden/beer-garden-picnic-benches-and-sky-portrait.jpeg',
  momoPlate: '/images/white-horse/dishes/steamed-momo-with-spicy-sauce-portrait.jpeg',
  goatCurry: '/images/white-horse/dishes/rich-red-curry-in-balti-bowl-portrait.jpeg',
  saladBowl: '/images/white-horse/dishes/fresh-mixed-salad-cherry-tomatoes-portrait.jpeg',
  sharedTableFeast: '/images/slideshow/shared-table-nepalese-feast-landscape.png',
} as const;

const dishesImages = {
  bhutuwaChicken: '/images/white-horse/dishes/rich-red-curry-in-balti-bowl-portrait.jpeg',
  pokhareliFish: '/images/white-horse/dishes/creamy-curry-in-ceramic-bowl-portrait.jpeg',
  raraKingPrawn: '/images/white-horse/dishes/sizzler-mixed-grill-with-lemon-landscape.jpeg',
  momoDumplings: '/images/white-horse/dishes/steamed-momo-with-spicy-sauce-portrait.jpeg',
  gardenSizzlerSalad: '/images/white-horse/dishes/fresh-mixed-salad-cherry-tomatoes-portrait.jpeg',
  tomatoChutney: '/images/white-horse/dishes/tomato-chili-chutney-garnished-portrait.jpeg',
} as const;

const spaceImages = {
  barEvening: '/images/white-horse/interior/bar-counter-cozy-lighting-taps-and-shelves-landscape.jpeg',
  barHandpulls: '/images/white-horse/interior/bar-counter-front-view-taps-and-bottles-landscape.jpeg',
  barCask: '/images/white-horse/interior/bar-counter-beer-taps-and-bottles-portrait.jpeg',
  diningCorner: '/images/white-horse/interior/cozy-dining-nook-glass-chandelier-portrait.jpeg',
  diningMain: '/images/white-horse/interior/dining-room-main-tv-and-tables-portrait.jpeg',
  diningMainAlt: '/images/white-horse/interior/dining-room-main-tv-and-tables-alt-portrait.jpeg',
  meshPendant: '/images/white-horse/interior/dining-room-mesh-pendant-light-and-seating-portrait.jpeg',
  diningOverview: '/images/white-horse/interior/dining-room-overview-tv-and-tables-portrait.jpeg',
  diningWindows: '/images/white-horse/interior/dining-room-windows-striped-chairs-portrait.jpeg',
  splitLevel: '/images/white-horse/interior/split-level-seating-wood-and-tile-floors-portrait.jpeg',
  carvedDetail: '/images/white-horse/interior/carved-wood-panel-corner-table-portrait.jpeg',
  horseLamp: '/images/white-horse/interior/horse-head-lamp-and-plants-decor-portrait.jpeg',
  exteriorFront: '/images/white-horse/exterior/white-horse-pub-exterior-frontage-bright-sky-landscape.jpeg',
  exteriorEntrance: '/images/white-horse/exterior/white-horse-pub-exterior-front-entrance-portrait.jpeg',
  exteriorWide: '/images/white-horse/exterior/white-horse-pub-exterior-wide-frontage-landscape.jpeg',
  gardenTerrace: '/images/white-horse/garden/patio-terrace-wicker-chairs-and-parasols-portrait.jpeg',
  gardenVillage: '/images/white-horse/garden/beer-garden-picnic-benches-and-sky-portrait.jpeg',
} as const;

const blogImages = {
  momo: dishesImages.momoDumplings,
  businessLunch: spaceImages.diningMain,
  dogFriendly: spaceImages.gardenVillage,
  studentGuide: spaceImages.diningMainAlt,
  thatchedExterior: spaceImages.exteriorFront,
  sportsViewing: spaceImages.barHandpulls,
  localIngredients: dishesImages.gardenSizzlerSalad,
  nepaleseHero: dishesImages.pokhareliFish,
} as const;

export const Images = {
  brand: brandImages,
  home: homeImages,
  dishes: dishesImages,
  spaces: spaceImages,
  blog: blogImages,
} as const;

export type ImageRegistry = typeof Images;

// Optional: centralized alt texts for key assets (non-breaking; keep separate from paths)
export const ImageAlts: { [K in keyof ImageRegistry]?: Record<string, string> } = {
  brand: {
    logo: 'The White Horse Waterbeach logo',
    building: 'Exterior of The White Horse country pub with chalkboards at the entrance',
  },
  home: {
    heroExteriorDay: 'Thatched exterior of The White Horse Waterbeach on a bright day',
    heroExteriorWide: 'Wide view of The White Horse Waterbeach facing the village green',
    heroBar: 'Copper-topped bar with cask ales at The White Horse',
    heroCommunity: 'Handpull bar counter ready for Sky Sports at The White Horse',
    heroDish: 'Nepalese sizzling mixed grill served with lemon at The White Horse',
    diningNook: 'Cosy dining nook with glass chandelier inside the Waterbeach coaching inn',
    splitLevelSeating: 'Split-level seating linking bar and dining floor at The White Horse',
    gardenPatio: 'Terrace seating with parasols beside Waterbeach village green',
    beerGarden: 'Beer garden picnic benches under wide Fenland skies',
    momoPlate: 'Steamed momo dumplings with Nepalese tomato-timmur chutney',
    goatCurry: 'Bhutuwa chicken-style curry simmered in chilli, garlic and ginger',
    saladBowl: 'Fresh mixed salad with cherry tomatoes served in the garden',
    sharedTableFeast: 'Long wooden table filled with Nepalese sharing plates, salads, and drinks ready for guests',
  },
  dishes: {
    bhutuwaChicken: 'Bhutuwa chicken glazed in chilli, garlic and ginger',
    pokhareliFish: 'Pokhareli fish curry with fenugreek and mustard seed heat',
    raraKingPrawn: 'Rara king prawns arriving tableside on a sizzling platter',
    momoDumplings: 'Hand-pinched chicken momo with timmur chilli chutney',
    gardenSizzlerSalad: 'Garden-fresh salad served at The White Horse Waterbeach',
    tomatoChutney: 'Tomato and chilli achar garnish for Nepalese dishes',
  },
  spaces: {
    barEvening: 'Warmly lit copper bar at The White Horse Waterbeach',
    barHandpulls: 'Cask ale handpulls ready for service at the bar',
    barCask: 'Close-up of cask pumps and bottled spirits behind the bar',
    diningCorner: 'Intimate dining corner with banquette seating',
    diningMain: 'Main dining room linking to the bar with TV ready for sport',
    diningMainAlt: 'Alternative view of the dining room with rustic beams',
    meshPendant: 'Split-level seating beneath mesh pendant lighting',
    diningOverview: 'Overview of the dining floor with copper accents',
    diningWindows: 'Dining space with striped chairs and picture windows',
    splitLevel: 'Split-level walkway between bar and dining areas',
    carvedDetail: 'Carved wood panel and corner table detail',
    horseLamp: 'Decorative horse-head lamp with green foliage',
    exteriorFront: 'Thatched frontage of The White Horse from the village green',
    exteriorEntrance: 'Front entrance of The White Horse Waterbeach',
    exteriorWide: 'Panoramic view of England’s largest thatched pub',
    gardenTerrace: 'Wicker terrace seating with parasols for sunny days',
    gardenVillage: 'Picnic benches overlooking Waterbeach village green',
  },
  blog: {
    momo: 'Steamed momo dumplings ready to share',
    businessLunch: 'Bright dining room suited to Cambridge business lunches',
    dogFriendly: 'Garden benches ideal for dog-friendly visits',
    studentGuide: 'Relaxed dining space popular with students',
    thatchedExterior: 'Exterior of The White Horse Waterbeach with thatched roof',
    sportsViewing: 'Bar counter set for live Sky and TNT Sports',
    localIngredients: 'Fresh produce inspiring our Nepalese kitchen',
    nepaleseHero: 'Pokhareli fish curry showcasing Himalayan spice',
  },
};
