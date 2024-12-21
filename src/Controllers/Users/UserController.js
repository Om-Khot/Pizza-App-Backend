import { createNewUserServ, deleteUserServ, getUserServ } from "../../Services/Users/UserServ.js";

async function createNewUser(req, res) {
    try {
        const newUser = await createNewUserServ(req.body);
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode).json({
            success : false,
            error: error.message
        });
    }
};

async function deleteUser(req, res) {
    try {
        const response = await deleteUserServ(req.body);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            error: error.message
        });
    };
}

async function getUser(req, res) {
    try {
        const user = await getUserServ(req.body);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        else{
            return res.status(200).json({
                success: true,
                message: "User found",
                data: user
            });
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success : false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export { createNewUser, deleteUser , getUser};