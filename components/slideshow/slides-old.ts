import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

// Slideshow content derived from CornerHouse1.md/CornerHouse2.md research
const contact = getContactInfo();
const CALL_TEL = contact.phone.tel;

export const slides = [
  {
    id: 'slide-1',
    image: '/images/slideshow/interior-buddha-wall.jpg',
    alt: `Nepalese-inspired dining area with Buddha artwork at ${BRAND.fullName}`,
    eyebrow: 'Art-Deco Dining Wing',
    headline: 'Nepalese Plates in a 1930s Cambridge Landmark',
    copy: `Settle into the ${BRAND.nickname} dining wing — a 1930s art-deco space where Nepali chefs serve momo, Himali lamb, and Sunday roasts side by side.`,
    badges: ['Nepalese Chefs', 'Art-Deco Interior', 'Family Dining'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-2',
    image: '/images/slideshow/exterior-deck-umbrellas.jpg',
    alt: `Corner frontage with deck and parasols outside ${BRAND.fullName}`,
    eyebrow: 'Cambridge Corner Site',
    headline: 'A Neighbourhood Hub on Newmarket Road',
    copy: 'Find us opposite Cambridge Retail Park and minutes from Abbey Stadium — perfect for pre-match pints, hotel guests, and after-work meetups.',
    badges: ['Central Location', 'Matchday Hub', 'Lapen Inns Venue'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-3',
    image: '/images/slideshow/terrace-seating-umbrellas.jpg',
    alt: `Terrace seating with umbrellas beside heated garden cabins at ${BRAND.fullName}`,
    eyebrow: 'Heated Garden Cabins',
    headline: 'Book Cosy Cabins & Terrace Tables Year-Round',
    copy: 'Reserve heated cabins for private dining, or bask on the terrace with Nepalese grills and cocktails under the fairy lights.',
    badges: ['Heated Cabins', 'Outdoor Dining', 'Private Hire'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-4',
    image: '/images/slideshow/bar-lounge-jackpot-tv-1.jpg',
    alt: `Bar lounge with HD screens at ${BRAND.fullName}`,
    eyebrow: 'Sky & TNT Every Week',
    headline: 'Live Sport with HD Screens & Outdoor Projector',
    copy: 'Premier League, European nights, Six Nations, and F1 — all shown with full sound, craft ales, and matchday sharing platters.',
    badges: ['HD Screens', 'Outdoor Projector', 'Matchday Packages'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-5',
    image: '/images/slideshow/bar-lounge-jackpot-tv-2.jpg',
    alt: `Shuffleboard and lounge seating at ${BRAND.fullName}`,
    eyebrow: 'Games & Quizzes',
    headline: 'Shuffleboard, Pub Quiz Nights & Community Events',
    copy: 'Keep the local alive with open-mic nights, weekly quizzes, and shuffleboard battles alongside well-kept cask ales.',
    badges: ['Shuffleboard', 'Pub Quiz', 'Cask Ales'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-6',
    image: '/images/slideshow/dining-room-floral-banquets.jpg',
    alt: `Elegant dining room with floral banquettes at ${BRAND.fullName}`,
    eyebrow: 'Travelers’ Choice 2025',
    headline: 'Award-Winning Service for Date Nights & Business Lunches',
    copy: 'TripAdvisor Travelers’ Choice and CAMRA plaudits mean polished service, Nepalese banquets, and space for client lunches or celebrations.',
    badges: ['Travelers’ Choice', 'CAMRA Winner', 'Business Friendly'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-7',
    image: '/images/slideshow/kids-playground-slide-blue.jpg',
    alt: `Children's wooden play area by the beer garden at ${BRAND.fullName}`,
    eyebrow: 'Family-Friendly Credentials',
    headline: 'Space for Little Ones While You Dine',
    copy: 'High chairs, flexible children’s portions, and a safe outdoor play nook make family lunches stress-free.',
    badges: ['Kids Welcome', 'High Chairs', 'Dog Friendly'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-8',
    image: '/images/slideshow/beer-garden-long-view-benches.jpg',
    alt: `Long view across the beer garden at ${BRAND.fullName}`,
    eyebrow: 'Beer Garden Gatherings',
    headline: 'Groups, Hen Parties & Reunion BBQs',
    copy: 'Heated cabins, picnic benches, and fairy-lit planters create memorable backdrops for group dining and post-retail drinks.',
    badges: ['Group Friendly', 'Private Hire', 'Heated Cabins'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-9',
    image: '/images/slideshow/garden-lawn-round-bench.jpg',
    alt: `Garden lawn with circular bench at ${BRAND.fullName}`,
    eyebrow: 'Relaxing Green Corners',
    headline: 'Sneak Away from the City Without Leaving CB5',
    copy: 'Take a breather between Cambridge shopping runs in our leafy garden nooks, complete with fire pits and soft lighting.',
    badges: ['Leafy Retreat', 'Fire Pits', 'Close to City'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  },
  {
    id: 'slide-10',
    image: '/images/slideshow/car-park-gravel-wide.jpg',
    alt: `Car park and approach to ${BRAND.fullName}`,
    eyebrow: 'Arrive with Ease',
    headline: 'On-Site Spaces, Park & Ride, and Citi 3 Buses',
    copy: 'Use our on-site bays when available, or hop off at the Newmarket Road Park & Ride and Citi 3 stops just metres away.',
    badges: ['On-Site Parking', 'Park & Ride', 'Bus & Cycle Friendly'],
    ctas: { bookUrl: '/book-a-table', callTel: CALL_TEL }
  }
];

export default slides;
