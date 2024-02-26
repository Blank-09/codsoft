const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9_]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid username!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
