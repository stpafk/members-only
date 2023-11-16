const he = require('he');

function decode(string) {
    return he.decode(string);
};

module.exports = decode;