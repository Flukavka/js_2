import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/', (req, res) => {
    console.log('request body - \n', req.body);
    res.send(`hello ${req.body.name}`);
});

app.listen('8000', () => {
    console.log('server is starting');
});