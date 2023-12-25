import request from "supertest";
import app from "./app";

describe("Product API Endpoints", () => {
  let productId: string;

  // Test the POST endpoint
  it("should create a new product", async () => {
    const response = await request(app).post("/api/products").send({
      id: "1",
      name: "Test Product",
      price: 10.99,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Product");

    productId = response.body.id;
  });

  // Test the GET endpoint for retrieving a specific product
  it("should retrieve details of a specific product", async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test Product");
  });

  // Test the GET endpoint for retrieving the list of products
  it("should retrieve a list of products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  // Test the PUT endpoint for updating a specific product
  it("should update details of a specific product", async () => {
    const response = await request(app).put(`/api/products/${productId}`).send({
      name: "Updated Test Product",
      price: 20.99,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Updated Test Product");
  });

  // Test the DELETE endpoint for deleting a specific product
  it("should delete a specific product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Updated Test Product");
  });

  // Test error handling for GET /api/products/:id when the product doesn't exist
  it("should return 404 for non-existent product", async () => {
    const response = await request(app).get("/api/products/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  // Test error handling for PUT /api/products/:id when the product ID is not found
  it("should return 404 for updating a non-existent product", async () => {
    const response = await request(app).put("/api/products/nonexistent").send({
      name: "Attempt to update non-existent product",
      price: 19.99,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  // Test error handling for DELETE /api/products/:id when the product ID is not found
  it("should return 404 for deleting a non-existent product", async () => {
    const response = await request(app).delete("/api/products/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
