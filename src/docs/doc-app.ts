/// <reference path="../typings/ts.d.ts"/>

var Vue = Vue || require('vue');

import pages = require('./pages');
import components from '../components';
import directives from '../directives';

// because vue router not work with TS @Component
export = Vue.extend({
    components: components,
    directives: directives,
    data: function () {
        return {
            navs: pages
        };
    },
    computed: {
        title: function () {
            return this.$route.title;
        },
        '$currentRoute': function () {
            return this.$router._currentRoute;
        }
    }
})