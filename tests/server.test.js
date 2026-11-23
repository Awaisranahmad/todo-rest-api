// tests/server.test.js
// Wiring checks for server.js: the todo router must be mounted exactly
// once and the centralized error handler must be registered after it.
// Importing server.js tries to connect to MongoDB with no MONGO_URI set;
// the rejected promise is caught and logged by server.js itself, so no
// database is needed here.
const test = require("node:test");
const assert = require("node:assert/strict");

const app = require("../server");
const todoRoutes = require("../routes/todoRoutes");

// Express 5 exposes the router as app.router (Express 4: app._router).
const router = app.router || app._router;

test("the /todos router is mounted exactly once", () => {
  const mounts = router.stack.filter(
    (layer) => layer.handle === todoRoutes,
  );
  assert.equal(mounts.length, 1);
});

test("an error-handling middleware (4-arg function) is registered", () => {
  const errorHandlers = router.stack.filter(
    (layer) => typeof layer.handle === "function" && layer.handle.length === 4,
  );
  assert.equal(errorHandlers.length, 1);
});

test("the error handler comes after the /todos router", () => {
  const stack = router.stack;
  const routerIndex = stack.findIndex((l) => l.handle === todoRoutes);
  const errorIndex = stack.findIndex(
    (l) => typeof l.handle === "function" && l.handle.length === 4,
  );
  assert.ok(routerIndex > -1);
  assert.ok(errorIndex > routerIndex);
});
