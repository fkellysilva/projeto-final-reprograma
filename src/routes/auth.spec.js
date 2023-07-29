const app = require("../app");
const request = require("supertest");

describe("Authentication", () => {
  describe("/signup", () => {
    const result = Math.random().toString(36).substring(2, 7);

    it("should create a new account", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          name: "Test",
          email: `${result}@mail.com`,
          password: "turmaon23",
        });

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("name");
      expect(res.body).not.toHaveProperty("password");

      expect(res.body.name).toBe("Test");
      expect(res.body.email).toBe(`${result}@mail.com`);
    });

    it("should return a conflict error if user already exists", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send({
          name: "Test",
          email: `${result}@mail.com`,
          password: "turmaon23",
        });

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("User already exists.");
    });
  });

  describe("/signin", () => {
    it("should sign in properly", async () => {
      await request(app).post("/api/auth/signup").send({
        name: "Test",
        email: "testsignin@gmail.com",
        password: "turmaon23",
      });

      const res = await request(app).post("/api/auth/signin").send({
        email: "testsignin@gmail.com",
        password: "turmaon23",
      });

      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
    });

    it("should return an error if user does not exists", async () => {
      const res = await request(app).post("/api/auth/signin").send({
        email: "notfoundn@gmail.com",
        password: "turmaon23",
      });

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("User does not exists");
    });

    it("should return an error if password is wrong", async () => {
      const res = await request(app).post("/api/auth/signin").send({
        email: "testsignin@gmail.com",
        password: "wrongpassword",
      });

      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("invalid credentials");
    });
  });
});
