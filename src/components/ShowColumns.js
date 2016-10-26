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
            list: [],
            show: false
        }
    },
    created(){
        this.columns.forEach(function(t) {
            this.list.push({
                title: t.title,
                visible: t.visible
            })
        }.bind(this))
    },
    mounted() {
        let self = this

        this.$nextTick(function () {
            const $el = $(this.$refs.root)

            $el.onBlur((e) => {
                self.show = false
            })
        })
    },
    methods: {
        change(col, index) {
            this.$emit('change', index, col.visible)
        }
    }
}