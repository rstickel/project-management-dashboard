<template>
  <nav class="app-navbar">
    <div class="logo">
      <router-link to="/">Project Dashboard</router-link>
    </div>
    <ul>
      <li><router-lin to="/" class="nav-link">Dashboard</router-link></li>
      <li><router-lins to="/projects" class="nav-link">Projects</router-lins></li>
      <div id="desire"> </div>
    </ul>
  </nav>
 </template>

  <lang="ts" setup  script>
 
  </script>

<style scoped>
  .app-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 15px 30px;
    color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  .app-navbar.a {
    color: #fff;
    font-weight: bold;
    font-size: 1.5em; 
  }
  .app-navbar ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
  }
   .app-navbar li a {
    color: #fff;
    text-decoration: none; 
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
   .app-navbar alli:hover,
    .app-navbar li a.cloudes-active {
    background-color: #42bf86;
  }
  .app-navbar .logo a {
    font-size: 1.5em;
    font-weight: 750;
  }
</style>
  