// tests/asyncHandler.test.js
// The wrapper must forward async rejections to next() and leave successes alone.
const test = require("node:test");
const assert = require("node:assert/strict");

const asyncHandler = require("../utils/asyncHandler");

test("forwards a rejected promise to next()", async () => {
  const boom = new Error("boom");
  const handler = asyncHandler(async () => {
    throw boom;
  });

  const err = await new Promise((resolve) => handler({}, {}, resolve));
  assert.equal(err, boom);
});

test("does not call next() when the handler succeeds", async () => {
  let nextCalled = false;
  const handler = asyncHandler(async (req, res) => {
    res.status(200).json({ ok: true });
  });

  const res = {
    status() {
      return this;
    },
    json(payload) {
      this.body = payload;
    },
  };
  await handler({}, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.deepEqual(res.body, { ok: true });
});
