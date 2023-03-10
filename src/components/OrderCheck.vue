<template>
    <Transition>
        <div v-show="show" class="dark-mask">
            <div class="alert-body">
                <h1>訂單明細</h1>
                <p v-for="(value, key) in list" :key="key">{{ key }} x {{ value }}</p>
                <br>
                <div class="total">
                    <p><strong>訂單總金額：{{ total }} 元</strong></p>
                    <p class="detail" v-if="total >= 150">* 贈送免費虛擬 VR 體驗 1 次</p>
                    <p class="detail" v-else>* 再消費 {{ 150 - total }} 元贈送虛擬 VR 體驗</p>
                </div>
                <div class="btn-group">
                    <button @click="emit('close')" class="btn">繼續選購</button>
                    <button @click="sumbit" class="btn">確認送出</button>
                </div>
            </div>
        </div>
    </Transition>
</template>
  
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import axios from 'axios';
import { apiURL } from '@/config';
const props = defineProps(["list", "show", "total"]);
const emit = defineEmits(["close"]);
const sumbit = function () {
    axios.post(apiURL + "sumbit.php", {
        detail: props.list
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => {
        localStorage.setItem("id", response.data);
        alert(`點餐成功，你的訂單編號為 ${response.data}`);
    });
    emit('close');
}
</script>
  
<style lang="scss">
.dark-mask {
    position: fixed;
    top: 0rem;
    bottom: 0rem;
    left: 0rem;
    right: 0rem;
    background-color: rgba(0, 0, 0, 0.671);
    display: flex;
    flex-direction: column;
}

.alert-body {
    background-color: white;
    margin: 2rem;
    flex: 1;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    h1 {
        margin-bottom: 2rem;
        margin-top: 1rem;
    }

    p {
        margin: 0.2rem;
    }

    .total {
        margin-top: auto;
        margin-bottom: 1rem;
    }

    .btn {
        background-color: rgb(255, 255, 255);
        color: black;
        outline: 1px #646464 solid;
        border: none;
        border-radius: 0.4rem;
        padding: 0.8rem;
        transition: 100ms;

        &:last-child {
            flex: 1;
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

    .detail {
        font-size: 0.9rem;
    }

    .btn-group {
        display: flex;
        gap: 0.5rem;
    }
}

.v-enter-active,
.v-leave-active {
    transition: 200ms;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.v-enter-to,
.v-leave-from {
    opacity: 1;
}
</style>