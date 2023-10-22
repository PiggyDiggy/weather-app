"use client";

import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { cx } from "@/utils";

import style from "./style.module.css";

type Props = {
  inProp: boolean;
  className?: string;
};

export const Glare: React.FC<Props> = ({ inProp, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={inProp}
      timeout={200}
      classNames={{ exitActive: style["glare-exit-active"] }}
      nodeRef={ref}
      unmountOnExit
    >
      <div ref={ref} className={cx(style.glare, className)}></div>
    </CSSTransition>
  );
};
