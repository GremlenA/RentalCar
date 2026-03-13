'use client';

import { useEffect } from 'react';
import { useVehicleStore } from '@/store/useVehicleStore';
import Container from '@/components/Container/Container';
import CarCard from '@/components/CarCard/CarCard';
import Filters from '../../components/catalog/Filters'; 
import Loader from '@/components/ui/Loader/Loader'; 
import s from './page.module.css';


export default function CatalogPage() {
  const { vehicles, isLoading, hasMore, fetchVehicles, filters } = useVehicleStore();

  useEffect(() => {
    fetchVehicles({}, true);
  }, [fetchVehicles]);

  const handleLoadMore = () => {
    fetchVehicles(filters, false);
  };

  return (
    <main className={s.page}>
      <Container>
        <section className={s.filtersSection}>
          <Filters />
        </section>

 
        {Array.isArray(vehicles) && vehicles.length > 0 ? (
          <ul className={s.list}>
            {vehicles.map((car) => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        ) : (
          
          !isLoading && <p className={s.empty}>No cars found matching your criteria.</p>
        )}

       
        {isLoading && <Loader />}

       
        {hasMore && !isLoading && (
          <button 
            type="button" 
            className={s.loadMore} 
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </Container>
    </main>
  );
}