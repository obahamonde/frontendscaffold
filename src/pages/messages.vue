import { useFirestore } from '../hooks/firebase';
<script setup lang="ts">

import { useAuth, useFirestore } from '../hooks/firebase';

import { MessageData } from '../hooks/types';

const { currentUser, login, loginWithGoogle, loginWithGithub, logout, register } = useAuth();

const { messages, getMessages, addMessage } = useFirestore();

const isAuthenticated = computed(() => !!currentUser.value);

const displayName = computed(() => {
    return currentUser.value?.displayName;
});

const avatar = computed(() => {
    return currentUser.value?.photoURL;
});

const message = ref('');

const time = computed(() => {
    return useNow().value.toLocaleTimeString();
});

const data = computed(() => {
    return {
        message: message.value,
        time: time.value,
        displayName: displayName.value,
        avatar: avatar.value,
    } as MessageData;
});

const show = ref(false);

const rules = computed(() => {
    return [(v: any) => !!v || 'Message is required', (v: string | any[]) => v.length <= 128 || 'Message must be less than 128 characters', (v: string | any[]) => v.length >= 1 || 'Message must be more than 1 character'];
});
onMounted(async () => {
    await getMessages();
});
</script>
<template>
<section>   
<VContainer v-if="isAuthenticated">
<div row center>
    <div col center>
    <img :src="avatar!" class="rf m-2 sh x3 scale cp" @click="show = !show" />
    <p class="text-caption col">{{ displayName!.split(' ')[0] }}</p>
</div>

    <VTextField v-model="message"
        counter="128"
        label="Message"
        :rules="rules"
        clearable
        color="#008080"
        clear-icon="mdi-close-circle"
        density="compact"
        dirty
        prepend-inner-icon="mdi-message-text"
        variant="outlined"
        @keyup.enter="addMessage(data); message = ''"
        
    ></VTextField>

    <VBtn
        @click="addMessage(data); message = ''"
        color="primary"
        class="m-4 mb-10"
        icon
    >
        <VIcon>
            mdi-send
        </VIcon>
    </VBtn>
    <VBtn v-if="show" @click="logout()" btn-del class="rf m-4 mb-10" icon title="Logout">
    <VIcon>
        mdi-logout
    </VIcon>
</VBtn>

</div>

<div v-for="m in messages">

    <VCard class="row p-4 bg-gray-200 m-4" :class="m.displayName === displayName ? 'start' : 'end'">
        <div col center>
            <img :src="m.avatar" class="rf m-2 sh x3 scale cp" />
            <p class="text-caption col">{{ m.displayName.split(' ')[0] }}</p>
                  </div>
        <div col center mt-3 mx-2>
                  <p class="text-md">{{ m.message }}</p>
                  <p class="text-caption col">{{ m.time }}</p>
        </div>
   
                </VCard>

</div>

</VContainer>
<VContainer v-else>
  <VLogin />
</VContainer>
</section>
</template>