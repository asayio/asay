const formidable = require('formidable');

function formDataParser(req, res, next) {
    var form = new formidable.IncomingForm({
        encoding: 'utf-8',
        uploadDir:  os.tmpdir(),
        multiples: true,
        keepExtensions: true
    })
    form.once('error', console.log)
    form.parse(req, function (err, fields, files) {
        Object.assign(req, {fields, files});
        next();
    })
}

module.exports = formDataParser
