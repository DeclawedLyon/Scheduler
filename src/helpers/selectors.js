const getAppointmentsForDay = function(state, day) {
  let filteredDate = state.days.filter(element => element.name === day);
  const foundDate = filteredDate[0];

  if(!foundDate) return [];

  let filteredAppointments = foundDate.appointments.map(appointment => state.appointments[appointment])
  
  return filteredAppointments;
}

const getInterview = function(state, interview){  
  if(interview) {
      const interviewObject = {...interview}
      interviewObject.interviewer = state.interviewers[`${interview.interviewer}`]
      return interviewObject
  }
  return null
}

const getInterviewersForDay = function(state) {
  const dataArray = []
  for (const interviewer in state.interviewers) {
      dataArray.push(state.interviewers[interviewer])
  }
  return dataArray
}

export { 
  getAppointmentsForDay, 
  getInterview,
  getInterviewersForDay
}