import {NotificationModel} from "../models/notificationModel"

export const send = (req, res) => {
    NotificationModel.create(req.body)
    .then(notification => {
        return res.status(201).send(notification)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const search = (req, res) => {
    const {_id, school_id, channel} = req.query

    let query = NotificationModel.find()
    if (_id !== undefined) query = query.where({'_id': _id})
    if (school_id !== undefined) query = query.where({'school_id': school_id})
    if (channel !== undefined) query = query.where({'channel': channel})

    query.then(notifications => {
        return res.status(200).send(notifications)
    }).catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const update = (req, res) => {
    const {_id} = req.query

    NotificationModel.findByIdAndUpdate(_id, req.body)
    .then(notification => {
        return res.status(200).send(notification)
    })
    .catch(error => {
        return res.status(500).send({message: error.message})
    })
}

export const remove = (req, res) => {
    const {_id} = req.query
    NotificationModel.findByIdAndRemove(_id)
    .then(result => {
        return res.status(200).json({message: "notification deleted successfully", result: result})
    })
    .catch(error => {
        return res.status(500).json({message: error.message})
    })
}