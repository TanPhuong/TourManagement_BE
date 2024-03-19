const UserService = require('../services/UserService');


// Register  
const createAccount = async (req, res) => {
    try {
        const {name, email, password, confirmPassword} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const checkEmail = reg.test(email);

        if(!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập dữ liệu'
            })
        } else if(!checkEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập lại email'
            })
        } else if(password != confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đúng password'
            })
        }

        const respond = await UserService.createAccount(req.body);
        return res.status(200).json(respond);
    } catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}
// Login 
const loginAccount = async (req, res) => {
    try {
        const {email, password} = req.body; 
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const checkEmail = reg.test(email);

        if(!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập thông tin'
            })
        } else if(!checkEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đúng định dạng email'
            })
        }

        const respond = await UserService.loginAccount(req.body); 
        return res.status(200).json(respond);

    }catch(error) {
        return res.status(404).json({
            message: error
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.query.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createAccount,
    loginAccount,
    updateUser
}