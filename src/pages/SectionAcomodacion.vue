<template>
    <div div class="shadow p-4 mb-5 bg-body rounded">
        <div class="container-md">
            <div class="row mb-3">
                <div class="col">
                    <h4>
                        <img src="@/assets/icon_t.png" alt="icon" width="60" height="60">
                        Acomodaciones
                    </h4>
                </div>
            </div>
            <div class="pe-5 ps-5 pt-2">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NOMBRE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="acomodacion in acomodaciones" :key="acomodacion.id">
                            <td> {{acomodacion.id}} </td>
                            <td> {{acomodacion.name}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
    
    
<script>

import axios from 'axios'

export default {
    beforeMount() {
        axios
            .get('http://ec2-44-201-108-206.compute-1.amazonaws.com/decameron/api/accommodation-types')
            .then(response => (this.acomodaciones = response.data))
    },
    data() {
        return {
            acomodaciones: []
        }
    },
}

</script>