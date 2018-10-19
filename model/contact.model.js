const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    sent_by: {type: Schema.Types.ObjectId, ref: 'USER', required: true},
    sent_to: {type: Schema.Types.ObjectId, ref: 'USER', required: true},
    status: {type: String, required: true},
    is_deleted: {type: Number, default: 0},
    created_at: {type: Date, default: Date.now},
    modified_at: {type: Date, defualt: Date.now}
});

ContactSchema.pre('save', (next) => {
    const now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    if(!this.is_deleted) {
        this.is_deleted = 0;
    }
    next();
});

const Contact = mongoose.model('CONTACT', ContactSchema);

module.exports = Contact;