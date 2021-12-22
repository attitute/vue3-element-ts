<script lang="ts">
import { h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { query, params } = route
    console.log('34234234423432423', query)
    console.log('34234234423432423', params)
    router.replace({
      path: '/' + params.path,
      query
    })
    return () => {
      return h('template')
    }
  }
}
</script>
