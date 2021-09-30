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

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments);
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(
      setState({
        ...state,
        appointments,
        days
      })
    )
  }

  function cancelInterview(id, interview) {
    
    const appointment = {  
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`, {interview})
      .then( () => {
        setState(prev => ({...prev, appointments, days}))

      }
    )
  }

  function updateSpots (state, appointments) {
    // 1) get day object' * use state.days.find
    const dayObj = state.days.find(d => d.name === state.day);
    let spots = 0;
    
    // 2) iterate through that days appointment id's
    for (const id of dayObj.appointments) {
      // 3) for each id get appointment object
      const appointment = appointments[id];
      console.log('appt:', appointment);
      // 4) if the intrview is null, increment counter
      if (!appointment.interview) {
        spots++;
      }
    } 
      // console.log("spots = ", spots);
      // 5) update new day with spots
      const newDay = {...dayObj, spots}
  
      // 6) return a new days array with that new day in it
      const newDays = state.days.map(d => d.name === state.day ? newDay : d)

      return newDays;
  }

  // const updateSpots = function (appointmentId) {
  //   let counter = 0
  //   const newDaysArray = state.days.map(day => {
  //     if (day.name === state.day) {
  //       if (state.appointments[appointmentId].interview === null) {
  //         const spots = day.spots - 1;
  //         return { ...day, spots };
  //       }
  //       const spots = day.spots + 1;
  //       return { ...day, spots };
  //     }
  //     return { ...day };
  //   })
  //   return newDaysArray;
  // };





  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}