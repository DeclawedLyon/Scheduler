import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayObject = props.days.map((dayElement) => {
    return (
      <DayListItem 
      key={dayElement.id}
      name={dayElement.name} 
      spots={dayElement.spots} 
      selected={dayElement.name === props.day}
      setDay={props.setDay}  />
    )
  })
  return (
    <ul>
      {dayObject}
    </ul>
  )
}


