import $ from 'src/utils/NodeList.js'

module.exports = {
    template: require('!html!./ShowColumns.html'),
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