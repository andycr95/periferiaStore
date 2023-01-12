import express from 'express'
import productRouter from './routes/products'
import userRouter from './routes/users'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//Configuración de Swagger
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación del API PeriferiaStore",
      version: "1.0.0",
    },
    schemes: ["http"],
    servers: [{ url: "http://localhost:5000/" }],
  },
  apis: [
    `${__dirname}/routes/*.ts`,
    `${__dirname}/routes/*.js`,
  ],
};

const swaggerSpec = swaggerJSDoc(options);

dotenv.config()

//Configuracion de Express
const app = express()

app.use(express.json())
app.use(express.static('./src/public'))
app.use(bodyParser.json())
app.use(cors())


//Rutas
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)


//Inicialización del servidor
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
