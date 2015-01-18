var app = require("app/testApp");
var test = require("tape");

test("the express app should serve the favicon", function (assert) {
  app.get("/favicon.ico")
    .expect(200)
    .expect("Content-Type", /^image/)
    .end(assert.end);
});

test("the express app should 404 properly", function (assert) {
  app.get("/this-path-not-found").expect(404).end(assert.end);
});
