<script setup>
import { ref } from 'vue';
import '@/assets/style.css';


const profileDropdownVisible = ref(false);
const profileName = ref('Default User'); 

const toggleProfileDropdown = () => {
  profileDropdownVisible.value = !profileDropdownVisible.value;
};

const editProfile = () => {
  const newName = prompt('Enter your new name: ', profileName.value);
  if (newName && newName.trim() !== '') {
    profileName.value = newName.trim();
    saveToLocalStorage();
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem('profileName', profileName.value);
};

const loadFromLocalStorage = () => {
  const savedName = localStorage.getItem('profileName');
  if (savedName) {
    profileName.value = savedName;
  }
};

loadFromLocalStorage();

</script>

<template>
  <div class="bg-[#A18AFF] flex items-center justify-center min-h-screen">
    <div class="bg-white rounded-3xl shadow-lg p-8 w-[1000px]">
      <div class="flex flex-col h-full justify-between">

        <div class="mb-6">
          <h2 class="text-purple-500 text-lg font-semibold flex items-center mb-4">
            <i class="fas fa-user-circle mr-2"></i> Profile
          </h2>
          <hr class="border-t border-purple-200 mb-4">
          <ul class="space-y-4 text-gray-700">
            <li>

              <div class="mb-2">
                <span class="font-bold text-gray-800">Profile Name: Hamza mameri<br>
                Name: </span>
                <span>{{ profileName }}</span>
              </div>
              <div
                class="flex justify-between items-center cursor-pointer hover:text-purple-500"
                @click="toggleProfileDropdown">
                <span>Edit Profile</span>
                <i
                  class="fas fa-chevron-right transition-transform"
                  :class="{'rotate-90': profileDropdownVisible}"
                ></i>
              </div>

              <ul
                v-if="profileDropdownVisible"
                class="mt-2 pl-4 space-y-2 text-sm text-gray-600">
                <button
                  @click="editProfile"
                  class="bg-purple-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:text-gray-300">
                  Edit Profile Name
                </button>
              </ul>
            </li>

            <li class="flex justify-between items-center cursor-pointer hover:text-purple-500">
              <span>Change Password</span>
              <i class="fas fa-chevron-right"></i>
            </li>
            <li class="flex justify-between items-center cursor-pointer hover:text-purple-500">
              <span>Privacy</span>
              <i class="fas fa-chevron-right"></i>
            </li>

          </ul>
        </div>


        <div class="mb-6">
          <h2 class="text-purple-500 text-lg font-semibold flex items-center mb-4">
            <i class="fas fa-bell mr-2"></i> Notification
          </h2>
          <hr class="border-t border-purple-200 mb-4">
          <ul class="space-y-4">

            <li class="flex justify-between items-center">
              <span>Notifications</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:bg-purple-500 transition-colors"
                ></div>
                <div
                  class="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"
                ></div>
              </label>
            </li>

            <li class="flex justify-between items-center">
              <span>Tasks Notifications</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:bg-purple-500 transition-colors"
                ></div>
                <div
                  class="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"
                ></div>
              </label>
            </li>

          </ul>
        </div>

        <div class="mb-6">
          <h2 class="text-purple-500 text-lg font-semibold flex items-center mb-4">
            <i class="fas fa-ellipsis-h mr-2"></i> More
          </h2>
          <hr class="border-t border-purple-200 mb-4">

          <ul class="space-y-4 text-gray-700">
            <li class="flex justify-between items-center cursor-pointer hover:text-purple-500">
              <span>Language</span>
              <i class="fas fa-chevron-right"></i>
            </li>
            <li class="flex justify-between items-center cursor-pointer hover:text-purple-500">
              <span>Country</span>
              <i class="fas fa-chevron-right"></i>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

