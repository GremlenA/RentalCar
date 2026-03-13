'use client';

import Image from "next/image";
import { useVehicleStore, Vehicle } from "@/store/useVehicleStore"; 
import Button from "@/components/ui/Button";
import s from "./CarCard.module.css";

interface CarCardProps {
  car: Vehicle; 
}

export default function CarCard({ car }: CarCardProps) {
  const { toggleFavorite, favorites } = useVehicleStore();
  const isFavorite = favorites.includes(car.id);

 
  const formatMileage = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const addressParts = car.address.split(",");
  const city = addressParts[addressParts.length - 2]?.trim();
  const country = addressParts[addressParts.length - 1]?.trim();

  return (
    <div className={s.card}>
      <button 
        type="button"
        className={`${s.favoriteBtn} ${isFavorite ? s.active : ""}`} 
        onClick={() => toggleFavorite(car.id)}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path 
            d="M15.63 3.457a4.125 4.125 0 0 0-5.835 0L9 4.252l-.795-.795a4.126 4.126 0 0 0-5.835 5.835l.795.795L9 15.922l5.835-5.835.795-.795a4.125 4.125 0 0 0 0-5.835Z" 
            stroke={isFavorite ? "#3470ff" : "white"} 
            fill={isFavorite ? "#3470ff" : "none"}
            strokeWidth="1.5" 
          />
        </svg>
      </button>

      <div className={s.imageWrapper}>
        <Image 
          src={car.img} 
          alt={`${car.brand} ${car.model}`} 
          fill 
          sizes="(max-width: 768px) 100vw, 274px"
          className={s.image} 
          priority={false}
        />
      </div>

      <div className={s.info}>
        <div className={s.header}>
          <h3 className={s.title}>
            {car.brand} <span className={s.accent}>{car.model}</span>, {car.year}
          </h3>
          <p className={s.price}>${car.rentalPrice}</p>
        </div>

       
        <div className={s.details}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
          <span>{car.type}</span>
          <span>{formatMileage(car.mileage)} km</span>
        </div>
      </div>


      <Button href={`/catalog/${car.id}`} style={{ width: '100%', marginTop: 'auto' }}>
        Read more
      </Button>
    </div>
  );
}