import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos";

const app = express();
const PORT = 4000;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/todos", todoRoutes);

// Health check
app.get("/", (_req,res) => {
    res.json({ status: "ok", message: "Todo API is running"});
});

// Start
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});