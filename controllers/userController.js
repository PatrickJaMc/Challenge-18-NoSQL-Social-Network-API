const {User, Thought} = require('../models');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('Thought');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
      console.log(`User created`);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  //Update a user
  async updateUser (req, res) {
    try{
      const user = User.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: req.body,
        new: true
      });
      res.json(user);
      console.log(`Updated ${user}`);
    } catch (err){
        res.status(500).json(err);
    }
  },

  //Delete a user
  async deleteUser (req, res) {
    try{
     const user = User.findOneAndDelete({
        _id: req.params.id
     });
     res.json(user);
     console.log(`Deleted ${user}`);
    } catch (err) {
        res.status(500).json(err)
    }
  },

  //Add friend
  async addFriend(req, res) {
    try{
     const newFriend = User.findOneAndUpdate(
        {_id: req.params.id },
        { $addToSet:  {friends: req.params.friendsId}},
        { new: true}
        );
     res.json(newFriend);
     console.log(`New friend ${newFriend} added`);
    } catch(err) {
        res.status(500).json(err)
    }
  },

  //Remove friend
  async removeFriend(req, res) {
    try{
      removeFriend = User.findOneAndUpdate(
      { _id: req.params.id},
      { $pull: { friends: req.params.friendsId}}, 
      {new: true}
      )
    } catch (err) {
        res.status(500).json(err)
    }
  }
};
