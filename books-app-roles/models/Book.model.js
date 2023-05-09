const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
    {
        title: String,
        description: String,
        author: String,
        rating: Number,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Book', bookSchema)