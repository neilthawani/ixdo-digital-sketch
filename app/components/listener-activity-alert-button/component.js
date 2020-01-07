import Component from '@ember/component';
import $ from "jquery";

export default Component.extend({
    tagName: "g",
    classNameBindings: ["isActive:listener-activity-alert-button-active:listener-activity-alert-button"],
    index: null,
    isActive: false,

    alertStudent(index) {},

    click: function(event) {
        this.set("isActive", true);
    },
    actions: {
        alertStudent(index) {
            this.alertStudent(index);
        }
    }
});
