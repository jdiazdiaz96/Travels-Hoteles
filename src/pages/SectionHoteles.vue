<template>
    <div>
        <div class="shadow p-4 mb-5 bg-body rounded" style="width: auto;">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col">
                        <h4>
                        <img src="@/assets/icon_t.png" alt="icon" width="60" height="60"> 
                        Lista De Hoteles</h4>
                    </div>
                    <div class="col">
                        <div class="float-end">
                            <button @click="viewFormHotelCreate" class="btn btn-primary btn-sm">
                                <i class="bi bi-plus-circle"> </i> Nuevo Hotel </button>
                        </div>
                    </div>
                </div>
                <div class="pe-6 ps-6 pt-3">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NIT</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Ciudad</th>
                                <th scope="col">Capacidad Hab</th>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="hotel in hotels" :key="hotel.id">
                                <td> {{hotel.id}} </td>
                                <td> {{hotel.nit}} </td>
                                <td> {{hotel.name}} </td>
                                <td> {{hotel.address}} </td>
                                <td> {{hotel.city.name}} </td>
                                <td> {{hotel.num_rooms}} </td>
                                <td>
                                    <button @click="viewHotel(hotel.id)" class="btn btn-warning btn-sm">
                                        <i class="bi bi-pencil-square"> </i> Detalle</button>
                                </td>
                                <td>
                                    <button @click="viewHabitacion(hotel.id)" class="btn btn-success btn-sm">
                                        <i class="bi bi-door-open"> </i> Habitaciones</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
    
    
<script>

import axios from 'axios'

export default {
    beforeMount() {
        axios
            .get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/hotels')
            .then(response => (this.hotels = response.data.data))
    },
    data() {
        return {
            hotels: []
        }
    },
    methods: {
        viewFormHotelCreate() {
            this.$router.push({ name: 'HotelCreate' })
        },

        viewHotel(id) {
            this.$router.push({ name: 'ActualizarHotel', params: { id: id } })

        },

        viewHabitacion(id) {
            this.$router.push({ name: 'SectionHabitaciones', params: { id: id } })
        }
    },
}

</script>