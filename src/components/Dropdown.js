import $ from 'src/utils/NodeList.js'

module.exports = {
    template: require('!html!./Dropdown.html'),
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