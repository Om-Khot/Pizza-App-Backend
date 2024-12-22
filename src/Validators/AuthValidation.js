import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../src/Config/serverConfig.js";

async function isLoggedIn(req, res, next) {

    const token = req.cookies["authToken"];
    console.log(token);

    if(!token){
        return res.status(401).json({
            success: false,
            data:{},
            error: "Not authorized",
            message: "No auth token found" 
        });
    }

    // if token is present, verify it
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("decoded is" ,decoded);

        if(!decoded){
            return res.status(401).json({
                success: false,
                data:{},
                error: "Token not verified",
                message: "Invalid auth token provided" 
            });
        }

        // if token is verified, allow user to access the route
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role
        }

        next();
    } catch (error) {
        console.error(error.name);
        return res.status(401).json({
            success: false,
            data:{},
            error: "Not authorized",
            message: "Invalid auth token provided" 
        });
    }
    
};

async function isAdmin(req, res, next) {
    if(req.user.role !== "ADMIN"){
        return res.status(401).json({
            success: false,
            data:{},
            error: "Not authorized",
            message: "User is not an admin" 
        });
    }
    next();
}

export { isLoggedIn , isAdmin };