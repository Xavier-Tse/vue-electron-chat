<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { messages } from '../testData';
import { MessageProps } from '../types';
import { ref, watch } from 'vue';

const route = useRoute()
const filteredMessages = ref<MessageProps[]>([])
let conversationId = parseInt(route.params.id as string)

filteredMessages.value = messages.filter(message => message.conversationId === conversationId)

watch(() => route.params.id, (newId: string) => {
  conversationId = parseInt(newId)
  filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
})
</script>