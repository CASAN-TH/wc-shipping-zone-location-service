'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Shippingzonelocation = mongoose.model('Shippingzonelocation');

var credentials,
    token,
    mockup;

describe('Shippingzonelocation CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            code: "TH",
            type: "country"
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Shippingzonelocation get use token', (done) => {
        request(app)
            .get('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Shippingzonelocation get by id', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/shippingzonelocations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        console.log(resp);
                        assert.equal(resp.data.code, mockup.code);
                        assert.equal(resp.data.type, mockup.type);
                        done();
                    });
            });

    });

    it('should be Shippingzonelocation post use token', (done) => {
        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.code, mockup.code);
                assert.equal(resp.data.type, mockup.type);
                done();
            });
    });

    it('should be shippingzonelocation put use token', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    code: "EN",
                    type: "state"
                }
                request(app)
                    .put('/api/shippingzonelocations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;

                        assert.equal(resp.data.code, update.code);
                        assert.equal(resp.data.type, update.type);
                        done();
                    });
            });

    });

    it('should be shippingzonelocation delete use token', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shippingzonelocations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be shippingzonelocation get not use token', (done) => {
        request(app)
            .get('/api/shippingzonelocations')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be shippingzonelocation post not use token', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be shippingzonelocation put not use token', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/shippingzonelocations/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be shippingzonelocation delete not use token', function (done) {

        request(app)
            .post('/api/shippingzonelocations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/shippingzonelocations/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Shippingzonelocation.remove().exec(done);
    });

});