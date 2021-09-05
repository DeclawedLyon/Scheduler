import React from 'react'

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

import "components/Appointment/styles.scss";

export default function Appointment({time, interview}) {
  return (
      <article className="appointment">
          <Header time={time} />
          {interview ? 
              <Show 
                  student={interview.student}
                  interviewer={interview.interviewer}
              /> : 
              <Empty 
              />
          }
      </article>
  )
}