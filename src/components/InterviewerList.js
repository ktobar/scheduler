import React from "react";

import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  console.log("rendering InterviewerList component")
  const { interviewers } = props;
  const listOfInterview = interviewers.map(interviewer => {

    return (<InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
        selected={props.value === interviewer.id}
      />)}
  );

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listOfInterview}
      </ul>
    </section>
  );
}