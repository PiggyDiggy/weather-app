import type { Compound, FC } from "@/types";

import style from "./style.module.css";

type RowComposition = {
  Group: FC;
  GroupItem: FC;
};

export const WidgetRow: Compound<RowComposition> = ({ children }) => {
  return <div className={style["widget-row"]}>{children}</div>;
};

WidgetRow.Group = function Group({ children }) {
  return <ul className={style["content-group"]}>{children}</ul>;
};

WidgetRow.GroupItem = function GroupItem({ children }) {
  return <li className={style["content-group__item"]}>{children}</li>;
};
