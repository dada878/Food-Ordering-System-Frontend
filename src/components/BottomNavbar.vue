<template>
    <nav class="navbar">
        <ul>
            <li class="total">目前訂單總金額：{{ total }}</li>
            <li class="submit">
                <button @click="submitOrder" class="btn">送出訂單</button>
            </li>
        </ul>
    </nav>
</template>
  
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
defineProps(["total"]);
const emit = defineEmits(["confirm"]);
const submitOrder = function() {
    if (localStorage.getItem("id")) return alert("最多只能同時點一個訂單");
    emit('confirm');
}
</script>
  
<style lang="scss">
.navbar {
    border-top: solid 1px rgb(148, 148, 148);
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    background-color: #eeeeee;
    right: 0rem;

    ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin: 0.5rem;

        .total {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .submit {
            margin-left: auto;

            .btn {
                background-color: rgb(100, 100, 100);
                color: white;
                outline: none;
                border: none;
                border-radius: 0.4rem;
                padding: 0.8rem;
                transition: 100ms;

                &:active {
                    background-color: rgb(145, 145, 145);
                }
            }
        }
    }
}
</style>