var assert = require('assert');
var server = require('../../Application/server');
var http = require('http');
var fsMock = require('mock-fs');
 
describe('sampleUnitTests', function () {
    before(function () {
        fsMock({
            'index.html': "hello world"
        });
    });
  
    after(function () {
        server.close();
        fsMock.restore();
    });

    it('Should return 200', function (done) {
        http.get('http://localhost:8092', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            done();
        });
    });

    it('Should read index.html', function (done) {
        http.get('http://localhost:8092', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                console.log(`data is ${data}`)
                assert.equal('hello world', data, 'Should have read and returned contents of index.html.');
                done();
            })
        });
    });
});