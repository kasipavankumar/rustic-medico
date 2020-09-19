const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const __PORT__ = process.env.PORT || 5000;

app.listen(__PORT__, function () {
    console.log(`App listening on port ${__PORT__}`);
});
