import {
  Schema,
  model
} from 'mongoose';

export const NotificationModel = model(
  'Notification',
  Schema({
    channel: {
      type: String,
      required: true,
      enum: ['email', 'sms', 'app']
    },
    recipients: [{
      type: String,
      required: true
    }],
    school_id: Schema.Types.ObjectId,
    details: {
      type: String,
      required: true
    },

    send_date: {
      type: Date,
      required: true
    }
  }, {
    timestamps: true,
  }, ),
);