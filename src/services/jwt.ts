import JWT from "jsonwebtoken";
import { prisma } from "../clients/db";
import { User } from "@prisma/client";


const JWT_SECRET = "acasikn3413$!#$381r1#ajklfnasf"

class JWTService {
    public static generateTokenForUser(user: User) {
        const payload = {
            id: user?.id,
            email: user?.email,
        }

        const token = JWT.sign(payload, JWT_SECRET, {})
        return token
    }
}


export default JWTService