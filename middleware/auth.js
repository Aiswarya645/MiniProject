import jwt from 'jsonwebtoken'

export const verifytoken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: 'authorization token missing'});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, 'abc');
        req.user = decoded;
        console.log('token verified', decoded);
        next()
    } catch (error) {
        res.status(401).json({message: 'invalid or expired token', error:  error.message});
        console.log('token verification failed', error.message);
    }
}
