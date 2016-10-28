module.exports = function filterBy(rows, q) {
    if (q === null) return rows
    
    return rows.filter(function (row) {
        return Object.keys(row).some(key => {
            let val = row[key]

            if (!val) return false

            val = val.toString()

            return val.indexOf(q) !== -1
        })
    })
}