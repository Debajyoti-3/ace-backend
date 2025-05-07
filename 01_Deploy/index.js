require('dotenv').config()

const express = require("express");
const app = express();

const port = process.env.PORT;

const githubAPI = {
    "login": "Debajyoti-3",
    "id": 168395271,
    "node_id": "U_kgDOCgmCBw",
    "avatar_url": "https://avatars.githubusercontent.com/u/168395271?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Debajyoti-3",
    "html_url": "https://github.com/Debajyoti-3",
    "followers_url": "https://api.github.com/users/Debajyoti-3/followers",
    "following_url": "https://api.github.com/users/Debajyoti-3/following{/other_user}",
    "gists_url": "https://api.github.com/users/Debajyoti-3/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Debajyoti-3/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Debajyoti-3/subscriptions",
    "organizations_url": "https://api.github.com/users/Debajyoti-3/orgs",
    "repos_url": "https://api.github.com/users/Debajyoti-3/repos",
    "events_url": "https://api.github.com/users/Debajyoti-3/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Debajyoti-3/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "Debajyoti Mitra",
    "company": null,
    "blog": "",
    "location": "Kolkata, India",
    "email": null,
    "hireable": null,
    "bio": "Loving & Learning Tech...",
    "twitter_username": "DebajyotiM96200",
    "public_repos": 18,
    "public_gists": 0,
    "followers": 5,
    "following": 8,
    "created_at": "2024-04-29T03:57:06Z",
    "updated_at": "2025-04-13T20:03:39Z"
  }

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/twitter", (req, res) => {
  res.send(`debajyotimitra`);
});

app.get("/login", (req, res) => {
  res.send("<h1>Hello to the Backend Journey</h1>");
});
app.get("/instagram", (req, res) => {
  res.send("<h2>Choding Karo Mast Raho</h2>");
});

app.get('/github',(req,res)=>{
    res.json(githubAPI)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
