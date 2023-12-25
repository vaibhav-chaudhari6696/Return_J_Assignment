import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 3000;

// In-memory data store for products
const products: any[] = [];

// Middleware to log incoming requests with timestamp, HTTP method, and requested URL
const logRequests = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`${timestamp} - ${method} ${url}`);
  next();
};

app.use(logRequests);

app.use(bodyParser.json());

// GET /api/products/:id
app.get("/api/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// GET /api/products
app.get("/api/products", (req: Request, res: Response) => {
  res.json(products);
});

// POST /api/products
app.post("/api/products", (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

// PUT /api/products/:id
app.put("/api/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// DELETE /api/products/:id
app.delete("/api/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  const index = products.findIndex((p) => p.id === productId);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app; 