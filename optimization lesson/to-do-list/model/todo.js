import pool from "./database.js";

export const create = async (description) =>
  pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [
    description,
  ]);

export const get = async () => pool.query("SELECT * FROM todo");

export const remove = async (id) =>
  pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
