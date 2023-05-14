import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
import mailgun from 'mailgun-js';



export const registerAdmin = asyncHandler(async (req, res) => {
    try {const { email,password,name,phone,superAdmin} = req.body
    if (!email || !password ||!name ||!phone || !superAdmin) {
        res.status(400)
        throw new Error('Please enter all fields')
    }
    //check if admin exists
    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
        res.status(400)
        throw new Error('Admin already exists')
    }

    //hash pass
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //create admin 
    const admin = await Admin.create({
        name,
        email,
        password:hashedPassword,
        phone,
        superAdmin
    })

    if (admin) {
        res.status(201).json({
           admin
        })
    } else {
        res.status(400)
        throw new Error('invalid admin data')
    }}
     catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let adminExists
    try {
        adminExists = await Admin.findOne({ email: email })
    }
    catch (err) {
        return new Error(err);
    }
    if (!email || !password) {
        return res.status(404).json({ message: 'Please enter all fields' })

    }
    if (!adminExists) {
        return res.status(404).json({ message: 'Admin not found' })
    }
    const isPassword = bcrypt.compareSync(password, adminExists.password);
    if (!isPassword) {
        return res.status(404).json({ message: 'Incorrect  Password' })
    }

    const token = jwt.sign({ id: adminExists._id }, process.env.JWT_SECRET, { expiresIn: '30d' });


    res.cookie("auth-token", token, {
        path: '/',
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        httpOnly: true,
        sameSite: 'lax'
    });


    return res.status(200).json({ message: 'Successfuly login', admin: adminExists, token });
})





export const getMe =asyncHandler(async (req, response) => {
    try{
        const admin = await Admin.findById(req.params.id);
        response.status(200).json(admin);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
})

//logout
export const logoutAdmin = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies["auth-token"];
    console.log(cookie)
    
    jwt.verify(cookie, process.env.JWT_SECRET, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" })
        }
        res.clearCookie(`${admin.id}`)
        return res.status(200).json({ message: 'Successfuly logged out' })
    }
    )
})


//forgot Password

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const api_key = process.env.API_KEYS;
    const domain = process.env.DOMAIN;
    const mg = mailgun({apiKey: api_key, domain: domain});

    try {
        const adminExists = await Admin.findOne({ email });
        if (!adminExists) {
            return res.send('Admin not found')
        }
        const secret = process.env.JWT_SECRET + adminExists.password;
        const token = jwt.sign({ email: adminExists.email, id: adminExists.id }, secret, { expiresIn: "24h" });
        const link = `http://localhost:3000/changepass/${adminExists._id}/${token}`;
        console.log(link)

        const data = {
            from: 'Reset Password <Noreply@samples.mailgun.org>',
            to: email ,
            subject: 'Reset Password',
            html: `<div>A request has been received to change the password for your Portfolio account;</div><br>
            <div> <a href=${link}> Click here</a> to reset your password</div><br>`
        };
        mg.messages().send(data, function (error, body) {
            if (error) {
            console.log(error);}
            else 
            return res.send('Link sent to your email')
        });



    }
    catch (err) {
        return new Error(err)
    }
}
)
export const resetPassword = asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params)
    const adminExists = await Admin.findOne({ _id: id });
    if (!adminExists) {
        return res.json({ message: 'Admin not found' })
    }
    const secret = process.env.JWT_SECRET + adminExists.password;
    try {
        const verify = jwt.verify(token, secret)
        res.send('Verified')
    }
    catch (err) {
        res.send('Not verified')
    }
})
    

export const changePassword = asyncHandler(async (req, res) => {
    try {
        const adminExists = await Admin.findById(req.params.id);
        if (!adminExists) return res.status(400).send({ error: 'Admin not found' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        adminExists.password = hashedPassword;
        await adminExists.save();
    
        res.send({ message: 'Password updated successfully' });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
const adminRoutes = { loginAdmin, getMe, registerAdmin, logoutAdmin, forgotPassword, resetPassword, changePassword }
export default adminRoutes  