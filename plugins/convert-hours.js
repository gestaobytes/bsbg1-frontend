import Vue from 'vue'
Vue.filter('hoursSchedule', value => {
    let hours, h1, h2, hoursConvert;

    hours = value.split("-");
    h1 = hours[0];
    h2 = hours[1];
    hoursConvert = 'de ' + h1 +'h às '+h2+'h';
    return hoursConvert;
})
