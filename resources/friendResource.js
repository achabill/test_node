'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const indexName = 'friend';
const typeName = 'friend';

module.exports = {
    dao: null,
    init: function (_dao) {
        this.dao = _dao;
    },
    router: function () {

        var r = express.Router();
        var dao = this.dao;
        r.route('/friends')
            .post(function (req, res) {
                var friend = {
                    name: req.body.name,
                    description: req.body.description
                };

                dao.addToIndex(indexName, typeName, friend).then(function (response) {
                    res.json(response);
                }, function (err) {
                    console.log('error: ' + err);
                });
            })
            .get(function (req, res) {
                dao.search(indexName, typeName).then(function (response) {
                    res.json(response);
                }, function (err) {
                    console.log(err);
                })
            });
        return r;
    }
};