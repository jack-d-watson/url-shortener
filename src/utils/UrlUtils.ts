import UrlFriendlyBase64 from "../types/UrlFriendlyBase64";
import { Table } from "../datastore/Table";

const NUM_DIGITS = 5

/**
 * 
 * @param database connection to the database
 * @param token existing api token
 * @param fullUrl url to shorten
 * @returns a 
 */
export function generateShortUrl(database: Table, token: UrlFriendlyBase64, fullUrl: string) : string {
    const tokenData = database.getTokenData(token);
    if(!tokenData) {
        throw new Error("Token not recognized!")
    }

    const url: Url = {
        fullUrl: fullUrl,
        timesUsed: 0
    }
    let shortUrl = UrlFriendlyBase64.randomlyGenerateBase64Value(NUM_DIGITS);
    // Regenerate the short url until a url that is not taken has been found
    while(!database.addNewShortUrl(token, shortUrl, url))  {
        shortUrl = UrlFriendlyBase64.randomlyGenerateBase64Value(NUM_DIGITS);
    }

    return shortUrl.value
}

/**
 * 
 * @param database connection to the database
 * @param shortUrl shortUrl to look up
 * @returns Full url associated with short url, if the short url can be found
 */
export function getFullUrlByShortUrl(database: Table, shortUrl: string) : string | undefined {
    const url = database.getShortUrlData(new UrlFriendlyBase64(shortUrl));
    if(url) {
        // Increment counter for url
        url.timesUsed++;
        return url.fullUrl;
    }
    return undefined;
}