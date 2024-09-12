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

app.put("/api/data/:id", (req, res) => {
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

// Cart

app.get("/api/cart", (req, res) => {
  const query = "SELECT * FROM cart";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/api/cart", (req, res) => {
  const query =
    "INSERT INTO cart (id, name, quantity, description, price, status) VALUES (?, ?, ?, ?,?, ?)";
  const { id, name, quantity, description, price, status } = req.body;

  connection.query(
    query,
    [id, name, quantity, description, price, status],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res
          .status(200)
          .json({ id, name, quantity, description, price, status });
      }
    }
  );
});

app.patch("/api/cart/:id", (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ error: "Quantity is required" });
  }

  const query = "UPDATE cart SET quantity = ? WHERE id = ?";
  connection.query(query, [quantity, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ id, quantity });
  });
});


app.delete("/api/cart/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM cart WHERE id = ?",
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


// User API

app.get("/api/user", (req, res) => {
  const query = "SELECT * FROM user";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(results);
    }
  });
});


app.post("/api/user", (req, res) => {
  const query =
    "INSERT INTO user (name, hierarchy, email, password) VALUES (?, ?, ?, ?)";
  const {name, hierarchy, email, password } = req.body;

  connection.query(
    query,
    [name, hierarchy, email, password],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res
          .status(200)
          .json({name, hierarchy, email, password });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Seu servidor está rodando na porta ${port}`);
});
