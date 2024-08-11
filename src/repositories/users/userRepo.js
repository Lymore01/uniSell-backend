import User from "../../frameworks/database/models/user.js";
import bcrypt from "bcryptjs"

class UserRepository {
  async save(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findById(userId) {
    if (!userId) {
      throw new Error("invalid id!");
    }
    const user = await User.findById({_id:userId});
    return user;
  }

  async delete(userId){
    if (!userId) {
        throw new Error("invalid id, cannot delete!");
      }
    try {
        await User.findOneAndDelete({_id:userId})
        return true
    } catch (error) {
        throw new Error("Cannot delete user!")
    }
  }

  async update(userId, updatedUser){
    try {
        const updated = await User.findOneAndUpdate({_id:userId}, {
            $set:updatedUser
        }, {
            new : true
        })

        return updated;
    } catch (error) {
        throw new Error(`Error updating user data!`);
    }
  }

  async login(email, password){
    const user = await User.findOne({ email: email})
    if (!user) {
      throw new Error("invalid email or password")
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("invalid email or password")
    }
    return user
  }
}

export default UserRepository;
