import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs"


async function validateAccessToken(token) {
  if (!token) {
    return "Invalid token";
  }

  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) {
        reject(`Error: ${err.message}`);
      }
      if (user) {
        resolve(user);
      } else {
        resolve(false);
      }
    });
  });
}

class userController {
  constructor({
    deleteUser,
    findUserByID,
    loginUser,
    registerUser,
    updateUser,
   
  }) {
    this.deleteUser = deleteUser;
    this.findUserByID = findUserByID;
    this.loginUser = loginUser;
    this.registerUser = registerUser;
    this.updateUser = updateUser;
  }

  async signUp(req, res) {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      image: req.body.image,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
    };
    try {
      const user = await this.registerUser.execute(userData);
      res.status(201).json({ message: "User Registered successfully!", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const {token, refreshToken} = await this.loginUser.execute(email, password);
      if (!token) {
        res.status(400).json({ message: "Invalid access token" });
      }
      // validate access token
      const user = await validateAccessToken(token);
      if (user) {
        res.status(200).json({ message: "User logged in successfully!", accessToken:token, refreshToken:refreshToken });
      } else {
        res.sendStatus(500);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

  async findUser(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Please provide an id!" });
    }
    try {
      const user = await this.findUserByID.execute(id);
      if (user) {
        res
          .status(200)
          .json({ message: `User ${id} fetched successfully!`, user });
      } else {
        res.status(400).json({ message: "No user found!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Please provide an id!" });
    }
    try {
      const results = await this.deleteUser.execute(id);
      if (results) {
        res.status(200).json({ message: `User ${id} deleted successfully!` });
      } else {
        res.status(400).json({ message: "Error deleting user!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Please provide an id!" });
    }
    try {
      const newUserData =  {
        username : req.body.username,
        email : req.body.email,
        image : req.body.image,
        password : req.body.password,
        role : req.body.role,
      }
    
      const updatedUser = await this.updateUser.execute(id, newUserData);
      if (updatedUser) {
        res
          .status(200)
          .json({ message: `User ${id} updated successfully!`, updatedUser });
      } else {
        res.status(400).json({ message: "Error updating user!" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  }

}

export default userController;
