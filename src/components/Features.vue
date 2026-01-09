<template>
  <section class="bg-light py-5">
    <div class="container">
      <div class="row g-4">
        <div
          class="col-md-4"
          v-for="item in features"
          :key="item.title"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text text-muted">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { title: 'Company Management', desc: 'Kelola data perusahaan dengan mudah' },
  { title: 'User Authentication', desc: 'Login & JWT security' },
  { title: 'Product Management', desc: 'CRUD produk terintegrasi API' },
]
</script>
