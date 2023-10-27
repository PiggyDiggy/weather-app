const DISTANCE = 25;
const TIME_TO_SWIPE = 200;

export type SwipeDirection = "left" | "right" | "down" | "up";

export class TouchGestures {
  private target: HTMLElement;
  private startTimeStamp = 0;
  private startPoint = { x: 0, y: 0 };
  private listeners: Map<keyof HTMLElementEventMap, EventListener>;

  constructor(targetNode: HTMLElement) {
    this.target = targetNode;
    this.listeners = new Map([
      ["touchstart", this.handleTouchStart as EventListener],
      ["touchend", this.handleTouchEnd as EventListener],
    ]);
    this.initListeners();
  }

  private initListeners() {
    this.listeners.forEach((listener, type) => {
      this.target.addEventListener(type, listener);
    });
  }

  removeListeners() {
    this.listeners.forEach((listener, type) => {
      this.target.removeEventListener(type, listener);
    });
  }

  private dispatchEvent(direction: SwipeDirection) {
    const event = new CustomEvent("custom:swipe", { detail: { direction } });
    this.target.dispatchEvent(event);
  }

  private handleTouchStart = (e: TouchEvent) => {
    this.startPoint.x = e.touches[0].clientX;
    this.startPoint.y = e.touches[0].clientY;
    this.startTimeStamp = e.timeStamp;
  };

  private handleTouchEnd = (e: TouchEvent) => {
    const { clientX: x, clientY: y } = e.changedTouches[0];
    const xDist = x - this.startPoint.x;
    const yDist = y - this.startPoint.y;

    if (Math.abs(xDist) > Math.abs(yDist)) {
      this.compareAndDispatch(e.timeStamp, xDist, "right", "left");
    } else {
      this.compareAndDispatch(e.timeStamp, yDist, "down", "up");
    }
  };

  private compareAndDispatch(timestamp: number, dist: number, forth: SwipeDirection, back: SwipeDirection) {
    if (timestamp - this.startTimeStamp > 500 || Math.abs(dist) < DISTANCE) return;

    this.dispatchEvent(dist > 0 ? forth : back);
  }
}
