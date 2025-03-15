<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :items="providers" v-model="selectedModel" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageInput from '../components/MessageInput.vue';
import ProviderSelect from '../components/ProviderSelect.vue';
import { providers } from '../testData';

const selectedModel = ref('')
</script>