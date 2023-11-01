"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const createTask = async (task: any) => {
  try {
    const result =
      await sql`INSERT INTO Tasks (Name, Date, CreatedAt) VALUES (${
        task.name
      }, ${task.date}, ${JSON.stringify(new Date())});`;

    console.log("result: ", result);

    revalidatePath("/");

    return result;
  } catch (error) {
    console.log({ error });
    return `Failed ${JSON.stringify(error)}`;
  }
};
