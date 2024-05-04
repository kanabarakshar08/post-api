    const post = require('../model/post');
    const joi = require('joi');
    const postvalidationscema = joi.object().keys({
        Title: joi.string().required(),
        Body:joi.string().required(),
        Created_by: joi.string().required(),
        latitude: joi.number().required(),
        longitude: joi.number().required()
    })
    module.exports.add_post = async(req,res)=>{
        try {
            // console.log(req.body);
    

            const result =postvalidationscema.validate(req.body);
            if(result.error){
                return res.status(200).send({error:result.error.details[0].message});
            }
            let latitude = parseFloat(req.body.latitude);
            let longitude = parseFloat(req.body.longitude);
            let location = {
                type: 'Point',
                coordinates: [longitude, latitude] 
            };
            req.body.location = location;
            req.body.ISActive = true;
            let postadd = await post.create(req.body);
            if (postadd) {
                return res.status(200).json({mes :'post inserted..',status :1,pad:postadd})
            } else {
                return res.status(400).json({mes :'post data is not found',status :0})
            }
            
        } catch (error) {
            console.log("post add time error",error);
            return res.status(400).json({mes :'post insert time errr',status :0})
        }
    }

module.exports.view_post = async(req,res)=>{
    try {
        let postview = await post.find({})
      
        if(postview){
            return res.status(200).json({mes:'view post data',status:1,vp : postview})
        }
        else{
            return res.status(200).json({mes:'view not data',status:0})

        }
        
    } catch (error) {
        console.log("post view time error",error);
        return res.status(400).json({mes :'post view time errr',status :0})
    }
}
module.exports.delete_post = async(req,res)=>{
    try {
        let dpost = await post.findByIdAndDelete(req.params.id);
        if (dpost) {
            return res.status(200).json({mes:'delete post data',status:1,vp : dpost})
        } else {
            return res.status(200).json({mes:'delete post data not found',status:0})
            
        }
    } catch (error) {
        console.log("post deletedelete time error",error);
        return res.status(400).json({mes :'post delete time errr',status :0})
    }
}
module.exports.update_post = async(req,res)=>{
    try {
        let upost = await post.findByIdAndUpdate(req.params.id,req.body);
        // console.log(upost);
        // return
        if (upost) {
            return res.status(200).json({mes:'update post data',status:1,vp : upost})
        } else {
            return res.status(200).json({mes:'update post data not found',status:0})
            
        }
    } catch (error) {
        console.log("post update time error",error);
        return res.status(400).json({mes :'post update time errr',status :0})
    }
}
module.exports.isactivedata = async(req,res)=>{
    try {
        let apost = await post.findByIdAndUpdate(req.params.id,{ISActive:true})
        if (apost) {
            return res.status(200).json({mes:'post data actve',status:1,vp : apost})
        } else {
            return res.status(200).json({mes:'post data not actve',status:0})
        }
        
    } catch (error) {
        console.log("post active time error",error);
        return res.status(400).json({mes :'post avtive time errr',status :0})
    }
}
module.exports.isdactivedata = async(req,res)=>{
    try {
        let apost = await post.findByIdAndUpdate(req.params.id,{ISActive:false})
        if (apost) {
            return res.status(200).json({mes:'post data actve',status:1,vp : apost})
        } else {
            return res.status(200).json({mes:'post data not actve',status:0})
        }
        
    } catch (error) {
        console.log("post active time error",error);
        return res.status(400).json({mes :'post avtive time errr',status :0})
    }
}
module.exports.dashbord = async(req,res)=>{
    try {
        let activeCount = await post.find({ ISActive: true }).countDocuments();
        // console.log("active count..", activeCount);
        let deactive = await post.find({ ISActive: false }).countDocuments();
        // console.log("deactive count..", deactive);
        if(activeCount && deactive){
            return res.status(200).json({mes:'active and deative post..',status:1,data:[{
                ac:activeCount,
                dc:deactive, 
            }]})
        }else{
            return res.status(400).json({mes:'post data is not found....',status:0})
        }
        
    } catch (error) {
        return res.status(400).json({mes:'server error..',status:0,em:error})
    }
}