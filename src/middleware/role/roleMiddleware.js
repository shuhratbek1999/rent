const jwt = require('jsonwebtoken')
const {secret_jwt} = require('../../startup/config')
function verifyRole(role) {
    return (req,res,next) => {
        try{
            if(req.currentUser.role !== role){
                return res.json({message: "Sizda bu amalni bajarish uchun ruxsat yo'q"})
            }
            next()
        }
        catch(err){
            res.status(401).json({message: "Avtorizatsiya xatosi!"})
        }
    }
}
module.exports = verifyRole