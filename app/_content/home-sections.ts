import { Images, ImageAlts } from '@/src/lib/images';

export interface AtGlanceDetail {
  label: string;
  value: string;
  href?: string;
  ariaLabel?: string;
}

export interface AtGlanceCard {
  icon: string;
  title: string;
  description?: string;
  details: AtGlanceDetail[];
}

export interface RatingStat {
  source: string;
  rating: string;
  reviews?: string;
  url?: string;
  highlight?: string;
  quote?: string;
}

export interface RecognitionItem {
  title: string;
  body: string;
  url?: string;
  label?: string;
  year?: string;
}

export interface PressItem {
  publication: string;
  headline: string;
  summary: string;
  url: string;
  quote?: string;
}

export interface AmenityItem {
  icon: string;
  text: string;
}

export interface RegularEventItem {
  title: string;
  description: string;
  frequency: string;
  icon: string;
  startDate?: string;
  endDate?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

export interface NeighbourhoodSpot {
  name: string;
  description: string;
  distance: string;
  category: string;
  url: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  orientation?: 'portrait' | 'landscape';
}

export const HOME_AT_A_GLANCE: AtGlanceCard[] = [
  {
    icon: '📍',
    title: 'Visit us on Waterbeach green',
    description: 'Opposite the village green with free roadside parking and easy cycling links.',
    details: [
      {
        label: 'Address',
        value: '12 Green Side, Waterbeach, Cambridge CB25 9HP',
        href: 'https://www.google.com/maps?q=52.2662426,0.1913944',
        ariaLabel: 'Open Google Maps directions to The White Horse Waterbeach'
      },
      {
        label: 'Coordinates',
        value: '52.2662426, 0.1913944'
      }
    ]
  },
  {
    icon: '⏰',
    title: 'Opening hours',
    description: 'Kitchen + bar schedule verified February 2025.',
    details: [
      { label: 'Mon–Thu', value: '12:00–22:00 (Lunch 12:00–15:00 · Dinner 17:00–22:00)' },
      { label: 'Fri & Sat', value: '12:00–23:00 (Kitchen until 22:00 · Takeaway Friday nights)' },
      { label: 'Sunday', value: '10:00–20:00 (Brunch 10:00–12:00 · Roasts until 16:00 · Curry evening)' }
    ]
  },
  {
    icon: '💷',
    title: 'Price & style',
    description: 'Casual-luxe dining in a restored thatched coaching inn.',
    details: [
      { label: 'Price range', value: '££ Mid-range' },
      { label: 'Dining style', value: 'Nepalese restaurant + British village pub' },
      { label: 'Owner', value: 'Lapen Inns (reopened Feb 2025)' }
    ]
  },
  {
    icon: '☎️',
    title: 'Reservations & takeaway',
    description: 'Phone or email the team — walk-ins welcome, online booking coming soon.',
    details: [
      { label: 'Call', value: '01223 375578', href: 'tel:+441223375578' },
      { label: 'Email', value: 'hellothewhitehorsewaterbeach@gmail.com', href: 'mailto:hellothewhitehorsewaterbeach@gmail.com' },
      { label: 'Gift cards', value: 'Shop via Lapen Inns', href: 'https://lapeninns.com/gift-cards' }
    ]
  }
];

export const HOME_RATINGS: RatingStat[] = [
  {
    source: 'Google Reviews',
    rating: '4.4 / 5',
    reviews: '440+ reviews · updated Feb 2025',
    url: 'https://www.google.com/maps?q=52.2662426,0.1913944',
    highlight: 'Highest-rated venue in Waterbeach for Nepalese cuisine.',
    quote: '“Historic pub meets modern culinary flair – a true Cambridge gem.”'
  },
  {
    source: 'TripAdvisor',
    rating: '4.2 / 5',
    reviews: 'Ranked #1 in Waterbeach · 11 reviews',
    url: 'https://www.tripadvisor.co.uk/Restaurant_Review-g2549675-d26682723-Reviews-The_White_Horse-Waterbeach_Cambridgeshire_England.html',
    highlight: 'Celebrated for authentic ingredients and rich flavours.',
    quote: '“Authentic ingredients and a rich, flavourful experience.”'
  },
  {
    source: 'Internal feedback',
    rating: '4.5 / 5',
    reviews: 'Guest cards & community surveys',
    highlight: 'Locals applauded the February 2025 relaunch, relieved it stayed a pub.',
    quote: '“The locals were more excited than I am… the regulars turned up and were so welcoming.” – Owner Subodh Gautam'
  }
];

export const HOME_AWARDS: RecognitionItem[] = [
  {
    title: 'CAMRA Listed Pub',
    label: 'CAMRA',
    url: 'https://camra.org.uk/pubs/white-horse-waterbeach-131319',
    body: 'Recognised by the Campaign for Real Ale for well-kept cask lines and historic pub character.'
  },
  {
    title: 'Visit South Cambs Official Guide',
    label: 'Visit South Cambs',
    url: 'https://visitsouthcambs.co.uk/hospitality/the-white-horse/',
    body: 'Featured as a “relaxed and contemporary setting” for diverse Nepalese cuisine.'
  },
  {
    title: 'Historic Coaching Inn',
    label: 'Since 1890',
    body: 'Village coaching inn preserved by Waterbeach community and Lapen Inns, now England’s largest thatched pub.'
  }
];

export const HOME_PRESS: PressItem[] = [
  {
    publication: 'Ely Standard',
    headline: 'Waterbeach celebrates Nepalese relaunch',
    summary: 'Covers the February 2025 reopening, community relief, and the Gautam family mission to keep the pub thriving.',
    url: 'https://www.elystandard.co.uk/news/24942044.white-horse-waterbeach-reopens-nepalese-restaurant/',
    quote: '“The locals were so welcoming – they thought it would be flats, but regulars turned up in force.”'
  },
  {
    publication: 'Cambridge News',
    headline: 'Village pub rescued from redevelopment',
    summary: 'Highlights the dual identity: lively pub culture with Nepalese feasts minutes from Cambridge.',
    url: 'https://www.cambridge-news.co.uk/whats-on/food-drink-news/cambridgeshire-village-pub-reopens-new-30923154',
    quote: '“A village pub saved from redevelopment and reborn as a Nepalese restaurant with heart.”'
  },
  {
    publication: 'Visit South Cambs',
    headline: 'Contemporary setting with Himalayan flavour',
    summary: 'Official tourism guide praising the diverse Nepalese menu and relaxed modern surroundings.',
    url: 'https://visitsouthcambs.co.uk/hospitality/the-white-horse/',
    quote: '“A relaxed and contemporary setting where guests enjoy a rich, flavourful dining experience.”'
  }
];

export const HOME_AMENITIES: AmenityItem[] = [
  { icon: '🍺', text: 'CAMRA-kept cask ales & Gurkha lager on tap' },
  { icon: '🍛', text: 'Authentic Nepalese menu alongside British pub classics' },
  { icon: '🍳', text: 'Sunday brunch & roasts with Nepalese spice twists' },
  { icon: '🥡', text: 'Takeaway ready every Friday evening' },
  { icon: '📺', text: 'Sky & TNT Sports on big screens' },
  { icon: '🎤', text: 'Quiz night every Wednesday evening' },
  { icon: '🐾', text: 'Dog-friendly bar (two per guest) with water bowls & treats' },
  { icon: '👨‍👩‍👧‍👦', text: 'Family friendly with children welcome until 9pm' },
  { icon: '🔥', text: 'Heated garden cabins, terrace & expansive beer garden' },
  { icon: '🅿️', text: 'Free village parking along Greenside' }
];

export const HOME_EVENTS: RegularEventItem[] = [
  {
    title: 'Wednesday Quiz Night',
    description: 'Village quiz with prizes, lively teams and Nepalese bar snacks served all evening.',
    frequency: 'Every Wednesday · 20:00 start',
    icon: '🧠',
    startDate: '2025-02-12T20:00:00+00:00'
  },
  {
    title: 'Live Sport on Sky & TNT',
    description: 'Premier League, rugby and cricket shown across the bar screens with match-day food specials.',
    frequency: 'Major fixtures · see weekly listings',
    icon: '⚽️'
  },
  {
    title: 'Friday Takeaway Night',
    description: 'Order Nepalese favourites for collection with the kitchen open through 22:00.',
    frequency: 'Every Friday · 12:00–22:00 kitchen service',
    icon: '🥡'
  },
  {
    title: 'Seasonal Curry & Carols',
    description: 'Festive Nepalese banquets with live carols under the thatched roof each December.',
    frequency: 'Seasonal · December',
    icon: '🎄'
  }
];

export const HOME_TIMELINE_INTRO =
  'A 19th-century coaching inn saved by the community, reimagined by Lapen Inns in 2025 and infused with Nepalese hospitality by the Gautam family.';

export const HOME_TIMELINE: TimelineEntry[] = [
  {
    period: '1890s',
    title: 'Coaching inn welcomes travellers',
    description: 'The White Horse serves boat crews and railway passengers, anchoring daily life on Waterbeach green.'
  },
  {
    period: '20th century',
    title: 'Village landmark & social hub',
    description: 'Locals gather for pints, sports and celebrations beneath the expansive thatched roof.'
  },
  {
    period: '2024',
    title: 'Community saves the pub',
    description: 'Residents rally to prevent redevelopment into flats, restoring the garden cabins and frontage.'
  },
  {
    period: 'February 2025',
    title: 'Lapen Inns relaunch',
    description: 'The Gautam family reopen with authentic Nepalese cuisine, Sky Sports, takeaway service and a revitalised beer garden.'
  }
];

export const HOME_NEIGHBOURHOOD: NeighbourhoodSpot[] = [
  {
    name: 'Denny Abbey & Farmland Museum',
    category: 'Culture',
    distance: '5 mins drive',
    description: 'Explore 850 years of history with abbey ruins, rural exhibits and family workshops.',
    url: 'https://dennyfarmlandmuseum.org.uk/visiting-us/'
  },
  {
    name: 'Waterbeach Lake & Cambridge Sport Lakes',
    category: 'Outdoors',
    distance: '10 mins cycle',
    description: 'Loop the 1.2km trail, hire paddleboards or watch dragon boats on the lakeside.',
    url: 'https://waterbeachwb.co.uk/visiting-the-lake/'
  },
  {
    name: 'Milton Country Park',
    category: 'Outdoors',
    distance: '12 mins drive',
    description: '95-acre park with woodland trails, watersports launches and dog-friendly spaces.',
    url: 'https://www.miltoncountrypark.org/visitor-information'
  }
];

export const HOME_GALLERY: GalleryImage[] = [
  {
    src: Images.home.heroExteriorDay,
    alt: ImageAlts.home?.heroExteriorDay ?? 'Thatched exterior of The White Horse Waterbeach',
    caption: 'England’s largest thatched pub overlooking Waterbeach green',
    orientation: 'landscape'
  },
  {
    src: Images.home.heroBar,
    alt: ImageAlts.home?.heroBar ?? 'Copper-topped bar at The White Horse',
    caption: 'Copper bar with CAMRA-kept cask handpulls and backlit spirits',
    orientation: 'landscape'
  },
  {
    src: Images.home.diningNook,
    alt: ImageAlts.home?.diningNook ?? 'Cosy dining nook with glass chandelier',
    caption: 'Split-level dining nooks with velvet banquettes and pendant lighting',
    orientation: 'portrait'
  },
  {
    src: Images.home.gardenPatio,
    alt: ImageAlts.home?.gardenPatio ?? 'Terrace seating with parasols',
    caption: 'Terrace and heated cabins ready for sun-soaked afternoons',
    orientation: 'portrait'
  },
  {
    src: Images.home.heroDish,
    alt: ImageAlts.home?.heroDish ?? 'Sizzling mixed grill served at The White Horse',
    caption: 'Rara king prawn and sizzling mixed grill showcase Himalayan spice',
    orientation: 'landscape'
  },
  {
    src: Images.home.momoPlate,
    alt: ImageAlts.home?.momoPlate ?? 'Steamed momo dumplings',
    caption: 'Steamed momo with chilli chutney — a Waterbeach favourite starter',
    orientation: 'portrait'
  }
];
