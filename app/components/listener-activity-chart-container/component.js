import Component from '@ember/component';

export default Component.extend({
    classNameBindings: ["isLong:listener-activity-chart-container-long:listener-activity-chart-container"],
    
    mockedListenerActivity: null,
    isLong: false,

    alertStudent: (id) => {},
    actions: {
        alertStudent(id) {
            this.alertStudent(id);
        }
    }
});
