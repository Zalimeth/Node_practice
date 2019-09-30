const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
// app.use((req, res, next) => {
//     res.render('maintainence.hbs');
// })
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    const current_time = new Date().toString();
    const method = req.method;
    const url = req.url;
    const text = `${current_time}:${method},${url}`
    console.log(text);
    fs.appendFile('server.log', text + '\n', (error) => {
        if (error)
            console.log("Unable to append file")
    });
    next();
})
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
    const date = new Date().getFullYear();
    return date;
})
hbs.registerHelper("upper", (text) => {
    const new_text = text.toUpperCase();
    return new_text;
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        greetings: "Hi world!",
        message: "This website is made by Nguyen The Beast",
        name: "Vo Song Nguyen",
        title: "Home Page",
    })
}
)
app.get('/details', (req, res) => {
    res.render('details.hbs', {
        name: "Vo Song Nguyen",
        nickname: "Nguyen The Beast",
        age: "18",
        country: "Viet Nam",
        university: "HCMUS",
        title: "Details"
    });
})
app.get('/error', (req, res) => {
    const errorMessage = "<h2>Oh no something went wrong ...</h2>"
    res.send(errorMessage);
})
app.listen(PORT, () => {
    console.log("Rendering...")
})