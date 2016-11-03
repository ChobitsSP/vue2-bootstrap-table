// Load the full build.
var _ = require('lodash')

function getPaginatedItems(items, page, per_page) {
    let offset = (page - 1) * per_page
    return _.chain(items).slice(offset).take(per_page).value()
}

module.exports = function (data, pager) {
    let items = _.orderBy(data, pager.sort_name, pager.is_desc ? 'desc' : 'asc')
    items = getPaginatedItems(items, pager.page_no, pager.page_size)
    return items
}