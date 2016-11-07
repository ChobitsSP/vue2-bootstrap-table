<template>
    <div class="bootstrap-table">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <div>
                    <button id="remove" class="btn btn-danger" @click="remove_all">
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
                <table-client :columns="columns"
                              :rows="rows"
                              :total="total_result"
                              :loading="loading"
                              :init-pager="pager"
                              :config="config"
                              :q="q"
                              @init-hub="init_hub">
                </table-client>
            </div>
        </div>
    </div>
</template>

<script>
    let Vue = require('vue')
    let ajax = require('./ajax.js')

    module.exports = {
        data() {
            return {
                q: null,
                columns: [],
                rows: [],
                checklist: [],
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
            this.btn_hub = new Vue()
            let getcol = require('./columns.js')
            this.columns = getcol(this.btn_hub)

            this.btn_hub.$on('edit', this.edit)
            this.btn_hub.$on('remove', this.remove)
            this.refresh()
        },
        methods: {
            init_hub(hub) {
                this.tb_hub = hub
                this.tb_hub.$on('checklist', this.sync_checklist)
            },
            sync_checklist(list) {
                this.checklist = list
            },
            refresh() {
                this.rows = require('!json!./data.json')
            },
            edit(row, index) {
                this.rows[index].name = new Date().getTime().toString()
            },
            remove(row, index) {
                this.rows.splice(index, 1)
            },
            remove_all() {
                //this.checklist.forEach(function (t) {
                //    this.remove(t)
                //}.bind(this))
                this.tb_hub.$emit('clear-checklist')
            }
        },
        components: {
            ShowColumns: require('components/ShowColumns.vue'),
            TableClient: require('src/TableClient.vue')
        },
        beforeDestroy: function () {
            this.tb_hub.$off('refresh', this.child_refresh)
            this.tb_hub.$off('checklist', this.sync_checklist)

            this.btn_hub.$off('edit', this.edit)
            this.btn_hub.$off('remove', this.remove)
        }
    }
</script>