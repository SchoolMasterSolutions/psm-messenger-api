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
      if (err){
        res.status(500)
        return res.send({message: err.message})
      }

      res.status(201)
      return res.json(user)
    });
  }catch (e) {
    res.status(500)
    return res.send({message: e.message})
  }
}

export const search = async (req, res) => {

}

export const update = async (req, res) => {

}

export const remove = async (req, res) => {

}