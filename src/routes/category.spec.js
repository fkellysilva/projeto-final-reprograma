const app = require("../app");
const request = require("supertest");

describe("Category", () => {
  let token = "";
  let newCategoryID = "";

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "testsignin@gmail.com",
      password: "turmaon23",
    });

    token = res.body.token;
  });

  it("should create a new category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "new category 1",
      });

    expect(res.body).toHaveProperty("_id");
    newCategoryID = res.body._id;

    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("new category 1");
  });

  it("should return an error if category already exists", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "new category 1",
      });

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("This category already exists.");
  });

  it("should update a category", async () => {
    const res = await request(app)
      .patch(`/api/category/${newCategoryID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "new category 2",
      });

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Category updated successfully");
  });

  it("should delete a category by its ID", async () => {
    const res = await request(app)
      .delete(`/api/category/${newCategoryID}`)
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      "Category 'new category 2' was successfully deleted."
    );
  });
});
