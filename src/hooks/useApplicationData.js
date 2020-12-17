import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all)=>{
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    });
  }, []);
  //remaing spots feature
  const updateSpots = (day, days, appointments) => {
    const daysCopy = [...days]; //copy to avoid mutating state
    const dayObj = daysCopy.find(d => d.name === day);
    const appointmentIds = dayObj.appointments;
    let spots = 0;
    //increment spot base on null value
    for (let id of appointmentIds){
      if (!appointments[id].interview) {
        spots++
      };
    }; 
    dayObj.spots = spots;
    return daysCopy;
  }

  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(()=>{
        const days = updateSpots(state.day, state.days, appointments);
        setState(prev => ({...prev, appointments, days}));
      })
  };

  function cancelInterview(id, interview) {
     
    const appointment = {
      ...state.appointments[id], 
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview})
      .then(()=> {
        const days = updateSpots(state.day, state.days, appointments)
        setState(prev => ({...prev, appointments, days}))
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};