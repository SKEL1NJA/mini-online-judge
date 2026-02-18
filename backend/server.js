const express=require("express");
const fs=require("fs");
const cors=require("cors");

const judge=require("./judge");

const app=express();

app.use(cors());
app.use(express.json());

/* SEND PROBLEMS */
app.get("/problems",(req,res)=>{
    const data=fs.readFileSync("problems.json");
    res.json(JSON.parse(data));
});

/* HANDLE SUBMISSION */
app.post("/submit", async(req,res)=>{

    const {code,problemId}=req.body;

    const problems=JSON.parse(fs.readFileSync("problems.json"));

    const problem=problems.find(p=>p.id==problemId);

    const verdict=await judge(code,problem);

    res.json({verdict});
});

app.listen(3000,()=>console.log("Server running"));