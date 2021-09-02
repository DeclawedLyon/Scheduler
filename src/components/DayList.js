import React from "react";
import classnames from "classnames";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayObject = props.days.map((dayElement) => {
    if(dayElement.name === props.day) {
      return (
        <DayListItem 
        name={dayElement.name} 
        spots={dayElement.spots} 
        selected={dayElement.name === props.day}
        setDay={props.setDay}  />
      )
    }
  })
  return (
    <ul>
      {dayObject}
    </ul>
  )
}


