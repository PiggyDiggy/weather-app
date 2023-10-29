import React, { useEffect, useLayoutEffect, useRef } from "react";

export const useScrollSync = (nodeRef: React.RefObject<HTMLElement>, goToSlide: (slide: number) => void) => {
  const goToSlideRef = useRef(goToSlide);

  useLayoutEffect(() => {
    goToSlideRef.current = goToSlide;
  }, [goToSlide]);

  useEffect(() => {
    const slider = nodeRef.current;
    if (!slider) return;

    const getMostVisibleSlideIndex = () => {
      const slides = slider.children;
      for (let i = slides.length - 1; i >= 0; i--) {
        const { left } = slides[i].getBoundingClientRect();
        if (left < window.innerWidth / 2) {
          return i;
        }
      }
      return -1;
    };

    const handleScroll = () => {
      const mostVisible = getMostVisibleSlideIndex();

      if (mostVisible !== -1) {
        goToSlideRef.current(mostVisible);
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);
};
