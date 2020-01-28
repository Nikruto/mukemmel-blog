const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();
const verifyMiddleware = require('../auth/verifyMiddleware.js');
const Post = require('../../../models/post.js');

route.post('/createpost',verifyMiddleware,(req,res)=> {
    const {title,slug,imageLink,details} = req.body;
    if(!title || !slug || !details)
        {
            return res.json({success:false,msg:'Tüm alanlar doldurulmalı'});
        }else{
            Post.findOne({slug},(err,post) => {
                if(err){
                    return res.json({success:false,msg:'Server hatası'});
                }

                if(post)
                    {
                        return res.json({success:false,msg:'Slug zaten kullanımda'});
                    }else{
                        let newPost = new Post({
                            title,slug,details,date:Date.now(),imageUrl:imageLink ? imageLink : null
                        });
                        newPost.save();
                        return res.json({success:true});
                    }
            })

        }

})

module.exports = route;