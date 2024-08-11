class User {
  constructor(username, email, image, password, role, createdAt, updatedAt) {
    this.username = username;
    this.email = email;
    this.image = image;
    this.password = password;
    this.role = role || "buyer";
    this.createdAt = createdAt;
    this.updatedAt = updatedAt
  }
}

export default User;
