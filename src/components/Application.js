import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/Index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  let dailyInterviewers = [];
  let dailyAppointments = [];

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state);
 
  const mappedAppointments = dailyAppointments.map(appointment => {
    // console.log("mapped appointments:",appointment);
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={`appointment-${appointment.id}`}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
      </section>
    </main>
  );
}
