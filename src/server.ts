import express from "express";
import { env } from "process";
import { router as brijRouter } from "./routes/BrijRouter";

const app = express();
app.use(express.json());

app.use(brijRouter);

export const port = env.PORT || 8080
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})