<template>
    <div class="btn-group dropup dropdown" :class="{ open: show }" ref="root">
        <button type="button" @click="click" class="btn btn-default dropdown-toggle" aria-haspopup="true" aria-expanded="true">
            <span>{{ text }}</span>
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" v-show="show">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    import $ from 'src/utils/NodeList.js'

    module.exports = {
        props: {
            show: Boolean,
            text: [String, Number]
        },
        methods: {
            mounted() {
                let self = this

                this.$nextTick(function () {
                    const $el = $(this.$refs.root)

                    $el.onBlur((e) => {
                        this.$emit('show-change', false)
                    })
                })
            },
            click() {
                this.$emit('show-change', !this.show)
            }
        }
    }
</script>