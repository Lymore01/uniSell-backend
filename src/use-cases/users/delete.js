class Delete {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    return await this.userRepository.delete(userId);
  }
}


export default Delete;