import Vue from 'vue'
const pkg = require('./package');

export const keyApplicationGB = 'auth._gestaobyteskey'

export const titlePage = pkg.titlePage
export const adminSuper = pkg.adminSuper
export const linksNav = pkg.linksNav
export const urlApi = pkg.local_web=='local' ? pkg.apiLocal : pkg.apiWeb
export const urlSite = pkg.urlSite
export const urlStorage = pkg.storage
export const urlPublic = urlApi + '/public'
export const urlAdmin = urlApi + '/admin'

export function showError(e) {
    if (e && e.response && e.response.data) {
        var message = Object.values(e.response.data)
        Vue.toasted.global.defaultError({ msg: message[0] })
    } else if (typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { keyApplicationGB, urlApi, urlPublic, urlAdmin, urlStorage, urlSite, adminSuper, linksNav, titlePage, showError }
