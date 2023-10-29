"use client";

import React, { useContext, useState, useCallback, useRef } from "react";

import type { Compound, FC } from "@/types";
import { useScrollSync } from "@/hooks/useScrollSync";
import { cx } from "@/utils";

import style from "./style.module.css";

const CurrentSlideContext = React.createContext(0);
const SliderRefContext = React.createContext<React.RefObject<HTMLUListElement>>({ current: null });

type SliderComposition = {
  Slides: FC<SlidesProps>;
  Slide: FC<SlideProps>;
};

type SliderProps = {
  className?: string;
};

export const CustomSlider: Compound<SliderComposition, SliderProps> = ({ children, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef<HTMLUListElement>(null);

  const goToSlide = useCallback(
    (slide: number) => {
      if (slide === currentSlide) return;

      setCurrentSlide(slide);
    },
    [currentSlide]
  );

  useScrollSync(slidesRef, goToSlide);

  return (
    <CurrentSlideContext.Provider value={currentSlide}>
      <SliderRefContext.Provider value={slidesRef}>
        <div className={cx(className, style.container)}>{children}</div>
      </SliderRefContext.Provider>
    </CurrentSlideContext.Provider>
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
  const currentSlide = useContext(CurrentSlideContext);
  const ref = useContext(SliderRefContext);

  const scrollToCurrent = () => {
    if (!ref.current) return;

    ref.current.children[index].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <li onClick={scrollToCurrent} className={cx(classname, style.slide)}>
      {renderSlide({ isActive: index === currentSlide })}
    </li>
  );
};
