module.exports = {
    template: require('!html!./Table.html'),
    props: {
        eventHub: Object,
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
            check_all: false,
            checklist: [],
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
        this.eventHub.$on('clear-checklist', this.clear_checklist)
    },
    methods: {
        /*******************************************************/
        sortChange(field, is_desc) {
            if (this.loading) return
            this.sort_name = field
            this.is_desc = is_desc
            this.eventHub.$emit('sort-change', field, is_desc)
        },
        pageChange(pageNo, pageSize) {
            if (this.loading) return
            this.eventHub.$emit('page-change', pageNo, pageSize)
        },
        /*******************************************************/
        row_click(row, index) {
            if (this.config.checkbox) {
                let i = this.checklist.indexOf(row)

                if (i >= 0) {
                    this.checklist.splice(i, 1)
                }
                else {
                    this.checklist.push(row)
                }
            }
            this.eventHub.$emit('row-click', row, index)
        },
        rowClass(item) {
            return item.$row_class || ''
        },
        /*******************************************************/
        check_item_change($event, row, index) {
            let val = $event.target.checked
            this.eventHub.$emit('check-change', val, row, index)
        },
        clear_checklist() {
            this.check_all = false
        }
    },
    directives: {
        checkAll: require('src/directives/checkAll.js')
    },
    components: {
        Cell: require('./Cell.js'),
        Column: require('./Column.vue'),
        Pager: require('./Pager.js'),
    },
    watch: {
        check_all(val) {
            this.checklist = []

            if (val) {
                this.rows.forEach(function (t) {
                    this.checklist.push(t)
                }.bind(this))
            }
        },
        checklist() {
            this.eventHub.$emit('checklist', this.checklist)
        }
    },
    beforeDestroy: function () {
        this.eventHub.$off('clear-checklist', this.clear_checklist)
    }
}