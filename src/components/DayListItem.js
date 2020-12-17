import React from "react";

import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = (props)=> {
    let spot = props.spots;
    
    if (spot === 0) {
      return "no spots remaining"
    }; 
    if (spot === 1) {
      return "1 spot remaining"
    };
    if (spot > 1) {
      return `${spot} spots remaining`
    };
  };
  let availableSpot = formatSpots(props);

  let noSpot = false;
  
    if(props.spots === 0) {
      noSpot = true;
    }

  let buttonClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": noSpot
  });

  return (
    <li onClick={()=> props.setDay(props.name)} className={buttonClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{availableSpot}</h3>
    </li>
  );
};