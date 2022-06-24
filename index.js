const http = require("http");

const PORT = 3000;

// STAGE 1
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         //'Content-Type' : 'text/plain'
//         'Content-Type' : 'application/json'
//     })
//     res.end(JSON.stringify({id: 1, name: 'Sir Isaac Newton'}));
// })

// STAGE 2
// const server = http.createServer();

// server.on("request", (req, res) => {
//   if (req.url === "/friends") {
//     // res.writeHead(200, {
//     //   //'Content-Type' : 'text/plain'
//     //   "Content-Type": "application/json",
//     // });
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');

//     res.end(JSON.stringify({ id: 1, name: "Sir Isaac Newton" }));
//   } else if(req.url === '/messages') {
//     res.setHeader('Content-Type', 'text/html');

//     res.write('<html>');
//     res.write('<body>');
//     res.write('<ul>');
//     res.write('<li>Hello Isaac!</li>');
//     res.write('</ul>');
//     res.write('</body>');
//     res.write('</html>');
//     res.end();
//   } else {
//     res.statusCode = 404;
//     res.end();
//   }
// });

// STAGE 3
// const server = http.createServer();

// const friends = [
//   { id: 0, name: "Sir Isaac Newton" },
//   { id: 1, name: "Sir Nikola Tesla" },
//   { id: 2, name: "Sir Albert Einstein" },
// ];

// server.on("request", (req, res) => {
//   const items = req.url.split("/");
//   if (items[1] === "friends") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     if (items.length === 3) {
//       const friendIndex = Number(items[2]);
//       res.end(JSON.stringify(friends[friendIndex]));
//     } else {
//       res.end(JSON.stringify(friends));
//       cosnt;
//     }
//   } else if (items[1] === "messages") {
//     res.setHeader("Content-Type", "text/html");
//     res.write("<html>");
//     res.write("<body>");
//     res.write("<ul>");
//     res.write("<li>Hello Isaac!</li>");
//     res.write("</ul>");
//     res.write("</body>");
//     res.write("</html>");
//     res.end();
//   } else {
//     res.statusCode = 404;
//     res.end();
//   }
// });

// STAGE 4
const server = http.createServer();

const friends = [
  { id: 0, name: "Sir Isaac Newton" },
  { id: 1, name: "Sir Nikola Tesla" },
  { id: 2, name: "Sir Albert Einstein" },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log("Request:", friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac!</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

//fetch("http://localhost:3000/friends", {method: "POST", body : JSON.stringify({ id: 3, name: 'Grace Hopper'})}).then(response => response.json()).then(friend => console.log(friend))

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
