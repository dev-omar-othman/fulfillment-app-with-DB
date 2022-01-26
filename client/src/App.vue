<template>
  <div id="app" class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light container p-3">
  <a class="navbar-brand" href="#"><img src="./assets/m&s.png"></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/"><button type="button" class="btn btn-light m-2 p-2">orders to fulfill</button></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about"><button type="button" class="btn btn-light m-2 p-2">order can't be fulfilled</button></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/logs"><button type="button" class="btn btn-light m-2 p-2">fulfilled orders</button></router-link>
      </li>
      <li class="nav-item">
        <router-link to="/inventory"><button type="button" class="btn btn-light m-2 p-2">inventory</button></router-link>
      </li>
    </ul>
  </div>
    
</nav>
    <router-view />
  </div>
</template>

<style lang="css">
.nav-item:hover{
  transform: scale(1.1);
}
#app{
background-color: #f8f9fa;
}
</style>
