import React from "react";
import { sql } from "@vercel/postgres";
import Task from "../Task";

export const Tasks = async () => {
  const data = await sql`SELECT * FROM Tasks`;
  const { rows: tasks } = data;

  console.log({ tasks });

  return (
    <div className="p-6 bg-white rounded shadow mb-3">
      <p className="font-bold mb-3">Tasks</p>
      {tasks.map((task) => (
        <Task
          key={task.id}
          name={task.name}
          date={task.date}
          createdAt={task.createdat}
        />
      ))}
    </div>
  );
};
