# `HTTP Headers`
HTTP headers are key-value pairs sent in both HTTP requests and responses that convey important information about the browser, server, resource, or connection. They play a critical role in enabling and customizing client-server communication.

## Why Headers are Used
`HTTP headers are metadata used by the client (e.g., browser) and server` to:

- Describe content type and length
- Define authentication
- Handle cookies
- Manage sessions
- Enable security and CORS
- Indicate compression and encoding

## Analogy - 01

Let’s say you’re sending a letter to your friend who lives far away. Here’s how it works:

- 📝 The letter = the actual message or data (HTML, JSON, etc.)
- 📦 The envelope = the HTTP request or response
- 🔖 `The labels on the envelope = the HTTP headers`
- Headers are the labels on the envelope that tell the postman:

    - Who sent the letter
    - Who it’s for
    - What’s inside
    - If it needs to be opened by a special person
    - If it should be returned
    - If it’s urgent

In the online world, this is how websites and browsers talk.

## Analogy - 02

🌐 Real-World Analogy: Visiting a Restaurant 🍔
Now, let’s understand with another analogy — a restaurant.

- 🧍 You = the client (like Chrome or Firefox)
- 🧑‍🍳 Waiter = the server
- 🧾 Order slip = HTTP request
- 🍽️ Dish you get back = HTTP response
- 💬 Notes on the order slip = HTTP headers

## Example - 1
### In `JavaScript` (fetch API)
```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here',
  },
  body: JSON.stringify({ key: 'value' })
});
```

## Example - 2

### In `NodeJS (ExpressJS)`
```javascript
app.get('/data', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify({ message: "Hello World" }));
});
```