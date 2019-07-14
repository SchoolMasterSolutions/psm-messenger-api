import {
    Types
} from 'mongoose';

import {UserModel} from "../models/userModel";

export const login = async (req, res) => {

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