<template>
    <div>
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/">vue 2.0 bootstrap table</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li><router-link to="/Server">Server</router-link></li>
                        <li><router-link to="/Client">Client</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container body-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    let router = require('src/dev/router.js')

    module.exports = {
        router: router
    }
</script>

<style>
    body {
        padding-top: 70px;
    }
</style>