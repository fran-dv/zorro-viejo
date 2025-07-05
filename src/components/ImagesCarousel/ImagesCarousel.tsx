import type { ReactNode } from "react";
import { Carousel } from "@/components";
import styles from "@components/EmblaCarousel/EmblaCarousel.module.css";

interface Props {
  images: ReactNode[];
}

export const ImagesCarousel = ({ images }: Props) => (
  <Carousel
    className={styles.imageCarousel}
    options={{
      align: "center",
      skipSnaps: false,
    }}
  >
    {images}
  </Carousel>
);
