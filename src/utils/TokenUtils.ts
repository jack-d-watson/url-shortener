import { Table } from "../datastore/Table";
import UrlFriendlyBase64 from "../types/UrlFriendlyBase64";

const NUM_DIGITS = 5

export function generateNewToken(database: Table) : UrlFriendlyBase64{
    let token = UrlFriendlyBase64.randomlyGenerateBase64Value(NUM_DIGITS)
    // Generate a new token and try to add it if the current token already exists in the database
    while(!database.addNewToken(token)) {
        token = UrlFriendlyBase64.randomlyGenerateBase64Value(NUM_DIGITS);
    }
    return token;
}