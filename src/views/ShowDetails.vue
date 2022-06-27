<template>
  <section class="shows">
    <div class="shows-text">
      <div class="info">
        <img :src="shows.image?.original" alt="image" />
        <div class="info-data">
          <p class="show-name">{{ shows.name }}</p>
          <p class="show-language">Language: {{ shows.language }}</p>
          <p>
            Genres:
            <span
              v-for="(genre, i) in shows.genres"
              class="show-genres"
              :key="i"
            >
              <span> {{ genre }}</span>
            </span>
          </p>
          <p class="show-premiered">Premiered On: {{ shows.premiered }}</p>
          <p class="show-rating">Rating: {{ shows.rating?.average }}</p>
        </div>
        <router-link :to="{ name: 'allShows' }">
          <button class="back-button">Go Back</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  name: "ShowDetails",
  props: ["id"],

  setup() {
    const route = useRoute();
    const shows = ref([]);
    let data = ref({});
    const id = ref(route.params.id);

    onMounted(async () => {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${id.value}`
      );
      shows.value = response.data;
    });

    return {
      shows,
      data,
      route,
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
    width: 70%;
    max-width: 400px;
    height: 500px;
  }
  .shows-text {
    display: flex;
    flex-direction: column;
    color: #fff;
  }
  .info {
    display: flex;
    flex-direction: row;
    margin: 150px auto;

    .info-data {
      color: #fff;
      padding: 0 20px 40px 60px;

      .show-name {
        font-size: 50px;
        color: #fff;
        text-transform: uppercase;
        font-style: italic;
      }
      .show-language {
        font-size: 20px;
        line-height: 35px;
      }
      .show-genres {
        line-height: 35px;
        font-size: 20px;
      }
      .show-genres + .show-genres:before {
        content: ", ";
      }
      .show-premiered {
        font-size: 20px;
        line-height: 35px;
      }
      .show-rating {
        font-size: 20px;
        line-height: 35px;
      }
    }
  }
}
@media only screen and (max-width: 992px) {
  .shows {
    img {
      margin-bottom: 35px;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 50px auto;
      .info-data {
        color: #fff;
        padding: 0 20px;
      }
    }
  }
}
.back-button {
  position: absolute;
  top: 0;
  right: 10%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: none;
  padding: 20px 30px;
}
</style>
