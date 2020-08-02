<template>
  <div>
    <span>{{msg}}</span>
    <button @click="aysncChangeMsg">aysnc change</button>
    <button @click="changeMsg">change</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('test', ['msg'])
  },
  methods: {
    ...mapMutations('test', ['setMsg']),
    ...mapActions('test', ['asyncChangeMsg']),
    aysncChangeMsg() {
      this.asyncChangeMsg()
    },
    changeMsg() {
      this.setMsg('heihei')
    }
  }
}
</script>