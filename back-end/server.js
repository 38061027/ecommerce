import express from "express";
import mysql from "mysql2";
import cors from "cors";

const port = 3000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "38061027",
  database: "ecommerce",
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL");
});

app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM products";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/data", (req, res) => {
  const query =
    "INSERT INTO products (name, quantity, description, price, status) VALUES (?, ?, ?, ?,?)";
    const { name, quantity, description, price, status } = req.body;
  connection.query(
    query,
    [name, quantity, description, price, status],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({ name, quantity, description, price, status });
      }
    }
  );
});

app.put("/api/data:id", (req, res) => {
  const id = req.params.id;
  const { name, quantity, description, price, status } = req.body;
  const query =
    "UPDATE products SET name = ?, quantity = ?, description = ?, price = ?, status = ? WHERE id = ?";
  connection.query(
    query,
    [name, quantity, description, price, status, id],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res
          .status(200)
          .json({ name, quantity, description, price, status, id });
      }
    }
  );
});

app.delete("/api/data/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM products WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send({});
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Seu servidor está rodando na porta ${port}`);
});
