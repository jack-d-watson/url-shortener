import { Router, Request, Response } from 'express';

export const router = Router();

router.post("/brij/create_token", (req: Request, res: Response) => {
    res.json({
        "token": "12345"
    })
})

router.post("/brij/shorten", (req: Request, res: Response) => {
    res.json({
        "token": "12345"
    })
})

router.get("/brij/:id", (req: Request, res: Response) => {
    res.json({
        "token": "12345"
    })
})

router.post("/brij/stats", (req: Request, res: Response) => {
    res.json({
        "token": "12345"
    })
})