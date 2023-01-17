// Dependencies imports
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

// Files imports

const app = express()
const PORT = process.env.PORT || 8000

// Routes imports
const usersRouter = require('./routes/users.routes')
const authRouter = require('./routes/auth.routes')

// Cors settings
const whitelist = ['http://localhost:8000']
const corsOptions = {
  origin: (origin , callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback (null , true)
    } else {
      callback(new Error('Denied by CORS'))
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors())
  app.use(helmet({crossOriginResourcePolicy: false}))
} else {
  app.use(cors(corsOptions))
}

//  Accept json & form-urlencoded
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get('/', (req , res) => {
  res.status(200).json({
    status: 'up' ,
    maintenance: false
  })
})

app.use('/api/v1/users' , usersRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`)
})