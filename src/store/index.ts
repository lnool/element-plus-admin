import { createStore, Store, useStore as useVuexStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import { getPageList } from '../api'
import { IRootState, IStoreType } from './interface'

const modulesFiles = import.meta.globEager('./modules/*/*.ts')
const pathList: string[] = []
for (const path in modulesFiles) {
  pathList.push(path)
}

const modules = pathList.reduce(
  (modules: { [x: string]: any }, modulePath: string) => {
    const moduleName = modulePath
      .replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
      .replace('/index', '')
    const value = modulesFiles[modulePath]
    modules[moduleName] = value.default
    return modules
  },
  {}
)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

const state: IRootState = { entireDepartment: [], entireRole: [] }

export default createStore<IRootState>({
  state,
  mutations: {
    changeEntireDepartment(state: { entireDepartment: any }, payload: any) {
      state.entireDepartment = payload
    },
    changeEntireRole(state: { entireRole: any }, payload: any) {
      state.entireRole = payload
    }
  },
  actions: {
    async initialData({ commit }) {
      const { list: departmentList } = (
        await getPageList('/department/list', {
          offset: 0,
          size: 1000
        })
      ).data
      const { list: roleList } = (
        await getPageList('/role/list', {
          offset: 0,
          size: 1000
        })
      ).data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules,
  plugins: [vuexLocal.plugin]
})
