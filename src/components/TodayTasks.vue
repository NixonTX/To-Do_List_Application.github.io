<script setup>
import { ref, onMounted, computed } from "vue";

const tasks = ref([]); 
const newTask = ref("");
const taskDate = ref(""); 
const taskTime = ref(""); 
const selectedCategory = ref("");

const todayDate = new Date().toISOString().split("T")[0];

const todayTasks = computed(() =>
  tasks.value.filter((task) => task.date === todayDate)
);

onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
    sortTasksByDateTime(); 
  }
});

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}


function sortTasksByDateTime() {
  tasks.value.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB; 
  });
}

function addTask() {
  if (newTask.value.trim() && taskDate.value && taskTime.value && selectedCategory.value) {
    const newTaskObj = {
      name: newTask.value.trim(),
      date: taskDate.value,
      time: taskTime.value,
      category: selectedCategory.value,
      completed: false,
    };

    tasks.value.push(newTaskObj);
    sortTasksByDateTime(); 
    saveToLocalStorage(); 

    newTask.value = "";
    taskDate.value = "";
    taskTime.value = "";
    selectedCategory.value = "";

  } else {
    alert("Please enter a task, select a date, choose a time and category !");
  }
}


function toggleTaskCompletion(task) {
  const taskIndex = tasks.value.findIndex((t) => t === task);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed;
    saveToLocalStorage();
  }
}

function editTask(task) {
  const taskIndex = tasks.value.findIndex((t) => t === task);
  if (taskIndex !== -1) {
    const currentTask = tasks.value[taskIndex];
    const newName = prompt("Edit task name:", currentTask.name) || currentTask.name;
    const newDate = prompt("Edit task date (YYYY-MM-DD):", currentTask.date) || currentTask.date;
    const newTime = prompt("Edit task time (HH:MM):", currentTask.time) || currentTask.time;

    tasks.value[taskIndex] = {
      ...currentTask,
      name: newName.trim(),
      date: newDate.trim(),
      time: newTime.trim(),
    };

    saveToLocalStorage();
  }
}

function deleteTask(task) {
  const taskIndex = tasks.value.findIndex((t) => t === task);
  if (taskIndex !== -1 && confirm("Are you sure you want to delete this task?")) {
    tasks.value.splice(taskIndex, 1);
    saveToLocalStorage();
  }
}

</script>


<template>
  <div class="flex-1 overflow-y-auto p-10 bg-[#A18AFF] text-white min-h-screen">
    <h1 class="text-2xl ml-32 font-bold mb-1">Today main focus</h1>
    <h2 class="text-4xl ml-32 font-extrabold mb-16">Design team meeting</h2>

    <div
      class="bg-white mt-8 flex items-center rounded-2xl p-5 shadow relative group"
      style="width: 80%; margin: 0 auto;">

    <div class="flex space-x-4 mr-6">
        <span
          class="w-3 h-3 rounded-full bg-personal cursor-pointer"
          :class="{ 'ring-4 ring-pink-500': selectedCategory === 'personal' }"
          @click="selectedCategory = 'personal'"></span>

        <span
          class="w-3 h-3 rounded-full bg-freelance cursor-pointer"
          :class="{ 'ring-4 ring-cyan-500': selectedCategory === 'freelance' }"
          @click="selectedCategory = 'freelance'"></span>

        <span
          class="w-3 h-3 rounded-full bg-work cursor-pointer"
          :class="{ 'ring-4 ring-yellow-500': selectedCategory === 'work' }"
          @click="selectedCategory = 'work'"></span>
      </div>

      <input
        type="text"
        placeholder="What is your next task?"
        v-model="newTask"
        class="flex-1 bg-transparent focus:outline-none text-gray-800 font-semibold"/>
      <input
        type="date"
        v-model="taskDate"
        class="ml-4 text-gray-400 border border-gray-300 rounded"/>
      <input
        type="time"
        v-model="taskTime"
        class="ml-2 text-gray-400 border border-gray-300 rounded"/>
      <button
        @click="addTask"
        class="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">

        <i class="fas fa-check"></i>
      </button>

    </div>

   
<div class="mt-14 space-y-4 w-[90%] max-w-4xl mx-auto">


    <div
    v-for="(task, index) in todayTasks"
    :key="index"
    class="relative group">
    <div class="flex items-center bg-white text-gray-700 rounded-2xl p-4 shadow">
      <span
        class="w-3 h-3 rounded-full mr-4"
        :class="{
          'bg-personal': task.category === 'personal',
          'bg-freelance': task.category === 'freelance',
          'bg-work': task.category === 'work'
        }"></span>

    <p
      class="flex-1 text-lg text-gray-500 font-semibold"
      :class="{ 'opacity-50': task.completed }">
      {{ task.name }}
    </p>
    <span class="text-sm mr-8 text-gray-500 font-semibold">
      {{ task.time }}
    </span>

    <button @click="toggleTaskCompletion(task)" class="ml-5">
      <i
        class="far fa-circle"
        :class="{ 'text-purple-600': !task.completed }"
        v-if="!task.completed"
      ></i>
      <i
        class="fas fa-check-circle"
        :class="{ 'text-purple-600': task.completed }"
        v-if="task.completed"
      ></i>
    </button>

    <div
      class="absolute top-1/2 right-[-100px] transform -translate-y-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        @click="editTask(task)"
        class="bg-blue-500 text-white p-3 rounded-full shadow-md"
        title="Edit Task">
        <i class="fas fa-edit"></i>
      </button>

      <button
        @click="deleteTask(task)"
        class="bg-red-500 text-white p-3 rounded-full shadow-md"
        title="Delete Task">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>

  </div>
</div>
 

</div>

</div>
</template>


