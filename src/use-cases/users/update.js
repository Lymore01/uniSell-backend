class UpdateUser{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute(userId, newUserData){
        const existingUser = await this.userRepository.findById(userId)

        if (!existingUser){
            throw new Error(`User with ID ${prodId} not found.`);
        }


        const updatedUser =  {
            username: newUserData.username || existingUser.username,
            email: newUserData.email || existingUser.email,
            image: newUserData.image || existingUser.image,
            password: newUserData.password || existingUser.password,
            role: newUserData.role || existingUser.role,
            createdAt: existingUser.createdAt,
            updatedAt: new Date().toISOString()
        };

        return await this.userRepository.update(userId, updatedUser)
    }
}

export default UpdateUser;