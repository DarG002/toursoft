import Vue from 'vue'
import Test from '@/components/Test'

describe('Test.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Test)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
