<template>
  <div class="home">
    <h1>hello</h1>
    <formBuild>
      <template v-slot:prepend>
        <h3>Here might be a page title</h3>
      </template>
      <template v-slot:append>
        <h3>Here might be a page title</h3>
      </template>
    </formBuild>

    <titleView title="这是标题">
      <template v-slot:prepend>
        <h3>asfasfe</h3>
      </template>
    </titleView>
  </div>
</template>

<script>
// @ is an alias to /src
import formBuild from '@/components/form-build/index.vue'
import titleView from '@/components/title.vue'

export default {
  name: 'Home',
  components: {
    formBuild,
    titleView,
  }
}
</script>
