<template>
    <bt-table :columns="columns"
              :rows="rows"
              :pager="pager"
              :total="total"
              :config="config"
              :loading="loading"
              :event-hub="eventHub">
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
                eventHub: null,
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

            this.eventHub = new Vue()

            this.eventHub.$on('sort-change', this.sort_change)
            this.eventHub.$on('page-change', this.page_change)

            this.$emit('init-hub', this.eventHub)
        },
        methods: {
            sort_change(sort_name, is_desc) {
                this.pager.sort_name = sort_name
                this.pager.is_desc = is_desc
                this.eventHub.$emit('refresh', this.pager)
            },
            page_change(pageNo, pageSize) {
                this.pager.page_no = pageNo
                this.pager.page_size = pageSize
                this.eventHub.$emit('refresh', this.pager)
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