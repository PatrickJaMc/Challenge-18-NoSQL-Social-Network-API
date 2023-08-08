const {User, Thought} = require('../models');

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('Thought');
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
      console.log(`Thought created`);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  //Update a thought
  async updateThought (req, res) {
    try{
      const thought = Thought.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: req.body,
        new: true
      });
      res.json(thought);
      console.log(`Thought updated`);
    } catch (err){
        res.status(500).json(err);
    }
  },

  //Delete a thought
  async deleteThought (req, res) {
    try{
     const thought = Thought.findOneAndDelete({
        _id: req.params.id
     });
     res.json(thought);
     console.log(`Deleted thought`);
    } catch (err) {
        res.status(500).json(err)
    };
  },
}
