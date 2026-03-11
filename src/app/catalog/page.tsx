'use client';

import { useEffect } from 'react';
import { useVehicleStore } from '@/store/useVehicleStore';
import Container from '@/components/Container/Container';
import CarCard from '@/components/CarCard/CarCard';
import Filters from '../../components/catalog/Filters'; 
import Loader from '@/components/ui/Loader/Loader'; // <-- Додали імпорт Лоадера
import s from './page.module.css';

// Используем обычную функцию вместо стрелочной для default export
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

        {/* Проверка на массив, чтобы избежать ошибок рендера */}
        {Array.isArray(vehicles) && vehicles.length > 0 ? (
          <ul className={s.list}>
            {vehicles.map((car) => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>
        ) : (
          /* Показуємо повідомлення тільки якщо не йде завантаження */
          !isLoading && <p className={s.empty}>No cars found matching your criteria.</p>
        )}

        {/* Відображаємо крутий спінер замість тексту */}
        {isLoading && <Loader />}

        {/* Кнопка з'являється тільки якщо є ще сторінки і зараз НЕ йде завантаження */}
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