
///<reference path="../node_modules/vue-tsx-support/enable-check.d.ts" />

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
declare module '*.svg' {
    import Vue from 'vue'
    export default Vue
}

declare module 'vuetify/lib';
//declare module 'vue-class-component';
declare module 'vue-property-decorator';
declare module "waypoints";

declare const Waypoint;
