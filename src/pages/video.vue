<script setup lang="ts">
const { state } = useStore();
const { request } = useServer();
const uploadVideo = async () => {
  const data = await request.upload("/api/storage/objects/bloblake?key=videos/"+state.currentVideoName, state.currentVideo as File);
  if (data) {
    state.uploadedVideos.push(data);
    state.currentVideoUrl = null;
  }
};
const videoName = ref<string>();
watchEffect(() => {
  state.currentVideoName = videoName.value + ".mp4";
});
</script>
<template>
     <VCamera/>
  <VShareScreen/>
  <VTextField
    v-model="videoName"
    label="Video Name"
    
  ></VTextField>
  <VCard class="col center p-4">
    <video
      :src="state.currentVideoUrl"
      controls
      class="w-1/2 sh rounded"
      v-if="state.currentVideoUrl"
    ></video>
    <VCardActions>
      <VBtn  v-if="state.currentVideoUrl" @click="state.currentVideoUrl = ''" btn-del>Clear</VBtn>
      <VBtn  v-if="state.currentVideoUrl && videoName" @click="uploadVideo()" btn-post>Upload</VBtn>
    </VCardActions>
  <VCarousel v-if="state.uploadedVideos.length > 0" col center>
    <VCarouselItem v-for="video in state.uploadedVideos" >
      <video :src="video" controls class="w-144 sh rounded"></video>
    </VCarouselItem>
  </VCarousel>
  <VBtn v-if="state.uploadedVideos.length > 0" @click="state.uploadedVideos = []" btn-del>Clear</VBtn>
  </VCard>
 
</template>