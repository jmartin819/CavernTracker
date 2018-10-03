import api from '@/services/api'

export default {
  fetchAndroidApps () {
    return api().get('androidapps')
  },

  fetchiOSApps () {
    console.log(api().baseURL)
    return api().get('api/iosapps')
  },

  fetchiOSAppParams (appId) {
    return api().get('api/iosapps/' + appId)
  },
  fetchUserFromDB (uid) {
    return api().get('api/user/' + uid)
  },
  postiOSAppParams (appId, paramObj) {
    console.log('param obj in service')
    console.log(paramObj)
    return api().post('api/iosapps/' + appId, paramObj)
  },
  deleteiOSConfig (appId, configId) {
    return api().delete('api/iosapps/' + appId + '/configs/' + configId)
  },

  fetchiOSParams () {
    return api().get('api/iosparams')
  },

  fetchAppsWithParam (paramId) {
    return api().get('api/iosparamslist/' + paramId)
  },

  fetchParamName (paramId) {
    return api().get('api/iosparams/' + paramId)
  },

  fetchAndroidParams () {
    return api().get('api/androidparams')
  }

}
