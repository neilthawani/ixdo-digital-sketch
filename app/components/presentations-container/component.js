import Component from '@ember/component';

export default Component.extend({
    classNameBindings: ["isLong:presentations-container-long:presentations-container"],

    presentation: null,
    isLong: false
});
