const nextApp = require("next");
const express = require("express");
const { parse } = require("url");
var bodyParser = require("body-parser");
const cors = require("cors");
const { isProd, port } = require("./config");

const nextServer = nextApp({ dev: !isProd });
const handle = nextServer.getRequestHandler();

nextServer.prepare().then(() => {
  const app = express();
  app.enable("trust proxy");
  app.use(cors({ credentials: true, origin: "*" }));
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());

  // test api
  //----------------------
  app.get("/api/ping", function (req, res, next) {
    res.status(200).send({
      type: "ball",
      name: "pong",
    });
    next();
  });

  // NextJS static handling
  //----------------------
  app.use((req, res, next) => {
    const parsedUrl = parse(req.url, true);
    if (parsedUrl.pathname === "/service-worker.js") {
      const filePath = join(__dirname, "../.next", parsedUrl.pathname);
      return nextServer.serveStatic(req, res, filePath);
    }
    if (parsedUrl.pathname.indexOf("/.well-known") > -1) {
      const path = join(__dirname, "../static", parsedUrl.pathname);
      return nextServer.serveStatic(req, res, path);
    }

    return next();
  });

  app.get("*", (req, res) => handle(req, res));

  app.listen(port, () => {
    console.info(`App is served at ${port}\n`); // eslint-disable-line no-console
  });
});
