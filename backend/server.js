import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Connessione PostgreSQL
const pool = new Pool({
    user: "postgres",       // <-- attenzione, una sola "s"
    host: "localhost",
    database: "portfolio",
    password: "admin",      // <-- la tua password
    port: 5432
});

// --- API CRUD progetti ---

// GET: tutti i progetti
app.get("/api/progetti", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM progetti ORDER BY id DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Errore nel recupero progetti" });
    }
});

// POST: aggiungi progetto
app.post("/api/progetti", async (req, res) => {
    try {
        const { titolo, descrizione, link, tech } = req.body;
        const result = await pool.query(
            "INSERT INTO progetti (titolo, descrizione, link, tech) VALUES ($1, $2, $3, $4) RETURNING *",
            [titolo, descrizione, link, tech]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Errore nell'inserimento progetto" });
    }
});

// PUT: modifica progetto
app.put("/api/progetti/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titolo, descrizione, link, tech } = req.body;
        const result = await pool.query(
            "UPDATE progetti SET titolo=$1, descrizione=$2, link=$3, tech=$4 WHERE id=$5 RETURNING *",
            [titolo, descrizione, link, tech, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Errore nella modifica progetto" });
    }
});

// DELETE: rimuovi progetto
app.delete("/api/progetti/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM progetti WHERE id=$1", [id]);
        res.json({ message: "Progetto eliminato" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Errore nella cancellazione progetto" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server avviato su http://localhost:${PORT}`));
