const getAppointmentsForDay = function(state, day) {
  const dataArray = []
  for(const eachDay of state.days) {
      if (eachDay.name === day) {
          for(const appointment of eachDay.appointments) {
              dataArray.push(state.appointments[`${appointment}`])
          }
      }
  }
  return dataArray;
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