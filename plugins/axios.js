export default function ({ $axios, store, redirect }) {
    
    $axios.onError(error => {
        const code = parseInt(error.response.status)
        
        if (code === 400) {
            store.dispatch("validation/setErrors", error.response);
        }
        if (code === 401) {
            store.dispatch("validation/setErrors", error.response.data.error);
        }
        if (code === 422) {
            store.dispatch("validation/setErrors", error.response.data.errors);
        }


        // if (error.response.status === 422 || error.response.status === 400) {
        //     store.dispatch("validation/setErrors", error.response.data.errors);
        // }
        // if (error.response.status === 401) {
        //     store.dispatch("validation/setErrors", '');
        // }
       
        return Promise.reject(error);
    });

    $axios.onRequest(() => {
        store.dispatch("validation/clearErrors");
    });
    
    
    // $axios.onError(error => {
    //     console.log(error)
    // });

    // $axios.onRequest(() => {
    //     console.log("teste da mixin validation")
    // });

    /*
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })
    */
}