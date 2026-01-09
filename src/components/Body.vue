<template>
  <!-- HERO / BERANDA (Full Screen) -->
  <section 
    id="beranda" 
    ref="heroSection"
    class="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
  >
    <!-- Background Gradient (akan diparallax oleh GSAP) -->
    <div 
      ref="heroBg"
      class="position-absolute top-0 start-0 w-100 h-100"
      style="background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%); z-index: 0;"
    ></div>
    
    <!-- Decorative Shapes -->
    <div class="position-absolute" style="top: 15%; left: 8%; z-index: 1;">
      <div 
        ref="shape1"
        class="bg-primary rounded-circle"
        style="width: 120px; height: 120px; opacity: 0.08;"
      ></div>
    </div>
    <div class="position-absolute" style="bottom: 20%; right: 10%; z-index: 1;">
      <div 
        ref="shape2"
        class="bg-success rounded-3"
        style="width: 80px; height: 80px; opacity: 0.06;"
      ></div>
    </div>

    <div class="container position-relative z-2 text-center px-4">
      <div ref="heroContent">
        <h1
          ref="heroTitle"
          class="fw-bold mb-4 text-primary"
          :style="{ transform: 'rotate(-0.8deg)', display: 'inline-block', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }"
        >
          {{ company?.name || 'PT Maju Sejahtera' }}
        </h1>
        
        <div ref="heroSubtitle" class="mb-5">
          <p class="text-muted fs-5 mb-1">Bergerak di bidang</p>
          <p 
            class="fw-semibold text-dark"
            :style="{ transform: 'rotate(0.6deg)', display: 'inline-block', fontSize: '1.25rem' }"
          >
            {{ company?.industry || 'Teknologi & Layanan Digital' }}
          </p>
        </div>

        <div ref="heroButtons" class="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <a href="#layanan" class="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-sm"
             @click="scrollToSection('layanan')">
            <i class="bi bi-box me-2"></i> Produk Kami
          </a>
          <a href="#kontak" class="btn btn-outline-primary px-5 py-3 rounded-pill fw-bold"
             @click="scrollToSection('kontak')">
            <i class="bi bi-chat-dots me-2"></i> Hubungi Kami
          </a>
        </div>

        <!-- Scroll indicator -->
        <div ref="scrollHint" class="mt-5 d-none d-md-block">
          <a href="#layanan" @click="scrollToSection('layanan')" class="text-muted text-decoration-none">
            <div class="d-flex flex-column align-items-center">
              <small class="fw-semibold">Jelajahi</small>
              <i class="bi bi-chevron-down fs-3"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- LAYANAN / PRODUK -->
  <section 
    id="layanan" 
    ref="productSection"
    class="py-5 py-md-6 position-relative"
    style="background: #fafbff;"
  >
    <div class="container">
      <div ref="productTitle" class="row text-center mb-5">
        <div class="col">
          <h2
            class="fw-bold text-dark mb-2"
            :style="{ transform: 'rotate(-0.7deg)', display: 'inline-block', fontSize: '2.5rem' }"
          >
            Produk Unggulan
          </h2>
          <p class="text-muted mt-2 fs-5">
            Solusi inovatif untuk kebutuhan bisnis Anda
          </p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loadingProducts" class="row g-4">
        <div v-for="i in 3" :key="i" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm overflow-hidden">
            <div style="height: 300px;" class="bg-light position-relative">
              <div class="w-100 h-100 d-flex align-items-center justify-content-center">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
            </div>
            <div class="card-body">
              <div class="bg-light rounded-2 mb-2" style="height: 1.5rem; width: 60%"></div>
              <div class="bg-light rounded-2 mb-2" style="height: 0.8rem; width: 80%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products -->
      <div v-else-if="products.length === 0" class="text-center py-5">
        <div class="display-1 text-muted mb-3">📦</div>
        <h3 class="text-muted">Belum Ada Produk</h3>
      </div>

      <!-- Product Grid -->
      <div v-else class="row g-4">
        <div
          v-for="(p, idx) in products"
          :key="p._id || p.id"
          :ref="(el) => { if (el) productCards.push(el) }"
          class="col-md-4"
        >
          <div
            class="card h-100 border-0 shadow-sm overflow-hidden"
            style="border-radius: 20px; transform: translateZ(0);"
          >
            <!-- Image Slider -->
            <div class="position-relative" style="height: 300px; overflow: hidden;">
              <div 
                v-if="p.images && p.images.length > 0"
                class="w-100 h-100"
                @touchstart="onTouchStart"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd(p._id || p.id)"
              >
                <div
                  class="d-flex"
                  :style="{ transform: `translateX(-${currentSlide[p._id || p.id] * 100}%)`, transition: 'transform 0.5s ease-out' }"
                >
                  <div
                    v-for="(img, i) in p.images"
                    :key="i"
                    class="flex-shrink-0 w-100 h-100"
                  >
                    <img
                      :src="img.url"
                      class="w-100 h-100 object-cover"
                      :alt="`${p.name} - Gambar ${i + 1}`"
                    />
                  </div>
                </div>
              </div>
              <div v-else class="w-100 h-100 bg-light d-flex flex-column align-items-center justify-content-center text-muted">
                <i class="bi bi-images fs-1 mb-2"></i>
                <small>Tidak ada gambar</small>
              </div>

              <!-- Dots -->
              <div 
                v-if="p.images && p.images.length > 1"
                class="position-absolute bottom-3 start-50 translate-middle-x d-flex gap-2"
                style="z-index: 10;"
              >
                <button
                  v-for="(_, i) in p.images"
                  :key="i"
                  class="rounded-circle border-0"
                  :class="currentSlide[p._id || p.id] === i ? 'bg-primary' : 'bg-white opacity-75'"
                  style="width: 10px; height: 10px;"
                  @click="currentSlide[p._id || p.id] = i"
                  :aria-label="`Pindah ke gambar ${i + 1}`"
                ></button>
              </div>

              <!-- Badge -->
              <div
                v-if="p.isNew"
                class="position-absolute top-0 start-0 bg-success text-white px-3 py-1 fw-bold rounded-end"
                style="transform: translate(8px, -8px) rotate(-3deg); font-size: 0.85rem;"
              >
                Baru
              </div>
            </div>

            <!-- Card Body -->
            <div class="card-body text-center px-4 pb-4">
              <h5
                class="fw-bold text-dark mb-2"
                :style="{ transform: 'rotate(0.4deg)', display: 'inline-block' }"
              >
                {{ p.name || '—' }}
              </h5>
              <p class="text-muted small mb-3 lh-base">
                {{ p.description?.substring(0, 100) + (p.description?.length > 100 ? '…' : '') || '—' }}
              </p>
              <p class="fw-bold text-primary fs-4 mb-0">
                {{ formatRupiah(p.price || 0) }}
              </p>
              <a 
                href="#" 
                class="btn btn-sm btn-outline-primary mt-3 px-4"
                @click.prevent="openProductDetail(p)"
              >
                Detail
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- KONTAK -->
  <section 
    id="kontak" 
    ref="contactSection"
    class="py-5 py-md-6 position-relative"
  >
    <div class="container">
      <div ref="contactTitle" class="row justify-content-center text-center mb-5">
        <div class="col-lg-6">
          <h2
            class="fw-bold mb-2"
            :style="{ transform: 'rotate(-0.4deg)', display: 'inline-block', fontSize: '2.5rem' }"
          >
            Kontak Kami
          </h2>
          <p class="text-muted mt-2 fs-5">
            Siap mendengar dan membantu Anda
          </p>
        </div>
      </div>

      <div ref="contactCards" class="row justify-content-center g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
            <div class="card-body d-flex flex-column align-items-center text-center p-4">
              <div class="bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <i class="bi bi-envelope fs-2 text-primary"></i>
              </div>
              <h5 class="fw-bold">Email</h5>
              <a :href="`mailto:${company?.email}`" class="text-muted text-decoration-none">
                {{ company?.email || '—' }}
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
            <div class="card-body d-flex flex-column align-items-center text-center p-4">
              <div class="bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <i class="bi bi-telephone fs-2 text-primary"></i>
              </div>
              <h5 class="fw-bold">Telepon</h5>
              <a :href="`tel:${company?.phone}`" class="text-muted text-decoration-none">
                {{ company?.phone || '—' }}
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100" style="border-radius: 16px;">
            <div class="card-body d-flex flex-column align-items-center text-center p-4">
              <div class="bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                <i class="bi bi-geo-alt fs-2 text-primary"></i>
              </div>
              <h5 class="fw-bold">Alamat</h5>
              <p class="text-muted mb-0">{{ getAddress() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- LOKASI -->
  <section 
    id="lokasi" 
    ref="mapSection"
    class="py-5 py-md-6 bg-light"
  >
    <div class="container">
      <div ref="mapTitle" class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <h2
            class="fw-bold text-dark mb-2"
            :style="{ transform: 'rotate(0.5deg)', display: 'inline-block', fontSize: '2.5rem' }"
          >
            Lokasi
          </h2>
          <p class="text-muted mt-2 fs-5">
            Temukan kami di lokasi strategis
          </p>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div
            ref="mapContainer"
            class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-lg border"
            style="background: #e9ecef;"
          >
            <iframe
              v-if="mapUrl"
              :src="mapUrl"
              frameborder="0"
              allowfullscreen
              loading="lazy"
              title="Lokasi Perusahaan"
              class="w-100 h-100"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div
              v-else
              class="d-flex flex-column align-items-center justify-content-center h-100 text-muted"
            >
              <i class="bi bi-map fs-1 mb-2"></i>
              <span>Lokasi tidak tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getCompanies } from '@/services/companyService.js'
import { getProducts } from '@/services/productService.js'

// GSAP imports
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)


// State
const company = ref(null)
const products = ref([])
const loadingCompany = ref(true)
const loadingProducts = ref(false)
const error = ref(null)

// Slider state
const currentSlide = ref({})
const touchStartX = ref(0)
const touchDeltaX = ref(0)

// Refs untuk GSAP
const heroSection = ref(null)
const heroBg = ref(null)
const shape1 = ref(null)
const shape2 = ref(null)
const heroContent = ref(null)
const heroTitle = ref(null)
const heroSubtitle = ref(null)
const heroButtons = ref(null)
const scrollHint = ref(null)

const productSection = ref(null)
const productTitle = ref(null)
const productCards = ref([])

const contactSection = ref(null)
const contactTitle = ref(null)
const contactCards = ref(null)

const mapSection = ref(null)
const mapTitle = ref(null)
const mapContainer = ref(null)

// Computed
const mapUrl = computed(() => {
  const lat = company.value?.location?.lat
  const lng = company.value?.location?.lng
  if (lat == null || lng == null) return ''
  return `https://www.google.com/maps?q=${lat},${lng}&output=embed&z=15`
})

const formatRupiah = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Math.round(num)).replace('Rp', 'Rp ')
}

const getAddress = () => {
  const a = company.value?.address || {}
  return [a.street, a.city, a.province, a.postalCode, a.country]
    .filter(Boolean)
    .join(', ') || '—'
}

// Scroll helper
const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: el, offsetY: 80 },
      ease: 'power2.inOut'
    })
  }
}

// Touch handlers for slider
const onTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
}

const onTouchMove = (e) => {
  touchDeltaX.value = e.touches[0].clientX - touchStartX.value
}

const onTouchEnd = (productId) => {
  if (Math.abs(touchDeltaX.value) > 50) {
    const len = products.value.find(p => (p._id || p.id) === productId)?.images?.length || 0
    if (len <= 1) return

    if (touchDeltaX.value > 0) {
      currentSlide.value[productId] = Math.max(0, (currentSlide.value[productId] || 0) - 1)
    } else {
      currentSlide.value[productId] = Math.min(len - 1, (currentSlide.value[productId] || 0) + 1)
    }
  }
  touchDeltaX.value = 0
}

// Animasi GSAP
const initAnimations = () => {
  // 1. Hero section animations
  if (heroContent.value) {
    // Fade in hero content
    gsap.from([heroTitle.value, heroSubtitle.value], {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15
    })

    gsap.from(heroButtons.value, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      delay: 0.5
    })

    gsap.from(scrollHint.value, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power1.out',
      delay: 0.8
    })

    // Parallax background & shapes
    if (heroBg.value) {
      gsap.to(heroBg.value, {
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: -80,
        scale: 1.05
      })
    }

    if (shape1.value) {
      gsap.to(shape1.value, {
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: -40,
        x: -20,
        scale: 1.1
      })
    }

    if (shape2.value) {
      gsap.to(shape2.value, {
        scrollTrigger: {
          trigger: heroSection.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 30,
        x: 20,
        scale: 0.9
      })
    }
  }

  // 2. Product section
  if (productTitle.value) {
    gsap.from(productTitle.value, {
      scrollTrigger: {
        trigger: productTitle.value,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  if (productCards.value.length) {
    gsap.from(productCards.value, {
      scrollTrigger: {
        trigger: productSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12
    })
  }

  // 3. Contact section
  if (contactTitle.value) {
    gsap.from(contactTitle.value, {
      scrollTrigger: {
        trigger: contactSection.value,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  if (contactCards.value) {
    gsap.from(contactCards.value.children, {
      scrollTrigger: {
        trigger: contactSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.1
    })
  }

  // 4. Map section
  if (mapTitle.value) {
    gsap.from(mapTitle.value, {
      scrollTrigger: {
        trigger: mapSection.value,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out'
    })
  }

  if (mapContainer.value) {
    gsap.from(mapContainer.value, {
      scrollTrigger: {
        trigger: mapSection.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.out'
    })
  }
}

onMounted(async () => {
  try {
    // Company
    const companyRes = await getCompanies()
    let comp = null
    if (Array.isArray(companyRes.data)) {
      comp = companyRes.data[0]
    } else if (companyRes.data?.data && Array.isArray(companyRes.data.data)) {
      comp = companyRes.data.data[0]
    } else if (typeof companyRes.data === 'object' && companyRes.data !== null) {
      comp = companyRes.data
    }
    if (comp) company.value = comp

    // Products
    loadingProducts.value = true
    const productRes = await getProducts()
    let prod = []
    if (Array.isArray(productRes.data)) {
      prod = productRes.data
    } else if (productRes.data?.data && Array.isArray(productRes.data.data)) {
      prod = productRes.data.data
    } else if (productRes.data?.items && Array.isArray(productRes.data.items)) {
      prod = productRes.data.items
    }

    // Format images → pastikan array
    prod = prod.map(p => ({
      ...p,
      images: Array.isArray(p.images) && p.images.length 
        ? p.images 
        : p.image?.url 
          ? [{ url: p.image.url }] 
          : [],
      isNew: new Date(p.createdAt) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    }))

    products.value = prod

    // Init slider state
    prod.forEach(p => {
      currentSlide.value[p._id || p.id] = 0
    })

    // Delay sedikit agar DOM siap sebelum animasi
    setTimeout(() => {
      initAnimations()
    }, 300)
  } catch (err) {
    console.error('❌ Fetch Error:', err)
    error.value = err.message || 'Gagal memuat data.'
  } finally {
    loadingCompany.value = false
    loadingProducts.value = false
  }
})

onUnmounted(() => {
  // Bersihkan ScrollTriggers
  ScrollTrigger.getAll().forEach(t => t.kill())
})

// Dummy
const openProductDetail = (product) => {
  alert(`Detail: ${product.name}`)
}
</script>

<style scoped>
/* Base styles */
h1, h2, h3, h4, h5 {
  display: inline-block;
}

/* Smooth scroll (fallback jika GSAP gagal) */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar */
* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*::-webkit-scrollbar {
  display: none;
}

/* Chevron bounce (opsional, bisa pakai GSAP juga) */
#beranda .bi-chevron-down {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
</style>