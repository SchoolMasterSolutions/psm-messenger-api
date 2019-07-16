import {ResultsModel} from "../models/resultsModel";

export const create = (req, res) => {
    ResultsModel.create(req.body)
    .then(result => {
        return res.status(201).send(result)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {student_id, school_id, term, year} = req.query

    let query = ResultsModel.find()
    if (student_id !== undefined) query = query.where({'student_id': student_id})
    if (school_id !== undefined) query = query.where({'school_id': school_id})
    if (term !== undefined) query = query.where({'term': term})
    if (year !== undefined) query = query.where({'year': year})

    query.then(results => {
        return res.status(200).send(results)
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = (req, res) => {
    const {_id} = req.query

    ResultsModel.findByIdAndUpdate(_id, req.body)
    .then(results => {
        return res.status(200).send(results)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query
    ResultsModel.findByIdAndRemove(_id)
    .then(result => {
        return res.status(200).json({message: "results deleted successfully", result: result})
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}