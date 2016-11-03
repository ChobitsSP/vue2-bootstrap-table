<template>
    <div class="container-fluid">
        <demo-server></demo-server>
        <demo-client></demo-client>
    </div>
</template>

<script>
    let Vue = require('vue')

    module.exports = {
        components: {
            DemoServer: require('./DemoServer'),
            DemoClient: require('./DemoClient')
        }
    }
</script>