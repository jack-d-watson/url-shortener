import UrlFriendlyBase64 from "../types/UrlFriendlyBase64";

// Placeholder for a table or collection in a database.
export class Table {
    // Key: Token, Value is a Map with the Short URL as a Key, and the URL object as a Value
    private dataMap: Map<String, Map<String, Url>>;
    // Key is the Short Url, Value is the Token
    // This acts a bit like having an index on the short url in something like MongoDB or DynamoDB
    private shortUrlToTokenMap: Map<String, String>;

    constructor() {
        this.dataMap = new Map<String, Map<String, Url>>();
        this.shortUrlToTokenMap = new Map<String, String>();
    }

    /**
     * Adds a given token to the database
     * @param token value to add to the database
     * @returns true if it succeeded, false if a token already exists
     */
    addNewToken(token: UrlFriendlyBase64) : boolean {
        console.log(`addNewToken token=${token.value}`)
        // Do not add a new token if the token is already taken
        if(this.dataMap.has(token.value)) {
            return false;
        }

        const urlMap = new Map();
        this.dataMap.set(token.value, urlMap);
        return true;
    }

    /**
     * Saves a short url and its associated Url to the database
     * @param token API Token the url short url will belong to
     * @param shortUrl Base64 encoded string that will be used to access the Url
     * @param url Url object to associate with a short url
     * @returns true on success, false if the token doesn't exist or the shortUrl has been used before
     */
    addNewShortUrl(token: UrlFriendlyBase64, shortUrl: UrlFriendlyBase64, url: Url) : boolean {
        console.log(`addNewShortUrl token=${token.value}, shortUrl=${shortUrl.value}, url=${url.fullUrl}`)
        // Get the Map associated with this token
        const tokenMap = this.dataMap.get(token.value);
        // Return false if the token does not exist, or if that short url is already in use
        if(tokenMap === undefined || this.shortUrlToTokenMap.has(shortUrl.value)) {
            return false;
        }
        this.shortUrlToTokenMap.set(shortUrl.value, token.value);
        tokenMap.set(shortUrl.value, url);
        return true;
    }

    /**
     * 
     * @param token value to look up
     * @returns data associated with the token
     */
    getTokenData(token: UrlFriendlyBase64) : Map<String, Url> | undefined {
        return this.dataMap.get(token.value);
    }

    /**
     * Looks up the Url associated with a given short url
     * @param shortUrl value to look up
     * @returns the Url object associated with the short url
     */
    getShortUrlData(shortUrl: UrlFriendlyBase64) : Url | undefined {
        const token = this.shortUrlToTokenMap.get(shortUrl.value);
        if(token === undefined) {
            return undefined
        }

        return this.dataMap.get(token)!.get(shortUrl.value)
    }

}