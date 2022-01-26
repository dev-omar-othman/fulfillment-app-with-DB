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
        <div class="filter-box">
        <select v-model="product__name" placeholder="please select a product name">
            <option selected>Butter Collar</option>
            <option>Butter Retriever Collar</option>
            <option>City Leash</option>
            <option>2x Leash</option>
            <option>3x Leash</option>
            <option>Harness</option>
            <option>TOL Collar</option>
            <option>TOL Leash</option>
            <option>Maritime Leash</option>
            <option>TOL Retriever Leash</option>
        </select>
              <button
        type="button"
        class="btn btn-primary m-1"
        v-on:click="getSelectedInventory()"
      >
        filter
      </button>
      </div>
      <button
        type="button"
        class="btn btn-primary m-1 refresh"
        v-on:click="refreshData()"
      >
        Refresh
      </button>
    </div>
    <table class="table table-light">
      <thead>
        <tr>
         
          <th scope="col">PRODUCT NAME</th>
          <th scope="col">COLOR</th>
          <th scope="col">FITTING</th>
          <th scope="col">SIZE</th>
          <th scope="col">BARCODE</th>
          <th scope="col">QUANTITY</th>
          <th scope="col">UNFULFILLED</th>
          <th scope="col">ORDERED</th>
          <th scope="col">COST EUR</th>
          <th scope="col">COST USD</th>
        </tr>
      </thead>
      <tbody>
        <invcomponent
          v-for="product in inventoryItems"
          :key="product.Barcode"
          :product_name="product.Product_Name"
          :color="product.color"
          :fitting="product.fittings"
          :size="product.Size"
          :barcode="product.Barcode"
          :quantity ="product.Quantity"
          :unfulfilled="product.Unfulfilled"
          :ordered="product.Ordered"
          :cost_EUR="product.Unit_Cost_EUR"
          :cost_USD="product.Unit_Cost_USD"
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
.filter-box {
    margin-right: 10%;
    width: 50%;
}
select {
    padding: 1% 10%;
}
.spinner-border.text-dark {
  margin: 25% 50%;
}
</style>
<script>
const endpoint = "http://localhost:8081/";
import invcomponent from "../components/invcomponent.vue";
// @ is an alias to /src
export default {
  data: function () {
    return {
      inventoryItems: [],
      product__name:"",
      loaded:true
    };
  },
  methods: {
    getSelectedInventory(){
        this.loaded=false;
              var requestOptions = {
        method: "GET",
        redirect: "follow",
        Headers:{
          "mode": "no-cors"
        }
      };
      fetch(endpoint + "getinventory/" + this.product__name, requestOptions)
      .then((response) =>{
        console.log(response);
      })
      .then((result) => {
            console.log(result);
            setTimeout(()=>{
            fetch(endpoint + "inventory.json")
         .then((res) => res.json())
          .then((data) => {this.inventoryItems = data;
          console.log(data);
          this.loaded = true})
          .catch((err) => console.log(err.message));
            },1500)
          });
    },
    refreshData: function () {
      document.querySelector(".loading").style.display = "block";
      

      setTimeout(function () {
        window.location.reload();
        document.querySelector(".loading").style.display = "none";
      }, 1500);
    },
    
  },
  components: { invcomponent },
  name: "inventory",
};
</script>
