<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <!-- Logo / Brand -->
      <a 
        class="navbar-brand fw-bold text-primary d-flex align-items-center"
        href="#beranda"
        aria-label="Kembali ke beranda"
      >
        <span 
          class="animate__animated"
          :class="company ? 'animate__fadeIn' : 'animate__pulse'"
        >
          {{ company?.name || 'PT Maju Sejahtera' }}
        </span>
        <span v-if="loading" class="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </a>

      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Nav Links -->
      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#beranda" @click="onNavClick">Beranda</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#layanan" @click="onNavClick">Layanan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#kontak" @click="onNavClick">Kontak</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#lokasi" @click="onNavClick">Lokasi</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCompanies } from '@/services/companyService.js'

const company = ref(null)
const loading = ref(true)

// Scroll ke top saat klik nav (opsional, untuk UX lebih baik)
const onNavClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const res = await getCompanies()
    let comp = null
    if (Array.isArray(res.data)) {
      comp = res.data[0]
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      comp = res.data.data[0]
    } else if (typeof res.data === 'object' && res.data !== null) {
      comp = res.data
    }
    if (comp) {
      company.value = comp
    }
  } catch (err) {
    console.warn('⚠️ Gagal memuat nama perusahaan:', err.message)
    // tetap pakai fallback, tidak tampilkan error ke user
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.navbar-brand {
  transition: opacity 0.3s ease;
}
.navbar-brand span {
  display: inline-block;
}
</style>