import formidable from "formidable";
import { create, get, remove } from "../model/todo.js";

export const createTodo = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields) => {
    const { description } = fields;
    // check to see if the description field exists in the form
    // if description doesn't exist, send error
    if (!fields.description) {
      return res.status(400).json({
        error: "Description is required",
      });
    }
    // if description exists, add to database using create() function
    try {
      const newTask = await create(description);
      return res.status(201).send({ data: newTask.rows[0] });
    } catch (error) {
      // if description cannot be added to database, send error
      return res.status(400).json({
        error,
      });
    }
  });
};

export const read = async (req, res) => {
  try {
    const task = await get();
    return res.json({ data: task.rows });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const removeTodo = async (req, res) => {
  const id = Number(req.params.id);
  try {
    await remove(id);
    return res.status(200).send({ data: id });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
