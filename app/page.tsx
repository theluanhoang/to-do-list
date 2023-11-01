"use client";

import Task, { ITask } from "@/components/Task";
import { Tasks } from "@/components/Tasks";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createTask } from "./actions";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Home() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [value, onChange] = useState<Value>(new Date());
  const [toggleCalendar, setToggleCalendar] = useState<boolean>();

  const handleSetTask = async () => {
    const isValid = validateTask();

    if (isValid) {
      const newTask = {
        name,
        date,
      };

      await createTask(newTask);

      resetField();
    }
  };

  const validateTask = () => {
    if (name.trim() === "" || date.trim() === "") {
      setError("Name and date are require.");
      return false;
    }
    setError("");
    return true;
  };

  const resetField = () => {
    setName("");
    setDate("");
  };

  useEffect(() => {
    if (value instanceof Date) {
      const formattedDate = value.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      setDate(formattedDate);
    }
  }, [value]);

  return (
    <main>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card"
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1 text-red-500" />
                    <u className="text-red-500">To-do list</u>
                  </p>
                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Add new..."
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                          />
                          <div
                            data-mdb-toggle="tooltip"
                            title="Set due date"
                            className="cursor-pointer relative"
                          >
                            <i
                              onClick={() => {
                                setToggleCalendar((prev) => !prev);
                              }}
                              className="fas fa-calendar-alt fa-lg me-3 text-blue-600"
                            />
                            {toggleCalendar && (
                              <Calendar
                                onChange={(date) => {
                                  onChange(date);
                                  setToggleCalendar(false);
                                }}
                                value={date}
                                className={
                                  "fixed z-10 md:right-36 sm:right-20 right-10"
                                }
                              />
                            )}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={handleSetTask}
                              className="bg-green-600 hover:bg-opacity-90 px-4 py-2 rounded-md text-white"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {error && <p className="text-red-500">Error: {error}</p>}
                  {
                    <div className="font-bold">
                      Dealine: <p className="text-[#FFC107]">{date}</p>
                    </div>
                  }
                  <hr className="my-4" />
                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select className="select">
                      <option value={1}>All</option>
                      <option value={2}>Completed</option>
                      <option value={3}>Active</option>
                      <option value={4}>Has due date</option>
                    </select>
                    <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select className="select">
                      <option value={1}>Added date</option>
                      <option value={2}>Due date</option>
                    </select>
                    <a
                      href="#!"
                      style={{ color: "#23af89" }}
                      data-mdb-toggle="tooltip"
                      title="Ascending"
                    >
                      <i className="fas fa-sort-amount-down-alt ms-2" />
                    </a>
                  </div>
                  <Tasks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
