"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Location } from "@/entities/location";
import { useStore } from "@/store/provider";
import { Slide } from "@/utils";

import { WeatherSlider } from "../WeatherSlider";

type Props =
  | {
      location: Location;
      slides: Slide[];
    }
  | { location?: null };

export const LocationPage: React.FC<Props> = observer(function LocationPage(props) {
  const { locationStore, locationInputStore } = useStore();

  useEffect(() => {
    if (!props.location) {
      locationStore.state = "error";
      return;
    }
    
    locationInputStore.domainStore.changeLocation(props.location);
  }, []);

  if (!props.location) {
    return <div>Location not found</div>;
  }

  if (props.slides.length === 0) {
    return <div>Weather for current location is not available</div>;
  }

  return <WeatherSlider slides={props.slides} />;
});
