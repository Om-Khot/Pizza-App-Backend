import { loginServ } from "../../Services/Auth/AuthService.js";

async function login(req, res) {
    try{
        const loginPayload = req.body;
        const response = await loginServ(loginPayload);

        res.cookie('authToken', response.token, { 
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        });
        return res.status(200).json({
            success: true,
            data: response
        });        
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            error: error.message
        });
    }
};

export { login };