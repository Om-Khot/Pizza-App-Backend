import { getUserServ } from "../Users/UserServ.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET,JWT_EXPIRY } from "../../Config/serverConfig.js";

async function loginServ(authDetails) {

    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // check if the user with above credentials exists
    const user = await getUserServ(authDetails);
    if(!user){
        throw {message: "User does not exists", statusCode: 400};
    };

    // now check if the password is correct or not
    const isPasswordCorrect = await bcrypt.compare(plainPassword, user.password);
    if(!isPasswordCorrect){
        throw {message: "Incorrect password", statusCode: 400};
    };

    // if password is correct, return the jwt token
    const UserRole = authDetails.role ? authDetails.role : "USER";
    console.log("UserRole is", UserRole);
    const token = jwt.sign({email: user.email, id: user._id, role : UserRole}, JWT_SECRET ,{
        expiresIn: JWT_EXPIRY
    });

    return {token, userData:{
        email: user.email,
        firstName: user.firstName,
        role: UserRole
    }};
};

export { loginServ };