<!-- eslint-disable vue/require-v-for-key -->
<template>
    <article class="shadow p-4 mb-5 bg-body rounded">
        <div v-if="success" class="p-4">
            <div class="shadow p-1 mb-2 bg-body rounded">
                <div class="flex-grow">
                    <nav class="navbar navbar-expand-lg bg-white">
                        <ul>
                            <li class="nav-item">
                                <router-link class="routerLink" to="/">
                                    <i class="bi bi-house"> </i> Inicio
                                </router-link>
                            </li>
                            <li>
                                <i class="bi bi-caret-right-fill"></i>
                            </li>
                            <li class="nav-item">
                                <router-link to="/hotels" class="routerLink">
                                    <i class="bi bi-building"> </i> Hoteles
                                </router-link>
                            </li>
                            <li>
                                <i class="bi bi-caret-right-fill"></i>
                            </li>
                            <li class="nav-item">
                                <a @click="regresar(this.$route.params.id)" class="nav-item nav-link ms-3" href="#">
                                    <i class="bi bi-door-open"> </i> Hotel
                                </a>                               
                            </li>
                            <li>
                                <i class="bi bi-caret-right-fill"></i>
                            </li>
                            <li class="nav-item">
                                <router-link class="routerLink" to="">
                                    <i class="bi bi-door-open"> </i>Nueva Habitacion
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>


            <div class="p-4">
                <div class="row">
                    <div class="col d-flex">
                        <img src="@/assets/icon_t.png" alt="icon" width="60" height="60"> 
                        <div>
                            <h1 class="fs-3">{{hotel.name}}</h1>
                            <h9>Numero de habitaciones: {{hotel.num_rooms}}</h9>
                        </div>
                    </div>
                </div>
                <div class="container mt-3">
                    <div class="row">
                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
                            <label for="" class="form-label">Tipo de habitación</label>
                            <select v-model="room.room_type_id" id="room_type_id" class="form-select">
                                <option v-for="room in room_types" :value="room.id" :key="room.id">{{room.name}}
                                </option>
                            </select>
                            <div v-if="errores.room_type_id" class="text-danger">
                                <div v-for="msg in errores.room_type_id">{{msg}}</div>
                            </div>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
                            <label for="" class="form-label">Acomodación</label>
                            <select class="form-select" id="accommodation_id" v-model="room.accommodation_id">
                                <option v-for="accommodation in accommodation_types" :value="accommodation.id"
                                    :key="accommodation.id">{{accommodation.name}}</option>
                            </select>
                            <div v-if="errores.accommodation_id" class="text-danger">
                                <div v-for="msg in errores.accommodation_id">{{msg}}</div>
                            </div>
                        </div>

                        <div class="form-group col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
                            <div class="mb-3">
                                <label for="" class="form-label">Cantidad</label>
                                <input v-model="room.quantity" type="number" name="cantidad" id="cantidad"
                                    class="form-control">
                                <div v-if="errores.quantity" class="text-danger">
                                    <div v-for="msg in errores.quantity">{{msg}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="info" class="alert alert-success" role="alert">
                            {{info}}
                        </div>

                        <div v-if="errores.simple" class="alert alert-danger" role="alert">
                            {{errores.simple}}
                        </div>

                        <div class="form-group d-flex justify-content-between">
                            <button @click="crearHabitacion" type="submit" id="btn_save"
                                class="btn btn-primary row-3 mt-2">
                                <i class="bi bi-plus-circle"></i>Nueva habitación
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 d-none" id="notId">
            <div class="alert alert-warning" role="alert">
                id ingresado no se encuentra registrado
            </div>
        </div>
    </article>
</template>

<script>
import axios from 'axios'

export default {
    beforeMount() {
        // Obtener datos de hotel
        axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels/' + this.$route.params.id)
            .then(response => (
                this.hotel = response.data.data,
                this.success = response.data.success,
                (!this.success)?document.getElementById("notId").classList.remove("d-none"):""
                ))
        // Get tipos de habitaciones
        axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/room-types')
            .then(response => (this.room_types = response.data))
        // Get tipos de acomodaciones
        axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/accommodation-types')
            .then(response => (this.accommodation_types = response.data))
    },
    data() {
        return {
            habitacion: [],
            hotel: {
                name: null,
                num_rooms: null
            },
            room: {
                hotel_id: this.$route.params.id,
                room_type_id: null,
                accommodation_id: null,
                quantity: null
            },
            errores: Object,
            info: null,
            room_types: [],
            accommodation_types: [],
            success: false,
        }
    },
    methods: {
        regresar(id) {
            this.$router.push({
                name: 'SectionHabitaciones',
                params: {
                    id: id
                }
            })
        },
        crearHabitacion() {
            this.errores = []
            axios({
                method: 'post',
                url: 'http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/rooms',
                data: this.room,
                responseType: 'json',
            })
                .catch(error => {
                    this.errores = error.response.data.errors
                    this.info = null
                })
                .then(response => {
                    this.info = response.data.message
                    this.errores = []

                })
            setTimeout(() => {
                this.info = null
                this.errores = {}
            }, 5000)
        }
    }
}
</script>