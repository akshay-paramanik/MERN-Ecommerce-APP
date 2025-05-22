require('dotenv').config();
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Mongodb connected'))
.catch(err => console.error('connection error:',err)
)