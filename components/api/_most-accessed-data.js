import axios from "axios";
import { urlPublic } from "@/global";

export default {
    data: function () {
        return {
            mostAccessedDay: [],
            mostAccessedWeek: [],
        };
    },

    methods: {
        loadMostAccessedDay() {
            axios.get(`${urlPublic}/most-accessed-day`).then(res => {
                if (res != "undefined" && res != "" && res != [] && res != {}) {
                    this.mostAccessedDay = res.data;
                } else {
                    this.mostAccessedDay = '';
                }
            });
        },

        loadMostAccessedWeek() {
            axios.get(`${urlPublic}/most-accessed-week`).then(res => {
                if (res != "undefined") {
                    this.mostAccessedWeek = res.data;
                }
            });
        },
    },

    mounted() {
        this.loadMostAccessedDay();
        this.loadMostAccessedWeek();
    }

}