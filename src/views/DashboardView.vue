<template>
  <main class="dashboard">
    <button @click="resetNumber" class="btn">重制訂單編號(並清除所有訂單)</button>
    <div v-for="item, idx in list" :key="item.id" class="order">
      <h3>訂單編號: {{ item.id }}</h3>
      <h3>總金額: {{ item.total }}</h3>
      <h3 v-if="item.total > 150">*包含 VR 體驗機會</h3>
      <ul>
        <li v-for="(key, value) in item.detail" :key="value">{{ key }} x {{ value }}</li>
      </ul>
      <button @click="deleteData(item.id, idx)" class="btn">完成訂單</button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { apiURL, products, baseURL, password } from '@/config';
import axios from 'axios';
import { ref, Ref } from 'vue';
let list: Ref<{ id: number, total: number, detail: Record<string, number> }[]> = ref([]);
if (prompt('輸入後台密碼') != password) {
  location.href = baseURL;
}

const getData = function () {
  axios.get(apiURL + "orders.php").then(response => {
    list.value = [];
    for (const item of response.data) {
      const detail: Record<string, number> = JSON.parse(item.detail);
      let total = 0;
      for (const key of Object.keys(detail)) {
        total += products[key].price * detail[key];
      }
      list.value.push({
        id: item.id,
        detail: JSON.parse(item.detail),
        total: total
      });
    }
  });
}
const deleteData = function (id: number, index: number) {
  list.value.splice(index, 1);
  axios.post(apiURL + "delete.php", {
    id: id
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
const resetNumber = function () {
  axios.post(apiURL + "reset.php", {}, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
setInterval(() => {
  getData();
}, 5000);
getData();
</script>

<style lang="scss">
.order {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.1rem;
  margin: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  width: calc(10rem);
  display: flex;
  flex-direction: column;

  h3 {
    margin-top: 0rem;

    &:first-child {
      margin-top: 1rem;
    }

    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 0rem;
  }
}

.btn {
  background-color: rgb(255, 255, 255);
  color: black;
  outline: 1px #646464 solid;
  border: none;
  border-radius: 0.4rem;
  padding: 0.8rem;
  transition: 100ms;
  margin-bottom: 1rem;
  margin-top: auto;

  &:last-child {
    background-color: rgb(100, 100, 100);
    color: white;
    outline: none;

    &:active {
      background-color: rgb(145, 145, 145);
    }
  }

  &:active {
    background-color: rgb(224, 224, 224);
  }
}

.dashboard {
  display: flex;
  text-align: left;
  flex-wrap: wrap;
}
</style>