"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Добавляем импорт Image
import css from "./Header.module.css";
import Container from "../Container/Container";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Container>
        <div className={css.inner}>
          
          {/* Наш новый SVG логотип */}
          <Link href="/" className={css.logo}>
            <Image 
              src="/logo.svg" 
              alt="RentalCar Logo" 
              width={104} // Ширина из вашего макета
              height={16} // Высота из вашего макета
              priority  // Говорит Next.js загрузить логотип в первую очередь
            />
          </Link>

          {/* Навигация остается без изменений */}
          <nav className={css.nav}>
            <Link
              href="/"
              className={`${css.link} ${pathname === "/" ? css.active : ""}`}
            >
              Home
            </Link>
            <Link
              href="/catalog"
              className={`${css.link} ${pathname === "/catalog" ? css.active : ""}`}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}