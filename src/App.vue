<template>
  <div class=" flex items-center justify-between h-screen">
    <div class=" w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class=" h-[90%] overflow-y-auto">
        <ConversationList :items="items" />
        <h3>{{ conversationStore.totalNumber }}</h3>
      </div>
      <div class=" h-[10%] grid grid-cols-2 gap-2 p-2">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            新建聊天
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain chass="w-full">
            应用设置
          </Button>
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
import { computed, onMounted } from 'vue';
import { db, initProviders } from './db';
import { useConversationStore } from './stores/conversation';
import { conversations } from './testData';
import Button from './components/Button.vue';
import { useProviderStore } from './stores/provider';

const conversationStore = useConversationStore()
const providerStore = useProviderStore()
const items = computed(() => conversationStore.items)

onMounted(async () => {
  await initProviders()
  conversationStore.fetchConversations()
  providerStore.fetchProviders()
})

let index = 0
const testAdd = () => {
  index++
  conversationStore.items.push(conversations[index])
}
const testReset = () => {
  conversationStore.$reset()
}
</script>