# RC Pair Programming Exercise

This repo contains my prep work for the Recurse Center Pairing Interview. 

## Instructions

```
Before your interview, write a program that runs a server that is accessible on http://localhost:4000/. When your server receives a request on http://localhost:4000/set?somekey=somevalue it should store the passed key and value in memory. When it receives a request on http://localhost:4000/get?key=somekey it should return the value stored at somekey.

During your interview, you will pair on saving the data to a file. You can start with simply appending each write to the file, and work on making it more efficient if you have time.
```

## Preliminary Thoughts

Seems pretty straightforward. Node will get me a basic server and I can do the other stuff fairly simply.

### Todos

- [x] Get a server running on `localhost` that listens on port `4000`. 
- [x] It should accept requests and parse urls for two commands: `get` and `set`, as well as an associated query.
  - [x] EXTRA: I think it'll work for multiple queries per request on set but not for get
- [x] Build parsing for each query
  - [x] `key=value` for `set` commands and
  - [x] `key=somekey` for `get` commands
- [x] Build a `Map()` or something to save the store the data
- [x] `set` will save the key/value pair to memory and 
- [x] `get` will return the value stored by the key.

## Execution Notes

- As I thought, `http` is what I was looking for and getting a server set up is easy-peasy. The docs are fairly intimidating though and I'm worried that if I don't set up the proper event responses it'll bug out. 
- I wonder if this would be easier to do as class with methods...
- Figuring out correct types is still a pain in the butt. I'm sure I don't have my IDE set up correctly
- Not sure how I'll do error handling yet but yolo
- How does one actually build in middleware
- Node has everything. I think I've used the `url` lib once but its freaking awesome.
- `searchParams` is what I need along with all its messages. 
  - Interesting that it provides its own function to return an iterator
  - why can't i just get an object back with kv pairs? I mean I guess it technically is an object but kinda annoying to have to iterate through it
- Gotta be a better way to handle issues than this many `if it doesn't exist set the statuscode to bad and end it` statements
- damn 2 hours for 100 lines? i'm ngmi

Done with basics.

## Improvements
- [x] Add proper error listener
- [x] wrap request handling in try/catch
- [ ] check http methods (get should be get and set should be post)
- [x] log http method with url
- [x] set http headers
  - [x] content-type
  - [ ] content-length
  - [ ] allow
  - [ ] maybe cache-control?
- [ ] Better error messages, possibly custom errors
- [x] remove explicit returns after `res.end()` where unneeded
- [ ] more graceful shutdown
- [ ] Should log request timestamps to help with debug
- [ ] Separate/better-organized routing logic

## Completion

Kinda smelly and could definitely be cleaned up, but didn't want to overdo it. There are a bunch of improvements I deliberately skipped because I don't think the goal of this is to build a super clean webserver where everything is perfect - rather the point is working through a problem with someone. 