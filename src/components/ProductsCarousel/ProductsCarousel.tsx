import styles from "@/components/EmblaCarousel/EmblaCarousel.module.css";
import { Carousel } from "@/components";

interface Props {
  cards: React.ReactNode[];
}

export const ProductsCarousel = ({ cards }: Props) => {
  return (
    <Carousel
      className={styles.cardsCarousel}
      options={{
        align: "center",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
      }}
      buttonStyle="filled"
    >
      {cards}
    </Carousel>
  );
};
