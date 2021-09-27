import { useState, useEffect } from "react";
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
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        console.log(`Inside the book interview, the id is: ${id} and the interview is: ${interview}`)
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
        console.log("new state is:", newState)
        const days = updateSpots(id)
        setState(prev => {
          return { ...prev, appointments, days }
        })
      })
      .catch((e) => {
        console.log("error:", e)
      })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(id)
        setState(prev => {
          return { ...prev, appointments, days }
        })
      })
  }

  const updateSpots = function (appointmentId) {

    const newDaysArray = state.days.map(day => {
      if (day.name === state.day) {
        if (state.appointments[appointmentId].interview === null) {
          const spots = day.spots - 1;
          return { ...day, spots };
        }
        const spots = day.spots + 1;
        return { ...day, spots };
      }
      return { ...day };
    })
    return newDaysArray;
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}