import moment from "moment";
import React from "react";

export interface ITask {
  name: string;
  date: string;
  createdAt: Date;
}

const Task = (task: ITask) => {
  return (
    <ul className="list-group list-group-horizontal rounded-0">
      <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
        <div className="form-check">
          <input
            className="form-check-input me-0"
            type="checkbox"
            id="flexCheckChecked2"
            aria-label="..."
          />
        </div>
      </li>
      <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
        <p className="lead fw-normal mb-0"> {task.name}</p>
      </li>
      <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
        <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
          <p className="small mb-0">
            <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
              <i className="fas fa-hourglass-half me-2 text-warning" />
            </a>
            {task.date}
          </p>
        </div>
      </li>
      <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
        <div className="d-flex flex-row justify-content-end mb-1">
          <a
            href="#!"
            className="text-info"
            data-mdb-toggle="tooltip"
            title="Edit todo"
          >
            <i className="fas fa-pencil-alt me-3" />
          </a>
          <a
            href="#!"
            className="text-danger"
            data-mdb-toggle="tooltip"
            title="Delete todo"
          >
            <i className="fas fa-trash-alt" />
          </a>
        </div>
        <div className="text-end text-muted">
          <a
            href="#!"
            className="text-muted"
            data-mdb-toggle="tooltip"
            title="Created date"
          >
            <p className="small mb-0">
              <i className="fas fa-info-circle me-2" />
              {moment(task.createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </a>
        </div>
      </li>
    </ul>
  );
};

export default Task;
