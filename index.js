const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const userRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route');
const conversationRoute =  require('./routes/conversation.route');
const messageRoute =  require('./routes/message.route');

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDb was connected!');
});

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

app.get("/", (req, res) => {
    res.send({message: 'Welcome guys!'});
})

app.listen(process.env.PORT, () => {
    console.log(`Backend is running on ${process.env.PORT}!`);
});
