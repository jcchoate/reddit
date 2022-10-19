require('dotenv').config()
const express = require('express')
const massive = require('massive')

const app = express()
app.use(express.json())

let { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env
app.use( express.static( `${__dirname}/../build` ) );
const baseURL = 'https://www.reddit.com/r/pics/.json?jsonp='

massive(CONNECTION_STRING).then(db =>
    app.set('db', db)
)

app.get(baseURL, (req,res) => {
    if (req){
        res.status(200).send(req)
    }else{
        res.status(500).send('Error')
    }
})


app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} troops at your command, my lord.`)
})
