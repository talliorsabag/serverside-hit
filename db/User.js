//tal sabag - 042836023;
//rotem zagori-316389378
const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

//User schema:
const UserSchema = new Schema(
  {
    id: {
      // will be genreated by AutoIncrement
      type: Number,
      unique: true,
    },

    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    birthday: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { id: "user_id_seq", inc_field: "id" });
module.exports = mongoose.model("User", UserSchema);
