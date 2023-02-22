<script setup lang="ts">
const { state } = useStore();
const { request } = useServer()
const title = ref("")
onMounted(async () => {
 const data = await request.get("/api") as any;
  title.value = JSON.parse(data).message
});

</script>
<template>
  <VNavigationDrawer app v-model="state.layout.drawer" fixed clipped>
   <VSideBar/>
  </VNavigationDrawer>
  <VAppBar app bg-primary text-success row center>
    <VAppBarNavIcon @click.stop="state.layout.drawer = !state.layout.drawer" />
    <VImg src="/logo.png" class="mr-2" />
    <VClock />
  </VAppBar>
  <VMain app>
    <RouterView />
    <VNotifications />
  </VMain>
</template>
