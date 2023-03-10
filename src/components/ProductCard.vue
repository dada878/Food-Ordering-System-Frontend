<template>
  <section class="card">
    <img :src="`products/${img}.jpg`">
    <div class="card-body">
      <h3>{{ name }}</h3>
      <h5>{{ price }} 元</h5>
      <div class="btn-group">
        <button @click="chageCount(-1)">-</button>
        <p>{{ count }}</p>
        <button @click="chageCount(1)">+</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';
const props = defineProps(["img", "name", "price"]);
const emit = defineEmits(["update"]);
let count = ref(0);
const chageCount = function (value: number) {
  if (count.value + value >= 0) emit("update", props.price * value, props.name, value);
  count.value = Math.max(count.value + value, 0);
}
</script>

<style scoped lang="scss">
.card {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  box-shadow: rgba(131, 131, 131, 0.466) 0.1rem 0.1rem 0.4rem;
  padding: 0.8rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  img {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
  }

  .card-body {
    display: flex;
    flex-direction: column;

    .btn-group {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: auto;

      p {
        margin: 0rem;
      }

      button {
        width: 2rem;
        height: 2rem;
        background-color: rgb(212, 212, 212);
        box-shadow: rgba(131, 131, 131, 0.466) inset 0.05rem 0.05rem 0.3rem;
        background-image: linear-gradient(120deg, #ececec 0%, #dbdbdb 100%);
        border: none;
        border-radius: 0.5rem;
        font-size: 1.5rem;
        color: rgb(107, 107, 107);

        &:active {
          background-image: linear-gradient(120deg, #f7f7f7 0%, #e7e7e7 100%);

        }
      }
    }

    h3 {
      margin: 0rem;
      margin-top: 0.1rem;
      text-align: left;
    }

    h5 {
      margin: 0rem;
      margin-top: 0.1rem;
      text-align: left;
    }
  }
}
</style>
