const router = require('express').Router();
const passport = require('passport');
const Message = require('../models/Message.model');

//create message
router.post('/', passport.authenticate('jwt', {session: false}), async (req,res) => {
    const newMessage = new Message(req.body)

    try{
        const savedMessage = await newMessage.save();

        return res.status(200).json(savedMessage);
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});

//get message

router.get('/:conversationId', passport.authenticate('jwt', {session: false}), async (req,res) => {
   
    try{
        const messages = await Message.find({conversationId: req.params.conversationId });

        return res.status(200).json(messages);
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});

module.exports = router;