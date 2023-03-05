const users = require('../data/users.json')
const bcrypt = require('bcrypt')
const fs = require('fs')

exports.signUp = async (req,res)=>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    users.push(user);

    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "There was an error saving the user, please try again",
        });
      }
      res.status(201).json({ message: "Sign up successful" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

exports.login = async (req,res)=>{
  const userDetails = getUsers();
  const userSignedUp = userDetails.find((user) => {
    return user.email === req.body.email;
  });

  if (userSignedUp === null) {
    return res.status(400).send("Cannot find user");
  }

  const authUsername = await bcrypt.compare(
    req.body.password,
    userSignedUp.password
  );

  try {
    if (authUsername) {
      res.send('Login Sucessful');
    } else {
      res.send("Login Failed");
    }
  } catch {
    res.status(500).send();
  }
}

function getUsers() {
  const usersFromFile = fs.readFileSync("./data/users.json");
  return JSON.parse(usersFromFile);
}