import jsonwebtoken from "jsonwebtoken";

export default async function authenticateAccessToken(req, res, next) {
    try {
        /* 
        {
            'Authorization: Bearer <token>'
        }
        */
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        try {
            const user = await new Promise((resolve, reject) => {
                jsonwebtoken.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });

            req.user = user;
            next();
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired token", error: err.message });
        }

    } catch (error) {
        console.error("Auth error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}