import express, { Request, Response, NextFunction } from "express";
import { env } from "process";
import { router as brijRouter } from "./routes/BrijRouter";

const app = express();
app.use(express.json());
// Middleware to add some basic logging to track inbound requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}]: Processing request to ${req.url}`);
    next();
})

app.use(brijRouter);

// Default route. If nothing else matches return 404
app.all("*", (req: Request, res: Response) => {
    return res.status(404);
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`global error handler caught an error: ${err.message}`);
})

export const port = env.PORT || 8080
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})