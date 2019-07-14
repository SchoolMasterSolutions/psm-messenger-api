import {
    Types
} from 'mongoose';
import * as crypto from 'bcrypt'
import {UserModel} from "../models/userModel";

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        await UserModel.findOne({'account.preferred_username': email}, (err, user) => {
            if(err) return res.status(500).send({message: err.message})

            if(user){
                if(!user.account.is_active) return res.status(401).send({message: 'account is inactive'})

                crypto.compare(password, user.account.password, (error, isMatch) => {
                    if(error) return res.status(500).send({message: error.message})
                    if (isMatch) {
                        user.account.password = undefined;
                        return res.status(200).send(user)
                    }
                    else return res.status(401).send({message: 'invalid credentials'})
                })
            }
            else return res.status(401).send({message: 'invalid credentials'})

        })
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }
}

export const resetPassword = async (req, res) => {

}

export const create = async (req, res) => {
    try {
        await UserModel.create(req.body, (err, user) => {
            if (err) {
                res.status(500)
                return res.send({message: err.message})
            }

            res.status(201)
            return res.json(user)
        });
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }
}

export const search = async (req, res) => {
    const {name, _id, school_id, category} = req.query;

    let query = UserModel.find();

    if (_id !== undefined) {
        query = query.where({_id: _id});
    } else {
        if (name !== undefined)
            query = query.where({'profile.name': {$regex: name, $options: 'i'}});

        if (school_id !== undefined)
            query = query.where({school_id: school_id})

        if (category !== undefined)
            query = query.where({category: category})
    }

    try {
        await query.select('-account.password -__v').exec((err, users) => {
            if (err) {
                res.status(500)
                return res.send({message: err.message})
            }

            res.status(200)
            return res.send(users)
        })
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }
}

export const update = async (req, res) => {
    const {_id} = req.query;
    const user = req.body;

    // don't update the password
    delete user.account.password

    try {
        await UserModel.findByIdAndUpdate(_id, user, {new: true}, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.send(result);
        })
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }

}

export const remove = async (req, res) => {
    const {_id} = req.query;

    try {
        await UserModel.findByIdAndRemove(_id, (err, result) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send({message: 'User successfully deleted', _id: _id});
        })
    } catch (e) {
        res.status(500)
        return res.send({message: e.message})
    }
}