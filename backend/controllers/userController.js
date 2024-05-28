import userModel from '../models/userModel.js'
export const loginController = async(req,res) => {
    try {
        const {email,password} = req.body
        if (!email) {
            return res.send({ message: "Email is Required" });
          }
          if (!password) {
            return res.send({ message: "Password is Required" });
          } 
    
        const user = await userModel.findOne({email,password})
        if(!user){
            return res.status(404).send('user not found')
        }
        res.status(200).send({
            success :true,
            message : "User login successfully",
            user

        })
       
    } catch (error) {
        res.status(400).send({
            success:false,
            message : "Error in Login",
            error
        })
        console.log(error)
    }
} 

export const registerController = async(req,res) => {
    try {
        const {name , email , password} = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"Already Registered User",
            })
        }
        const user = await new userModel({
            name,
            email,
            password
          }).save();
      
          res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
          });

    } catch (error) {
        res.status(400).send({
            success:false,
            message : "Error in registration",
            error
        })
        console.log(error)
    }
}