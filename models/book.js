const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Details Schema
const detailsSchema = new Schema({
    content: {type: String, required: true},
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default:5
    }
},{
    timestamps:true
});

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    published_date: {
        type: Date,
        required: true,
        validate: {
            validator: function(v){
                //Validate date is not in the future
                return v.getTime() <= Date.now();
            },
            message: props => `${props.value} is a future date! Published date should be in the past.`
        }
    },
    category: {
        type: String,
        enum: ['Adults', 'Kids']
    }, 
    price: {
            type: Number,
            required: true,
            min: 10,
            max: 999
        },
        summary:{
            type: String,
            required: true,
            minlength: 20,
            maxlength: 500
        },
        imagePath: {
            type: String
        },
        details: [detailsSchema]
    
    }, {
        timestamps: true
    })

    module.exports = mongoose.model('Book', bookSchema);