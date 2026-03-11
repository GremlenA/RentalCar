import Image from "next/image";
import Container from "@/components/Container/Container";
import Button from "@/components/ui/Button";
import css from "./page.module.css"; // Проверь это имя!

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <Image
          src="/hero-bg.jpg"
          alt="Rental car background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={css.bgImage}
        />
        <div className={css.overlay}></div>

        <Container className={css.contentContainer}>
          <div className={css.content}>
            <h1 className={css.title}>Find your perfect rental car</h1>
            <p className={css.subtitle}>
              Reliable and budget-friendly rentals for any journey
            </p>
            <Button href="/catalog" size="large">
              View Catalog
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}