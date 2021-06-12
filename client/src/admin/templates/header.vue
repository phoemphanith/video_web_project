<template>
  <div class="headernav">
    <router-link to="/"><h1>VideoWeb</h1></router-link>
    <div class="left-head">
      <router-link to="/admin/upload" class="btn-upload">
        <i class="fas fa-upload"></i> Upload
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
  font-weight: 600;
}
.btn-upload {
  background-color: #e1e5ea;
  color: #333;
  padding: 6px 20px;
  margin-right: 5px;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
  text-decoration: none;
  font-size: 15px;
}
.fa-upload {
  color: red;
}
.btn-upload:hover {
  opacity: 0.8;
}
.btn-upload:active {
  transform: scale(0.98);
}
</style>
