import express from "express";
import { env } from "process";
import { router as brijRouter } from "./routes/brijRouter";

const app = express();

app.use(brijRouter);

const port = env.PORT || 8080
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})