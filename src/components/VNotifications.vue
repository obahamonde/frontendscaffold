import { NotifyProps } from '../hooks/types';
<script setup lang="ts">

import { NotifyProps } from '../hooks';

const { state, setState } = useStore()

const noti = reactive<NotifyProps>({
    mode: 'info',
    text: 'This is a notification',
    icon: computed(() => {
        switch (noti.mode) {
            case 'info':
                return 'mdi-information'
            case 'success':
                return 'mdi-check'
            case 'error':
                return 'mdi-alert'
            default:
                return 'mdi-information'
            }
    }),
    timeout: 5000
})

const addNotify = () => {
    setState({ notifications: [...state.notifications, noti] })
}

    </script>
<template>
      <VNotify
      v-for="(noti, index) in state.notifications"
      class="notify w-64 fixed br shadow-black shadow-lg"    
        @close="state.notifications.splice(index, 1)"
        :mode="noti.mode"
        :text="noti.text"
        :icon="noti.icon"
        :timeout="noti.timeout"
        :key="index"
        :show="true"
        :style="{ right: (index * 4) + 'px' }"
        />
  </template>
<style scoped>
.notify {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9999;
}
</style>