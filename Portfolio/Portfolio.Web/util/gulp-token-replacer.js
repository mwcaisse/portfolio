var through = require("through2");
var rs = require("replacestream");

const PLUGIN_NAME = "gulp-token-replacer";

var TOKEN_REGEX = /\[\[.+?\]\]/g;

function removeDelimitersFromKey(key) {
    return key.replace("[[", "").replace("]]", "");
}

function replaceTokens(str, tokens) {
    return str.replace(TOKEN_REGEX, function (match) {
        var matchKey = removeDelimitersFromKey(match); 
        if (!(matchKey in tokens)) {
            throw new Error("Token: " + matchKey + " not found!");
        }
        return tokens[matchKey];
    });
}

function gulpTokenReplacer(tokens) {
    if (!tokens) {
        throw new Error(PLUGIN_NAME + ": No tokens provided");
    }

    var stream = through.obj(function(file, enc, cb) {

        var replaceFun = function (match) {
            match = removeDelimitersFromKey(match);
            if (!(match in tokens)) {
                throw new Error("Token: " + match + " not found!");
            }
            return tokens[match];
        };

        if (file.isStream()) {
            try {
                file.contents = file.contents.pipe(rs(TOKEN_REGEX, replaceFun));
                return cb(null, file);
            }
            catch (e) {
                return cb(e);
            }
        }

        if (file.isBuffer()) {
            var contents = String(file.contents);
            contents = replaceTokens(contents, tokens);
            file.contents = new Buffer.from(contents);
        }

        cb(null, file);
    });

    return stream;
}

module.exports = gulpTokenReplacer;