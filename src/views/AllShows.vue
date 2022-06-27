<template>
  <div v-for="i in genre" :key="i.id">
    <div class="shows">
      <swiper
        v-bind:slidesPerView="6"
        v-bind:spaceBetween="10"
        v-bind:loop="true"
        class="parallax-slider"
        parallax
        grabCursor
        v-bind:navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow' }"
      >
        <h3>{{ i.name }}</h3>

        <div
          class="parallax-slider-navigation"
          style="display: flex; justify-content: space-between; padding: 2rem"
        >
          <div class="nav-indicator prevArrow fa-2x">
            <i class="swiper-button-prev"></i>
          </div>
          <div class="nav-indicator nextArrow fa-2x">
            <i class="swiper-button-next"></i>
          </div>
        </div>
        <swiper-slide v-for="d in i.content" :key="d.id">
          <router-link :to="{ name: 'ShowDetails', params: { id: d.id } }">
            <img class="imageSlide" :src="d.image.original" />
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import SwiperCore, { Navigation, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
SwiperCore.use([Navigation, Parallax]);

export default {
  name: "AllShows",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let genre = ref([
      {
        id: 1,
        name: "Drama",
        content: ref([]),
      },
      {
        id: 2,
        name: "Action",
        content: ref([]),
      },
      {
        id: 3,
        name: "Thriller",
        content: ref([]),
      },
      {
        id: 4,
        name: "Horror",
        content: ref([]),
      },
      {
        id: 5,
        name: "Romance",
        content: ref([]),
      },
    ]);
    const shows = ref([]);
    // let drama = ref([]);
    // let comedy = ref([]);
    // let horror = ref([]);
    // let action = ref([]);
    // let parallaxSwiperWidth = ref(0);

    onMounted(async () => {
      const response = await fetch(`https://api.tvmaze.com/shows`);
      shows.value = await response.json();

      const dramaFilter = ["Drama"];
      const comedyFilter = ["Comedy"];
      const horrorFilter = ["Horror"];
      const actionFilter = ["Action"];
      const romanceFilter = ["Romance"];

      genre.value[0].content = shows.value
        .filter((item) =>
          dramaFilter.every((val) => item.genres.indexOf(val) > -1)
        )
        .sort((a, b) => b.rating.average - a.rating.average);

      genre.value[1].content = shows.value
        .filter((item) =>
          comedyFilter.every((val) => item.genres.indexOf(val) > -1)
        )
        .sort((a, b) => b.rating.average - a.rating.average);

      genre.value[2].content = shows.value
        .filter((item) =>
          horrorFilter.every((val) => item.genres.indexOf(val) > -1)
        )
        .sort((a, b) => b.rating.average - a.rating.average);

      genre.value[3].content = shows.value
        .filter((item) =>
          actionFilter.every((val) => item.genres.indexOf(val) > -1)
        )
        .sort((a, b) => b.rating.average - a.rating.average);

      genre.value[4].content = shows.value
        .filter((item) =>
          romanceFilter.every((val) => item.genres.indexOf(val) > -1)
        )
        .sort((a, b) => b.rating.average - a.rating.average);
    });

    return {
      shows,
      genre,
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
    height: 30%;
    width: 20%;
  }
  .fa {
    color: #fff;
  }
  .shows-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
  .grid {
    margin-top: 100px;
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
  .imageSlide {
    width: 100%;
    display: block;
  }

  @media screen and (max-width: 992px) {
    .imageSlide {
      width: 500px;
      display: block;
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: 50%;
    width: calc(var(--swiper-navigation-size) / 44 * 27);
    height: var(--swiper-navigation-size);
    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  h3 {
    color: #fff;
    font-size: 20px;
    text-transform: uppercase;
  }
}
</style>
