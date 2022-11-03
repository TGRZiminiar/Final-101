import multer from "multer"
// set storage
var storage = multer.diskStorage({
    //@ts-ignore
    destination : function ( req , file , cb ){
        cb(null, 'uploads')
    },
    //@ts-ignore
    filename : function (req, file , cb){
        // image.jpg
        cb(null, Date.now() + "--" + file.originalname)
    }
})
const store = multer({ storage : storage });
export default store;