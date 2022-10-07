<template>
    <div class="shadow p-4 mb-5 bg-body rounded">
        <div class="shadow p-1 mb-2 bg-body rounded">
            <div class="flex-grow">
                <nav class="navbar navbar-expand-lg bg-white">
                    <ul>
                        <li class="nav-item">
                            <router-link class="routerLink" to="/">
                              <i class="bi bi-house"> </i> Inicio</router-link>
                        </li>
                        <li>
                            <i class="bi bi-caret-right-fill"></i>
                        </li>
                        <li class="nav-item">
                            <router-link to="/hotels" class="routerLink">
                               <i class="bi bi-building"> </i> Hoteles</router-link>
                        </li>
                        <li>
                            <i class="bi bi-caret-right-fill"></i>
                        </li>
                        <li class="nav-item">
                            <router-link class="routerLink" to="">
                               <i class="bi bi-door-open"> </i> Nuevo Hotel</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="">
            <div class="row  mt-3">
                <div>
                    <h3>
                        <img src="@/assets/icon_t.png" alt="icon" width="60" height="60">
                        Registrar Nuevo Hotel
                    </h3>
                </div>
                <div class="col">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input v-model="hotel.name" type="text" class="form-control" id="nombre">

                </div>
                <div class="col">
                    <label for="nit" class="form-label">NIT</label>
                    <input v-model="hotel.nit" type="text" class="form-control" id="nit">
                    <div v-if="errores.nit" style="color:red" role="alert">{{errores.nit[0]}}</div>
                </div>
            </div>
            <div class="row  mt-3">
                <div class="col">
                    <label for="direccion" class="form-label">Dirección</label>
                    <input v-model="hotel.address" type="text" class="form-control" id="direccion">
                </div>
                <div class="col">
                    <label for="nro_habitaciones" class="form-label">Nro de habitaciones</label>
                    <input v-model="hotel.num_rooms" type="text" class="form-control" id="nro_habitaciones">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <label for="ciudad" class="form-label">Ciudad</label>
                    <select class="form-select" id="ciudad" v-model="hotel.city_id">
                        <option v-for="ciudad in cities" :value="ciudad.id" :key="ciudad.id">{{ ciudad.name }}</option>
                    </select>
                </div>
                <div class="col">

                </div>
            </div>
            <div class="row mt-3">
                <div class="col">
                    <button @click="sendHotel" type="submit" class="btn btn-primary ">
                        <i class="bi bi-upload"> </i> Enviar</button>
                </div>
                <div class="col">

                </div>
            </div>

            <div v-if="info" class="alert alert-primary mt-3" role="alert">
                {{info}}
            </div>






        </div>
    </div>
</template>
    
    
<script>

import axios from 'axios'

export default {
    beforeMount() {
        axios
            .get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/cities')
            .then(response => (this.cities = response.data))
    },
    data() {
        return {
            errores: {
                nit: null
            },
            info: null,
            cities: [],
            hotel: {
                name: null,
                nit: null,
                address: null,
                num_rooms: null,
                city_id: null
            }
        }
    },
    methods: {
        sendHotel() {
            axios({
                method: 'post',
                url: 'http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels',
                data: this.hotel,
                responseType: 'json',
            })
                .then(response => {
                    this.info = response.data.message

                    this.hotel.name = null
                    this.hotel.nit = null
                    this.hotel.address = null
                    this.hotel.num_rooms = null
                    this.hotel.city_id = null

                })
                .catch(error => {
                    this.errores = error.response.data.errors

                })
        }
    },
}

</script>

<style>
.routerLink {
    text-decoration: none;
    color: black;
}
</style>