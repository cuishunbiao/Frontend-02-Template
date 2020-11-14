import Vue from 'vue';
import HelloWorld from "./src/HelloWorld.vue";
new Vue({
    el: "#app",
    components: { HelloWorld },
    render: h => h(HelloWorld)
});