<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import '@/assets/style.css';
import profileImage from '@/components/icons/images.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const router = useRouter();
const route = useRoute();

function navigateTo(path) {
    router.push(path);
}

function isActive(path) {
    return route.path === path;
}

const categories = reactive([
    { name: 'Personal', color: '#FD99AF' }, 
    { name: 'Freelance', color: '#3FD4F4' }, 
    { name: 'Work', color: '#FAC609' }
]);

function generateColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
}

function addCategory() {
    const newCategoryName = prompt('Enter the name for the new category:');
    if (newCategoryName) {
        categories.push({ name: newCategoryName, color: generateColor() });
    }
}

</script>


<template>
<div class="sticky top-0 h-screen w-80 bg-white p-4 border-r-2 border-gray-200 shadow-lg">

  <div class="flex items-center mb-8 ml-10">
            <img :src="profileImage" alt="Profile" class="rounded-full w-12 h-12">
            <div class="ml-3">
                <h2 class="text-lg font-sm text-gray-600">Do-it</h2>
                <p class="text-purple-600 text-lg">Hamza Mameri</p>
            </div>
        </div>
        <div class="h-0.5 w-2/3 mx-auto mt-7 rounded-full" style="background-color: #CA8BFE;"></div>
        <br><br>

        <nav class="space-y-6 ml-8">
            <div>

              <h3
                @click="navigateTo('/tasks')"
                :class="[ 
                    'text-lg mb-2 flex items-center cursor-pointer hover:text-purple-600', 
                    isActive('/tasks') ? 'text-purple-600' : 'text-gray-600 ' 
                ]">
                <i class="fa-solid fa-calendar-day mr-6 text-lg text-gray-300 hover:text-purple-600"></i>
                <span class="text-lg">Today Tasks</span>
                </h3>

                <ul class="ml-10">
                    <li
                    v-for="category in categories"
                    :key="category.name"
                    class="flex items-center mb-3 cursor-pointer hover:opacity-80">
                    <span
                        :style="{ backgroundColor: category.color }"
                        class="w-3 h-3 rounded-full mr-3"></span>
                    {{ category.name }}
                    </li>

                    <li
                    @click="addCategory"
                    class="text-gray-300 cursor-pointer hover:text-gray-400 flex items-center group">
                    <span
                        class="flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"
                    >
                        <i class="fas fa-plus text-white text-[8px]"></i>
                    </span>
                        Add filter
                    </li>
                </ul>

            </div><br>

            <div class="mt-8">

                <h3
                @click="navigateTo('/schedule')"
                :class="[ 
                    'text-sm mb-2 cursor-pointer', 
                    isActive('/schedule') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600' 
                ]"
                >
                <i class="fa-regular fa-calendar-days mr-6 text-lg text-gray-300 hover:text-purple-600"></i>
                    <span class="text-lg">Scheduled tasks</span>
                </h3>
                <br>

                <p
                @click="navigateTo('/settings')"
                :class="[ 
                    'cursor-pointer', 
                    isActive('/settings') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600' 
                ]">
                <i class="fa-solid fa-gear mr-6 text-lg text-gray-300 hover:text-purple-600"></i>
                    <span class="text-lg">Settings</span>
                </p>

            </div>
        </nav>
    </div>
</template>

