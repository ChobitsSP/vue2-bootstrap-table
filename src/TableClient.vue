<template>
    <bt-table :columns="columns"
              :rows="items"
              :pager="pager"
              :total="filterRows.length"
              :config="config"
              :loading="loading"
              :event-hub="eventHub">
    </bt-table>
</template>

<script>
    module.exports = {
        props: {
            q: String,
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
                eventHub: null,
                pager: {
                    page_no: 1,
                    page_size: 10,
                    sort_name: null,
                    is_desc: false,
                }
            }
        },
        created() {
            this.pager.page_no = this.initPager.page_no
            this.pager.page_size = this.initPager.page_size
            this.pager.sort_name = this.initPager.sort_name
            this.pager.is_desc = this.initPager.is_desc

            this.eventHub = new Vue()

            this.eventHub.$on('sort-change', this.sort_change)
            this.eventHub.$on('page-change', this.page_change)

            this.$emit('init-hub', this.eventHub)
        },
        methods: {
            sort_change(sort_name, is_desc) {
                this.pager.sort_name = sort_name
                this.pager.is_desc = is_desc
            },
            page_change(pageNo, pageSize) {
                this.pager.page_no = pageNo
                this.pager.page_size = pageSize
            }
        },
        computed: {
            filterRows() {
                let filterBy = require('./utils/filterBy.js')
                let arr = filterBy(this.rows, this.columns, this.q)
                return arr
            },
            items() {
                let pagerBy = require('./utils/pager.js')
                let arr = this.filterRows
                return pagerBy(arr, this.pager)
            }
        },
        components: {
            btTable: require('./components/Table.vue'),
        },
        beforeDestroy: function () {
            this.eventHub.$off('sort-change', this.sort_change)
            this.eventHub.$off('page-change', this.page_change)
        }
    }
</script>