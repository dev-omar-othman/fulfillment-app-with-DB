<template>
  <div class="container-fluid mt-5 p-1 home">
    <div v-if="loaded" class="loading" >
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else class="loading" style="display:block;">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="container-fluid d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary m-1 refresh"
        v-on:click="refreshData()"
      >
        Refresh
      </button>
    </div>
    <div class="orders-counr">number of orders here :{{outOfStock.length}}</div>
    <table class="table table-light">
      <thead>
        <tr>
          
          <th scope="col">#ID</th>
          <th scope="col">Total Price</th>
          <th scope="col">Customer</th>
          <th scope="col">Destination</th>
          <th scope="col">Items SKU</th>
          <th scope="col">Description</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <ordercomponent
          v-for="order in outOfStock"
          :key="order.orderId"
          :id="order.orderId"
          :total_price="order.orderTotalPrice"
          :customer="order.customer"
          :destination1="order.destination1"
          :destination2="order.destination2"
          :city="order.city"
          :itemSku="order.itemsSku"
          :zip ="order.postalCode"
          :country ="order.countryCode"
          :state ="order.state"
          :description="order.orderDescription"
          :orderNumber="order.orderNumber"
        />
      </tbody>
    </table>
  </div>
</template>
<style>
.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #fff;
  top: 0px;
  left: 0px;
}
.spinner-border.text-dark {
  margin: 25% 50%;
}
</style>
<script>
const endpoint = "http://localhost:8081/";
import ordercomponent from "../components/ordercomponent.vue";
// @ is an alias to /src
export default {
  data: function () {
    return {
      outOfStock: [],
      loaded:false
    };
  },
   async mounted() {
    await fetch(endpoint + "ordersCantBeFulfilled.json")
      .then((res) => res.json())
      .then((data) => {this.outOfStock = data;
      this.loaded = true;})
      .catch((err) => console.log(err.message));  
  },
  methods: {
    refreshData: function () {
      document.querySelector(".loading").style.display = "block";
      

      setTimeout(function () {
        window.location.reload();
        document.querySelector(".loading").style.display = "none";
      }, 1500);
    },
    
  },
  components: { ordercomponent },
  name: "About",
};
</script>
