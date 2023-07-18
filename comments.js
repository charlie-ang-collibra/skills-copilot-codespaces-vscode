// Create web server

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const comments = [
  {
    name: "张三",
    message: "今天天气不错！",
    dateTime: "2015-10-16"
  },
  {
    name: "张三2",
    message: "今天天气不错！",
    dateTime: "2015-10-16"
  },
  {
    name: "张三3",
    message: "今天天气不错！",
    dateTime: "2015-10-16"
  },
  {
    name: "张三4",
    message: "今天天气不错！",
    dateTime: "2015-10-16"
  },
  {
    name: "张三5",
    message: "今天天气不错！",
    dateTime: "2015-10-16"
  }
];

http
  .createServer(function(req, res) {
    let parseObj = url.parse(req.url, true);
    let pathname = parseObj.pathname;
    if (pathname === "/") {
      fs.readFile(
        path.join(__dirname, "./views/index.html"),
        "utf-8",
        (err, data) => {
          if (err) {
            return res.end("404 Not Found");
          }
          let htmlStr = template.render(data.toString(), {
            comments: comments
          });
          res.end(htmlStr);
        }
      );
    } else if (pathname === "/post") {
      fs.readFile(
        path.join(__dirname, "./views/post.html"),
        "utf-8",
        (err, data) => {
          if (err) {
            return res.end("404 Not Found");
          }
          res.end(data);
        }
      );
    } else if (pathname.indexOf("/public/") === 0) {
      fs.readFile(path.join(__dirname, pathname), (err, data) => {
        if (err) {
          return res.end("404 Not Found");
        }
        res.end(data);
      });
    } else if (pathname === "/pinglun") {
      let comment = parseObj.query;
      comment.dateTime = "2019-11-11";
      comments.unshift(comment);
      res.statusCode = 302;
      res.setHeader("Location",

