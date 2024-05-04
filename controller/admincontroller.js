const admin = require("../model/admin");
let jwtdata = require('jsonwebtoken');
let bcrypt = require('bcrypt');

module.exports.register = async(req,res)=>{
    try {
        // console.log(req.body);
        let rechekemail = await admin.findOne({email:req.body.email});
        if (rechekemail) {
            return res.status(400).json({mes :'email is alerdy exited',status :0})
           
        } else {
            let cpass = req.body.cpass
            if(cpass==req.body.password){
                req.body.ISActive = true;
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let radmin = await admin.create(req.body);
                if(radmin){
                    return res.status(200).json({mes :'admin data register',status :1,adr:radmin})
                }
                else{
                    return res.status(400).json({mes :'admin data not register',status :0})
                }
            }
            else{
                return res.status(400).json({mes:"password is not match",status:0})
            }
        }
       
    } catch (error) {
        console.log("register time error",error);
        return res.status(400).json({mes :'insert time errr',status :0})
        
    }
}
module.exports.login = async(req,res)=>{
    try {
        let chekemailadmin = await admin.findOne({email:req.body.email})
        if (chekemailadmin) {
            if (await bcrypt.compare(req.body.password, chekemailadmin.password)) {
                let token = await jwtdata.sign({ Admindata: chekemailadmin }, 'akshar', { expiresIn: '1h' });
                return res.status(200).json({ mes: 'Login is success', status: 1, record: token });
            }
            else{
                return res.status(400).json({ mes: 'Login is unsuccess', status: 0 });
            }

        } else {
            return res.status(400).json({ mes: 'login data not found', status: 0 });
            
        }
    } catch (error) {
        console.log("register time error",error);
        return res.status(400).json({mes :'login time errr',status :0})
    }   
}
