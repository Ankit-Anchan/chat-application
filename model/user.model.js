const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    is_admin: { type: Boolean },
    is_active: {type: Number, default: 1},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contact_list: [{type: Schema.Types.ObjectId, ref: 'CONTACT'}]
},
{
    versionKey: false
});

UserSchema.pre('save', next => {
    now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});

const User = mongoose.model('USER', UserSchema);

module.exports = User;


