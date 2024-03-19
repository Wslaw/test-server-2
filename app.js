import express from "express";
import tasksRouter from "./routers/tasksRouter.js";
import cors from "cors";


const app = express();

app.use(express.json());

app.use(cors());

app.use("/tasks", tasksRouter);
app.use((error, req, res, next) => {
    const { message, status = 500 } = error;
    
    res.status(status).send(message ? message : "Internal server error");
});


app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
