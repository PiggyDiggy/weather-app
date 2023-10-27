import React, { useEffect, useLayoutEffect, useRef } from "react";

import { TouchGestures, SwipeDirection } from "@/utils/touchGestures";

export const useCustomScroll = (nodeRef: React.RefObject<HTMLElement>, goToPrevious: () => void, goToNext: () => void) => {
  const goToNextRef = useRef(goToNext);
  const goToPreviousRef = useRef(goToPrevious);

  useLayoutEffect(() => {
    goToNextRef.current = goToNext;
    goToPreviousRef.current = goToPrevious;
  }, [goToPrevious, goToNext]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;

    const touchGestures = new TouchGestures(element);

    const handleSwipe = ({ detail }: CustomEvent<{ direction: SwipeDirection }>) => {
      if (detail.direction === "right") {
        goToPreviousRef.current();
      } else if (detail.direction === "left") {
        goToNextRef.current();
      }
    };

    element.addEventListener("custom:swipe", handleSwipe as EventListener);

    return () => {
      element.removeEventListener("custom:swipe", handleSwipe as EventListener);
      touchGestures.removeListeners();
    };
  }, [nodeRef.current]);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;

    let prevDeltaX = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!Number.isInteger(e.deltaY)) {
        return e.deltaY > 0 ? goToNextRef.current() : goToPreviousRef.current();
      }

      if (Math.abs(e.deltaX) > Math.abs(prevDeltaX)) {
        if (e.deltaX > 0) {
          goToNextRef.current();
        } else if (e.deltaX < 0) {
          goToPreviousRef.current();
        }
      }
      prevDeltaX = e.deltaX;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [nodeRef.current]);
};
