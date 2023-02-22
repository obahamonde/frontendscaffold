<script setup lang="ts">
const { state, setState } = useStore();

const currentCamera = ref<string>();

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value)) {
      currentCamera.value = cameras.value[0].deviceId;
    }
  },
});
const video = ref<HTMLVideoElement>();

const { stream, enabled } = useDisplayMedia();

watchEffect(() => {
  if (video.value && enabled.value) video.value.srcObject = stream.value!;
});

const recorder = ref<MediaRecorder>();

watchEffect(() => {
  if (stream.value) {
    recorder.value?.stop();
    recorder.value = new MediaRecorder(stream.value);
    recorder.value.start();
  } else {
    recorder.value?.stop();
  }
});

const videoBlob = ref<Blob[]>([]);

watchEffect(() => {
  if (recorder.value) {
    recorder.value.ondataavailable = (e) => {
      videoBlob.value.push(e.data);
    };
  }
  state.currentVideo = new File(videoBlob.value, "video.webm", {
    type: "video/webm",
  });
  watchEffect(() => {
    if (state.currentVideo) {
      setState({ currentVideoUrl: URL.createObjectURL(state.currentVideo) });
    }
  });
});
</script>
<template>
  <VBtn
    icon
    @click="enabled = !enabled"
    v-if="!enabled"
    class="br fixed m-4 mr-20 scale bg-primary text-white hover:bg-secondary"
    title="Share Screen"
  >
    <VIcon> mdi-share </VIcon>
  </VBtn>
  <video
    ref="video"
    muted
    autoplay
    controls
    class="w-48 sh bl fixed m-4"
    :hidden="!enabled"
    @click="enabled = false"
  />
</template>
