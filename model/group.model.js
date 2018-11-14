const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {type: string, required: true},
    members: [{type: Schema.Types.ObjectId, ref: 'USER'}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

GroupSchema.pre('save', next => {
    now = Date.now;
    if(!this.created_at) {
        this.created_at = now;
    }
    if(!this.modified_at) {
        this.modified_at = now;
    }
    next();
});

const Group = mongoose.model('GROUP', GroupSchema);

module.exports = Group;