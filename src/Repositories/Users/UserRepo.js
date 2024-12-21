import User from "../../Schema/Users/UserSchema.js";

async function getUserByEmailORPhoneRepo(userId) {
    try{
        const user = await  User.findOne({
            $or: [
                {email: userId.email},
                {mobileNo: userId.mobileNo}
            ]
        }).exec();
        return user;
    }
    catch(error){
        throw {message : "Fail to get user from our side", statusCode: 500};
    }
};


async function createUserRepo(userDetails) {
    try{
        const newUser = await User.create(userDetails);
        return newUser;
    }
    catch(error){
        throw {message : "Fail to create new user", statusCode: 500};
    }
};

async function deleteUserRepo(userDetails) {
    try{
        const res = await User.deleteOne({
            $and: [
                {firstName: userDetails.firstName},
                {email: userDetails.email},
                {mobileNo: userDetails.mobileNo}
            ]
        });
        return res;
    }
    catch(error){
        throw {message : "Fail to delete user from our side", statusCode: 500};
    }
};

export {createUserRepo, getUserByEmailORPhoneRepo, deleteUserRepo};