// Load the full build.
var _ = require('lodash');
var all_data = require('!json!./data.json');

function QueryData(params) {
    let list = _.orderBy(all_data, params.sort, params.is_desc ? 'desc' : 'asc')
    return getPaginatedItems(list, params.page, params.per_page)
}

function getPaginatedItems(items, page, per_page) {
    let offset = (page - 1) * per_page
    return _.chain(items).slice(offset).take(per_page).value()
}

module.exports = function ajax(params) {
    return new Promise(function (reject) {
        setTimeout(function () {
            let data = QueryData(params)
            reject({
                data: data,
                total: all_data.length,
            })
        }, 1000)
    })
}