<template>
    <div class="container-fluid">
        <select v-model="name" class="form-control">
            <option value="DemoServer">Server</option>
            <option value="DemoClient">Client</option>
        </select>
        <component :is="name"></component>
    </div>
</template>

<script>
    let Vue = require('vue')

    module.exports = {
        data() {
            return {
                name: 'DemoClient'
            }
        },
        components: {
            DemoServer: require('./DemoServer'),
            DemoClient: require('./DemoClient')
        }
    }
</script>