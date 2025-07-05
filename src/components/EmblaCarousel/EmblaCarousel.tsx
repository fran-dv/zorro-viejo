import React, { type ReactNode, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import styles from "./EmblaCarousel.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Generic Carousel component
interface CarouselProps {
  children: ReactNode[];
  options?: EmblaOptionsType;
  className?: string;
  buttonStyle?: "none" | "filled";
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  options,
  className = "",
  buttonStyle = "none",
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback((embla: EmblaCarouselType) => {
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", () => onSelect(emblaApi));
    emblaApi.on("reInit", () => onSelect(emblaApi));
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const onResize = () => {
      if (emblaApi) emblaApi.reInit();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [emblaApi]);

  return (
    <div className={`${styles.embla} ${className}`} ref={emblaRef}>
      <div className={styles.embla__container}>
        {children.map((child, index) => (
          <div className={styles.embla__slide} key={index}>
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={scrollPrev}
        className={`${styles.embla__buttonPrev} ${canScrollPrev ? "" : styles.disabled} ${buttonStyle === "filled" ? styles.filled : ""}`}
      >
        <ChevronLeft className={styles.chevron} />
      </button>
      <button
        onClick={scrollNext}
        className={`${styles.embla__buttonNext} ${canScrollNext ? "" : styles.disabled} ${buttonStyle === "filled" ? styles.filled : ""}`}
      >
        <ChevronRight className={styles.chevron} />
      </button>
    </div>
  );
};
