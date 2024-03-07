const app = require('express')()
const http = require('http').Server(app)
const cors = require('cors')
const bodyparser = require('body-parser')
const port = 2024

require('./db.js')
require('dotenv')

const user = require('./routes/realuser.js')

app.use(cors())
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())


app.use('/api/',user)



app.listen(port, ()=>console.log(`server is running on port ${port}`))