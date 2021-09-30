import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function From(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return Promise.resolve({});
    } else if (!interviewer) {
      setError('Please select an interviewer');
      return Promise.resolve({});
    }
    setError('');
    return Promise.resolve(props.onSave(name, interviewer));
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.student || "Enter Student Name"}
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={(event) => {
              validate()
                .then(() => {
                  if (name !== '' && interviewer) {
                    props.transition('SHOW');
                  } else {
                    props.transition('CREATE');
                  }
                })
                .catch(() => {
                  props.transition('ERROR_SAVE');
                });
          }}>Save</Button>
        </section>
      </section>
    </main>
  )
}