"use client";

import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import style from "./style.module.css";

type Props = {
  inProp: boolean;
  onClick?: () => void;
};

export const Backdrop: React.FC<Props> = ({ inProp, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      classNames={{
        enter: style["backdrop_enter"],
        enterActive: style["backdrop_enter-active"],
        exit: style["backdrop_exit"],
        exitActive: style["backdrop_exit-active"],
      }}
      in={inProp}
      timeout={200}
      nodeRef={ref}
      unmountOnExit
      mountOnEnter
    >
      <div ref={ref} className={style.backdrop} onClick={onClick}></div>
    </CSSTransition>
  );
};
