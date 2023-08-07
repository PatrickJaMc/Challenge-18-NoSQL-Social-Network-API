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
        Type: Schema.Type.ObjectId,
        ref: 'Thought'
    }],

    friends: [{
        Type: Schema.Type.ObjectId,
        ref: "User"
    }]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
