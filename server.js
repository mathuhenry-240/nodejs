const app = require('express')()
const http = require('http').Server(app)
const cors = require('cors')
const bodyparser = require('body-parser')


require('dotenv')


app.use(cors())

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())


app.listen(process.env.PORT, ()=>console.log(`server is running`))