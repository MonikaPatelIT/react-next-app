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
