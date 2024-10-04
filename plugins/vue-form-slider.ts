import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.scss";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("Slider", Slider);
});