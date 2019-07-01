import {
  Schema,
  model
} from 'mongoose';

export const User = model(
  'User',
  Schema({
    category: {
      type: String,
      required: [true, 'The user category is required'],
      enum: ['staff', 'parent', 'admin']
    },

    email: {
      type: String,
      required: [true, 'The user email address is required.']
    },

    given_name: {
      type: String,
      required: [true, 'The user given name is required.']
    },

    middle_name: {
      type: String,
      required: false
    },

    family_name: {
      type: String,
      required: false
    },

    bio: {
      type: String,
      required: false
    }
  }, {
    timestamps: true,
  }, ),
);