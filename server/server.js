import fs from 'fs/promises';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3020;

// Enable CORS for all routes
app.use(cors());

let storeItems;

fs.readFile('./data/items.json', 'utf-8')
    .then(data => {
        storeItems = JSON.parse(data);
    })
    .catch(err => {
        console.error('Error reading file from disk:', err);
    });


app.get('/', (req, res) => {
    res.send('Hello bob!');
});

app.get('/store', (req, res) => {
    if (!storeItems) {
        return res.status(500).send('Store items not loaded yet');
    }
    setTimeout(() => res.json(storeItems), 500)

});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});