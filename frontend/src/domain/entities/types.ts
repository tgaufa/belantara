// src/domain/entities/types.ts
export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    tonnage: number;
    availability_start: string;
    availability_end: string;
  }
  
  export interface Supplier {
    id: string;
    name: string;
    location: Location;
    phone_number: string;
    products: Product[];
  }
  
  export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
  }