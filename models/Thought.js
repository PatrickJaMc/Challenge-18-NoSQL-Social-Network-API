const { Schema, model } = require('mongoose');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
      },
  
      reactionBody: {
          Type: String,
          // required: true,
          // maxLength: 280
      },
  
      username: {
          Type: String,
          // required: true
      },
  
  createdAt: {
          type: Date,
          default: Date.now
      }
    },
    
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );


// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    username: {
        Type: String,
        // required: true
    },

    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Initialize our User model
const Thought = model('Thought', thoughtSchema);


module.exports = {Thought};
