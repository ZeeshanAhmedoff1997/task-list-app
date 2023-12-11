const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('../models/task');

const { JWT_SECRET } = process.env;
const MIN_PASSWORD_LENGTH = 7;
const INVALID_PASSWORD_MESSAGE = 'Password can not contain "password"';
const INVALID_EMAIL_MESSAGE = 'Email is invalid';
const POSITIVE_AGE_MESSAGE = 'Age must be a positive number';
const UNABLE_TO_LOGIN_MESSAGE = 'Unable to login';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(INVALID_EMAIL_MESSAGE);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: MIN_PASSWORD_LENGTH,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error(INVALID_PASSWORD_MESSAGE);
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error(POSITIVE_AGE_MESSAGE);
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const { _id, name, email, age } = user.toObject();

  return { _id, name, email, age };
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET || 'secret');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(UNABLE_TO_LOGIN_MESSAGE);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(UNABLE_TO_LOGIN_MESSAGE);
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
