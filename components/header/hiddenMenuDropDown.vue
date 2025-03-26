<template>
  <UiNewDropdown
    class="header__more-menu-dropdown"
    :arrow="false"
    placement="bottom-end"
    :offset="[0, 0]"
    dropdown-class="header__more-menu-dropdown-content"
    ref="headerDropdown"
  >
    <UiButton type="button" variant="secondary" size="around" v-if="items.length">
        <SvgoDots class="svg-m" />
    </UiButton>
    <template #content>
      <ul class="">
        <li v-for="(item, index) in items" :key="index">
            <NuxtLink :to="item.to">{{ item.text }}</NuxtLink>
        </li>
      </ul>
    </template>
  </UiNewDropdown>
</template>

<script setup>
const router = useRouter();
const headerDropdown = ref(null);

const props = defineProps({
  items: {
    type: Array,
    default: [],
  }
});

watch(() => router.currentRoute.value.path, (newVal) => {
  if(headerDropdown.value.tippy) {
    headerDropdown.value.tippy.hide();
  }
})


</script>

<style lang="scss">
.header__more-menu-dropdown-content {
  color: var(--text-color-monodecimal);

  ul {
    li {
        a {
            padding: .4em;

            &:hover {
                background-color: aliceblue;
            }
        }
    }
  }
}

.header__more-menu-dropdown-content {
  font-size: 1.4rem;
  padding: 1em;
  color: var(--text-color-monodecimal);
  max-width: 20em;
}
</style>
