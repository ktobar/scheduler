import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors"

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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
    })
  }, [])

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(()=>{ setState(prev => ({...prev, appointments}))
      })
      .catch(err => console.log(err))
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
        setState(prev => ({...prev, appointments}))
      })
      .catch(err => console.log(err))
    
  };
  
  const interviewers = getInterviewsForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentElement = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log(" appliction INTERVIEW ",interview)
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview} 
        // id={appointment.id}
        // time={appointment.time}
        interviewers={interviewers} 
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={day => setDay(day)}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentElement}
        <Appointment id = "last" time= "5pm"/>
      </section>
    </main>
  );
}

