<template>
  <div class="container mt-5 p-1 home">
    <div class="loading">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div class="container d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary m-1 refresh"
        v-on:click="refreshData()"
      >
        Refresh
      </button>
    </div>
     <div class="orders-counr">number of orders here :{{logs.length}}</div>
    <table class="table table-light">
      <thead>
        <tr>
         
          <th scope="col">#ID</th>
          <th scope="col">Total Price</th>
          <th scope="col">Customer</th>
          <th scope="col">Destination</th>
          <th scope="col">created at</th>
          <th scope="col">fulfilled at</th>
          <th scope="col">Items SKU</th>
          <th scope="col">Description</th>
          <th scope="col">label</th>
        </tr>
      </thead>
      <tbody>
        <logscomponents
          v-for="order in logs"
          :key="order.order_id"
          :id="order.order_id"
          :total_price="order.total_price"
          :customer="order.customer"
          :itemSku="order.items_sku"
          :country ="order.country"
          :description="order.items_description"
          :created_at="order.created_at"
          :fulfilled_at="order.fulfilled_at"
          :label="order.label"
        />
      </tbody>
    </table>
  </div>
</template>
<style>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #fff;
  display: none;
  top: 0px;
  left: 0px;
}
.spinner-border.text-dark {
  margin: 25% 50%;
}
</style>
<script>
const endpoint = "http://localhost:8081/";
import logscomponents from "../components/logscomponents.vue";
// @ is an alias to /src
export default {
  data: function () {
    return {
      logs: [],
    };
  },   created(){
      var requestOptions = {
        method: "GET",
        redirect: "follow",
        Headers:{
          "mode": "no-cors"
        }
      };
      fetch(endpoint + "getlogs", requestOptions)
      .then((response) =>{
        console.log(response);
      })
      .then((result) => {
            console.log(result);
            setTimeout(()=>{
            fetch(endpoint + "logs.json")
         .then((res) => res.json())
          .then((data) => (this.logs = data))
          .catch((err) => console.log(err.message));
            },1500)
          })
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
  components: { logscomponents },
  name: "logs",
};
</script>
