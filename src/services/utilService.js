Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1 // getMonth() is zero-based
    var dd = this.getDate()

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-')
}

Date.prototype.yyyymmddhhmmss = function () {
    let mm = this.getMonth() + 1
    let dd = this.getDate()
    let hh = this.getUTCHours()
    let mi = this.getUTCMinutes()
    let se = this.getUTCSeconds()

    return [
        this.getUTCFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-') + ' ' + [
        (hh > 9 ? '' : '0') + hh,
        (mi > 9 ? '' : '0') + mi,
        (se > 9 ? '' : '0') + se
    ].join(':')
}

Date.prototype.hhmmss = function () {
    let hh = this.getUTCHours()
    let mi = this.getUTCMinutes()
    let se = this.getUTCSeconds()

    return [
        (hh > 9 ? '' : '0') + hh,
        (mi > 9 ? '' : '0') + mi,
        (se > 9 ? '' : '0') + se
    ].join(':')
}

module.exports.isJSON = function (text) {
    let result = false
    if (typeof text == 'object') {
        result = true
    } else if (typeof text == 'string') {
        if (
            /^[\],:{}\s]*$/.test(
                text.replace(/\\["\\\/bfnrtu]/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
            )
        ) {
            result = true
        }
    }
    return result
}
