import { Command } from "commander";
import fs from "fs";

const program = new Command();
const tasksFile = "tasks.json";

// Ensure the tasks.json file exists
if (!fs.existsSync(tasksFile)) {
  fs.writeFileSync(tasksFile, "[]", "utf-8");
}

function addTodoCLI(task) {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  tasks.push({ task, done: false });
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  console.log(`Task added: ${task}`);
}

function deleteTodoCLI(task) {
  let tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  tasks = tasks.filter(t => t.task !== task);
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
  console.log(`Task deleted: ${task}`);
}

function updateTodoCLI(task, newTask) {
  const tasks = JSON.parse(fs.readFileSync(tasksFile, "utf-8"));
  const taskIndex = tasks.findIndex(t => t.task === task);
  console.log(taskIndex); 
  if (taskIndex > -1) {
    tasks[taskIndex].task = newTask;
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    console.log(`Task updated: ${task} to ${newTask}`);
  } else {
    console.log(`Task not found: ${task}`);
  }
}

program
  .version("0.1.0")
  .description("To-do list app");

program
  .command("add <task>")
  .description("Add a task")
  .action((task) => {
    addTodoCLI(task);
  });

program
  .command("delete <task>")
  .description("Delete a task")
  .action((task) => {
    deleteTodoCLI(task);
  });

program
  .command("update <task> <newTask>")
  .description("Update a task")
  .action((task, newTask) => {
    updateTodoCLI(task, newTask);
  });

program.parse(process.argv);
