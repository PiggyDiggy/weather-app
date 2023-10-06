import React, { useContext, useState, useCallback, useRef, useEffect } from "react";

import type { Compound, FC } from "@/types";
import { cx } from "@/utils";

import style from "./style.module.css";

const SliderContext = React.createContext({
  currentSlide: 0,
  length: 0,
  increment: () => {},
  decrement: () => {},
  goToSlide: (_: number) => {},
});
const SliderRefContext = React.createContext<React.RefObject<HTMLUListElement>>({ current: null });

type SliderComposition = {
  Slides: FC<SlidesProps>;
  Slide: FC<SlideProps>;
  Button: FC<ButtonProps>;
  SlidesWrapper: FC;
  Navigation: FC;
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
  const prevDeltaX = useRef(0);

  const goToSlide = useCallback(
    (slide: number) => {
      if (isScrolling || slide === currentSlide) return;

      setCurrentSlide(slide);
      setIsScrolling(true);
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

  useEffect(() => {
    if (!slidesRef.current) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!Number.isInteger(e.deltaY)) {
        return e.deltaY > 0 ? goToNextSlide() : goToPrevSlide();
      }

      if (Math.abs(e.deltaX) > Math.abs(prevDeltaX.current)) {
        if (e.deltaX > 0) {
          goToNextSlide();
        } else if (e.deltaX < 0) {
          goToPrevSlide();
        }
      }
      prevDeltaX.current = e.deltaX;
    };

    slidesRef.current.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      slidesRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [goToNextSlide, goToPrevSlide]);

  useEffect(() => {
    if (!slidesRef.current) return;

    const parent = slidesRef.current;
    const slide = parent.children[currentSlide];

    const deltaX = slide.getBoundingClientRect().left - parent.getBoundingClientRect().left;
    parent.style.translate = `${-deltaX}px`;

    setTimeout(() => {
      setIsScrolling(false);
    }, SCROLL_TIME / 2);
  }, [currentSlide]);

  return (
    <SliderContext.Provider
      value={{ currentSlide, length, increment: goToNextSlide, decrement: goToPrevSlide, goToSlide }}
    >
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
    <div className={style.slider}>
      <ul className={cx(className, style.slides)} ref={ref}>
        {children}
      </ul>
    </div>
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

type ButtonProps = {
  type: "increment" | "decrement";
};

CustomSlider.Button = function Button({ children, type }) {
  const { length, currentSlide, increment, decrement } = useContext(SliderContext);

  if (type === "increment") {
    return (
      <div>
        <button disabled={currentSlide === length - 1} onClick={increment}>
          {children}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button disabled={currentSlide === 0} onClick={decrement}>
        {children}
      </button>
    </div>
  );
};

CustomSlider.SlidesWrapper = function SlidesWrapper({ children }) {
  return <div className={style["slides-wrapper"]}>{children}</div>;
};

CustomSlider.Navigation = function Navigation() {
  const { currentSlide, length, goToSlide } = useContext(SliderContext);

  return (
    <ul className={style.navigation}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <li
            className={cx(style.navigation__element, { [style.navigation__element_active]: index === currentSlide })}
            key={index}
            onClick={() => goToSlide(index)}
          ></li>
        ))}
    </ul>
  );
};
