<script setup>
import { ref, onMounted } from "vue";


const tasks = ref([]); 
const groupedTasks = ref({}); 

onMounted(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
    console.log("Loaded tasks from localStorage:", tasks.value);
    groupTasksByDay();
  } else{
    console.log("No tasks found in localStorage.");
  }
});

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function groupTasksByDay() {
  const today = new Date().toISOString().split("T")[0];
  console.log("Today's date:", today);

  groupedTasks.value = tasks.value.reduce((acc, task) => {
    const taskDay = task.date; 
    if (!taskDay) {
      console.error("Task missing date: ", task);
      return acc; 
    }

    if (taskDay !== today) {
      const formattedDay = new Date(taskDay).toLocaleDateString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      if (!acc[formattedDay]) acc[formattedDay] = [];
      acc[formattedDay].push(task);
    }
    return acc;
  }, {});

  console.log("Grouped tasks excluding today:", groupedTasks.value); 
}

function editTask(index, day) {
  const task = groupedTasks.value[day][index];
  const newName = prompt("Edit task name:", task.name) || task.name;
  const newDate = prompt("Edit task date (YYYY-MM-DD):", task.date) || task.date;
  const newTime = prompt("Edit task time (HH:MM):", task.time) || task.time;

  groupedTasks.value[day][index] = {
    ...task,
    name: newName.trim(),
    date: newDate.trim(),
    time: newTime.trim(),
  };

  tasks.value = Object.values(groupedTasks.value).flat();
  saveToLocalStorage();
  groupTasksByDay();
}

function deleteTask(index, day) {
  groupedTasks.value[day].splice(index, 1);

  tasks.value = Object.values(groupedTasks.value).flat();
  saveToLocalStorage();
  groupTasksByDay();
}

function toggleTaskCompletion(index, day) {
  groupedTasks.value[day][index].completed =
    !groupedTasks.value[day][index].completed;

  tasks.value = Object.values(groupedTasks.value).flat();
  saveToLocalStorage();
  groupTasksByDay();
}
</script>


<template>
  <div class="bg-[#A18AFF] min-h-screen flex items-center justify-center">
    <div class="w-[90%] max-w-4xl mx-auto">

      <div
        v-for="(tasks, day) in groupedTasks"
        :key="day"
        v-if="tasks.length > 0"
        class="mb-8"
      >
        <h2 class="text-xl font-bold text-white mb-4">{{ day }}</h2>
        <div
          v-for="(task, index) in tasks"
          :key="index"
          class="relative group mb-4"
        >
          <div class="flex items-center bg-white text-gray-700 rounded-2xl p-4 shadow">
            <span
              class="w-3 h-3 rounded-full mr-2"
              :class="{
                'bg-personal': task.category === 'personal',
                'bg-freelance': task.category === 'freelance',
                'bg-work': task.category === 'work'
              }"
            ></span>
            <p
              class="flex-1 text-lg text-gray-500 font-semibold"
              :class="{ 'opacity-50': task.completed }" >
              {{ task.name }}
            </p>
            <span class="text-sm text-gray-500 font-semibold mr-8" >
              {{ task.time }}
            </span>
            <button
              @click="toggleTaskCompletion(index, day)"
              class="ml-5" >
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
          </div>
          <div
            class="absolute top-1/2 right-[-100px] transform -translate-y-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">

            <button
              @click="editTask(index, day)"
              class="bg-blue-500 text-white p-3 rounded-full shadow-md"
              title="Edit Task">

              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="deleteTask(index, day)"
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
