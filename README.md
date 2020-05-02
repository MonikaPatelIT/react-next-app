# react-next-app
Simple React Next server side application


1. Create next app 

```
npx create-next-app react-next-app
cd canny-react-next-app
```

2. Install react and next 

```
npm install --save next react react-dom
```

3. Add Config/index.js file

```
console.log("config: dev");

const hostname = "http://localhost";
const port = 7000;

module.exports = {
  isDebug: true,
  isTest: false,
  isProd: false,
  hostname: hostname,
  port: port,
  apiUrl: `${hostname}:${port}/api`,
};

```

4. Add server.js file 

```
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

```

5. Add packages to packages.js 

```
"body-parser": "^1.19.0",
"cors": "^2.8.5",
"cross-env": "^7.0.2",
"express": "^4.16.3",
"react-scripts": "1.1.1",
"webpack": "^4.43.0"
```

6. Save packages.js and run `npm i`

7. Update scripts

```
"scripts": {
    "dev": "next dev",
    "dev-server": "cross-env NODE_ENV=development node server.js",
    "build": "next build",
    "start": "next start"
  }
  ```
  
  8. build next app `npm run build`
  
  9. now time to run app on server `npm run dev-server`
  
  NOTE: if there is an error 
![image](https://user-images.githubusercontent.com/9668906/80859872-ff660000-8cb7-11ea-8210-8ccdbd860a39.png)  
  
  Run `npm i cross-env`
  
  and re-run  `npm run dev-server`
  
  ![image](https://user-images.githubusercontent.com/9668906/80859868-fb39e280-8cb7-11ea-94e2-8d41cbc4c40b.png)


![image](https://user-images.githubusercontent.com/9668906/80859882-14429380-8cb8-11ea-805d-b7b430be98a6.png)

run client side app `npm run dev`

![image](https://user-images.githubusercontent.com/9668906/80859928-65528780-8cb8-11ea-8bc4-f94ff086cc63.png)

  
  
