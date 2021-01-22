//---------------takes state and a day then returns an array containing the correct appointment objects---------------
export function getAppointmentsForDay(state, day) {
  const dayArray = state.days.filter((item) => item.name === day)[0];
  const appointmentsArray = [];
  for (const key in state.appointments) {
    if (
      dayArray &&
      dayArray.appointments.includes(state.appointments[key].id)
    ) {
      appointmentsArray.push(state.appointments[key]);
    }
  }
  return appointmentsArray;
}

//---------------takes state and a day then returns an array containing the correct interviewer objects---------------
export function getInterviewersForDay(state, day) {
  const dayArray = state.days.filter((item) => item.name === day)[0];
  const interviewersArray = [];
  for (const key in state.interviewers) {
    if (
      dayArray &&
      dayArray.interviewers.includes(state.interviewers[key].id)
    ) {
      interviewersArray.push(state.interviewers[key]);
    }
  }
  return interviewersArray;
}

//-----------takes state and interview object then returns an object with the interviewer data and student name---------------
export function getInterview(state, interview) {
  let interviewObj = null;
  for (const key in state.interviewers) {
    if (interview && state.interviewers[key].id === interview.interviewer) {
      interviewObj = { ...interview, interviewer: state.interviewers[key] };
    }
  }
  return interviewObj;
}
