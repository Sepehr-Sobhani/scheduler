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
