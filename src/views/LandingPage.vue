<template>
  <div class="landing-page">
    <Navbar />
    <main><Body /></main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Body from '@/components/Body.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main { flex: 1; }
</style>