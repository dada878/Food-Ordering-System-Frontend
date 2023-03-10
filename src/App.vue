<template>
  <router-view/>
</template>

<style lang="scss">

html, body, #app {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  user-select: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} 

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #a8a8a818;
}
 
::-webkit-scrollbar-thumb {
  background: rgba(214, 214, 214, 0.377); 
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(214, 214, 214, 0.541);  
}
</style>
