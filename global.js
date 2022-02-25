import Vue from 'vue'
const pkg = require('./package');

export const keyApplicationGB = '_keyapplicationGB'
export const configsApplication = '_settingsapplicationGB'

export const titlePage = pkg.titlePage
export const company = pkg.company
export const adminSuper = pkg.adminSuper
export const urlApi = (pkg.webOrLocal == 'local' ? pkg.urlApiLocal : pkg.urlApiWeb)

export const urlSite = 'https://www.bsbg1.com.br'

export const urlPublic = urlApi + '/public'
export const urlAdmin = urlApi + '/admin'
export const urlStorage = (pkg.webOrLocal == 'local' ? pkg.storageLocal : pkg.storageWeb)
export const dateStart = pkg.dateStart

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

export default { urlSite, configsApplication, keyApplicationGB, urlApi, urlPublic, urlAdmin, urlStorage, adminSuper, titlePage, company, showError }
