import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  // const [day, setDay] = useState('') 
  // const [days, setDays] = useState([]) 
  // const [appointment, setAppointment] = useState([])
  // const [interviewers, setInterviewers] = useState([])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const setDay = day => setState({ ...state, day });
  const setDay = day => setState({ ...state, day });
  
  useEffect(()=>{
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all)=>{
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  function bookInterview(id, interview) {
    console.log(id, interview);
    
    const days = [...state.days]
    const dayIndex = days.findIndex(day => state.day === day.name)
    const daySelect= days[dayIndex]
    daySelect.spots -= 1
    days[dayIndex] = daySelect
    
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
        console.log('update State test', appointments)
        setState(prev => ({...prev, appointments}))
        setState(prev => ({...prev, days}))
      })
  };

  function cancelInterview(id, interview) {
    
    const days = [...state.days]
    const dayIndex = days.findIndex(day => state.day === day.name)
    const daySelect= days[dayIndex]
    daySelect.spots += 1
    days[dayIndex] = daySelect
    
    
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
        setState(prev => ({...prev, appointments}))
        setState(prev => ({...prev, days}))
      }) 
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
};