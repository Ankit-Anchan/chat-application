const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactListSchema = new Schema({
    sent_by: {type: Schema.Types.ObjectId, ref: 'User'},
    sent_to: {type: Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    modified_at: {type: Date, defualt: Date.now}
});

ContactListSchema.pre('save', (next) => {
    const now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});

const ContactList = mongoose.model('CONTACT_LIST', ContactListSchema);

module.exports = ContactList;