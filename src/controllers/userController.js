import * as crypto from 'crypto'
import {UserModel} from "../models/userModel";
import {sendEmail} from "../lib/emailHelper";

require('dotenv').config();

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        await UserModel.findOne({'account.preferred_username': email}, (err, user) => {
            if (err) return res.status(500).send({message: err.message})

            if (user) {
                if (!user.account.is_active) return res.status(401).send({message: 'account is inactive'})

                crypto.compare(password, user.account.password, (error, isMatch) => {
                    if (error) return res.status(500).send({message: error.message})
                    if (isMatch) {
                        user.account.password = undefined;
                        return res.status(200).send(user)
                    } else return res.status(401).send({message: 'invalid credentials'})
                })
            } else return res.status(401).send({message: 'invalid credentials'})

        })
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }
}

export const resetPassword = async (req, res) => {

    await UserModel.findOne({'profile.email': req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: err.message})
        else if (user) {

            let token = null;
            crypto.randomBytes(40, (error, buffer) => {
                token = buffer.toString('hex');

                // update the password reset token
                user.account.reset_password_token = token
                user.account.reset_password_token_expiration = Date.now() + 30 * 60 * 1000;

                user.save(err => {
                    if (err) return res.status(500).send({message: err.message})

                    const url = `${process.env.PASSWORD_RESET_URL}?token=${token}`
                    const mailOptions = {
                        from: `"PSM Messenger" <${process.env.SENDER_EMAIL}>`,
                        to: `${user.profile.email}`,
                        subject: 'Reset password - PSM Messenger',
                        html:
                            `<div style="background: #f1f1f1; color: darkgrey; text-align: center; font-weight: bold; padding: 30px 0; ">PSM Messenger</div>
                                <div style="width: 500px; margin: 0 auto;">
                                <p><b>Hi ${user.profile.name},</b></p>
                                <p>You recently requested to reset your password for your PSM Messenger account. Click the button below to reset it.</p>
                                <div style="text-align: center; padding: 15px;"><a style="background: #ff1151; width: 200px; margin-top: 15px; margin-bottom: 15px; color: white; text-align: center; padding: 15px; text-decoration: none;" href="${url}">Reset your password</a></div>
                                <p>If you did not request a password reset, please ignore this email. This password reset is only valid for 30 minutes.</p>
                                <p>Thanks,<br/>PSM Messenger Team</p>
                                <hr/>
                                <p style="font-size: 10px;">If you\re having trouble clicking the password reset button, copy and paste the URL below in your web browser.</p>
                                <p style="font-size: 10px;">${url}</p>
                            </div>`
                    }

                    sendEmail(mailOptions, res)
                })
            })

        } else return res.status(404).send({message: 'User not found'})
    })


}

export const create = (req, res) => {
    UserModel.create(req.body)
    .then((user) => {
        return res.status(201).send(user)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = async (req, res) => {
    const {name, _id, school_id, category} = req.query

    if (_id !== undefined)
        UserModel.findById(_id)
        .then(student => {
            return res.status(200).send(student)
        })
        .catch(error => {
            return res.status(500).send({message: error.message})
        })

    let query = UserModel.find()

    if (name !== undefined)
        query = query.where({'profile.name': {$regex: name, $options: 'i'}});

    if (school_id !== undefined)
        query = query.where({school_id: school_id})

    if (category !== undefined)
        query = query.where({category: category})

    query.select('-account.password -__v')
    .then(students => {
        return res.status(200).send(students)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = async (req, res) => {
    const {_id} = req.query;
    const user = req.body;

    // don't update the password
    delete user.account.password

    UserModel.findByIdAndUpdate(_id, user)
    .then((result) => {
        return res.status(200).send(result);
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query;

    UserModel.findByIdAndRemove(_id)
    .then((result) => {
        return res.status(200).send({message: 'user successfully deleted', result: result, _id: _id});
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}