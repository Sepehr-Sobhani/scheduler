import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS,
} from "../reducer/appDataReducer";

function useApplicationData() {
  //-------------Application Local State---------------------------
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //------------------logic to change the day----------------------------------------------
  const setDay = (day) => dispatch({ type: SET_DAY, value: day });

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

    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }))
      .then(() => dispatch({ type: UPDATE_SPOTS }));
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

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, value: appointments }))
      .then(() => dispatch({ type: UPDATE_SPOTS }));
  }

  //-------------------fetch data from db with axios--------------------------
  useEffect(() => {
    const daysURL = "/api/days";
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => dispatch({ type: SET_APPLICATION_DATA, value: all }));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
