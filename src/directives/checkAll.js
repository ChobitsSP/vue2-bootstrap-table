module.exports = {
    update: function (el, binding, vnode, oldVnode) {
        let len1 = binding.value[0]
        let len2 = binding.value[1]
        let checked = len1 === len2

        el.checked = checked && len1 > 0
        el.indeterminate = !checked && len1 > 0
    }
}