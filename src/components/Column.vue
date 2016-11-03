<template>
    <div class="th-inner" :class="sort_class" @click="change_sort">
        {{ column.title }}
    </div>
</template>

<script>
    module.exports = {
        props: {
            column: {
                type: Object
            },
            sortName: {
                type: String,
            },
            isDesc: {
                type: Boolean,
            }
        },
        methods: {
            change_sort() {
                if (!this.sortable) {
                    return
                }

                let is_desc = false

                if (this.sortName === this.column.field) {
                    is_desc = !this.isDesc
                }

                //Props 现在只能单向传递。为了对父组件产生反向影响，子组件需要显式地传递一个事件而不是依赖于隐式地双向绑定。
                this.$emit('sort-change', this.column.field, is_desc)
            }
        },
        computed: {
            sortable() {
                return this.column.sortable
            },
            sort_class() {
                if (!this.sortable) {
                    return ''
                }

                let class_str = 'sortable '

                if (this.sortName === this.column.field) {
                    class_str += this.isDesc ? 'desc' : 'asc'
                } else {
                    class_str += 'both'
                }

                return class_str
            }
        }
    }
</script>