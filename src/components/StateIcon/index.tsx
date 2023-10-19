import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "@/store/provider";
import { cx } from "@/utils";

import style from "./style.module.css";

type Props = {
  className?: string;
};

export const StateIcon: React.FC<Props> = observer(({ className }) => {
  const store = useStore();
  const { state } = store.locationInputStore.uiStore;

  return (
    <svg
      className={cx(className, {
        [style["icon_loading"]]: state === "loading",
        [style["icon_error"]]: state === "error",
      })}
      fill="none"
      viewBox="0 0 26 28"
      width={26}
      height={26}
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <defs>
        <linearGradient id="icon-gradient">
          <stop className={cx(style["icon-gradient"], style["icon-gradient__from"])} offset="0%" />
          <stop className={cx(style["icon-gradient"], style["icon-gradient__to"])} offset="100%" />
        </linearGradient>
      </defs>
      <path
        className={style["path-animate"]}
        d="M 13 2 C 15.731 2 18.202 3.088 19.992 4.852 C 21.783 6.616 22.889 9.05 22.889 11.739 C 22.889 12.279 22.839 12.819 22.741 13.355 C 22.469 14.877 21.831 16.372 20.971 17.794 C 18.608 21.708 14.747 24.791 13.099 26 C 11.371 24.885 7.428 21.767 5.028 17.794 C 4.168 16.372 3.53 14.877 3.258 13.355 C 3.163 12.819 3.111 12.279 3.111 11.739 C 3.111 9.05 4.217 6.616 6.008 4.852 C 7.798 3.088 10.269 2 13 2 Z"
      />
      <circle className={style["inner-circle"]} cx={13} cy={12} r={4} />
    </svg>
  );
});
