'use client';

import { useEffect, useState } from 'react';
import { useVehicleStore } from '@/store/useVehicleStore';
import s from './Filters.module.css';

export default function Filters() {
  const { brands, fetchBrands, fetchVehicles } = useVehicleStore();
  
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  // Состояния для открытия/закрытия списков
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // Список цен для селектора
  const prices = [30, 40, 50, 60, 70, 80, 90, 100, 120, 150];

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSearch = () => {
    fetchVehicles({ 
      brand: selectedBrand || undefined, 
      rentalPrice: selectedPrice || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined
    }, true);
  };

  return (
    <div className={s.container}>
      {/* 1. Блок бренда */}
      <div className={s.field}>
        <label className={s.label}>Car brand</label>
        <div className={s.dropdownWrapper} style={{ width: '224px' }}>
          <div 
            className={`${s.control} ${isBrandOpen ? s.controlActive : ''}`}
            onClick={() => setIsBrandOpen(!isBrandOpen)}
          >
            <span className={s.currentValue}>{selectedBrand || "Choose a brand"}</span>
            <span className={`${s.chevron} ${isBrandOpen ? s.chevronUp : ''}`}></span>
          </div>
          
          {isBrandOpen && (
            <ul className={s.menu}>
              {brands.map((brand) => (
                <li 
                  key={brand} 
                  className={`${s.option} ${selectedBrand === brand ? s.optionActive : ''}`}
                  onClick={() => { setSelectedBrand(brand); setIsBrandOpen(false); }}
                >
                  {brand}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 2. Блок цены (Ширина точно по макету Figma - 196px) */}
      <div className={s.field}>
        <label className={s.label}>Price/ 1 hour</label>
        <div className={s.dropdownWrapper} style={{ width: '196px' }}>
          <div 
            className={`${s.control} ${isPriceOpen ? s.controlActive : ''}`}
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <span className={s.currentValue}>
              {selectedPrice ? `To ${selectedPrice}$` : "Choose a price"}
            </span>
            <span className={`${s.chevron} ${isPriceOpen ? s.chevronUp : ''}`}></span>
          </div>

          {isPriceOpen && (
            <ul className={s.menu}>
              {prices.map((p) => (
                <li 
                  key={p} 
                  className={`${s.option} ${selectedPrice === p.toString() ? s.optionActive : ''}`}
                  onClick={() => { setSelectedPrice(p.toString()); setIsPriceOpen(false); }}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 3. Блок пробега */}
      <div className={s.field}>
        <label className={s.label}>Car mileage / km</label>
        <div className={s.mileageGroup}>
          <div className={s.inputWrapper}>
            <span className={s.prefix}>From</span>
            <input 
              type="number" 
              className={s.inputLeft} 
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
            />
          </div>
          <div className={s.inputWrapper}>
            <span className={s.prefix}>To</span>
            <input 
              type="number" 
              className={s.inputRight} 
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button className={s.searchBtn} onClick={handleSearch}>Search</button>
    </div>
  );
}