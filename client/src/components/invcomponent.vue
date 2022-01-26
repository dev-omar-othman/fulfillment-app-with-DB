<template>
  <tr>
    <th scope="row">{{ product_name }}</th>
    <td>{{ color }}</td>
    <td>{{ fitting }}</td>
    <td>{{ size }}</td>
    <td>{{ barcode }}</td>
    <td>{{ quantity }}</td>
    <td>{{ unfulfilled }}</td>
    <td>{{ ordered }}</td>
    <td>€{{ cost_EUR }}</td>
    <td>${{ cost_USD }}</td>

  </tr>
</template>
<style>
a.label-link {
    color: #000;
    padding: 10px;
    background: rgba(0,0,0,0.2);
    border-radius: 15px;
}
label.btn.btn-primary.m-2.active {
  background-color: green;
}
ul.description {
  padding: 0px 0px 0px 5px;
  font-size: 0.9em;
}
li.verified {
  list-style-type: none !important;
}
li.verified::before {
  content: "\f058"; /* FontAwesome Unicode */
  font-family: FontAwesome;
  margin-right: 5px;
  color: green;
  display: inline-block;
}
.scan-btn {
  cursor: pointer;
}
button.ww-fulfill.btn.btn-secondary {
    margin-right: 30%;
}
.custom.title.d-flex {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
<script>
import axios from "axios";
import vueAxios from "vue-axios";
import Vue from "vue";
Vue.use(vueAxios, axios);
export default {
  data: function () {
    return {
  }
  },
  props: [
    "product_name",
    "color",
    "fitting",
    "size",
    "barcode",
    "quantity",
    "unfulfilled",
    "ordered",
    "cost_EUR",
    "cost_USD",
  ],
  name: "logscomponents",
};
</script>
