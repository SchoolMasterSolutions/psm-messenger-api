import mongoose from 'mongoose';

module.exports.connect = async conn => mongoose.connect(conn, { useNewUrlParser: true });
