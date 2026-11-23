// tests/todoController.test.js
// Controller tests with the Mongoose model stubbed out (require-cache
// injection), so no database is needed. This is the regression test for
// the old bug: POST /todos without title/description used to answer 500
// instead of 400.
const test = require("node:test");
const assert = require("node:assert/strict");

const todoModelPath = require.resolve("../models/Todo");
const controllerPath = require.resolve("../controllers/todoController");

// Fake Todo model: stores what it is given, save() resolves like Mongoose.
class FakeTodo {
  constructor(data) {
    Object.assign(this, data);
  }

  save() {
    this._id = "66a1b2c3d4e5f67890abcd12";
    return Promise.resolve(this);
  }

  static findById() {
    return Promise.resolve(null);
  }
}

function loadControllerWithFakeModel() {
  delete require.cache[controllerPath];
  require.cache[todoModelPath] = {
    id: todoModelPath,
    filename: todoModelPath,
    loaded: true,
    exports: FakeTodo,
  };
  return require(controllerPath);
}

function mockRes() {
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return res;
}

// Calls a wrapped controller and resolves with whatever happened first:
// the error passed to next(), or the response that was sent.
function run(controller, req) {
  const res = mockRes();
  return new Promise((resolve) => {
    const next = (err) => resolve({ err, res });
    const originalJson = res.json.bind(res);
    res.json = (payload) => {
      originalJson(payload);
      resolve({ err: null, res });
    };
    controller(req, res, next);
  });
}

test("createTodo without title/description forwards a 400 error to next()", async () => {
  const controller = loadControllerWithFakeModel();
  const { err, res } = await run(controller.createTodo, {
    body: { title: "", description: "" },
  });

  assert.ok(err, "expected an error to be forwarded");
  assert.equal(err.statusCode, 400);
  assert.equal(err.message, "Title and description are required");
  // No response was sent by the controller itself — the error middleware
  // owns the reply, so the old 500-from-the-catch cannot come back.
  assert.equal(res.body, undefined);
});

test("createTodo with valid data answers 201", async () => {
  const controller = loadControllerWithFakeModel();
  const { err, res } = await run(controller.createTodo, {
    body: { title: "Learn Backend", description: "Complete the task" },
  });

  assert.equal(err, null);
  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.title, "Learn Backend");
  assert.equal(res.body.data.completed, false);
});

test("getTodoById for a missing todo forwards a 404 error", async () => {
  const controller = loadControllerWithFakeModel();
  const { err, res } = await run(controller.getTodoById, {
    params: { id: "66a1b2c3d4e5f67890abcd12" },
  });

  assert.ok(err, "expected an error to be forwarded");
  assert.equal(res.statusCode, 404);
  assert.match(err.message, /not found/);
});
