// tests/todoModel.test.js
// Mongoose schema validation, checked synchronously — no database needed.
const test = require("node:test");
const assert = require("node:assert/strict");

const Todo = require("../models/Todo");

test("a valid todo passes validation", () => {
  const todo = new Todo({
    title: "Learn Backend",
    description: "Complete the internship task",
  });
  assert.equal(todo.validateSync(), undefined);
  assert.equal(todo.completed, false);
});

test("missing title fails validation", () => {
  const todo = new Todo({ description: "Complete the task" });
  const err = todo.validateSync();
  assert.ok(err);
  assert.match(err.errors.title.message, /Title is required/);
});

test("title shorter than 3 characters fails validation", () => {
  const todo = new Todo({ title: "ab", description: "Complete the task" });
  const err = todo.validateSync();
  assert.ok(err);
  assert.match(err.errors.title.message, /at least 3/);
});

test("missing description fails validation", () => {
  const todo = new Todo({ title: "Learn Backend" });
  const err = todo.validateSync();
  assert.ok(err);
  assert.match(err.errors.description.message, /Description is required/);
});

test("description shorter than 5 characters fails validation", () => {
  const todo = new Todo({ title: "Learn Backend", description: "abc" });
  const err = todo.validateSync();
  assert.ok(err);
  assert.match(err.errors.description.message, /minimum 5 characters/);
});

test("title and description are trimmed", () => {
  const todo = new Todo({
    title: "  Learn Backend  ",
    description: "  Complete the task  ",
  });
  assert.equal(todo.title, "Learn Backend");
  assert.equal(todo.description, "Complete the task");
});
