var fs, path, mkdirp

function toFileName(delimiter, name) {
    if (delimiter === "") {
        return name
    }

    return name
        .replace(/[a-z][A-Z]/g, function(str) {
            return str[0] + delimiter + str[1]
        })
        .toLowerCase()
}

if (typeof IN_BROWSER === "undefined") {
    fs = require("fs")
    path = require("path")
    mkdirp = require("mkdirp")

    function writeToFS(components, options) {
        options = options || {}
        var outPath = path.resolve(options.output.path || "components")
        var delimiter = options.moduleFileNameDelimiter || ""
        var ext = options.output.fileExtension || "vue";
        mkdirp.sync(outPath)
        components.forEach((c) => {
            fs.writeFileSync(
                path.join(outPath, toFileName(delimiter, c.cname)) + "." + ext,
                c.html,
                "utf8"
            )
        })
    }

    module.exports = {
        toFileName: toFileName,
        writeToFS: writeToFS
    }
} else {
    module.exports = {
        toFileName: toFileName
    }
}