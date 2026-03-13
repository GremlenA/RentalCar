'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import Container from '@/components/Container/Container';
import Loader from '@/components/ui/Loader/Loader';
import { Vehicle } from '@/store/useVehicleStore';
import s from './page.module.css';

export default function CarDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [car, setCar] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: null as Date | null,
    comment: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Ошибка загрузки данных автомобиля", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchCar();
  }, [id]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Rental request submitted successfully! We will contact you shortly.');
    setFormData({ name: '', email: '', date: null, comment: '' });
  };

  if (isLoading) return <Loader />;
  if (!car) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Car not found.</h2>;

  const addressParts = car.address.split(",");
  const city = addressParts[addressParts.length - 2]?.trim();
  const country = addressParts[addressParts.length - 1]?.trim();
  const formattedMileage = car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <main className={s.page}>
      <Container>
        <div className={s.grid}>
          
          <div className={s.leftCol}>
            <div className={s.imageWrapper}>
              <Image src={car.img} alt={`${car.brand} ${car.model}`} fill className={s.image} priority />
            </div>

            <div className={s.formCard}>
              <h3 className={s.formTitle}>Book your car now</h3>
              <p className={s.formSubtitle}>Stay connected! We are always ready to help you.</p>
              
              <form className={s.form} onSubmit={handleBooking}>
                <input 
                  type="text" 
                  placeholder="Name*" 
                  required 
                  className={s.input}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email*" 
                  required 
                  className={s.input}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                <div className={s.datePickerWrapper}>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date: Date | null) => setFormData({...formData, date})}
                    placeholderText="Booking date"
                    className={s.input}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3).toUpperCase()}
                  />
                </div>

                <textarea 
                  placeholder="Comment" 
                  className={s.textarea}
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                ></textarea>
                <button type="submit" className={s.submitBtn}>Send</button>
              </form>
            </div>
          </div>

          <div className={s.rightCol}>
            <div className={s.header}>
              <h1 className={s.title}>{car.brand} <span className={s.accent}>{car.model}</span>, {car.year} <span className={s.id}>Id: {car.id}</span></h1>
              <div className={s.locationWrapper}>
                <span className={s.locationItem}>
                  <Image src="/Location.svg" alt="Location" width={16} height={16} className={s.icon} />
                  {city}, {country}
                </span>
                <span className={s.locationItem}>Mileage: {formattedMileage} km</span>
              </div>
              <p className={s.price}>${car.rentalPrice}</p>
            </div>

            <p className={s.description}>{car.description}</p>

            <div>
              <h3 className={s.sectionTitle}>Rental Conditions:</h3>
              <ul className={s.list}>
                {car.rentalConditions.map((condition, i) => (
                  <li key={i} className={s.listItem}>
                    <Image src="/check-circle.svg" alt="Check" width={16} height={16} className={s.icon} /> {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={s.sectionTitle}>Car Specifications:</h3>
              <ul className={s.list}>
                <li className={s.listItem}>
                  <Image src="/calendar.svg" alt="Year" width={16} height={16} className={s.icon} /> Year: {car.year}
                </li>
                <li className={s.listItem}>
                  <Image src="/car.svg" alt="Type" width={16} height={16} className={s.icon} /> Type: {car.type}
                </li>
                <li className={s.listItem}>
                  <Image src="/Group.svg" alt="Fuel" width={16} height={16} className={s.icon} /> Fuel Consumption: {car.fuelConsumption}
                </li>
                <li className={s.listItem}>
                  <Image src="/gear.svg" alt="Engine" width={16} height={16} className={s.icon} /> Engine Size: {car.engineSize}
                </li>
              </ul>
            </div>

            <div>
              <h3 className={s.sectionTitle}>Accessories and functionalities:</h3>
              <ul className={s.list}>
                {[...car.accessories, ...car.functionalities].map((item, i) => (
                  <li key={i} className={s.listItem}>
                    <Image src="/check-circle.svg" alt="Check" width={16} height={16} className={s.icon} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}