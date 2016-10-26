module.exports = {
    props: {
        column: {
            type: Object
        },
        row: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    render: function (createElement) {
        if (this.column.createElement) {
            return this.column.createElement.call(this, createElement, this.row, this.column, this.index)
        }
        return createElement('td', this.value)
    },
    computed: {
        value() {
            let val = this.row[this.column.field]

            if (this.column.filter) {
                return this.column.filter(val)
            }

            return val
        }
    }
}