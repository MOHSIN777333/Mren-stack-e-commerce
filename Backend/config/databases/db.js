import pkg from "pg";

const { Client } = pkg;

export const connectDB = new Client({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASES || "e-commerce",
  password: process.env.PG_PASSWORD || "mohsin123",
  port: process.env.PG_PORT || "5432",
});

try {
  await connectDB.connect();
  console.log("pg databases connect successfully");
} catch (error) {
  console.log("pg databases connection faild", error);
  process.exit(1);
}
