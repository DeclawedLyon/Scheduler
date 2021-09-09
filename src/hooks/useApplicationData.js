import { React, useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((results) => {
      setState(prev => ({ ...prev, days: results[0].data, appointments: results[1].data, interviewers: results[2].data }));
    });
  }, []);

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const newState = {
        ...state,
        appointments
      }
      setState(prev => {
        return { ...prev, appointments}
      })
    })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const newState = {
        ...state,
        appointments,

      }
      setState(prev => {
        return { ...prev, appointments}
      })
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}