import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if(!token) {
            return res.json({success: false, message: 'Access denied!'});
        }
        const token_decode = jwt.verify(token, process.env.APIKEY);

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: 'Access denied!'});
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'Something went wrong!'})
        
    }
}
export default adminAuth;