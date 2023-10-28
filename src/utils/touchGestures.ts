const DISTANCE = 25;
const TIME_TO_SWIPE = 200;

export type SwipeDirection = "left" | "right" | "down" | "up";

export class TouchGestures {
  private target: HTMLElement;
  private startTimeStamp = 0;
  private initialTranslateX = 0;
  private previousDistanceX = 0;
  private isAnimating = false;
  private startPoint = { x: 0, y: 0 };
  private listeners: { [T in keyof HTMLElementEventMap]?: (e: HTMLElementEventMap[T]) => void };

  constructor(targetNode: HTMLElement) {
    this.target = targetNode;
    this.listeners = {
      touchstart: this.handleTouchStart,
      touchmove: this.handleTouchMove,
      touchend: this.handleTouchEnd,
      transitionstart: this.handleTransitionStart,
      transitionend: this.handleTransitionEnd,
    };
    this.initListeners();
  }

  private get listenersEntries() {
    return Object.entries(this.listeners) as [keyof HTMLElementEventMap, EventListener][];
  }

  private initListeners() {
    this.listenersEntries.forEach(([type, listener]) => {
      this.target.addEventListener(type, listener);
    });
  }

  removeListeners() {
    this.listenersEntries.forEach(([type, listener]) => {
      this.target.removeEventListener(type, listener);
    });
  }

  private dispatchEvent(direction: SwipeDirection) {
    const event = new CustomEvent("custom:swipe", { detail: { direction } });
    this.target.dispatchEvent(event);
  }

  private handleTransitionStart = (e: TransitionEvent) => {
    if (e.propertyName === "translate") {
      this.isAnimating = true;
    }
  };

  private handleTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName === "translate") {
      this.isAnimating = false;
      this.initialTranslateX = parseInt(this.target.style.translate);
    }
  };

  private handleTouchStart = (e: TouchEvent) => {
    this.startPoint.x = e.touches[0].clientX;
    this.startPoint.y = e.touches[0].clientY;
    this.startTimeStamp = e.timeStamp;
    this.previousDistanceX = 0;
  };

  private handleTouchMove = (e: TouchEvent) => {
    const { x } = this.getDistance(e);
    if (!this.isAnimating) {
      this.target.style.transitionDuration = "0s";
      this.target.style.translate = `${parseInt(this.target.style.translate) + x - this.previousDistanceX}px`;
    }

    this.previousDistanceX = x;
  };

  private handleTouchEnd = (e: TouchEvent) => {
    const { x, y } = this.getDistance(e);

    if (Math.abs(x) > Math.abs(y)) {
      this.compareAndDispatch(e.timeStamp, x, "right", "left");
    } else {
      this.compareAndDispatch(e.timeStamp, y, "down", "up");
    }
  };

  private getDistance(e: TouchEvent) {
    const { clientX: x, clientY: y } = e.changedTouches[0];
    return { x: x - this.startPoint.x, y: y - this.startPoint.y };
  }

  private compareAndDispatch(timestamp: number, dist: number, forth: SwipeDirection, back: SwipeDirection) {
    const deltaTime = timestamp - this.startTimeStamp;
    if (deltaTime > 500 || Math.abs(dist) < DISTANCE) {
      this.target.style.transitionDuration = "";
      this.target.style.translate = `${this.initialTranslateX}px`;
      return;
    }

    this.target.style.transitionDuration = `${deltaTime}ms`;
    this.dispatchEvent(dist > 0 ? forth : back);
  }
}
