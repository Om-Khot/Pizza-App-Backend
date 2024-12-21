import { createUserRepo, deleteUserRepo, getUserByEmailORPhoneRepo } from "../../Repositories/Users/UserRepo.js";


async function getUserServ(userDetails){
    try {
        const user = {
            email: userDetails.email ? userDetails.email : null,
            mobileNo: userDetails.mobileNo ? userDetails.mobileNo : null
        };
        const res = await getUserByEmailORPhoneRepo(user);
        return res;
    } catch (error) {
        console.log(error);
    }
};



async function createNewUserServ(userDetails) {

    // before creating new user, check if user already exists
    const userExists = await getUserServ(userDetails);

    if(userExists){
        throw {message: "User already exists", statusCode: 400};
    }
    // if user does not exist, create new user
    try{
        const newUser = await createUserRepo({
            firstName: userDetails.firstName,
            lastName:userDetails.lastName,
            mobileNo: userDetails.mobileNo,
            email: userDetails.email,
            password: userDetails.password,
            role: userDetails.role
        });
        return newUser;
    }
    catch(error){
        throw {message : "Fail to create new user", statusCode: 500};
    }
};


async function deleteUserServ(userDetails) {

    // check that user exists or not
    const userExists = await getUserServ(userDetails);
    if(!userExists){
        throw {message: "User does not exists", statusCode: 400};
    }
    // if user exists, delete user
    try{
        const res = await deleteUserRepo(userDetails);
        return res;
    }
    catch(error){
        throw {message : "Fail to delete user", statusCode: 500};
    }
}
export {createNewUserServ, getUserServ, deleteUserServ};