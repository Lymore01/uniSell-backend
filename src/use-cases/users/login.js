import jsonwebtoken from 'jsonwebtoken'


class LoginUser{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute(email, password){    
        const user = await this.userRepository.login(email, password)
        if(user){
            
            try {
                const token = jsonwebtoken.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'})
                const refreshToken = jsonwebtoken.sign({ userId: user._id }, process.env.JWT_ACCESS_TOKEN)
                return {token, refreshToken}
            } catch (error) {
                return `Error ${error}`
            }
        }else{
            return "No user!"
        }
    }
}

export default LoginUser;

// interact with jwt
// handle entries validation in controllers