import React, { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { CSSTransition } from "react-transition-group";

import { cx, formatLocationName } from "@/utils";
import { useStore } from "@/store/provider";
import type { Location } from "@/entities/location";
import { searchLocationsByName } from "@/api/client";

import style from "./style.module.css";

type Props = {
  suggest: string;
  isOpen: boolean;
};

export const LocationSelect: React.FC<Props> = observer(function LocationSelect({ suggest, isOpen }) {
  const store = useStore();
  const [options, setOptions] = useState([] as Location[]);
  const [selectedId, setSelectedId] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);
  const listHeight = useRef(0);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      const locationName = suggest
        .split(", ")
        .map((part) => part.trim())
        .join(",");
      if (!locationName) return;

      searchLocationsByName({ locationName })
        .then((response) => {
          setOptions(response);
        })
        .catch(() => {
          setOptions([]);
        });
    }, 250);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [suggest]);

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
    if (!listRef.current) return;

    const selectedElement = listRef.current.children[selectedId] as HTMLElement | undefined;
    selectedElement?.focus();
  }, [selectedId]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    listHeight.current = list.scrollHeight;
    grow();
  }, [options.length]);

  const changeLocation = (newLocation: Location) => {
    store.location = newLocation;
  };

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
        enter: style["location-options_enter"],
        enterActive: style["location-options_enter-active"],
        exit: style["location-options_exit"],
        exitActive: style["location-options_exit-active"],
      }}
      in={isOpen}
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
            onKeyDown={({ key }) => {
              if (key === "Enter") {
                changeLocation(option);
              }
            }}
            title={formatLocationName(option)}
          >
            {formatLocationName(option)}
          </li>
        ))}
      </ul>
    </CSSTransition>
  );
});
