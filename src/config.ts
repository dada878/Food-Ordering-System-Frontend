const products : Record<string, {img: string, price: number}> = {
    "茶葉蛋": {
        img: "egg",
        price: 20
    },
    "古早味冬瓜茶": {
        img: "tea",
        price: 30
    },
    "冬瓜檸檬": {
        img: "tea2",
        price: 35
    },
    "虛擬 VR 體驗": {
        img: "vr",
        price: 50
    },
    "小杯可樂" : {
        img: "cola",
        price: 20
    },
    "大杯可樂" : {
        img: "cola",
        price: 35
    },
    "小杯雪碧" : {
        img: "sprite",
        price: 20
    },
    "大杯雪碧" : {
        img: "sprite",
        price: 35
    },
    "小杯芬達" : {
        img: "fanta",
        price: 20
    },
    "大杯芬達" : {
        img: "fanta",
        price: 35
    }
};
const devMode = false;
const password = "password";
const baseURL = devMode ? "http://localhost:8080/" : "url for your home page";
const apiURL = devMode ? "http://localhost:8000/" : "url for your api";
export { products, apiURL, baseURL, password };