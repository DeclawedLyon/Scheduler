import React from "react";
import classnames from "classnames";

import 'components/DayListItem.scss'

export default function DayListItem(props) {
  const listItemClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = function(numOfSpots) {
    if (numOfSpots === 0) {
      return `no spots remaining`
    }
    if (numOfSpots === 1) {
      return `${numOfSpots} spot remaining`
    }
    return `${numOfSpots} spots remaining`;
  }

  const formattedSpot = formatSpots(props.spots);

  return (
    <li className={listItemClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2>{props.name}</h2>
      <h3>{formattedSpot}</h3>
    </li>
  );
}