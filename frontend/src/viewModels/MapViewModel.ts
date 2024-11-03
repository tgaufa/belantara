// src/viewModels/MapViewModel.ts
import { BehaviorSubject, Observable } from 'rxjs';
import { Supplier, MapBounds } from '../domain/entities/types';
import { CsvSupplierRepository, ISupplierRepository } from '../repositories/SupplierRepository.ts';

export class MapViewModel {
  private suppliers = new BehaviorSubject<Supplier[]>([]);
  private selectedSupplier = new BehaviorSubject<Supplier | null>(null);
  private loading = new BehaviorSubject<boolean>(false);
  private repository: ISupplierRepository;

  constructor() {
    this.repository = new CsvSupplierRepository();
    this.loadInitialData();
  }

  private async loadInitialData() {
    const suppliers = await this.repository.getSuppliers();
    this.suppliers.next(suppliers);
  }

  get suppliers$(): Observable<Supplier[]> {
    return this.suppliers.asObservable();
  }

  get selectedSupplier$(): Observable<Supplier | null> {
    return this.selectedSupplier.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.loading.asObservable();
  }

  async loadSuppliersInBounds(bounds: MapBounds): Promise<void> {
    this.loading.next(true);
    try {
      const suppliers = await this.repository.getSuppliersInBounds(bounds);
      this.suppliers.next(suppliers);
    } catch (error) {
      console.error('Error loading suppliers:', error);
    } finally {
      this.loading.next(false);
    }
  }

  selectSupplier(supplier: Supplier | null): void {
    this.selectedSupplier.next(supplier);
  }
}