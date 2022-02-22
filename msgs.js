import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    duration: 3000,
    iconPack : 'mdi' // set your iconPack, defaults to material. material|fontawesome|custom-class
})


Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)
