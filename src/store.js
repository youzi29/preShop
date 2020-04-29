import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		count:0,
		areaIndex: 0 ,//返回的导航栏链接
  },
  mutations: {
      setValue( state , index){
         state.areaIndex = index
        },
  },
  actions: {

  }
})
