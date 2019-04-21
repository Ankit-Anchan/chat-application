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

router.get('/list/unread/:from', async (req, res, next) => {
    let from = req.params.from;
    let to = req.id;
    const messages = await messageService.getUnreadMessages(to, from);
    if (!messages || messages.length === 0) {
        return next(new ApplicationError.NotFound('No Unread messages.'));
    }
    res.json(messages);
});

router.put('/read/:from', async (req, res, next) => {
    let from = req.params.from;
    let to = req.id;
    await messageService.markAsRead(to, from);
    res.json({});
});

module.exports = router;