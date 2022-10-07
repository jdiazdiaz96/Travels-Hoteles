<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a href="#" class="navbar-brand ms-5">
          <img src="../assets/icono_navt.png" class="logo" width="90" height="70">
        </a>
        <div class="container-md">
          <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/" class="routerLink"><i class="bi bi-house"> </i> Inicio</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/hotels" class="routerLink"><i class="bi bi-building"> </i> Hoteles</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/habitacion" class="routerLink"><i class="bi bi-door-open"> </i> Tipo Habitaciones
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/acomodacion" class="routerLink"><i class="bi bi-people"> </i> Acomodaciones
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
.routerLink {
  text-decoration: none;
  color: black;
}
</style>