<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between" v-if="conversation">
    <h3 class="font-semibold text-gray-900">{{ conversation.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" ref="messageListRef" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput @create="sendNewMessage" v-model="inputValue" :disabled="messageStore.isMessageLoading" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MessageInput from '../components/MessageInput.vue';
import MessageList from '../components/MessageList.vue';
import { MessageListInstance, MessageProps } from '../types';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useConversationStore } from '../stores/conversation';
import { useMessageStore } from '../stores/message';
import { useProviderStore } from '../stores/provider';

const route = useRoute()
let conversationId = ref(parseInt(route.params.id as string))
const inputValue = ref('')
const messageListRef = ref<MessageListInstance>()
const conversationStore = useConversationStore()
const messageStore = useMessageStore()
const providerStore = useProviderStore()
const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const initMessageId = parseInt(route.query.init as string)
const filteredMessages = computed(() => messageStore.items)
const sendedMessages = computed(() => filteredMessages.value
  .filter(message => message.status !== 'loading')
    .map(message => {
      return {  
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
      }
    }
  )
)

const sendNewMessage = async (question: string) => {
  if (question) {
    const date = new Date().toISOString()
    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: 'question',
    })
    inputValue.value = ''
    creatingInitialMessage()
  }
}

const messageScrollToBottom = async () => {
  await nextTick()
  if (messageListRef.value) {
    messageListRef.value.ref.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}

const creatingInitialMessage = async () => {
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading'
  }
  const newMessageId = await messageStore.createMessage(createdData)
  await messageScrollToBottom()
  if (conversation.value) {
    const provider = providerStore.getProviderById(conversation.value.providerId)
    if (provider) {
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value,
      })
    }
  }
}

watch(() => route.params.id, async (newId: string) => {
  conversationId.value = parseInt(newId)
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
})

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value)
  await messageScrollToBottom()
  if (initMessageId) {
    await creatingInitialMessage()
  }
  let currentMessageListHeight = 0
  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.ref.clientHeight
      if (newHeight > currentMessageListHeight) {
        currentMessageListHeight = newHeight
        await messageScrollToBottom()
      }
    }
  }
  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('streamData', streamData)
    messageStore.updateMessage(streamData)
    await nextTick()
    checkAndScrollToBottom()
  })
})
</script>