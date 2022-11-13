import multer from "multer"
// set storage
var storage = multer.diskStorage({
    //@ts-ignore
    destination : function ( req , file , cb ){
        cb(null, 'uploads')
    },
    //@ts-ignore
    filename : function (req, file , cb){
        // // image.jpg
        // cb(null, Date.now() + "--" + file.originalname)
        //@ts-ignore
        req.imageName = new Date().toISOString().replace(/:/g, '-') + file.originalname.trim(); 
        //@ts-ignore
        cb(null, req.imageName)
        // console.log(req.file?.path)
        var fullUrl = req.protocol + '://' + req.get('host');
        console.log("THIS IS REQ PROTOCOL",fullUrl)
    }
})
const store = multer({ storage : storage });
export default store;
//http://localhost:5000uploads\2022-11-13T09-29-16.821Zuser history.jpg
//http://localhost:5000/uploads\\2022-11-13T08-48-19.827ZSummary&sweet alert.jpg