const users = require("../data/users.json");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
      id: uuidv4(),
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
};

exports.login = async (req, res) => {
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
      res.send("Login Sucessful");
    } else {
      res.send("Login Failed");
    }
  } catch {
    res.status(500).send();
  }
};

exports.resetEmail = async (req, res) => {
  const { id, email } = req.body;
  console.log(id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: `User with ID ${id} not found` });
  }

  user.email = email;
  fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error updating user data" });
    }
    res.json({ message: `Email updated for user with ID ${id}`, user });
  });
};

exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` });
    }
    user.password = hashedPass;

    fs.writeFile("./data/users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating user data" });
      }
      res.json({
        message: `Password updated for user with email ${email}`,
        user,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.list = async (req, res) => {
  const limitedUsers = users.map(({ id, email }) => ({ id, email }));
  res.json(limitedUsers);
};

function getUsers() {
  const usersFromFile = fs.readFileSync("./data/users.json");
  return JSON.parse(usersFromFile);
}
