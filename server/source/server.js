const app = require('./app');

const __PORT__ = 5000;

app.listen(__PORT__, function () {
  console.log(`App listening on port ${__PORT__}`);
});
