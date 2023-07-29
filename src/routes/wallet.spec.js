const app = require("../app");
const request = require("supertest");

describe("Wallet", () => {
  let walletID = "";
  let token = "";

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "testsignin@gmail.com",
      password: "turmaon23",
    });

    token = res.body.token;
  });

  it("should create a wallet", async () => {
    const res = await request(app)
      .post("/api/wallet")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "my wallet",
      })
      .expect(200);

    expect(res.body).toHaveProperty("_id");
    walletID = res.body._id;

    expect(res.body).toHaveProperty("balance");
    expect(res.body.balance).toBe(0);

    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("my wallet");

    expect(res.body).toHaveProperty("user");
  });

  it("should return an error when creating a second wallet", async () => {
    const res = await request(app)
      .post("/api/wallet")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "my wallet",
      })
      .expect(409);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("This wallet already exists.");
  });

  it("should get wallet details", async () => {
    const res = await request(app)
      .get("/api/wallet")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(200);

    expect(res.body).toHaveProperty("name");
    expect(res.body.name).toBe("my wallet");

    expect(res.body).toHaveProperty("balance");
    expect(res.body.balance).toBe(0);

    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("user");
  });

  it("should update wallet name and balance", async () => {
    const res = await request(app)
      .patch(`/api/wallet/${walletID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "updated wallet",
        balance: 100,
      })
      .expect(200);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Wallet updated successfully");
  });

  it("should delete a wallet by ID", async () => {
    const res = await request(app)
      .delete(`/api/wallet/${walletID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "updated wallet",
      })
      .expect(200);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe(
      "Wallet 'updated wallet' was successfully deleted"
    );
  });

  it("should return an error when deleting wallet if it does not exist", async () => {
    const res = await request(app)
      .delete(`/api/wallet/${walletID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "updated wallet",
      })
      .expect(404);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Wallet not found.");
  });

  it("should return an error when getting the wallet details if it does not exist", async () => {
    const res = await request(app)
      .get("/api/wallet")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .expect(404);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Wallet not found.");
  });

  it("should return an error when updating the wallet if it does not exists", async () => {
    const res = await request(app)
      .patch(`/api/wallet/${walletID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "updated wallet",
        balance: 100,
      })
      .expect(404);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Not found");
  });
});
