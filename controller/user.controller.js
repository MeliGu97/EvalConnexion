import fs from 'node:fs'
import path from 'node:path'
import user from '../data/user.js';
import crypto from "crypto-js";
import jwt from 'jsonwebtoken';

const cwd = process.cwd()
const viewPath = path.join(cwd, 'views')

export function getFormInscription(req,res) {
  const html = fs.readFileSync(path.join(viewPath, 'formInscription.html'), {encoding: "utf8"})
  res.send(html)
}
export function getFormLogin(req,res) {
  const html = fs.readFileSync(path.join(viewPath, 'formLogin.html'), {encoding: "utf8"})
  res.send(html)
}

// #region AddUser
export async function addUser(req, res) {
  console.log(req.body);
  const { firstName, lastName, email, password, confirmPassword  } = req.body;

  if (!firstName || firstName.trim() === "" || !lastName || lastName.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "" || !confirmPassword || confirmPassword.trim() === "") {
    res.status(403).send("Malformed request");
    return;
  }
  if (password !== confirmPassword) {
    res.status(400).send("Passwords do not match");
    return;
  }
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      res.status(409).send("Email already exists");
      return;
    }

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: crypto.SHA1(password).toString()
    });

    await newUser.save();
    res.redirect("/login")
    // res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}


// #region Login
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || email.trim() === "" || !password || password.trim() === "") {
    req.session.token = false;
    console.log('connexion failed');
    res.status(403).send("Malformed request");
    return;
  }

  try {
    const userData = await user.findOne({ email });

    if (!userData || crypto.SHA1(password).toString() !== userData.password) {
      req.session.token = false;
      console.log('connexion failed');
      res.status(401).send("Wrong credentials");
      return;
    }

    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, { algorithm: "HS256" });

    console.log('connexion succeeded');
    req.session.token = token;
    res.redirect('/secure');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

// #region GetSecurePage
export function getSecurePage(req, res) {
  const html = fs.readFileSync(path.join(viewPath, 'secure.html'), {encoding: 'utf8'})
  res.send(html)
}


// #region Logout
export function logout (req,res) {
  req.session.destroy((err) => {
    if (err) {
      res.redirect('/secure')
      return
    }
    res.redirect("/")
  })
}
