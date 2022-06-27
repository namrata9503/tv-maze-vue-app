<template>
  <div class="home">
    <section class="shows">
      <div class="shows-text container">
        <input
          class="serach-input"
          type="text"
          placeholder="Search.."
          v-model="search"
          @keyup="inputChanged"
          @keydown.down="onArrow"
          @keydown.up="onArrow"
        />
        <div class="all-shows">
          <ul class="grid-shows">
            <li class="grid-list" v-for="s in shows" :key="s.id">
              <router-link
                class="link"
                :to="{ name: 'ShowDetails', params: { id: s.id } }"
              >
                <img :src="s.image?.original" alt="image" />
              </router-link>
              <p>{{ s.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div class="autocomplete container">
      <ul
        v-for="(data, i) in filteredData"
        :key="i"
        class="autocomplete-results"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <li @click="setResult(data.show.name)">
          <router-link
            class="link"
            :to="{ name: 'ShowDetails', params: { id: data.show?.id } }"
          >
            <img :src="data.show?.image?.original" alt="image" />
          </router-link>
          <p>{{ data.show.name }}</p>
        </li>
      </ul>
    </div>
  </div>

  <div class="home">
    <section class="shows">
      <div class="shows-text container">
        <div>
          <ul class="grid-shows-data">
            <li class="grid-list-data" v-for="s in data" :key="s.id">
              <router-link
                class="link"
                :to="{ name: 'ShowDetails', params: { id: s.id } }"
              >
                <img :src="s.image?.original" alt="image" />
              </router-link>
              <p>{{ s.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "HomeView",
  components: {},
  setup() {
    const shows = ref([]);
    let data = ref([]);
    let search = ref("");
    let arrowCounter = ref(-1);
    let filteredData = ref([]);

    onMounted(async () => {
      data.value = [];
      const response = await fetch(`https://api.tvmaze.com/shows`);
      shows.value = await response.json();
    });

    const getFilteredData = async () => {
      shows.value = [];
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${search.value}`
      );
      data.value = response.data;
    };
    const setResult = (text) => {
      search.value = text;
    };
    const onArrow = (event) => {
      if (filteredData.value.length > 0) {
        arrowCounter.value =
          event.code == "ArrowDown"
            ? ++arrowCounter.value
            : --arrowCounter.value;
        if (arrowCounter.value >= filteredData.value.length)
          arrowCounter = arrowCounter.value % filteredData.value.length;
        else if (arrowCounter.value < 0)
          arrowCounter.value = filteredData.value.length + arrowCounter.value;
        setResult(filteredData.value[arrowCounter.value].text);
      }
    };
    const inputChanged = (event) => {
      if (event.code == "ArrowUp" || event.code == "ArrowDown") return;
      getFilteredData();
      //filteredData.value = [];

      let filtered = JSON.parse(JSON.stringify(data.value));
      filtered.filter((data) => {
        return data.show.name.toLowerCase().match(search.value);
      });

      filteredData.value.push(...filtered);
    };

    return {
      shows,
      data,
      getFilteredData,
      onArrow,
      inputChanged,
      setResult,
      search,
      filteredData,
      arrowCounter,
    };
  },
};
</script>

<style lang="scss" scoped>
.shows {
  background-attachment: fixed;
  position: relative;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .shows-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    .serach-input {
      margin: 0 auto 50px;
      width: 75%;
      height: 35px;
    }
    .all-shows {
      margin: 20px;
    }
  }

  .grid-shows {
    margin-top: 35px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    .grid-list {
      list-style: none;

      img {
        max-width: 300px;
        height: 400px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0, 2px, 4px, -1px,
          rgba(0, 0, 0, 0.06);
      }
    }
  }
}
.autocomplete {
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 10px;
  img {
    max-width: 300px;
    height: 400px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0, 2px, 4px, -1px,
      rgba(0, 0, 0, 0.06);
  }
  p {
    color: #fff;
  }

  @media (max-width: 550px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.autocomplete-results {
  list-style: none;
}
</style>
