module.exports = {
    template: require('!html!./Table.html'),
    props: {
        columns: {
            type: Array
        },
        rows: {
            type: Array
        },
        config: {
            type: Object
        },
        loading: Boolean,
        total: Number,
        pager: Object
    },
    data() {
        return {
            page_no: 1,
            page_size: 10,
            sort_name: null,
            is_desc: false,
        }
    },
    created() {
        if (this.pager) {
            this.is_desc = this.pager.is_desc
            this.sort_name = this.pager.sort_name
        }
    },
    methods: {
        sortChange(field, is_desc) {
            this.sort_name = field
            this.is_desc = is_desc
            this.$emit('sort-change', field, is_desc)
        },
        pageChange(pageNo, pageSize) {
            this.$emit('page-change', pageNo, pageSize)
        },
        row_click(row, index) {
            this.$emit('row-click', row, index)
        },
        rowClass() {
            return ''
        },
        cell_click(row, col, index) {
            this.$emit('cell-click', row, col, index)
        },
        cell_callback(row) {
            this.$emit('cell-callback', row)
        }
    },
    computed: {
        items() {
            return this.rows
        }
    },
    components: {
        Cell: require('./Cell.js'),
        Column: require('./Column.js'),
        Pager: require('./Pager.js'),
    },
    //beforeDestroy: function () {
    //    //eventHub.$off('add-todo', this.addTodo)
    //    //eventHub.$off('delete-todo', this.deleteTodo)
    //}
}