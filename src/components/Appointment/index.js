import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  console.log("rendering Appointment component")
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
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
    .then(()=>transition(SHOW))
    .catch(()=>transition(ERROR_SAVE, true))
    
  }

  function destroy() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY))
    .catch(()=>transition(ERROR_DELETE, true))
  };

  function confirm() {
    transition(CONFIRM)
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
          onEdit={() => transition(EDIT)}
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
          onConfirm={destroy}
        />
      }

      {mode === EDIT &&
        <Form
          name={props.interview.student} 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save}
          interviewer={props.interview.interviewer.id}    
        />
      }

      {mode === ERROR_SAVE &&
        <Error
          message="Could not save appointment." onClose={() => back()}
        />
      }

      {mode === ERROR_DELETE &&
        <Error
        message="Could not delete appointment." onClose={() => back()}
        />
      }

    </article>
  );
}