
# Endpoints
* POST `/brij/create_token` will create and return an API token the user can use
* POST `/brij/shorten?api_token={TOKEN}` which will take a given url as its input, shortens it and sends back shortened url. If api token is invalid, it should return an error instead
* GET `/brij/:id` which will fetch and redirect user to actual url (i.e. actual output will be http status code 302 with redirect url set to actual url). If id is not found, it should throw an error
* GET `/brij/stats?api_token={TOKEN}` returns a key value pair of url:count that represents all the urls that were shortened using this token and their corresponding counts
    
Any other requests should result in 404 status code

# Examples:

## POST <http://localhost:3000/create_token>
### Response body
```
{
    token: "12345"
}
```

## POST <http://localhost:3000/shorten?api_token=12345>
### Request Body
```
{
    url: "<http://brij.it/login>"
}
```
### Response Body
```
{
    url: "<http://brij.it/login>"
    shortenedUrl: "<http://localhost:3000/abc>"
}
```
## GET <http://localhost:3000/abc>
## GET <http://localhost3000/stats?api_token=12345>
### Response Body
```
{
    "<http://brij.it/login>": 1 
}
```

# Miscellaneous
For data store, you can implement a simple in memory hash map or any other data structure that acts as a key/value table. There is no need to connect to any database or caching service
