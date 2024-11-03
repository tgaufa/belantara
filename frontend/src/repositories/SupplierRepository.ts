// frontend/src/repositories/SupplierRepository.ts

import { Supplier, Product, MapBounds } from '../domain/entities/types';
import Papa, { ParseResult, ParseConfig } from 'papaparse';

export interface ISupplierRepository {
  getSuppliers(): Promise<Supplier[]>;
  getSuppliersInBounds(bounds: MapBounds): Promise<Supplier[]>;
  getSupplierById(id: string): Promise<Supplier | null>;
}

interface RawSupplierCSV {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    phone_number: string;
}
  
interface RawProductCSV {
    id: string;
    supplier_id: string;
    name: string;
    tonnage: string;
    availability_start: string;
    availability_end: string;
}


  
// Development CSV Repository
export class CsvSupplierRepository implements ISupplierRepository {
    private suppliersCache: Supplier[] | null = null;

  private async parseCSVFile<T>(filePath: string): Promise<T[]> {
    try {
      const response = await fetch(filePath);
      const csvText = await response.text();
      
      return new Promise<T[]>((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<T>) => {
            resolve(results.data);
          },
          error: (error: Error, file?: string) => {
            reject(error);
          }
        } as ParseConfig<T>);
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
      throw new Error('Failed to parse CSV data');
    }
  }
  
    private async loadAndCombineData(): Promise<Supplier[]> {
      try {
        // If we have cached data, return it
        if (this.suppliersCache) {
          return this.suppliersCache;
        }
  
        // Load both CSV files
        const [suppliersRaw, productsRaw] = await Promise.all([
          this.parseCSVFile<RawSupplierCSV>('../domain/mock/products.csv'),
          this.parseCSVFile<RawProductCSV>('../domain/mock/suppliers.csv')
        ]);
  
        // Process and combine the data
        const suppliers: Supplier[] = suppliersRaw.map(rawSupplier => {
          // Find all products for this supplier
          const supplierProducts: Product[] = productsRaw
            .filter(product => product.supplier_id === rawSupplier.id)
            .map(rawProduct => ({
              id: rawProduct.id,
              name: rawProduct.name,
              tonnage: parseInt(rawProduct.tonnage),
              availability_start: rawProduct.availability_start,
              availability_end: rawProduct.availability_end
            }));
  
          // Create the complete supplier object
          return {
            id: rawSupplier.id,
            name: rawSupplier.name,
            location: {
              lat: parseFloat(rawSupplier.latitude),
              lng: parseFloat(rawSupplier.longitude)
            },
            phone_number: rawSupplier.phone_number,
            products: supplierProducts
          };
        });
  
        // Cache the results
        this.suppliersCache = suppliers;
        return suppliers;
      } catch (error) {
        console.error('Error loading data:', error);
        throw new Error('Failed to load supplier data');
      }
    }
  
    async getSuppliers(): Promise<Supplier[]> {
      return this.loadAndCombineData();
    }
  
    async getSuppliersInBounds(bounds: MapBounds): Promise<Supplier[]> {
      const suppliers = await this.loadAndCombineData();
      
      return suppliers.filter(supplier => 
        supplier.location.lat >= bounds.south &&
        supplier.location.lat <= bounds.north &&
        supplier.location.lng >= bounds.west &&
        supplier.location.lng <= bounds.east
      );
    }
  
    async getSupplierById(id: string): Promise<Supplier | null> {
      const suppliers = await this.loadAndCombineData();
      return suppliers.find(s => s.id === id) || null;
    }
  
    // Helper method to clear the cache if needed
    clearCache(): void {
      this.suppliersCache = null;
    }
}

// API Repository (will be used when backend is ready)
export class ApiSupplierRepository implements ISupplierRepository {
  private baseUrl = '/api/suppliers'; // Will point to backend API

  async getSuppliers(): Promise<Supplier[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error('Failed to fetch suppliers');
    return response.json();
  }

  async getSuppliersInBounds(bounds: MapBounds): Promise<Supplier[]> {
    const params = new URLSearchParams({
      north: bounds.north.toString(),
      south: bounds.south.toString(),
      east: bounds.east.toString(),
      west: bounds.west.toString()
    });
    const response = await fetch(`${this.baseUrl}/bounds?${params}`);
    if (!response.ok) throw new Error('Failed to fetch suppliers in bounds');
    return response.json();
  }

  async getSupplierById(id: string): Promise<Supplier | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch supplier');
    }
    return response.json();
  }
}