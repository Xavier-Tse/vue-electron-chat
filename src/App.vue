<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class=" h-[90%] overflow-y-auto">
        <ConversationList :items="conversations" />
      </div>
      <div class=" h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <button
            class=" shadow-sm inline-flex items-center justify-center bg-green-700 text-white
            hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:chat-bubble" width="15" height="15" class=" mr-2" />
            新建聊天
          </button>
        </RouterLink>
        <RouterLink to="/settings">
          <button
            class=" shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700
          hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:gear" width="15" height="15" class=" mr-2" />
            应用设置
          </button>
        </RouterLink>
      </div>
    </div>
    <div class=" h-full flex-1">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import ConversationList from './components/ConversationList.vue';
import { Icon } from '@iconify/vue';
import { conversations } from './testData';

console.log('👋 This message is being logged by "renderer.ts", included via Vite')
</script>