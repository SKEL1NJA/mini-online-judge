const express = require("express");
const fs = require("fs");
const cors = require("cors");

const judge = require("./judge");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/problems", (req, res) => {

    const data = fs.readFileSync(__dirname + "/problems.json");
    res.json(JSON.parse(data));
});

app.post("/submit", async (req, res) => {

    const { code, problemId } = req.body;

    const problems = JSON.parse(
        fs.readFileSync(__dirname + "/problems.json")
    );

    const problem = problems.find(p => p.id == problemId);

    const verdict = await judge(code, problem);

    res.json({ verdict });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));