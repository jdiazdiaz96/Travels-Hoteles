import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import {createRouter, createWebHistory} from 'vue-router'

import SectionHome from '@/pages/SectionHome.vue'
import SectionHoteles from '@/pages/SectionHoteles.vue'
import SectionHabitacion from '@/pages/SectionHabitacion.vue'
import SectionHabitaciones from '@/pages/SectionHabitaciones.vue'
import SectionAcomodacion from '@/pages/SectionAcomodacion.vue'
import HotelCreate from '@/pages/Hotels/HotelCreate.vue'
import CrearHabitacion from '@/pages/Hotels/CrearHabitacion.vue'
import ActualizarHabitacion from '@/pages/Hotels/ActualizarHabitacion.vue'
import ActualizarHotel from '@/pages/Hotels/ActualizarHotel.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: "SectionHome", component: SectionHome},
        {path: "/hotels", name: "SectionHoteles", component: SectionHoteles},
        {path: "/habitacion", name: "SectionHabitacion", component: SectionHabitacion},
        {path: "/acomodacion", name: "SectionAcomodacion", component: SectionAcomodacion},
        {path: "/hotelcreate", name: "HotelCreate", component: HotelCreate},
        {path: "/habitaciones/:id", name: "SectionHabitaciones", component: SectionHabitaciones},
        {path: "/createhabitacion/:id", name: "CrearHabitacion", component: CrearHabitacion},
        {path: "/edithabitacion/:id", name: "ActualizarHabitacion", component: ActualizarHabitacion},
        {path: "/edithotel/:id", name: "ActualizarHotel", component: ActualizarHotel}
    ]
})

createApp(App)
.use(router)
.mount('#app')
