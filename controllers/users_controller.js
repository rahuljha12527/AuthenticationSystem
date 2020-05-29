const User=require('../models/SignUp');
// render the sign up page
module.exports.signUp=function(req,res){
    return res.render('userSignUp',{
        title:"Authentication|Sign Up"
    })
}

module.exports.signIn=function(req,res){
    return res.render('user_signIn',{
        title:"Authentication| Sign In"
    })
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding the user in singing up');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating a user while signing up');
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });

    
}