import { defineStore, acceptHMRUpdate } from "pinia";
import { NotifyProps } from '../hooks/types';

export const useStore = defineStore("state", () => {
  const state = reactive({
    currentVideo: null as File | null,
    currentVideoUrl: undefined as string | undefined | null,
    uploadedVideos: [] as string[],
    currentVideoName: undefined as string | undefined | null,
    layout: {
      drawer: false,
    },
    notifications: [] as NotifyProps[],
  });
  const setState = (newState: any) => {
    Object.assign(state, newState);
  };
  return {
    state,
    setState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
