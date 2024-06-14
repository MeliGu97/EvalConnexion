import mongoose from "./index.js";

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
})

export default mongoose.model('users', userSchema)


// const user = {
//   login : "Alan",
//   password : "73a056240baf641c8dc2c9bab20e0c2b457bd6e4" // correspond à "4l4n"
// }

// export default user