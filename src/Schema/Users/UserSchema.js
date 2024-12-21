import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    mobileNo : {
        type: String,
        minlength: [10, 'Mobile number should be 10 digits'],
        required: [true, 'Mobile number is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
},{
    timestamps: true
});

UserSchema.pre('save', async function(){
    // modify password to hash for security
    const hassedPassword = await bcrypt.hash(this.password, 10);
    this.password = hassedPassword;
});

const User = mongoose.model('User', UserSchema);

export default User;