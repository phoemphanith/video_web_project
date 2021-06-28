<template>
  <div>
    <the-header></the-header>
    <div class="container mt-4 mb-5">
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="#" alt="Card image cap" />
            <div class="card-block p-3">
              <h4 class="card-title">50 Coins</h4>
              <p class="card-text">Price: 1$</p>
              <button class="btn btn-primary">Buy now</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="#" alt="Card image cap" />
            <div class="card-block p-3">
              <h4 class="card-title">150 Coins</h4>
              <p class="card-text">Price: 2$</p>
              <button class="btn btn-primary">Buy now</button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img class="card-img-top" src="#" alt="Card image cap" />
            <div class="card-block p-3">
              <h4 class="card-title">500 Coins</h4>
              <p class="card-text">Price: 5$</p>
              <button class="btn btn-primary">Buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue';
export default {
  name: 'shop',
  components: {
    TheHeader
  }
};
</script>

<style scoped>
a {
  text-align: center;
}

img {
  height: 365.58px;
  width: 348px;
}

button {
  text-align: center;
}
</style>
