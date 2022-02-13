/**
 * UrlFriendlyBase64
 *  Standard Base64 uses a-z, A-Z, 0-9, "+" and "/"
 *  The last two characters are not URL friendly, so they're being replaced by "-" and "_"
 *  in this implementation
 */ 
export default class UrlFriendlyBase64 {
    // The whole string should only have these characters in it
    private static readonly base64Regex = /^[a-zA-Z0-9_-]+$/;
    private static readonly BASE_64_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-"
    private static readonly BASE_64 = 64;
    private _value: String;

    constructor(value: String) {
        this._value = value;
    }

    get value() {
        return this._value
    }

    set value(value: String) {
        if(UrlFriendlyBase64.isBase64(value)) {
            this.value = value
        }
    }

    /**
     * 
     * @param str: Input string to check if it matches the Base 64 encoding defined in this class
     * @returns boolean: true if it matches our encoding
     */
    static isBase64(str: String): boolean {
        // Check if the input string matches our regex for a base64 string
        const base64Match = str.match(UrlFriendlyBase64.base64Regex);

        // Ensure the returned value from match exists and has an entry, and that it is the whole input string
        return base64Match !== null && base64Match.length > 0 && base64Match[0] === str;
    }

    static randomlyGenerateBase64Value(numberOfCharacters: NumberOfBase64Characters) : UrlFriendlyBase64 {
        const randomNumber = Math.floor(Math.random() * Math.pow(UrlFriendlyBase64.BASE_64, numberOfCharacters));
        
        const encodedValue = this.encode(randomNumber, numberOfCharacters);
        return encodedValue;        
    }

    static encode(num: number, numberOfCharacter: NumberOfBase64Characters) : UrlFriendlyBase64 {
        let output : String = "";
        let shiftedNum = num;
        for(let characterNum = numberOfCharacter; characterNum > 0; characterNum--) {
            const remainder = shiftedNum % this.BASE_64
            output += this.BASE_64_CHARS.charAt(remainder);
            shiftedNum = Math.floor(shiftedNum/64);
        }
        return new UrlFriendlyBase64(output);
    }

    static decode(base64: UrlFriendlyBase64) : number {
        let output : number = 0;
        for(let inputIndex = base64.value.length - 1; inputIndex >= 0; inputIndex--) {
            const currentChar = base64.value.charAt(inputIndex);
            const numberOfCharacter = this.BASE_64_CHARS.indexOf(currentChar);
            output = output * this.BASE_64 + numberOfCharacter;
        }
        return output;
    }
}

export type NumberOfBase64Characters = 1 | 2 | 3 | 4 | 5 