<template>
    <div>
        <button type="button" class="btn btn-xs btn-success" @click.stop="callback('edit')">edit</button>
        <button type="button" class="btn btn-xs btn-danger" @click.stop="callback('remove')">delete</button>
    </div>
</template>

<script>
    module.exports = {
        props: {
            row: Object,
            eventHub: Object,
            index: Number
        },
        methods: {
            callback(arg) {
                this.eventHub.$emit(arg, this.row, this.index)
            }
        }
    }
</script>