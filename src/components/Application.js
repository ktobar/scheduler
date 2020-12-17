import React from "react";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment"
import {getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const{
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  const interviewers = getInterviewsForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const appointmentElement = dailyAppointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)} 
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

