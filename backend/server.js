import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'    
import routes from './routes/menuRoutes.js'
dotenv.config()
const app = express()
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '200mb' }))
app.use(cors()) 
import sequelize from './config/database.js'
app.get('/test', (req, res) => {
  res.send('Test successful');
});
sequelize.sync().then(() => {
    console.log("Synced db.");
  }).catch((err) => {
    console.log("Failed to sync db: " + err);
  });
app.use('/api', routes)
// server setup
const port = process.env.EXPRESS_PORT;



app.listen(port||2001,() => {
  console.log(`Server running on port ${port}`);
});

