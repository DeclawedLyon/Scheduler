import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment/Index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


import "components/Application.scss";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm"
//   },
//   {
//     id: 5,
//     time: "5pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Not sure",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  let dailyInterviewers = [];
  let dailyAppointments = [];

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = param => setState(prev => ({ ...prev, param }));
  // const setAppointments = param => setState(prev => ({ ...prev, param }))
  // const setInterviewers = param => setState(prev => ({ ...prev, param }))
  
  console.log("state before:", state)
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((results) => {
      console.log(results);
      // setDays(results[0].data);
      setState(prev => ({...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data }));
      console.log("state after: ",state);
      // setAppointments(results[1].data);
      // setInterviewers(results[2].data);
    });
  }, []);
  // console.log("state",state);
  // console.log("days",state.days)
  // console.log("appointments",state.appointments)
  // console.log("interviewers:",state.interviewers)
  
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state);
  // console.log("test", dailyAppointments);

  const mappedAppointments = dailyAppointments.map(appointment => {
    // console.log("mapped appointments:",appointment);
    const interview = getInterview(state, appointment.interview)
    return <Appointment 
      key={`appointment-${appointment.id}`}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewers={dailyInterviewers}
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
