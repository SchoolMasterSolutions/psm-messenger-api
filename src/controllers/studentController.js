import {StudentModel} from "../models/studentModel";

export const create = (req, res) => {
    StudentModel.create(req.body)
    .then(student => {
        return res.status(201).send(student)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {name, gender, status, school_id, _id} = req.query

    if (_id !== undefined)
        StudentModel.findById(_id)
        .then(student => {
            return res.status(200).send(student)
        })
        .catch(error => {
            return res.status(500).send({message: error.message})
        })

    let query = StudentModel.find()

    if (name !== undefined)
        query = query.where({'name': {$regex: name, $options: 'i'}})

    if (gender !== undefined)
        query = query.where({'gender': gender})

    if (status !== undefined)
        query = query.where({'status': status})

    if (school_id !== undefined)
        query = query.where({'school_id': school_id})

    query.then(students => {
        return res.status(200).json(students)
    }).catch(error => {
        return res.status(500).json({message: error.message})
    })

}

export const update = (req, res) => {
    const {_id} = req.query

    StudentModel.findByIdAndUpdate(_id, req.body)
    .then(student => {
        return res.status(200).json(student)
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query
    StudentModel.findByIdAndRemove(_id)
    .then(() => {
        return res.status(200).json({message: "student deleted successfully"})
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}