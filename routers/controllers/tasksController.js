import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { ctrlDecorator } from "../../helpers/ctrlDecorator.js";
// import HttpError from "../../helpers/HttpError.js";

const tasksPath = path.resolve(process.cwd(),"db","tasks.json")


const readTasks = async() => {
  const buffer = await fs.readFile(tasksPath);
  const tasks = JSON.parse(buffer);
  return tasks;
}



export const createTask = ctrlDecorator(async (req, res) => {
  let tasks = await readTasks();
  const newTask = {id:nanoid(), ...req.body};
  
  tasks = [...tasks, newTask];
  console.log(tasks)
  const task = await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  console.log(newTask);
  res.status(201).send(newTask)
})



export const getTasks = ctrlDecorator(async (req, res) => {
 
  res.send(await readTasks());   
  
});

export const getById = ctrlDecorator(async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();
  const task = tasks.find(item => item.id === id);
  console.log(task);
  res.send((task))
  return task || null;
});

export const removeTask = ctrlDecorator(async (req, res) => {
    const { id } = req.params;
  const tasks = await readTasks();

  const index = tasks.findIndex((item) => item.id === id)
  if (index === -1) {
    return null;
  }
  const [result] = tasks.splice(index, 1);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  res.send(result);
  return result || null;
})


