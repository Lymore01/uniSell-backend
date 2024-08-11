class FindUserByID{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute(userId){
        const user = await this.userRepository.findById(userId)
        return user
    }
}

export default FindUserByID
