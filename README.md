# RC Pair Programming Exercise

This repo contains my prep work for the Recurse Center Pairing Interview. 

## Instructions

```
Before your interview, write a program that runs a server that is accessible on http://localhost:4000/. When your server receives a request on http://localhost:4000/set?somekey=somevalue it should store the passed key and value in memory. When it receives a request on http://localhost:4000/get?key=somekey it should return the value stored at somekey.

During your interview, you will pair on saving the data to a file. You can start with simply appending each write to the file, and work on making it more efficient if you have time.
```

## Thoughts

Seems pretty straightforward. Node will get me a basic server and I can do the other stuff fairly simply.

### Todos

- [ ] Get a server running on `localhost` that listens on port `4000`. 
- [ ] It should accept requests and parse urls for two commands: `get` and `set`, as well as an associated query.
- [ ] Build parsing for each query
  - [ ] `key=value` for `set` commands and
  - [ ] `key=somekey` for `get` commands
- [ ] Build a `Map()` or something to save the store the data
- [ ] `set` will save the key/value pair to memory and 
- [ ] `get` will return the value stored by the key.

### Tests

`TODO`