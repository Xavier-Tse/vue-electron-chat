<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Select a provider" />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <SelectItem value="provider1">
              <SelectItemText>
                111
              </SelectItemText>
            </SelectItem>
            <SelectItem value="provider2">
              <SelectItemText>
                222
              </SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script lang="ts" setup>
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
</script>