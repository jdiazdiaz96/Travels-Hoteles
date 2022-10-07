<template>
    <div class="shadow p-1 mb-2 bg-body rounded">
        <div class="container-md">
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
                                <router-link class="routerLink" to="">
                                    <i class="bi bi-door-open"> </i>Habitaciones
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
                            <h1 class="fs-3">{{this.hotel.name}}</h1>
                            <h9>Numero de habitaciones: {{this.hotel.num_rooms}}</h9>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center">
                        <button @click="viewFormCreateHabitacion(this.hotel.id)" type="button" class="btn btn-success">
                            <i class="bi bi-plus-circle"> </i> Crear habitación
                        </button>
                    </div>
                </div>
                <div class="table-responsive mt-3">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">TIPO</th>
                                <th scope="col">ACOMODACIÓN </th>
                                <th scope="col">CANTIDAD</th>
                                <th scope="col" class="text-center">OPCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="" v-for="habitacion in habitaciones" :key="habitacion.id">
                                <td scope="row">{{habitacion.type.name}}</td>
                                <td>{{habitacion.accommodation.name}}</td>
                                <td>{{habitacion.quantity}}</td>
                                <td class="d-flex justify-content-center">
                                    <button @click="editRoom(habitacion.id)" type="button"
                                        class="btn btn-warning rounded-5 text-light me-3">
                                        <i class="bi bi-pencil-square"> </i> Editar
                                    </button>
                                    <button @click="deleteRoom(habitacion.id)" type="button"
                                        class="btn btn-danger rounded-5">
                                        <i class="bi bi-trash"> </i> Eliminar
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        <div class="p-4 d-none" id="notId">
            <div class="alert alert-warning" role="alert">
                Id ingresado no se encuentra registrado
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    beforeMount() {
        axios
            .get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels/' + this.$route.params.id)
            .then(response => (this.hotel = response.data.data,
                this.success = response.data.success,
                (!this.success) ? document.getElementById("notId").classList.remove("d-none") : ""
            ))

        axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/rooms/' + this.$route.params.id)
            .then(response => (this.habitaciones = response.data.data))
    },
    data() {
        return {
            hotel: [],
            habitaciones: [],
            info: null,
            errores: {},
            success: false
        }
    },
    methods: {
        viewFormCreateHabitacion(id) {
            this.$router.push({
                name: 'CrearHabitacion',
                params: {
                    id: id
                }
            })
        },
        editRoom(id) {
            this.$router.push({
                name: 'ActualizarHabitacion',
                params: {
                    id: id
                }
            })
        },
        deleteRoom(id) {
            this.errores = {}
            if (confirm('¿Desea eliminar esta habitacion?')) {
                axios({
                    method: 'delete',
                    url: 'http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/rooms/' + id,
                    responseType: 'json',
                })
                    .then(response => {
                        this.success = response.data.success
                        axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/rooms/' + this.$route.params.id)
                            .then(response => (this.habitaciones = response.data.data))
                    })
                    .catch(error => {
                        this.errores = error.response.data.errors
                        this.info = null
                        this.success = false
                    })
            }
        },
    }
}
</script>