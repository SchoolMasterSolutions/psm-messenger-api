import {SubscriptionModel} from "../models/subscriptionModel";

export const create = (req, res) => {
    SubscriptionModel.create(req.body)
    .then(subscription => {
        return res.status(201).send(subscription)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {user_id, category, school_id, status} = req.query

    let query = SubscriptionModel.find()
    if (user_id !== undefined) query = query.where({'user_id': user_id})
    if (user_id !== undefined) query = query.where({'category': category})
    if (user_id !== undefined) query = query.where({'school_id': school_id})
    if (user_id !== undefined) query = query.where({'status': status})

    query.then(subscriptions => {
        return res.status(200).send(subscriptions)
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = (req, res) => {
    const {_id} = req.query

    SubscriptionModel.findByIdAndUpdate(_id, req.body)
    .then(subscription => {
        return res.status(200).send(subscription)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query
    SubscriptionModel.findByIdAndRemove(_id)
    .then(result => {
        return res.status(200).json({message: "subscription deleted successfully", result: result})
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}