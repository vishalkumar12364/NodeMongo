const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Entry = mongoose.model('entry');

router.get('/', (req, res) => {
    res.render("entry/addOrEdit", {
        viewTitle: "Insert Entry"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var entry = new Entry();
    entry.title = req.body.title;
    entry.content = req.body.content;
    entry.date = req.body.date;
    entry.save((err, doc) => {
        if (!err)
            res.redirect('entry/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("entry/addOrEdit", {
                    viewTitle: "Insert Entry",
                    entry: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Entry.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('entry/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("entry/addOrEdit", {
                    viewTitle: 'Update Entry',
                    entry: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Entry.find((err, docs) => {
        if (!err) {
            res.render("entry/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving entry list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Entry.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("entry/addOrEdit", {
                viewTitle: "Update Entry",
                entry: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/entry/list');
        }
        else { console.log('Error in Entry delete :' + err); }
    });
});

module.exports = router;