import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
app.use("/api/resume", resumeRoutes);

const app = express();

app.use(
    cors({
        origin:"http://localhost:5173"
    })
);

app.use(express.json());


app.get("/health",(req,res)=>{
    res.json({
        status:"ok"
    });
});


export default app;