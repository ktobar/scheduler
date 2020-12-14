import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {
  console.log("IN INDEX", props.interview)
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  
  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW)
    )
  }

  function deletion() {
    transition(DELETE)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
  };

  function confirm() {
    transition(CONFIRM)
  }

  function edit(name, interviewer) {/////////////////////
    const interview = {
      student: name,
      interviewer
    };
    transition(EDIT)
    props.bookInterview(props.id, interview)
    .then(()=>transition(SHOW)
    )
  }
  return (
    <article className="appointment">
      <Header 
        time={props.time}
      />      
      {mode === EMPTY && 
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      }
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}////////////////////////////////////
        />
      )}
      
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save} 
        />
      }

      {mode === SAVING && 
        <Status 
          message={SAVING} 
        /> 
      }

      {mode === DELETE && 
        <Status 
          message={DELETE}  
        />
      }

      {mode === CONFIRM &&
        <Confirm
          message={DELETE}
          onCancel={()=> back()}
          onConfirm={deletion}
        />
      }

      {mode === EDIT &&
        <Form
          name={props.interview.student} 
          interviewers={props.interviewers} 
          onCancel={() => back()} 
          onSave={save}
          interviewer={props.interview.interviewer.id}
          
        />

      }
    </article>
  );
}