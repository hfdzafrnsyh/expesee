const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

routes(app);

app.listen(PORT, () => {
    console.log(`Server Run in ${PORT}`);
})