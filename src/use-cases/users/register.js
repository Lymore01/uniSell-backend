class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(usersData) {
    return await this.userRepository.save(usersData);
  }
}

export default RegisterUser;
