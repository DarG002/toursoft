const sidePanel = {
  state: {
    template: null,
    title: null,
    width: '40%',
    data: null,
    noClose: false,
    open: false
  },
  mutations: {
    WIDTH_SIDE_PANEL: (state, width) => {
      state.width = width
    },
    TEMPLATE_SIDE_PANEL: (state, template) => {
      state.template = template
    },
    TITLE_SIDE_PANEL: (state, title) => {
      state.title = title
    },
    DATA_SIDE_PANEL: (state, data) => {
      state.data = data
    },
    OPEN_SIDE_PANEL: (state) => {
      state.open = true
    },
    CLOSE_SIDE_PANEL: (state) => {
      state.open = false
    },
    TOGGLE_SIDE_PANEL: (state) => {
      state.open = !state.open
    },
    NO_CLOSE_SIDE_PANEL: (state, noClose) => {
      state.noClose = noClose
    }
  },
  actions: {
    setSidePanel({ commit, state }, { template, title, data, noClose, width }) {
      commit('TEMPLATE_SIDE_PANEL', template || null)
      commit('TITLE_SIDE_PANEL', title)
      commit('DATA_SIDE_PANEL', data || {})
      commit('NO_CLOSE_SIDE_PANEL', !!noClose)
      commit('WIDTH_SIDE_PANEL', width || '720px')
      if (!state.open) {
        commit('OPEN_SIDE_PANEL')
      }
    },
    widthSidePanel({ commit }, width) {
      commit('WIDTH_SIDE_PANEL', width)
    },
    openSidePanel({ commit }) {
      commit('OPEN_SIDE_PANEL')
    },
    closeSidePanel({ commit }) {
      commit('CLOSE_SIDE_PANEL')
    },
    toggleSidePanel({ commit }) {
      commit('TOGGLE_SIDE_PANEL')
    }
  }
}
export default sidePanel
