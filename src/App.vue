<script setup>
import Sidebar from '@/components/Sidebar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />
    
    <div class="flex-1 overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>