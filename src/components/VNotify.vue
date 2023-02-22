
<script setup lang="ts">

const show = ref(true)

const active = computed(() => {
    return show.value
})

const props = defineProps({
    mode: {
        type: String,
        default: 'info'
    },
    text: {
        type: String,
        default: 'This is a notification'
    },
    icon: {
        type: String,
        default: 'mdi-information'
    },
    timeout: {
        type: Number,
        default: 5000
    }
})

const classes = computed(() => {
    switch (props.mode) {
        case 'info':
            return 'bg-blue-100 text-blue-800'
        case 'success':
            return 'bg-green-100 text-green-800'
        case 'error':
            return 'bg-red-100 text-red-800'
        default:
            return 'bg-blue-100 text-blue-800'
    }
})

const audio = computed(() => {
    switch (props.mode) {
        case 'info':
            return '/info.wav'
        case 'success':
            return '/success.wav'
        case 'error':
            return '/error.wav'
    }
})

const emit = defineEmits(['close'])

onMounted(() => {
    setTimeout(() => {
       hide()
    }, props.timeout)
})

const hide = () => {
    emit('close')
    show.value = false
   
}

</script>

<template>
    <div class="px-2 py-2 sh m-4" :class="classes" v-if="active">
        <p class="text-md m-4 text-accent ">{{ props.text }}
            <Icon :icon="props.icon" class="cp x1 mx-2" @click="hide()" rf bg-black text-white />
            <audio :src="audio" autoplay v-if="active" hidden />
        </p>
    </div>
</template>
 