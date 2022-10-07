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
                                <router-link class="routerLink" to="">
                                    <i class="bi bi-door-open"> </i>Actualizar Hotel
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="col ms-3">
                    <h1 class="fs-3">
                    <img src="@/assets/icon_t.png" alt="icon" width="60" height="60"> Actualizar Hotel</h1>
                </div>
                <div class="container p-4">
                    <div class="row" method="POST" id="formulario" enctype="multipart/form-data">
                        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-2">
                            <div class="mb-3">
                                <label for="" class="form-label">Nombre</label>
                                <input v-model="hotel.name" type="text" id="name" class="form-control">
                                <div v-if="errores.name" class="text-danger" :role="alert">{{errores.name[0]}}</div>
                            </div>
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-2">
                            <div class="mb-3">
                                <label for="" class="form-label">NIT</label>
                                <input v-model="hotel.nit" type="number" id="nit" class="form-control">
                                <div v-if="errores.nit" class="text-danger" :role="alert">{{errores.nit[0]}}</div>
                            </div>
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-2">
                            <div class="mb-3">
                                <label for="" class="form-label">Dirección</label>
                                <input v-model="hotel.address" type="text" id="address" class="form-control">
                                <div v-if="errores.address" class="text-danger" :role="alert">{{errores.address[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-2">
                            <div class="mb-3">
                                <label for="" class="form-label">Número de habitaciones</label>
                                <input v-model="hotel.num_rooms" type="number" id="num_rooms" class="form-control">
                                <div v-if="errores.num_rooms" class="text-danger" :role="alert">{{errores.num_rooms[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-lg-4 col-md-4 col-sm-6 col-xs-12 mt-2">
                            <label for="" class="form-label">Ciudad</label>
                            <select v-model="hotel.city_id" id="city_id" class="form-control select-picker">
                                <option v-for="city in cities" :value="city.id" :key="city.id">{{city.name}}</option>
                            </select>
                            <div v-if="errores.city_id" class="text-danger" :role="alert">{{errores.city_id[0]}}</div>
                        </div>

                        <div v-if="info" class="alert alert-success" role="alert">
                            {{info}}
                        </div>

                        <div v-if="errores.simple" class="alert alert-danger" role="alert">
                            {{errores.simple}}
                        </div>

                        <div class="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">
                            <button @click="eliminar(this.$route.params.id)" type="button"
                                class="btn btn-danger row-3 mt-2" v-bind:class="ocultar">
                                <i class="bi bi-trash"></i> Eliminar</button>
                            <button @click="actualizar" type="button" class="btn btn-primary row-3 mt-2"
                                v-bind:class="ocultar">
                                <i class="bi bi-arrow-clockwise"></i> Actualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Se muestra en caso de que el id del hotel pasado por parametro no se encuentre-->
        <div class="p-4 d-none" id="notId">
            <div class="alert alert-warning" role="alert">
                id ingresado no se encuentra registrado
            </div>
        </div>
    </article>
</template>

<script>

import axios from 'axios';
export default {
    
    beforeMount() {
        
        this.getHotel()
    },
    props: {
        id: Object,
        params: Object,
    },
    data() {
        return {
            errores: {},
            info: null,
            cities: Object,
            ocultar: null,
            mostrar: true,
            success: false,
            hotel: {
                name: null,
                nit: null,
                address: null,
                num_rooms: null,
                city_id: null,
                city: {
                    name: null
                }
            },
        }
    },
    methods: {
        
        getHotel() {
            
            axios
                .get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/cities')
                .then(response => (this.cities = response.data))

            
            axios.get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels/' + this.$route.params.id)
                .then(response => (
                    this.hotel = response.data.data,
                    this.success = response.data.success,
                    (!this.success) ? document.getElementById("notId").classList.remove("d-none") : ""
                ))
        },
                
        actualizar() {
            this.error = false
            this.info = false
            axios({
                method: 'put',
                url: 'http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels/' + this.$route.params.id,
                data: this.hotel,
                responseType: 'json',
            })
                .then(response => {
                    this.info = response.data.message
                    this.errores = {}
                })
                .catch(error => {
                    this.errores = error.response.data.errors
                    this.info = null
                })
            
            setTimeout(() => {
                this.info = null
                this.errores = {}
            }, 4000)

        },
        
        eliminar(id) {
            this.errores = {}
            
            if (confirm('¿Esta seguro que desea eliminar este hotel?')) {
                axios({
                    method: 'delete',
                    url: 'http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels/' + id,
                    responseType: 'json',
                })
                    .then(response => {
                        this.mostrar = false
                        this.ocultar = 'visually-hidden'
                        this.info = response.data.message
                        this.hotel = []
                    })
                    .catch(error => {
                        this.errores = error.response.data.errors
                        this.info = null
                    })
            }
            
            setTimeout(() => {
                this.info = null
                this.errores = {}
            }, 4000)
        }
    }

}
</script>