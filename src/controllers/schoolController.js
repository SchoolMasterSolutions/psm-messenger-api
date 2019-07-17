
import {SchoolModel} from "../models/schoolModel";

export const create = (req, res) => {
    SchoolModel.create(req.body)
    .then(school => {
        return res.status(201).send(school)
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {_id, name, curriculum, signup_status, category} = req.query

    if (_id !== undefined) // as long as the _id is provided, ignore the other parameters
        SchoolModel.findById(_id)
        .then(school => {
            return res.status(200).send(school)
        })
        .catch(error => {
            return res.status(500).send({message: error.message})
        })

    let query = SchoolModel.find()
    if (curriculum !== undefined)
        query = query.where({'curricula': curriculum})

    if (name !== undefined)
        query = query.where({'name': {$regex: name, $options: 'i'}})

    if (signup_status !== undefined)
        query = query.where({'signup_status': signup_status})

    if (category !== undefined)
        query = query.where({'category': category})

    query.then(schools => {
        return res.status(200).send(schools)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = async (req, res) => {
    const {_id} = req.query
    const school = req.body

    if (_id !== school._id)
        return res.status(400).send({message: 'validation of the request object failed'})

    SchoolModel.findByIdAndUpdate(_id, school)
    .then(result => {
        return res.status(200).send(result)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query

    SchoolModel.findByIdAndRemove(_id)
    .then(result => {
        return res.status(200).send({message: 'school deleted successfully', result: result})
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}