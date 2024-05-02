const router = require('express').Router();
const passport = require('passport');
const Conversation = require('../models/Conversation.model');
const errorHandler = require('../utils/errorHandler');


//create conversation
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
  
    try {
      // Check if a conversation already exists with the given members
      const existingConv = await Conversation.findOne({
        members: { $all: [senderId, receiverId] }
      });
  
      if (existingConv) {
        // Conversation already exists, return it
        return res.status(200).json(existingConv);
      } else {
        // Create a new conversation
        const newConv = new Conversation({
          members: [senderId, receiverId]
        });
  
        const savedConv = await newConv.save();
  
        return res.status(200).json(savedConv);
      }
    } catch (e) {
      console.log(e);
      errorHandler(e, res);
    }
  });

//get conversation

router.get('/:userId', passport.authenticate('jwt', {session: false}), async (req,res) => {
   
    try{
        const conversation = await Conversation.find({members: {$in: [req.params.userId]} });

        return res.status(200).json(conversation);
    } catch (e) {
        console.log(e);
        errorHandler(e, res);
    }
});



module.exports = router;