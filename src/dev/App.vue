<template>
    <div class="container-fluid">
        <div class="bootstrap-table">
            <div class="fixed-table-toolbar">
                <div class="bs-bars pull-left">
                    <div>
                        <button id="remove" class="btn btn-danger">
                            <i class="glyphicon glyphicon-remove"></i> Delete
                        </button>
                    </div>
                </div>
                <div class="columns columns-right btn-group pull-right">
                    <button class="btn btn-default" type="button" name="refresh" title="Refresh" @click="refresh">
                        <i class="glyphicon glyphicon-refresh icon-refresh"></i>
                    </button>
                    <show-columns :columns="columns"></show-columns>
                </div>
                <div class="pull-right search">
                    <input class="form-control" type="text" placeholder="Search" v-model="q">
                </div>
            </div>
            <div class="fixed-table-container">
                <div class="fixed-table-body">
                    <table-server :columns="columns"
                                  :rows="items"
                                  :total="total_result"
                                  :loading="loading"
                                  :init-pager="pager"
                                  :config="config"
                                  @init-hub="init_hub">
                    </table-server>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    let Vue = require('vue')
    
    module.exports = {
        data() {
            return {
                q: null,
                columns: [],
                rows: [],
                total_result: 0,
                loading: false,
                config: {
                    checkbox: true
                },
                pager: {
                    page_no: 1,
                    page_size: 10,
                    sort_name: 'id',
                    is_desc: false
                }
            }
        },
        created() {
            this.columns.push({
                title: 'id',
                field: 'id',
                visible: true,
                sortable: true
            })

            this.columns.push({
                title: 'name',
                field: 'name',
                visible: true,
                sortable: true
            })

            this.columns.push({
                title: 'created date',
                field: 'created_at',
                filter(val) {
                    return val.substr(0, 10)
                },
                visible: true,
                sortable: true
            })

            let c1 = require('./Btns.vue')

            let btn_hub = this.btn_hub = new Vue()

            this.columns.push({
                title: 'edit/remove',
                sortable: false,
                visible: true,
                createElement: function (createElement, row, col, index) {
                    var com1 = createElement(c1, {
                        props: {
                            row: row,
                            eventHub: btn_hub,
                            index: index
                        }
                    })

                    return createElement('td', {}, [com1])
                }
            })

            this.btn_hub.$on('edit', this.edit)
            this.btn_hub.$on('remove', this.remove)
            this.refresh()
        },
        methods: {
            init_hub(hub) {
                this.tb_hub = hub
                this.tb_hub.$on('refresh', this.child_refresh)
                this.tb_hub.$on('checklist', this.sync_checklist)
            },
            sync_checklist(list) {
                console.log(list)
            },
            child_refresh(pager) {
                this.pager.page_no = pager.page_no
                this.pager.page_size = pager.page_size
                this.pager.sort_name = pager.sort_name
                this.pager.is_desc = pager.is_desc
                this.refresh()
            },
            refresh() {
                var params = {
                    sort: this.pager.sort_name + '|' + (this.pager.is_desc ? 'desc' : 'asc'),
                    page: this.pager.page_no,
                    per_page: this.pager.page_size,
                }

                this.loading = true

                this.$http.get('http://vuetable.ratiw.net/api/users', { params: params }).then(data => {
                    let rsp = data.data

                    this.rows = rsp.data
                    this.total_result = rsp.total
                    this.tb_hub.$emit('clear-checklist')
                    this.loading = false
                })
            },
            edit(row) {
                row.name = new Date().getTime().toString()
            },
            remove(row) {
                var index = this.rows.indexOf(row)
                this.rows.splice(index, 1)
            }
        },
        computed: {
            items() {
                return require('src/utils/filterBy.js')(this.rows, this.columns, this.q)
            }
        },
        components: {
            ShowColumns: require('components/ShowColumns.js'),
            TableServer: require('src/TableServer.js')
        },
        beforeDestroy: function () {
            this.tb_hub.$off('refresh', this.child_refresh)
            this.tb_hub.$off('checklist', this.sync_checklist)

            this.btn_hub.$off('edit', this.edit)
            this.btn_hub.$off('remove', this.remove)
        }
    }
</script>