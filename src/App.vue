<template>
  <SectionNavbar/>
  <!--SectionHeader/-->
  
    <div class="container">
      <main>
        <router-view></router-view>
      </main>
    </div>
  
  <SectionFooter/>
</template>

<script>

//import SectionHeader from '@/components/SectionHeader.vue'
import SectionNavbar from '@/components/SectionNavbar.vue'
import SectionFooter from '@/components/SectionFooter.vue'

export default {
  name: 'App',
  components: {
    //SectionHeader,
    SectionNavbar,
    SectionFooter
}
}
</script>


<style>
 
  li{
    display: inline-flex;
    margin: 0 15px;
  }

  nav{
    display: flex;
    justify-content: flex-end;
    background-color: azure;
}

nav > div{
    padding: 5px;
    background-color: azure;
    margin: 5px;
    color: white;

}
 
  main{
      background-color: white;
      flex-grow: 8;
      height: auto;
      padding: 20px;

  }

  footer{
      position: relative;
      padding: 30px;
      background-color: darkseagreen;
      text-align: center;
      color: white;
  }
</style>