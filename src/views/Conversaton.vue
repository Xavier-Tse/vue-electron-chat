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
import { MessageProps } from '../types';
import { parse } from 'vue/compiler-sfc';

const route = useRoute()
const conversationId = parseInt(route.params.id as string)

const messages: MessageProps[] = [
  { id: 1, content: '什么是Vue？', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很请正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2025-03-15',updatedAt: '2025-03-15',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很请正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', conversationId: 1 },
  { id: 5, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 1 },
  { id: 6, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 7, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 2 },
  { id: 8, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 2 },
  { id: 9, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 3 },
  { id: 10, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 3 },
]
const filteredMessages = messages.filter(message => message.conversationId === conversationId)
</script>