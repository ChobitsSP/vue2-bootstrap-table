<template>
    <div class="keep-open btn-group" :class="{ open: show }" ref="root">
        <button type="button" class="btn btn-default dropdown-toggle" @click="show=!show">
            <i class="glyphicon glyphicon-th icon-th">
            </i>
            <span class="caret">
            </span>
        </button>
        <ul class="dropdown-menu" v-show="show" aria-labelledby="simple-dropdown">
            <li v-for="(col, index) in columns">
                <label>
                    <input type="checkbox" v-model="col.visible">
                    {{ col.title }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
    import $ from 'src/utils/NodeList.js'

    module.exports = {
        props: {
            columns: {
                type: Array
            }
        },
        data() {
            return {
                show: false
            }
        },
        mounted() {
            let self = this

            this.$nextTick(function () {
                const $el = $(this.$refs.root)

                $el.onBlur((e) => {
                    self.show = false
                })
            })
        }
    }    
</script>