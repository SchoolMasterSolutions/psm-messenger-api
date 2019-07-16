import {ArticleModel} from "../models/articleModel";

export const create = (req, res) => {
    ArticleModel.create(req.body)
    .then(article => {
        return res.status(201).send(article)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {_id, author_id, school_id, audience, title} = req.query

    let query = ArticleModel.find()
    if (_id !== undefined) query = query.where({'_id': _id})
    if (author_id !== undefined) query = query.where({'author_id': author_id})
    if (school_id !== undefined) query = query.where({'school_id': school_id})
    if (audience !== undefined) query = query.where({'audience': audience})
    if (title !== undefined) query = query.where({'title': {$regex: title, $options: 'i'}})

    query.then(articles => {
        return res.status(200).send(articles)
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = (req, res) => {
    const {_id} = req.query

    ArticleModel.findByIdAndUpdate(_id, req.body)
    .then(article => {
        return res.status(200).send(article)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query
    ArticleModel.findByIdAndRemove(_id)
    .then(result => {
        return res.status(200).json({message: "article deleted successfully", result: result})
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}