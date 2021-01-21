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

export function getInterview(state, interview) {
  let interviewObj = null;
  for (const key in state.interviewers) {
    if (interview && state.interviewers[key].id === interview.interviewer) {
      interviewObj = { ...interview, interviewer: state.interviewers[key] };
    }
  }
  return interviewObj;
}
