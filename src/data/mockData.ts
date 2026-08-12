import type { Property, TeamMember, InsightArticle, Testimonial, Amenity } from '../types/index';
import { ONE_BEDROOM_FLOORPLAN, TWO_BEDROOM_FLOORPLAN } from './floorplanAssets';

export const GUEST_ROOM_AMENITIES: Amenity[] = [
  { id: 'guest-1', name: 'Fully furnished room (bed, desk, seating area)', icon: '🛋️', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80', desc: 'Elegantly furnished luxury bedroom suite with bespoke Italian seating & workstation.' },
  { id: 'guest-2', name: 'Smart TV with international channels', icon: '📺', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80', desc: '55" Ultra HD 4K Smart TV with premium global satellite channels & streaming apps.' },
  { id: 'guest-3', name: 'High-speed Wi-Fi / LAN connectivity', icon: '🌐', image: 'https://images.unsplash.com/photo-1516044734145-07ca8eef8731?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Gigabit fiber Wi-Fi and dedicated high-speed optical LAN ports.' },
  { id: 'guest-4', name: 'In-room safe', icon: '🔒', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', desc: 'Digital biometric electronic safe for laptop, valuables & confidential documents.' },
  { id: 'guest-5', name: 'Mini-bar / fridge', icon: '🍷', image: 'https://images.unsplash.com/photo-1540961403310-79825242906e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Stocked mini-bar refrigerator with gourmet beverages & refreshments.' },
  { id: 'guest-6', name: 'Tea & coffee maker', icon: '☕', image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80', desc: 'Italian Nespresso machine and gourmet herbal tea kettle setup.' },
  { id: 'guest-7', name: 'Iron & ironing board', icon: '👔', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80', desc: 'Steam garment press and full-size professional ironing station.' },
  { id: 'guest-8', name: 'Room service (24/7 or limited hours)', icon: '🍽️', image: 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?q=80&w=629&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Round-the-clock in-room dining menu curated by Turkish hotel chefs.' },
  { id: 'guest-9', name: 'Terrace & Balcony', icon: '🌅', image: 'https://images.unsplash.com/photo-1616593969747-4797dc75033e?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Private glass balcony with panoramic views of Margalla Hills & Expressway.' },
  { id: 'guest-10', name: 'Climate control / Heating and cooling', icon: '❄️', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', desc: 'Individual digital VRF thermostat heating & central air conditioning.' },
  { id: 'guest-11', name: 'En-suite bathroom with walk-in shower', icon: '🛁', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', desc: 'Marble bathroom equipped with rain showerhead & designer sanitary ware.' },
  { id: 'guest-12', name: 'Luxury toiletries', icon: '🧴', image: 'https://images.unsplash.com/photo-1711060001575-2cfa3c5a2bfa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Premium organic Turkish spa lotions, shampoos & skincare amenities.' },
  { id: 'guest-13', name: 'Towels, bathrobes, slippers', icon: '🧖‍♂️', image: 'https://images.unsplash.com/photo-1616663717839-2fea42e1a1f6?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Plush Egyptian cotton bathrobes, hotel towels & plush indoor slippers.' }
];

export const CORPORATE_AMENITIES: Amenity[] = [
  { id: 'corp-1', name: 'Conference room', icon: '🧑🏾‍💻', image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80', desc: 'Fully equipped 20-seat executive conference center with video conferencing.' },
  { id: 'corp-2', name: 'Meeting room', icon: '📊', image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', desc: 'Private soundproof meeting pods for client presentations & corporate discussions.' },
  { id: 'corp-3', name: 'LED Board room service', icon: '💻', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', desc: 'Interactive 4K smart presentation display boards & tech support.' },
  { id: 'corp-4', name: 'Hi tea for meetings', icon: '🍵', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', desc: 'Gourmet artisan tea & patisserie catering service during business meetings.' },
  { id: 'corp-5', name: 'Printer and scanner', icon: '🖨️', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80', desc: 'High-speed wireless laser printing, scanning & document binding station.' }
];

export const GENERAL_AMENITIES: Amenity[] = [
  { id: 'gen-1', name: 'Dedicated car parking', icon: '🅿️', image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80', desc: 'Multi-level secure basement parking with reserved bays.' },
  { id: 'gen-2', name: 'Prayer Room', icon: '🕌', image: 'https://images.unsplash.com/photo-1744521671527-758060770cf5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Serene air-conditioned Musalla & ablution facility for daily prayers.' },
  { id: 'gen-3', name: '24/7 Security, CCTV Surveillance', icon: '📹', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80', desc: 'Tier-1 security guards, smart access control & 24/7 HD CCTV monitoring.' },
  { id: 'gen-4', name: '24/7 Reception', icon: '🛎️', image: 'https://plus.unsplash.com/premium_photo-1676320103087-4aec0a09088f?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Multi-lingual hotel reception lobby welcoming residents & international guests.' },
  { id: 'gen-5', name: 'Room cleaning services', icon: '🧹', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', desc: 'Daily professional hotel housekeeping, linen change & sanitization.' },
  { id: 'gen-6', name: 'Online booking portal', icon: '🌐', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Integrated digital guest booking app for automated rental income payout.' },
  { id: 'gen-7', name: 'Valet parking', icon: '🚘', image: 'https://images.unsplash.com/photo-1637245057252-ba70fa548d33?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=800&q=80', desc: 'Express white-glove valet service for residents & commercial visitors.' },
  { id: 'gen-8', name: 'Grocery Shop', icon: '🛒', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80', desc: 'On-site convenience superstore for fresh produce & daily household needs.' },
  { id: 'gen-9', name: 'Barber Shop & Salon', icon: '💈', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', desc: 'Executive grooming salon offering haircut, styling & spa treatments.' },
  { id: 'gen-10', name: 'Gym & Fitness Center', icon: '🏋️‍♂️', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', desc: 'State-of-the-art TechnoGym cardio & strength training equipment.' },
  { id: 'gen-11', name: 'Swimming Pool', icon: '🏊‍♂️', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80', desc: 'Rooftop temperature-controlled infinity swimming pool & sun lounge deck.' },
  { id: 'gen-12', name: 'Lobby Café & Lounge', icon: '☕', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', desc: 'Artisan espresso bar & luxury lounge for casual meetups & high tea.' },
  { id: 'gen-13', name: 'Concierge Services', icon: '👔', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', desc: 'Personalized airport transfer booking, laundry dispatch & event reservations.' }
];

export const CATEGORIZED_AMENITIES = [
  {
    category: 'Guest Room Amenities',
    icon: '🛋️',
    badge: 'LUXURY LIVING',
    items: GUEST_ROOM_AMENITIES
  },
  {
    category: 'Corporate Amenities',
    icon: '💼',
    badge: 'BUSINESS SUITE',
    items: CORPORATE_AMENITIES
  },
  {
    category: 'General Amenities',
    icon: '🏛️',
    badge: 'HOTEL FACILITIES',
    items: GENERAL_AMENITIES
  }
];

export const ALL_AMENITIES: Amenity[] = [
  ...GUEST_ROOM_AMENITIES,
  ...CORPORATE_AMENITIES,
  ...GENERAL_AMENITIES
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    number: '01',
    title: '1-Bedroom Luxury Serviced Apartment',
    location: 'Plot 13, Bahria Lifestyle, Islamabad Expressway',
    areaTag: 'Islamabad Expressway',
    propertyType: 'Apartment',
    price: 15312500,
    priceFormatted: '15 312 500 PKR',
    developer: "RJ's Developers & Insaat Developers",
    squareMeters: 58,
    bedrooms: 1,
    downPaymentPercent: 25,
    deliveryDate: '06.2027',
    heroImage: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=1200&q=80',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: "Pakistan's first branded residence concept on Islamabad Expressway. Hotel-standard housekeeping, 24/7 concierge, smart home automation, and hands-off property management delivering 6–7% rental yields for overseas investors.",
    locationDetails: 'Plot 13, Bahria Lifestyle, Islamabad Expressway (Opposite IMARAT Downtown & Monal)',
    floorPlanUrl: ONE_BEDROOM_FLOORPLAN,
    layoutSpecs: {
      totalArea: '58m² (625 sqft)',
      level: '5th to 12th Floors',
      hall: true,
      diningRoom: true,
      kitchen: true,
      bedroomsCount: 1,
      bathroomsCount: 1
    },
    amenities: [
      'Dedicated car parking',
      'Prayer Room',
      '24/7 Security, CCTV Surveillance',
      '24/7 Reception',
      'Room cleaning services',
      'Online booking on major hospitality portal',
      'Valet parking',
      'Grocery Shop',
      'Barber Shop',
      'Gym',
      'Swimming Pool',
      'Lobby Café & Lounge',
      'Concierge Services'
    ]
  },
  {
    id: 'prop-02',
    number: '02',
    title: '2-Bedroom Executive Serviced Residence',
    location: 'Plot 13, Bahria Lifestyle, Islamabad Expressway',
    areaTag: 'Islamabad Expressway',
    propertyType: 'Apartment',
    price: 27930000,
    priceFormatted: '27 930 000 PKR',
    developer: "RJ's Developers & Insaat Developers",
    squareMeters: 106,
    bedrooms: 2,
    downPaymentPercent: 25,
    deliveryDate: '06.2027',
    heroImage: 'https://images.unsplash.com/photo-1720582611572-baf85ba10ed3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHdvJTIwYmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D?auto=format&fit=crop&w=1200&q=80',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Expansive 2-bedroom residence featuring floor-to-ceiling windows overlooking Monal Downtown and the Margalla skyline. Includes private balcony, European fixtures, and full hotel management service.',
    locationDetails: 'Plot 13, Bahria Lifestyle, Islamabad Expressway',
    floorPlanUrl: TWO_BEDROOM_FLOORPLAN,
    layoutSpecs: {
      totalArea: '106m² (1140 sqft)',
      level: '8th to 12th Floors',
      hall: true,
      diningRoom: true,
      kitchen: true,
      bedroomsCount: 2,
      bathroomsCount: 2
    },
    amenities: [
      'Dedicated car parking',
      'Prayer Room',
      '24/7 Security, CCTV Surveillance',
      '24/7 Reception',
      'Room cleaning services',
      'Online booking on major hospitality portal',
      'Valet parking',
      'Grocery Shop',
      'Barber Shop',
      'Gym',
      'Swimming Pool',
      'Lobby Café & Lounge',
      'Concierge Services'
    ]
  },
  {
    id: 'prop-03',
    number: '03',
    title: 'Ultra-Luxury Sky Penthouse Residence',
    location: 'Top Floor, Larom Residences',
    areaTag: 'Islamabad Expressway',
    propertyType: 'Penthouse',
    price: 35000000,
    priceFormatted: '35 000 000 PKR',
    developer: "RJ's Developers & Insaat Developers",
    squareMeters: 260,
    bedrooms: 4,
    downPaymentPercent: 25,
    deliveryDate: '06.2027',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: "One of only 2 exclusive penthouses atop the 14-storey Larom building. Offers 360-degree views of Islamabad, private sky lounge access, Jacuzzi terrace, and dedicated elevator keys.",
    locationDetails: '14th Floor, Plot 13, Bahria Lifestyle, Islamabad Expressway',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    layoutSpecs: {
      totalArea: '260m² (2800 sqft)',
      level: '14th Floor Penthouse',
      hall: true,
      diningRoom: true,
      kitchen: true,
      bedroomsCount: 4,
      bathroomsCount: 5
    },
    amenities: ['Hotel Concierge & Housekeeping', 'Rooftop Infinity Swimming Pool', 'State-of-the-Art Fitness Center', 'Smart Home Automation System', 'Dedicated Basement Parking']
  },
  {
    id: 'prop-04',
    number: '04',
    title: 'High-Footfall Commercial Shop / Kiosk Slot',
    location: 'Ground Floor & Promenade, Larom Building',
    areaTag: 'Commercial Plaza',
    propertyType: 'Studio',
    price: 8500000,
    priceFormatted: '8 500 000 PKR',
    developer: "RJ's Developers & Insaat Developers",
    squareMeters: 30,
    bedrooms: 0,
    downPaymentPercent: 25,
    deliveryDate: '06.2027',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Prime ground-floor retail shop slot benefiting from 20 active commercial kiosks and continuous high foot traffic opposite IMARAT Downtown and Monal Restaurant.',
    locationDetails: 'Ground Floor, Plot 13, Bahria Lifestyle, Islamabad Expressway',
    floorPlanUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    layoutSpecs: {
      totalArea: '30m² (320 sqft)',
      level: 'Ground Floor Commercial',
      hall: false,
      diningRoom: false,
      kitchen: false,
      bedroomsCount: 0,
      bathroomsCount: 1
    },
    amenities: ['7 Retail Shops & 20 Commercial Kiosks', '24/7 Security & CCTV Surveillance', 'High-Speed Smart Elevators', 'Dedicated Basement Parking']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Yasin & Team',
    role: 'Lead Project Director - RJ\'s Developers',
    experience: '18+ years',
    focusAreas: ['Islamabad Expressway', 'Bahria Town', 'DHA'],
    bio: "Pioneering Pakistan's first branded residences on Islamabad Expressway with hotel-grade management standards.",
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'team-02',
    name: 'Insaat Developers',
    role: 'Master Construction Partner',
    experience: '20+ years',
    focusAreas: ['Structural Engineering', '60% Completed'],
    bio: 'Renowned construction partners actively executing basement, podium, and superstructure works for June 2027 handover.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  }
];

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'ins-01',
    title: 'Why Islamabad Serviced Apartments Lead Pakistan in Gross Yields',
    category: 'Residential',
    articleCountTag: '08 articles',
    date: 'Jan 2026',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ins-02',
    title: 'Pre-Completion Price Advantage: PKR 18,000–22,000/sqft vs Competitors',
    category: 'Commercial',
    articleCountTag: '04 articles',
    date: 'Feb 2026',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ins-03',
    title: 'Hands-off Hotel Management for Overseas Pakistani Investors',
    category: 'Residential',
    articleCountTag: '27 articles',
    date: 'Feb 2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    clientName: 'Tariq Mahmood',
    location: 'UK Overseas Investor',
    date: 'January 2026',
    quote: "RJ's Larom Residences is hands down the best investment opportunity on Islamabad Expressway. The hotel management hands-off model means I collect monthly rental yields directly from the UK.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'test-02',
    clientName: 'Dr. Sarah Khan',
    location: 'Islamabad Resident',
    date: 'December 2025',
    quote: 'The location opposite IMARAT Downtown and Monal is unmatched. 60% construction complete gives total peace of mind for handover by June 2027.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
];

export const PARTNERS = [
  { name: 'CDA APPROVED', logo: 'CDA APPROVED' },
  { name: 'BAHRIA APPROVED', logo: 'BAHRIA APPROVED' },
  { name: 'FBR REGISTERED', logo: 'FBR REGISTERED' },
  { name: 'INSAAT DEVELOPERS', logo: 'INSAAT DEVELOPERS' },
  { name: 'RJS DEVELOPERS', logo: "RJ'S DEVELOPERS" }
];
