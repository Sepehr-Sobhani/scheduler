import axios from "axios";
import { useState, useEffect } from "react";

function useApplicationData() {
  //-------------Application Local State---------------------------
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //----------------book an interview with the id of the appointment-----------------------
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });
    const updAppointment = axios.put(`/api/appointments/${id}`, {
      interview,
    });
    return updAppointment;
  }

  //------------------cancel an interview with the id of the appointment-------------------
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  //-------------------fetch data from db with axios--------------------------
  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) =>
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
