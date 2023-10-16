import React, { useState, useEffect, useRef, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { cx, formatLocationName } from "@/utils";
import { useStore } from "@/store/provider";
import type { Location } from "@/entities/location";

import { useLocationInputStore } from "../LocationInput/store/provider";

import style from "./style.module.css";

export const LocationSelect = observer(function LocationSelect() {
  const store = useStore();
  const { options, focused, setFocused } = useLocationInputStore();
  const [selectedId, setSelectedId] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);
  const listHeight = useRef(0);

  const changeLocation = useCallback(
    (newLocation: Location) => {
      store.location = newLocation;
      setFocused(false);
    },
    [store]
  );

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowDown") {
        setSelectedId((currentId) => (currentId < options.length - 1 ? currentId + 1 : 0));
      } else if (key === "ArrowUp") {
        setSelectedId((currentId) => (currentId === 0 ? options.length - 1 : currentId - 1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options.length]);

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Enter" && options.length > 0) {
        changeLocation(options[selectedId]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options, selectedId, changeLocation]);

  useEffect(() => {
    if (!listRef.current) return;

    const selectedElement = listRef.current.children[selectedId] as HTMLElement | undefined;
    selectedElement?.focus();
  }, [selectedId]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (options.length === 0) {
      listHeight.current = 0;
    } else {
      const lastOptionElementRect = list.children[options.length - 1].getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      listHeight.current = lastOptionElementRect.top - listRect.top + lastOptionElementRect.height;
    }

    grow();
  }, [options.length]);

  const shrink = () => {
    const list = listRef.current;
    if (!list) return;

    listHeight.current = list.scrollHeight;
    list.style.height = "0";
  };

  const grow = () => {
    if (!listRef.current) return;

    listRef.current.style.height = `${listHeight.current}px`;
  };

  return (
    <CSSTransition
      classNames={{
        enterActive: style["location-options_transition"],
        exitActive: style["location-options_transition"],
      }}
      in={focused}
      timeout={200}
      nodeRef={listRef}
      onEnter={shrink}
      onEntering={grow}
      onExit={grow}
      onExiting={shrink}
      mountOnEnter
      unmountOnExit
    >
      <ul ref={listRef} role="listbox" className={style["location-options-list"]}>
        {options.map((option, i) => (
          <li
            key={option.id}
            tabIndex={0}
            role="option"
            aria-selected={i === selectedId}
            className={cx(style["location-option"], { [style["location-option_selected"]]: i === selectedId })}
            onClick={() => changeLocation(option)}
            onFocus={() => setSelectedId(i)}
            title={formatLocationName(option)}
          >
            {formatLocationName(option)}
          </li>
        ))}
      </ul>
    </CSSTransition>
  );
});
