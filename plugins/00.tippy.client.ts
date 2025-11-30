import { Tippy, setDefaultProps } from "vue-tippy";
import "assets/style/tippy.scss";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Tippy", Tippy);

  setDefaultProps({
    appendTo: 'parent',
  });
});
