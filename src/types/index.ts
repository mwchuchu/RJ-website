export interface Amenity {
  id: string;
  name: string;
  icon: string;
  image?: string;
  desc?: string;
}

export interface Property {
  id: string;
  number: string;
  title: string;
  location: string;
  areaTag: string; // e.g. "Islamabad Expressway", "Commercial Plaza"
  propertyType: 'Apartment' | 'Villa' | 'Penthouse' | 'Studio' | 'Townhouse';
  price: number; // in PKR
  priceFormatted: string;
  developer: string;
  squareMeters: number;
  bedrooms: number;
  downPaymentPercent: number;
  deliveryDate: string;
  heroImage: string;
  exteriorGallery: string[];
  interiorGallery: string[];
  description: string;
  locationDetails: string;
  floorPlanUrl: string;
  layoutSpecs: {
    totalArea: string;
    level: string;
    hall: boolean;
    diningRoom: boolean;
    kitchen: boolean;
    bedroomsCount: number;
    bathroomsCount: number;
  };
  amenities: string[]; // list of amenity names included
}

export interface FilterState {
  priceRange: string;
  location: string;
  propertyType: string;
  rooms: string;
  developer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  focusAreas: string[];
  bio: string;
  image: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Retail' | 'Interior Design' | 'Residential' | 'Commercial';
  articleCountTag?: string;
  date: string;
  image: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  date: string;
  quote: string;
  avatar: string;
}
