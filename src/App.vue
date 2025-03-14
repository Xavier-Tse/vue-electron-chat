<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <ConversationList :items="items" />
    </div>
    <div class=" h-full flex-1">
      content
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationList from './components/ConversationList.vue';
import { ConversationProps } from './types'
const items: ConversationProps[] = [
  { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '标题', createdAt: '2021-01-01', updatedAt: '2021-01-01', providerId: 1 },
]
console.log('👋 This message is being logged by "renderer.ts", included via Vite')
</script>