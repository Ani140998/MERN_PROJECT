const { z, email } = require("zod");

//creating an object schema
const signupSchema = z.object({
    username: z
    .string({ required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast of # characters"})
    .max(255,{message:"Name must not be more than 255 characters"})
,
email: z
    .string({ required_error:"Email is required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email must be atleast of # characters"})
    .max(255,{message:"Email must not be more than 255 characters"})
,
phone: z
    .string({ required_error:"Phone number is required"})
    .trim()
    .min(10,{message:"Phone must be atleast of 10 characters"})
    .max(10,{message:"Phone must not be more than 10 characters"})
,
password: z
    .string({ required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be atleast of 6 characters"})
    .max(1024,"Password can't be greater than 1024 characters")
});


const loginSchema = z.object({
    email: z
    .string({ required_error:"Email is required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email must be atleast of # characters"})
    .max(255,{message:"Email must not be more than 255 characters"}),

    password: z
    .string({ required_error:"Password is required"})
    .trim()
    .min(7,{message:"Password must be atleast of 6 characters"})
    .max(1024,"Password can't be greater than 1024 characters")
})


module.exports = { signupSchema, loginSchema };