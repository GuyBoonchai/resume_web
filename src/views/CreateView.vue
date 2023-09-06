<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
let name = ref(''), price = ref(0), routerName = ref(''), _id = ref('');
const router = useRouter()
onMounted(() => {
  routerName.value = router.currentRoute.value.name;
  _id.value = router.currentRoute.value.params?.id;
  console.log("routerName", routerName.value);
  console.log("_id", _id.value);
  if (routerName.value == "edit") {
    initEdit();
  }
});

const API_PATH = import.meta.env.VITE_API_PATH;
const initEdit = async () => {
  const {data} = await axios.get(`${API_PATH}/getproduct/${_id.value}`);
  name.value = data.data.name;
  price.value = data.data.price;
}
const submit = async () => {
  const req = {
    name: name.value, price: price.value
  };
  if (routerName.value == "create") {
    await axios.post(
      `${API_PATH}/create`,
      req
    ).then((response) => {
      name.value = '';
      price.value = '';
      alert(response.status);
    });
  } else {
    await axios.post(
      `${API_PATH}/update/${_id.value}`,
      req
    ).then((response) => {
      router.push({ name: 'home', replace: true });
    });
  }
}
</script>

<template>
  <div id="app">
    <div class="flex h-screen">
      <div class="m-auto container">
        <div class="mockup-window border border-base-300" data-theme="aqua">
          <div class="flex justify-left px-4 py-16 border-t border-base-300">
            <div class="form-wrap">
              <form action="#">
                <div class="form-group">
                  <label for="addModel">Name</label>
                  <input type="text" class="form-control" id="addModel" v-model="name" />
                </div>

                <br />
                <div class="form-group">
                  <label for="addYear">Price</label>
                  <input type="number" class="form-control" id="addYear" v-model="price" />
                </div>

                <br /><button class="btn glass" v-on:click="submit()">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
