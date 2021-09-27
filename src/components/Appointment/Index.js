import React from 'react'

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Error from './Error';
import "components/Appointment/styles.scss";

export default function Appointment({ props, time, interview, interviewers, id, bookInterview, cancelInterview }) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("inside the onSave function", interview)

    transition(SAVING);

    bookInterview(id, interview)
      .then((result) => {
        console.log("the result of bookinterview should be here: ", result);
        transition(SHOW)
      })
      .catch(error => transition(ERROR_SAVE, true));
  }
  function deleteAppointment(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }
  console.log("interview is: ", interview)
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          transition={transition}
        />
      )}
      {mode === SAVING && (<Status message="Saving..." />)}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => deleteAppointment(id)}
          onCancel={() => { back() }}
        />)}
      {mode === DELETING && (<Status message="Deleting..." />)}
      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          student={interview.student}
          interviewer={interview.interviewer}
          onCancel={() => back()}
          onSave={save}
          transition={transition}
        />
      )}
      {mode === ERROR_DELETE &&
        (<Error
          message="Could not delete from database"
          onClose={() => { back() }}
        />)}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save to database"
          onClose={() => { back() }}
        />)}
    </article>
  )
}