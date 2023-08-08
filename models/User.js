const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/]
    },

    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


// Initialize our User model
const User = model('User', userSchema);

module.exports = {User};
