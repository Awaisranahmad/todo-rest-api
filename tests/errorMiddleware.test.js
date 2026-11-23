// tests/errorMiddleware.test.js
// Unit tests for the centralized error handler. No database needed.
const test = require("node:test");
const assert = require("node:assert/strict");

const errorMiddleware = require("../middleware/errorMiddleware");

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

test("CastError (invalid ObjectId) -> 400 with a clear message", () => {
  const err = new Error("Cast to ObjectId failed");
  err.name = "CastError";
  err.value = "not-an-id";
  const res = mockRes();

  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.success, false);
  assert.match(res.body.message, /Invalid ID format: not-an-id/);
});

test("ValidationError -> 400 listing every field error", () => {
  const err = new Error("Todo validation failed");
  err.name = "ValidationError";
  err.errors = {
    title: { message: "Title is required" },
    description: { message: "minimum 5 characters" },
  };
  const res = mockRes();

  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.match(res.body.message, /Title is required/);
  assert.match(res.body.message, /minimum 5 characters/);
});

test("error with an explicit statusCode is honoured (400, not 500)", () => {
  const err = new Error("Title and description are required");
  err.statusCode = 400;
  const res = mockRes();

  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, "Title and description are required");
});

test("status already set on the response is honoured (404 not-found)", () => {
  const err = new Error("Todo id not found");
  const res = mockRes();
  res.statusCode = 404;

  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.statusCode, 404);
});

test("plain server error -> 500", () => {
  const err = new Error("boom");
  const res = mockRes();

  errorMiddleware(err, {}, res, () => {});

  assert.equal(res.statusCode, 500);
  assert.equal(res.body.success, false);
});

test("stack trace is hidden outside development", () => {
  const prev = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    const err = new Error("boom");
    const res = mockRes();
    errorMiddleware(err, {}, res, () => {});
    assert.equal(res.body.stack, undefined);
  } finally {
    process.env.NODE_ENV = prev;
  }
});

test("stack trace is shown in development", () => {
  const prev = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  try {
    const err = new Error("boom");
    const res = mockRes();
    errorMiddleware(err, {}, res, () => {});
    assert.equal(typeof res.body.stack, "string");
  } finally {
    process.env.NODE_ENV = prev;
  }
});
