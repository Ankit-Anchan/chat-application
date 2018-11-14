const router = require('express').Router();

const ApplicationError = require('../common/error');
const messageService = require('../service/message.service');


router.get('/list/:sent_to', (req, res, next) => {
    let sent_to = req.params.sent_to;
    let sent_by = req.id;
    messageService.getMessages(sent_by, sent_to)
    .then(messageList => {
        if(messageList.length === 0) {
            return next(new ApplicationError.NotFound('No Messages Found'));
        }
        res.status(200).send(messageList);
    })
    .catch(err => {
        return next(new ApplicationError.InternalServerError(err));
    });
});

module.exports = router;