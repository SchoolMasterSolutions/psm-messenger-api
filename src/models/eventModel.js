import {
  Schema,
  model
} from 'mongoose';

export const EventModel = model(
  'Event',
  Schema({
    title: {
      type: String,
      required: true
    },

    details: {
      type: String,
      required: true
    },

    start_date: {
      type: Date,
      required: true
    },

    end_date: {
      type: Date,
      required: true
    },

    venue: {
      name: String,
      map: String
    },

    audience: {
      type: [String],
      enum: ['parents', 'teachers', 'admin']
    },

    author_id: {
      type: Schema.Types.ObjectId,
      required: true
    },

    linked_information: [{
      category: {
        type: String,
        enum: ['image', 'video', 'link']
      },

      value: String
    }],

    reminders: {
      enabled: Boolean,
      channel: {
        type: String,
        required: true,
        enum: ['email', 'sms', 'app']
      },

      frequency: {
        type: String,
        enum: ['1 year', '1 week', '1 day', '1 month', '1 hour', '15 minutes']
      }
    }


  }, {
    timestamps: true,
  }, ),
);