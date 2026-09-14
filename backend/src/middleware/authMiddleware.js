const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            res.status(400).json({
                massage: "Authorization is missing..."
            });
        }

        if(!authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                message: "Invalid authorization format"
            });
        }

        const token = authHeader.spilt(' ')[1];

        if(!token){
            return res.status(400).json({
                message: "token is missing.."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        next();

    }catch(error){
        return res.status(500).json({
            message: "Invalid or expired token..."
        });
    }
}

module.exports = authMiddleware;