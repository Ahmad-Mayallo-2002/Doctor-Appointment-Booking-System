import { createConnection } from "mysql";

export const database = createConnection({
  host: "localhost",
  user: "ahmadmayallo",
  password: "1234",
  database: "doctors_system",
});

database.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Connection Database is Done");
});
