import { VbxOptions } from './types'

export class Vbx {
  private options: VbxOptions
  constructor(initOptions: VbxOptions = {}) {
    this.options = initOptions
  }
  install(Vue: any, initOptions: VbxOptions = {}) {
    Object.assign(this.options, initOptions)
    const { data = {}, methods = {}, computed = {} } = this.options
    const Bus = new Vue({
      methods: {
        ...methods,
        emit(event: string, args: any) {
          // @ts-ignore
          this.$emit(event, args)
        },
        on(event: string, callback: Function) {
          // @ts-ignore
          this.$on(event, callback)
        },
        off(event: string, callback: Function) {
          // @ts-ignore
          this.$off(event, callback)
        }
      },
      data() {
        return {
          ...data
        }
      },
      computed
    })
    Vue.prototype.$bus = Bus
  }
}
