module.exports = {
    template: require('!html!./TableServer.html'),
    props: {
        columns: {
            type: Array
        },
        rows: {
            type: Array
        },
        config: Object,
        initPager: Object,
        loading: Boolean,
        total: Number
    },
    data() {
        return {
            pager: {
                page_no: 1,
                page_size: 10,
                sort_name: null,
                is_desc: false,
            },
        }
    },
    created() {
        this.pager.page_no = this.initPager.page_no
        this.pager.page_size = this.initPager.page_size
        this.pager.sort_name = this.initPager.sort_name
        this.pager.is_desc = this.initPager.is_desc
    },
    methods: {
        row_click(row, index) {
            this.$emit('row-click', row, index)
        },
        sort_change(sort_name, is_desc) {
            this.pager.sort_name = sort_name
            this.pager.is_desc = is_desc
            this.$emit('refresh', this.pager)
        },
        page_change(pageNo, pageSize) {
            this.pager.page_no = pageNo
            this.pager.page_size = pageSize
            this.$emit('refresh', this.pager)
        },
        check_all_change(val) {
            this.$emit('check-all-change', val)
        },
        check_item_change(val, row, index) {
            this.$emit('check-change', val, row, index)
        }
    },
    components: {
        btTable: require('components/Table.js'),
    }
}