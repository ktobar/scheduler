export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((currentDay) => currentDay.name === day);

  if (!foundDay) {
    return [];
  }

  const appointment = foundDay.appointments.map(appointmentId => state.appointments[appointmentId])
  
  return appointment
};

export function getInterviewsForDay(state, day) {

  const foundDay = state.days.find((currentDay) => currentDay.name === day);

  if (!foundDay) {
    return [];
  }

  const interview = foundDay.interviewers.map(interviewId => state.interviewers[interviewId])
 
  return interview
};

export function getInterview(state, interview) {
  if(!interview){
    return null;
  } else {
    
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
};