# url-shortener
example of a URL shortner api that could run on an Express/Node server

See [Requirements](docs/requirements.md) for what this project is meant to do

## Running this project
Use yarn!

* `yarn` to install dependencies
* `yarn debug` to run the project for development
* `yarn build` and then `yarn start` to run the program

# Future Work
Here's a list of the things I would like to do for this project, especially before it would be used in any kind of production environment.
* Unit testing, especially on the Base 64 encoding
* Create a dictionary of banned words to ensure the URL shortener doesn't randonmly generate something hateful, obscene or offensive for a link
* Add ability to disable a shortened url, either with an expiration time/date or an endpoint
* Add some kind of real authentication to endpoints that require an api token
* Do further analysis on the scale this should work at to determine how many characters of base64 should be used for the Token and Short Url.