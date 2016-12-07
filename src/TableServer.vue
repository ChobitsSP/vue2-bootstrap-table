<template>
    <bt-table :columns="columns"
              :rows="rows"
              :pager="pager"
              :total="total"
              :config="config"
              :loading="loading"
              @row-click="row_click"
              @sort-change="sort_change"
              @page-change="page_change"
              @selection-change="selection_change">
    </bt-table>
</template>

<script>
    module.exports = {
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
                }
            }
        },
        created() {
            this.pager.page_no = this.initPager.page_no
            this.pager.page_size = this.initPager.page_size
            this.pager.sort_name = this.initPager.sort_name
            this.pager.is_desc = this.initPager.is_desc
        },
        methods: {
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
            selection_change(val) {
                this.$emit('selection-change', val)
            },
            row_click(row, index) {
                this.$emit('row-click', row, index)
            }
        },
        components: {
            btTable: require('./components/Table.vue'),
        },
        beforeDestroy: function () {

        }
    }
</script>