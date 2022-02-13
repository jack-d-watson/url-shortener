import UrlFriendlyBase64 from "../types/UrlFriendlyBase64";
import { Table } from "../datastore/Table";

const NUM_DIGITS = 5

export function generateShortUrl(database: Table, token: UrlFriendlyBase64, fullUrl: string) : String {
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