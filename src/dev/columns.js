module.exports = function (eventHub) {

    let columns = [];

    ['id', 'name', 'nickname', 'email', 'birthdate'].forEach(t => {
        columns.push({
            title: t,
            field: t,
            visible: true,
            sortable: true
        })
    })

    columns.push({
        title: 'gender',
        field: 'gender',
        filter(val) {
            return val === 'M' ? '♂' : '♀'
        },
        visible: true,
        sortable: true
    })

    columns.push({
        title: 'created date',
        field: 'created_at',
        filter(val) {
            return val.substr(0, 10)
        },
        visible: true,
        sortable: true
    })

    let c1 = require('./Btns.vue')

    columns.push({
        title: 'edit/remove',
        sortable: false,
        visible: true,
        createElement: function (createElement, row, col, index) {
            var com1 = createElement(c1, {
                props: {
                    row: row,
                    eventHub: eventHub,
                    index: index
                }
            })

            return createElement('td', {}, [com1])
        }
    })

    return columns
}