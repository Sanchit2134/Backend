import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },  //whenever we create user using mongoose then the user will be created in this cartData. cartData is unable. bcz mongoose neglect the properties where we have one empty object
    
}, { minimize: false });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

