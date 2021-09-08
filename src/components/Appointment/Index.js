import React from 'react'

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment({time, interview, interviewers, id, bookInterview}) {

  const { mode, transition, back } = useVisualMode(
      interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    // console.log("name:", interview.student)
    // console.log("interviewer;", interviewer)
    // console.log("interview:",interview);
    bookInterview(id, interview);
    transition(SHOW);
  }


  return (
      <article className="appointment">
          <Header time={time} />
          {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
          {mode === SHOW && (
            <Show
                student={interview.student}
                interviewer={interview.interviewer}
            />
            )}
          {mode === CREATE && (
            <Form 
                interviewers = {interviewers}
                onCancel={() => back()}
                onSave={save}
                transition={transition}
            />
            )}
            {mode === SAVING && (<Status message="Saving..." />)}
      </article>
  )
}