<template>
  <tr>
    <th scope="row">{{ id }}</th>
    <td>${{ total_price }}</td>
    <td>{{ customer }}</td>
    <td>{{ country }}</td>
    <td>{{ created_at }}</td>
    <td>{{ fulfilled_at }}</td>
    <td>
        <div v-for="(item, index) in JSON.parse(itemSku)" :key="index">{{ item }}</div>
    </td>
    <td>
      <div v-for="(singleDescription, index) in JSON.parse(description)" :key="index">
        {{ singleDescription }}
      </div>
    </td>
        <td>
      <a class="label-link" :href="label">
        label
      </a>
      </td>
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
    "id",
    "total_price",
    "customer",
    "itemSku",
    "description",
    "country",
    "created_at",
    "fulfilled_at",
    "label"
  ],
  name: "logscomponents",
};
</script>
