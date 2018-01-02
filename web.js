let express = require('express');
let app = express();
let path = require('path');

app.use(express.static(path.join(process.cwd(), 'app')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

console.log(process.env.PORT || 5000);
app.listen(process.env.PORT || 5000);