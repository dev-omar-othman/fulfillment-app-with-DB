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
    <div class="orders-counr">number of orders here :{{unfulfilledOrders.length}}</div>
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
          v-for="order in unfulfilledOrders"
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
      unfulfilledOrders: [],
      loaded : false,
    };
  },
   created(){
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(endpoint + "getorders", requestOptions)
      .then((response) =>{
        console.log(response);
      })
      .then((result) =>{
        console.log(result)
        fetch(endpoint + "getdata",requestOptions)
        .then((response) => {
          console.log(response)
        })
        .then((result) => {
          console.log(result)
          fetch(endpoint + "filterdata",requestOptions)
          .then((response) => {
            console.log(response)
          })
          .then((result) => {
            console.log(result);
            setTimeout(()=>{
              fetch(endpoint + "ordersToFulfill.json")
            .then((res) => res.json())
            .then((data) => {this.unfulfilledOrders = data;
            this.loaded = true;
            })
            },1500)
            
          })
        })
        
      })
      .catch((err)=> console.error(err));

  },

  methods: {
    refreshData: function () {

      setTimeout(function () {
        window.location.reload();
        document.querySelector(".loading").style.display = "none";
      }, 1500);
    },
    
  },
  components: { ordercomponent },
  name: "Home",
};
</script>
