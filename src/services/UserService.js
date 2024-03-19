const User = require('../models/UserModel');

const bcrypt = require("bcrypt");

// Mã hóa password
const hashPassword =  (password) => {
    try {
        const saltRounds = 10; 
        const hashedPassword =  bcrypt.hashSync(password, saltRounds);
        return hashedPassword;  
    } catch (error) {
        console.log("authHelper: " + error); 
    }
};

// So sánh password với password đã được mã hóa
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}


// Register
const createAccount = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const {name, email, password, confirmPassword} = newUser;
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'Email đã đăng kí'
                })
            }
            const hashedPassword = hashPassword(password);
            const createUser = await User.create({
                name, 
                email,
                password: hashedPassword
            })
            if(createUser) {
                resolve({
                    status: 'Success',
                    data: createUser
                })
            }   
        }catch (error) {
            reject(error);
        }
    })
}; 

// Log in 
const loginAccount = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {email, password} = userLogin; 

            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'User is undefined'
                })
            }

            const comparePass = comparePassword(password, checkUser.password);
            if(comparePass) {
                resolve({
                    status: 'success',
                    data: checkUser
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}  

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createAccount,
    loginAccount,
    updateUser
}