import { Suspense } from "react";

import { WeatherSliderSkeleton } from "@/components/WeatherSlider/skeleton";

import style from "./page.module.css";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <div className={style.page}>
      <section>
        <Suspense fallback={<WeatherSliderSkeleton />}>{children}</Suspense>
      </section>
    </div>
  );
}
