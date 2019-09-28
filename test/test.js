const express = require('express');

const app = express();

app.use(express.static('src'));
app.use(express.static('test'));

const port = 3000;
app.listen(port, () => console.log(`resize-base64-promise test server listening on port ${port}!`));
