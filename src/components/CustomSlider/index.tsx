"use client";

import React, { useContext, useState, useCallback, useRef, useEffect } from "react";

import type { Compound, FC } from "@/types";
import { useCustomScroll } from "@/hooks/useCustomScroll";
import { cx } from "@/utils";

import style from "./style.module.css";

const SliderContext = React.createContext({
  currentSlide: 0,
  goToSlide: (_: number) => {},
});
const SliderRefContext = React.createContext<React.RefObject<HTMLUListElement>>({ current: null });

type SliderComposition = {
  Slides: FC<SlidesProps>;
  Slide: FC<SlideProps>;
};

type SliderProps = {
  length: number;
  className?: string;
};

const SCROLL_TIME = 700;

export const CustomSlider: Compound<SliderComposition, SliderProps> = ({ children, length, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const slidesRef = useRef<HTMLUListElement>(null);

  const goToSlide = useCallback(
    (slide: number) => {
      if (isScrolling || slide === currentSlide) return;

      setCurrentSlide(slide);
      setIsScrolling(true);

      setTimeout(() => {
        setIsScrolling(false);
      }, SCROLL_TIME / 2);
    },
    [isScrolling, currentSlide]
  );

  const goToPrevSlide = useCallback(() => {
    if (currentSlide === 0) return;

    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const goToNextSlide = useCallback(() => {
    if (currentSlide === length - 1) return;

    goToSlide(currentSlide + 1);
  }, [currentSlide, length, goToSlide]);

  const scrollToCurrentSlide = useCallback(() => {
    const parent = slidesRef.current;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const slideRect = parent.children[currentSlide].getBoundingClientRect();

    const deltaX = slideRect.left - parentRect.left;

    let offset = parentRect.width / 2 - slideRect.width / 2;
    if (currentSlide === 0) {
      offset = 0;
    } else if (currentSlide === length - 1) {
      offset = parentRect.width - slideRect.width;
    }

    parent.style.translate = `${-deltaX + offset}px`;
  }, [currentSlide, length]);

  useEffect(() => {
    if (!slidesRef.current) return;

    const observer = new ResizeObserver(() => {
      scrollToCurrentSlide();
    });
    observer.observe(slidesRef.current);

    return () => {
      observer.disconnect();
    };
  }, [scrollToCurrentSlide]);
  
  useCustomScroll(slidesRef, goToPrevSlide, goToNextSlide);

  return (
    <SliderContext.Provider value={{ currentSlide, goToSlide }}>
      <SliderRefContext.Provider value={slidesRef}>
        <div className={cx(className, style.container)}>{children}</div>
      </SliderRefContext.Provider>
    </SliderContext.Provider>
  );
};

type SlidesProps = {
  className?: string;
};

CustomSlider.Slides = function Slides({ children, className }) {
  const ref = useContext(SliderRefContext);

  return (
    <ul className={cx(className, style.slides)} ref={ref}>
      {children}
    </ul>
  );
};

type SlideProps = {
  renderSlide: React.FC<{ isActive: boolean }>;
  index: number;
  classname?: string;
};

CustomSlider.Slide = function Slide({ renderSlide, index, classname }) {
  const { currentSlide, goToSlide } = useContext(SliderContext);

  return (
    <li onClick={() => goToSlide(index)} className={cx(classname, style.slide)}>
      {renderSlide({ isActive: index === currentSlide })}
    </li>
  );
};
