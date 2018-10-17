const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
    is_admin: { type: Boolean },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contact_list: [{type: Schema.Types.ObjectId, ref: 'ContactList'}]
});

const User = mongoose.model('USER', UserSchema);

module.exports = User;


