module.exports = {
    bind: function (el, binding, vnode) {
        vnode.handler = function (e) {
            let val = e.target.checked

            //var arr = []
            //if (el.checked) {
            //    //this.params.array.forEach(function (item) {
            //    //    arr.push(item)
            //    //})
            //}
        }

        el.addEventListener('change', vnode.handler)
    },
    update: function (el, binding, vnode, oldVnode) {
        let len1 = binding.value[0]
        let len2 = binding.value[1]
        let checked = len1 === len2

        el.checked = checked
        el.indeterminate = !checked && len1 > 0
    },
    unbind: function (el, binding, vnode) {
        el.removeEventListener('click', vnode.handler)
    }
}