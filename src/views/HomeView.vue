<template>
  <div class="home">
    <h1>訊一敬</h1>
    <p v-if="ordered" class="notice">🎉您的訂單正在製作中！取餐編號為：{{ orderID }}</p>
    <p v-else class="notice">本店消費滿 150 元贈送免費虛擬 VR 體驗</p>
    <div class="products-group">
      <ProductCard
        v-for="(key, value) in products"
        :key="key.img"
        :name="value"
        :img="key.img"
        :price="key.price" @update="update" />
    </div>
    <BottomNavbar @confirm="toggleOrderCheckAlert" :total="total" />
    <OrderCheck @close="toggleOrderCheckAlert" :show="showOrderCheck" :total="total" :list="shopList" />
  </div>
</template>

<script lang="ts" setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import ProductCard from '@/components/ProductCard.vue';
import OrderCheck from '@/components/OrderCheck.vue';
import { ref } from 'vue';
import { apiURL, products } from '@/config';
import axios from 'axios';

let ordered = ref(false);
let orderID = ref();
setInterval(() => {
  ordered.value = false;
  if (localStorage.getItem("id")) {
    ordered.value = true;
    orderID.value = localStorage.getItem("id");
  }
}, 1000);
setInterval(() => {
  if (!localStorage.getItem("id")) return;
  axios.get(`${apiURL}alive.php?id=${localStorage.getItem("id")}`).then(response => {
    if (response.data == "0") {
      localStorage.clear();
      alert("訂單已完成");
    }
  });
}, 1000);
let total = ref(0);
let showOrderCheck = ref(false);
const shopList : Record<string, number> = {};
const update = function (price: number, name: string, count: number) {
  total.value += price;
  shopList[name] = isNaN(shopList[name]) ? 0 + count : shopList[name] + count;
}
const toggleOrderCheckAlert = function() {
  showOrderCheck.value = !showOrderCheck.value;
}

</script>

<style lang="scss">
h1 {
  margin-bottom: 0.5rem;
}

.products-group {
  overflow-y: scroll;
  height: calc(100vh - 12rem);
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notice {
  margin: 0.5rem;
}
</style>