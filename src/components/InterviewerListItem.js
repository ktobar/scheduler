import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewersClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
    'interviewers__item-image': props.avatar
  })
  
  return (
    <li className={interviewersClass} onClick={props.setInterviewer}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name:''}
    </li>
  );
}