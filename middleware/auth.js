import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config()

export default function (req,res, next) {
  
  if (req.session.token) {
    const decoded = jwt.decode(req.session.token, process.env.JWT_SECRET)
    if (!decoded) {
      res.redirect('/')
      return
    }
    next()
    return
  }
  res.redirect('/')
}