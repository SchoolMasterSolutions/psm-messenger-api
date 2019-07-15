import {
  Schema,
  model
} from 'mongoose';
import * as crypto from "bcrypt";

let UserSchema = Schema({
    affiliations: [{
      school_id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      category: {
        type: String,
        required: true,
        enum: ['parent', 'teacher']
      }
    }],

    children: [{
      school_id: {
        type: Schema.Types.ObjectId,
        required: true
      },

      student_id: {
        type: Schema.Types.ObjectId,
        required: true
      },

      relationship: {
        type: String,
        required: true,
        enum: ['father', 'mother', 'brother', 'sister', 'guardian']
      }
    }],

    account: {
      preferred_username: {
        type: String,
        required: true,
        unique: true
      },

      password: {
        type: String,
        required: true
      },

      is_active: {
        type: Boolean,
        default: false
      },

      reset_password_token: String,
      reset_password_token_expiration: Date
    },

    profile: {
      email: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      },
      date_of_birth: {
        type: Date,
        required: false
      }
    }

  }, {
    timestamps: true,
  }, );

const SALT_WORK_FACTOR = 10

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('account.password')) return next()

  crypto.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    crypto.hash(user.account.password, salt, (error, hash) => {
      if (error) return next(error);
      user.account.password = hash;

      user.account.reset_password_token = null
      user.account.reset_password_token_expiration = null
      next();
    });
  });
});

export const UserModel = model('User', UserSchema);