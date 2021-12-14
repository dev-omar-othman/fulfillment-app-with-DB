<template>
  <tr>
    <th scope="row">{{ id }}</th>
    <td>${{ total_price }}</td>
    <td>{{ customer }}</td>
    <td>{{ country }}</td>
    <td>
      <div v-for="(item, index) in itemSku" :key="index">{{ item }}</div>
    </td>
    <td>
      <div v-for="(singleDescription, index) in description" :key="index">
        {{ singleDescription }}
      </div>
    </td>

    <div>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        :data-target="'#modal' + id.replace('#', '')"
        @click="autoFocus"
      >
        fulfill
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        :id="'modal' + id.replace('#', '')"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="custom title d-flex">
              <h5 class="modal-title" id="exampleModalLabel">order {{ id }}</h5>
              <h5>{{ country }}</h5>
              </div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              
            </div>
            
            <div class="modal-body">
              <div class="input-group input-group-sm mb-3">
                <input
                  id="inputField"
                  v-on:keyup.enter="scanBarcode1"
                  type="text"
                  class="form-control input-field"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  v-model="barcode"
                  autofocus
                />
                <div class="input-group-prepend">
                  <span
                    class="input-group-text scan-btn"
                    id="inputGroup-sizing-sm"
                    @click="scanBarcode2"
                    >scan barcode</span
                  >
                </div>
              </div>
              <ul class="description">
                <li
                  v-for="(singleDescription, index) in description"
                  :key="index"
                  :id="'item'+index"
                >
                  {{ singleDescription }}
                </li>
              </ul>
              <div
                v-if="this.itemSku.length == verifiedBarcodes.length"
                class="alert alert-success"
                role="alert"
              >
                all items are verified
              </div>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-primary active m-2">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    value="0.5"
                    v-model="datasetting.weight.value"
                    checked
                  />
                  micro
                </label>
                <label class="btn btn-primary m-2">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    value="1"
                    v-model="datasetting.weight.value"
                  />
                  mini
                </label>
                <label class="btn btn-primary m-2">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    value="5"
                    v-model="datasetting.weight.value"
                  />
                  small
                </label>
              </div>
            </div>
            <div class="modal-footer">
                <button
                v-if="this.itemSku.length == verifiedBarcodes.length"
                type="button"
                class="ww-fulfill btn btn-secondary"
                @click="fulfillSheetsOnly"
              >
                fulfill worldwide
              </button>
              <button v-else type="button" class="ww-fulfill btn btn-secondary" disabled>
                fulfill worldwide
              </button>

              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="rerenderComponent"
              >
                discard
              </button>
              <button
                v-if="this.itemSku.length == verifiedBarcodes.length"
                type="button"
                class="btn btn-primary"
                @click="created"
              >
                get label
              </button>
              <button v-else type="button" class="btn btn-primary" disabled>
                get label
              </button>
              <button
                v-if="this.itemSku.length == verifiedBarcodes.length"
                type="button"
                class="btn btn-primary"
                @click="test"
              >
                test
              </button>
              <button v-else type="button" class="btn btn-primary" disabled>
                test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>
<style>
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
const endpoint = "http://localhost:8081/";
import axios from "axios";
import vueAxios from "vue-axios";
import Vue from "vue";
Vue.use(vueAxios, axios);
export default {
  data: function () {
    return {
      date: new Date(),
      today: "",
      barcode: null,
      tracking_url: null,
      trackingNo: null,
      verifiedBarcodes: [],
      datasetting: {
        pickup_date: this.today,
        first_mile_option: "pickup",
        description: `${this.id}`,
        weight: {
          value: "0.5",
          units: "lb",
        },
        customer_reference: this.id,
        metadata: {
          your_data: "XYZ123",
        },
        sender: {
          contact: {
            name: "Molly and Stitch",
            phone: "+1 (424) 777-2110",
            company: "Molly and Stitch US",
          },
          address: {
            address_line1: "1272 winchester ave",
            suburb: "Glendale",
            state_name: "California",
            postcode: "91201",
            country: "USA",
          },
        },
        receiver: {
          instructions: "no instructions",
          contact: {
            name: `${this.customer}`,
          },
          address: {
            //shipping address
            address_line1: this.destination1,
            address_line2: this.destination2,
            state_name: this.state,
            suburb: this.city,
            postcode: this.zip,
            country: this.country,
          },
        },
      },
    };
  },
  methods: {
    autoFocus(e) {
      e.target.parentElement.children[1].children[0].children[0].children[1].children[0].children[0].focus();
    },
   
    rerenderComponent(e) {
      this.barcode = null;
      this.verifiedBarcodes = [];
      for (
        var listCount = 0;
        listCount <
        e.target.parentElement.parentElement.children[1].children[1].children
          .length;
        listCount++
      ) {
        e.target.parentElement.parentElement.children[1].children[1].children[
          listCount
        ].classList.remove("verified");
      }
    },

    scanBarcode1(event) {
      for (var index = 0; index < this.itemSku.length; index++) {
        if (this.barcode == this.itemSku[index]) {
          var count1 = 0;
          for (var counter1 = 0; counter1 < this.itemSku.length; ++counter1) {
            if (this.itemSku[counter1] == this.barcode) {
              count1++;
            }
          }
          var count2 = 0;
          for (
            var counter2 = 0;
            counter2 < this.verifiedBarcodes.length;
            ++counter2
          ) {
            if (this.verifiedBarcodes[counter2] == this.barcode) {
              count2++;
            }
          }
          if (count1 > count2) {
            this.verifiedBarcodes.push(this.itemSku[index]);
            this.barcode = "";

              if(event.target.parentElement.parentElement.children[1].children[index].classList[0] != "verified"){
                event.target.parentElement.parentElement.children[1].children[index].classList.add("verified"); 
              }
              else if(event.target.parentElement.parentElement.children[1].children[index].classList[0] == "verified" && 
              event.target.parentElement.parentElement.children[1].children[index+1].classList[0] != "verified"){
                event.target.parentElement.parentElement.children[1].children[index+1].classList.add("verified"); 
              }
              else if(event.target.parentElement.parentElement.children[1].children[index+1].classList[0] == "verified" &&
              event.target.parentElement.parentElement.children[1].children[index+2].classList[0] != "verified"
              ){
                event.target.parentElement.parentElement.children[1].children[index+2].classList.add("verified"); 
              }
              else if(event.target.parentElement.parentElement.children[1].children[index+2].classList[0] == "verified" &&
              event.target.parentElement.parentElement.children[1].children[index+3].classList[0] != "verified"
              ){
                event.target.parentElement.parentElement.children[1].children[index+3].classList.add("verified"); 
              }
              else{
              event.target.parentElement.parentElement.children[1].children[index].classList.add("verified");                
              }

            console.log(event.target.parentElement.parentElement.children[1].children[
              index
            ].classList, event.target.parentElement.parentElement.children[1].children[
              index
            ].getAttribute("id"))

            event.target.focus();
          } else {
            alert(`item #${this.barcode}  already verified`);
            this.barcode = "";
            event.target.parentElement.parentElement.children[0].focus();
          }
        } else if (JSON.stringify(this.itemSku).search(this.barcode) == -1) {
          alert("none of the items have the same barcode");
          this.barcode = "";
          event.target.parentElement.parentElement.children[0].focus();
        }
      }
    },
    scanBarcode2(event) {
      for (var index = 0; index < this.itemSku.length; index++) {
        if (this.barcode == this.itemSku[index]) {
          var count1 = 0;
          for (var counter1 = 0; counter1 < this.itemSku.length; ++counter1) {
            if (this.itemSku[counter1] == this.barcode) {
              count1++;
            }
          }
          var count2 = 0;
          for (
            var counter2 = 0;
            counter2 < this.verifiedBarcodes.length;
            ++counter2
          ) {
            if (this.verifiedBarcodes[counter2] == this.barcode) {
              count2++;
            }
          }
          if (count1 > count2) {
            this.verifiedBarcodes.push(this.itemSku[index]);
            this.barcode = "";
            event.target.parentElement.parentElement.nextSibling.children[
              index
            ].classList.add("verified");
            event.target.parentElement.parentElement.children[0].focus();
          } else {
            alert(`item #${this.barcode}  already verified`);
            this.barcode = "";
            event.target.parentElement.parentElement.children[0].focus();
          }
        } else if (JSON.stringify(this.itemSku).search(this.barcode) == -1) {
          alert("none of the items have the same barcode");
          this.barcode = "";
          event.target.parentElement.parentElement.children[0].focus();
        }
      }
    },
     fulfillSheetsOnly(event){
         Vue.axios
        .get(endpoint + "fulfillSheets", {
          params: { data: JSON.stringify(this.verifiedBarcodes) },
        })
        .then((response) => response)
        .catch((error) => {
          console.error("There was an error!", error);
        });
        event.target.innerHTML = "order fulfilled";
        event.target.setAttribute("disabled", "true");
     },
     test(){
          Vue.axios
            .get(endpoint + "markFulfilled", {
              params: {
                fulfillingDate : this.date.getFullYear() +
                "-" +
                (this.date.getMonth() + 1) +
                "-" +
                this.date.getDate(),
                orderid: "235",
                totalPrice : "$20",
                customer : "omar",
                destination : "US",
                itemsSku : JSON.stringify(Array.from(new Set(['9120109770404', '9120109770879']))),
                description : JSON.stringify(Array.from(new Set(['Butter Leather City Dog Leash - Chili Red L / Brass', 'Butter Leather Dog Collar - Chili Red L / Brass']))),
                label : "HEEYYYYY URL",
              },
            });
     },
    created(event) {
      // GET request using axios with error handling
      this.today =
        this.date.getFullYear() +
        "-" +
        (this.date.getMonth() + 1) +
        "-" +
        this.date.getDate();
     
      Vue.axios
        .get(endpoint + "updateData/", {
          params: { data: JSON.stringify(this.datasetting) },
        })
        .then((response) => {
          if(response.data.body.response.indexOf("message") != -1){
            alert('sendle error' + response.data.body.response);
          }else{
          this.tracking_url = response.data.body.url;
          this.trackingNo = response.data.body.trackingNo;
          window.open(response.data.body.label, "_blank");
          event.target.innerHTML = "order fulfilled";
          event.target.setAttribute("disabled", "true");
          var btn = document.createElement("a");
          btn.innerHTML = "label";
          btn.setAttribute("href", response.data.body.label);
          btn.setAttribute("target", "_blank");
          event.target.parentElement.appendChild(btn);

          //mark fulfilled
          Vue.axios
            .get(endpoint + "markFulfilled", {
              params: {
                fulfillingDate : this.date.getFullYear() +
                "-" +
                (this.date.getMonth() + 1) +
                "-" +
                this.date.getDate(),
                orderid: "2315",
                totalPrice : "$20",
                customer : "omar",
                destination : "US",
                itemsSku : JSON.stringify(Array.from(new Set(['9120109770404', '9120109770879']))),
                description : JSON.stringify(Array.from(new Set(['Butter Leather City Dog Leash - Chili Red L / Brass', 'Butter Leather Dog Collar - Chili Red L / Brass']))),
                label : "HEEYYYYY URL",
              },
            });
          Vue.axios
            .get(endpoint + "fulfillShopify", {
              params: {
                orderid: JSON.stringify(this.orderNumber),
                trackingUrl: this.tracking_url,
                trackingNo: this.trackingNo,
              },
            })
            .then((response) => {
              if (response.data.data.response.indexOf("errors") != -1) {
                alert(
                  "error fulfilling order" + " " + response.data.data.response
                );
              }else {
                Vue.axios
        .get(endpoint + "fulfillSheets", {
          params: { data: JSON.stringify(this.verifiedBarcodes) },
        })
        .then((response) => response)
        .catch((error) => {
          console.error("There was an error!", error);
        });
              }
            })
            .catch((error) => {
              alert("fulfillment failed" + " " + error);
              console.error("There was an error!", error);
            });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      
    },
  },
  props: [
    "id",
    "total_price",
    "customer",
    "destination1",
    "destination2",
    "itemSku",
    "description",
    "orderNumber",
    "zip",
    "country",
    "state",
    "city",
  ],
  name: "orderComponent",
};
</script>
