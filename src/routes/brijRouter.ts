import { Router, Request, Response } from 'express';
import { generateShortUrl } from '../utils/UrlUtils';
import { Table } from '../datastore/Table';
import { generateNewToken } from '../utils/TokenUtils';
import UrlFriendlyBase64 from '../types/UrlFriendlyBase64';
import { port } from '../server';

export const router = Router();

const database = new Table();

router.post("/brij/create_token", (req: Request, res: Response) => {
    const token = generateNewToken(database);
    return res.json({
        "token": token.value
    })
})

router.post("/brij/shorten", (req: Request, res: Response) => {
    // Validate query params
    let apiTokenParam = req.query["api_token"] as String
    if(apiTokenParam === undefined || !UrlFriendlyBase64.isBase64(apiTokenParam)) {
        return res.status(401).json({
            message: "api_token invalid or missing from query parameters of request"
        })
    }

    // Validate body params
    if(!req.body || !req.body.url) {
        return res.status(400).json({
            message: "url is missing from body of request"
        })
    }

    // Try to create a shortened url
    const fullUrl = req.body.url;
    const token = new UrlFriendlyBase64(apiTokenParam);
    let shortenedUrl: String
    try {
        shortenedUrl = generateShortUrl(database, token, fullUrl);
    }
    catch(error) {
        return res.status(401).json({
            message: "api_token does not exist!"
        })
    }

    return res.json({
        url: fullUrl,
        shortUrl: `http://localhost:${port}/brij/${shortenedUrl}`
    })
})

router.get("/brij/:id", (req: Request, res: Response) => {
    const shortUrlToken = req.params.id
    const url = database.getShortUrlData(new UrlFriendlyBase64(shortUrlToken))
    if(url === undefined) {
        return res.status(404)
    }

    return res.redirect(url.fullUrl);
})

router.post("/brij/stats", (req: Request, res: Response) => {
    res.json({
        "token": "12345"
    })
})