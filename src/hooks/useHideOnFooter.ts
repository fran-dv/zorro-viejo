import { useFooterContext } from "@/context";
import { useEffect, useState } from "react";

export const useHideOnFooter = () => {
  const footerRef = useFooterContext();
  const [isFooterVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      {
        root: null,
        rootMargin: "-10px",
        threshold: 0,
      },
    );
    obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, [footerRef]);

  return { footerRef, isFooterVisible };
};
