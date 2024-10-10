<template>
  <YandexMap
    v-model="map"
    :settings="{
      location: {
        center: [85.751574, 55.573856],
        zoom: 3,
      },
      theme: 'light',
      showScaleInCopyrights: true,
    }"
    width="100%"
    :height="isFullscreen ? '100dvh' : '600px'"
  >
    <YandexMapDefaultSchemeLayer />
    <YandexMapDefaultFeaturesLayer />

    <YandexMapControls
      :settings="{ position: 'left', orientation: 'vertical' }"
    >
      <YandexMapZoomControl />
    </YandexMapControls>

    <YandexMapControls :settings="{ position: 'bottom left' }">
      <YandexMapOpenMapsButton />
    </YandexMapControls>

    <YandexMapControls :settings="{ position: 'top left' }">
      <YandexMapGeolocationControl />
    </YandexMapControls>

    <YandexMapControls :settings="{ position: 'top right' }">
      <YandexMapControlButton :settings="{ onClick: toogleFullScreen }">
        <div class="fullscreen" :class="{ 'exit-fullscreen': isFullscreen }" />
      </YandexMapControlButton>
    </YandexMapControls>

    <YandexMapClusterer
      :grid-size="64"
      zoom-on-cluster-click
      @trueBounds="trueBounds = $event"
    >
      <YandexMapMarker
        v-for="cord in cords"
        :key="cord"
        position="top left-center"

        :settings="{
          coordinates: cord,
          onClick: (e) => handleMapClick(cord),
        }"
      >
        <div
          class="marker"
          :class="{ 'marker_type_selected': currentPubCard === cord[0]}"
        ></div>
      </YandexMapMarker>
      <template #cluster="{ length }">
        <div class="cluster">
          {{ length }}
        </div>
      </template>
    </YandexMapClusterer>
  </YandexMap>
</template>

<script setup>
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultMarker,
  VueYandexMaps,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
  YandexMapClusterer,
  YandexMapControls,
  YandexMapControl,
  YandexMapZoomControl,
  YandexMapScaleControl,
  YandexMapGeolocationControl,
  YandexMapOpenMapsButton,
  YandexMapControlButton,
} from "vue-yandex-maps";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const isLoaded = computed(() => VueYandexMaps.isLoaded.value);

const cords = [
  [51.789682128109, 55.140428698122],
  [30.314494, 59.938676],
  [55.958736, 54.735152],
  [61.402554, 55.159902],
  [44.516975, 48.707067],
  [44.510049, 48.704131],
  [44.006516, 56.326797],
  [35.917421, 56.858745],
  [39.414526, 57.18587],
];

const map = shallowRef(null);
const isFullscreen = ref(false);
const currentPubCard = ref(null);
const emit = defineEmits(["update:modelValue"]);

const handleMapClick = (cords) => {
  currentPubCard.value = cords[0];
  emit("update:modelValue", cords);
  map.value.setLocation({center: cords, duration: 300});
  console.log(map.value)
};

const toogleFullScreen = () => {
  if (isFullscreen.value) {
    document.exitFullscreen();
  } else {
    map.value.container.requestFullscreen();
  }
};

onMounted(() => {
  const handleFullscreenChange = async () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  onBeforeUnmount(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  });
});
</script>

<style lang="scss">
.marker {
  position: relative;
  width: 34px;
  height: 41px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAApCAYAAABQgPsBAAAAAXNSR0IArs4c6QAABEZJREFUWEfFmF1IFFEUx8+AZWFqmAZpDxIalX3YByGsEIgSPUQhvaRP9ZAoRcpCUPkUSBBoSVIopBRon0hSpNKWfZhIabZZm9k+JPmR4ma4+ZGmk2eYOx3v7MzeWVe6sKzjztz72/P/n3PPXQkEhizLOwHgGADgu25IkrRLYBrTWySzT2VZLjda3OC5dkmScgKB8gmiRgAhtNH5qi+8/tqHNV9dnnD2z/hNq7zrtsV4D53cMcAtniNJUrsVIB2ILMsoAb7A1+Jmk19pzaKLV0iSVCEKMw+Eh7hqf75edCJ2X27xnu4ttjivei0Mo4FQOS4cbVxPJVgWtgRSDybAltQ4WJuwEpaHL4UJ7xT0un9CZ3MfNN93w+TYtMaMkp2q3NttBUYBoRD3St+ueXqzK5bNajuQAJnHk5XFjQZC1Za9g1d1bu2WtMMb+pl3RLKKgSi+QE9QOfbnbIV9RzYLq1Nf9QEelL/X7iee8SuRZCQJRiL79G5hCHZj9fnXWmSoRP6igiC6aKAniu4fMJXDTKazB+s0z4hGRQOh3kjP3giZJ7ZbjgZ7oPZyBziqPymXxCum8iCIUj0pSMHVdEjcvjpgkC8dQ3Ax18GDmFZdBGnDJ2jKFj8+FJAsjByzyJ5xT7kkPhEDyUup0Ta0K61ZAUeDPZiXUqPLHjPDahGhIP8rIkrWLJZHrEijA1mkrPHrEfRGOa2qwawjZBM0T191r1Eyh/okGJUV52QFzeVyFSQlJTkB4A8A/AaAGZoR8/YaHmahew3zx8zMTEdISMgZFQJBEALf8TWL69I2QIlKsHZfnIvJ4vF4bkRHR98xAEGoWZ/9CJUIJ7Taj9BCNjU15QwNDT1nAoFRmTbs0PjIWK1wLBoDAwPVsbGxdSoIlYT+PR9ENa7Ws/KeEYXhasclHxC8T/QgbDG2B7FrTO/PbYMraPdmBMai0dPTcys+Pr6BMycPgZH5FfC5hvcRg2Lb/vj4eGdYWFiZHwiEmgQArykI/cb0sMW3lOw+2pG53e67iYmJz4hJ+Uiw62GdWf15gHVzRkZmkqjRqBKAwIMZFrd/dcQfhGpkpYnijxv4Ge3aS0pKLtnt9j6DlMVI4LkHIzHB1rUijW5P8iWJ0+msS05OfmMC0T9X6wb5Lx4UECaJ1+v9GBERUWsgyQ8A+KZGQyeAFRBdu0AlGR0ddUVGRj40gEAZcMMzHFZAdL0tzZLCwsLKoqKiEU4SlOALAGA0TIcQCDuE8WnLJGlpaWmw2Wx43mQ7Khap7wDw0h+AJbP6SlsGMTIy0hUVFYULMgg0I8owJAohnL782Yeman5+/u3S0tIxFaQXAB5ZAbAaEa2Do75oamp6kpaWhhL0AEDrXBOO0Qho+PUI9Qf+dMV+93A4HE0ZGRmeuVr2AgBaAlqdPCQMQhcaHh7ujomJaQSA6wsFsCoN7VHwWHAeAL4GC0LYrMFc0Giuv0TMF2MU5thKAAAAAElFTkSuQmCC");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
}

.marker_type_selected {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAApCAYAAABQgPsBAAAAAXNSR0IArs4c6QAABEZJREFUWEfFmF9oE1kUxr+RQqvRVEK60CpssVbEItZ1H1b6ZN0+aV8EyYO6Dz7YXX2p9EVLYVmh6oulBXW3fajUXcFYEKQqCpWIC11hVyXIBqlRDP6JlrSRxP7VdnbPMHf29E5mcieN7IWQTjNzzy/n+86950aDwtB1fRuAQwDo3TY0TftaYRrXWzS3T3Vd73UK7vDcA03TWgqBygliZoAgrPFo8v6qwfRA5bOZJ6vEP2vKNmY3lm3Ofhc8nJSCt2ia9sALkA1E13WSgF7IFdxt8vD6CA/ep2lanyrMIhAZ4nTy+AbVicR9xypPjW71fZM1r5VhLBAuR/urHzZwCZYvW4Fv/c34yrcdX5bWwLdsJSYXPiAx+wwPJ//AcGYI0wtTFjNJdnLtz6NeYAwQDnExdb7yxvvBKjHrTv9u7Au2GMGdBkFdSvXiTua6dcuu1XvfCO+oVJUAMXxBnuByhAIHsSdwQFmdqxO/IjzRb93PPJNXIs1JEsrEoS/alCHEjX1jZ6zMcInyZYVAbNkgT5yrDrvK4SbTkRchyzOqWbFAuDeaV4ewP/i952yIB35L/YKh92HjknnFVR4CMVZPDvLjmm5sWr6lYJDYdBQ/vW6VQVxXXQL5i57gJdu/bqggWQQ5VdHB583GJfOJGkgovsPa0MLrIwVnQzwYiu+wVY+bYa2McJD/KyNG1Xwuj3iRxgbymaomr0fIG718VS3mOsI2QffyNfcao3K4T4qxstKcYkGLxWJH6+rqogA+AZgFMM8rYtFeI8Msda8R/pifn39UUlLSbkIQCEHQO70WKC5vA4ysFGv3pbmELOPj4xeDweAVBxCCWsjZj3CJaEKv/QhfyObm5qKlpaUnXCAoKx8dOzQ5M15XOJGNZDJ5qaqq6poJwiXhfy8GMY1r9ayyZ1RhpLWjOweE7BM7iAgm9iBxTeX9ePrhSt69OYGJbCQSicvV1dW3JHPKEJSZDwWfa2QfCSix7U9NTT32+Xxn80AQ1AyArCsI/8b8sCW3lOI+3pHF4/HB2trau8ykcibEdcpm1nweEN2ck5GFJGY2LihA0MGMFrf/1pF8EKaRjSZKPm7QZ7xr7+rq6m5ra3vtULKUCTr3UCamRVwv0tj2pFySRKPRa/X19X+6QLwB8E7+4kUBEZJks9m//X7/VQdJJgC8NLNhE8ALiK1d4JJkMplYeXk5nbDEHsLNSTLQhuc4vIDYelteJR0dHf2dnZ1pSRKS4CkAyobrUAIRhzC5bIUkIyMjtxoaGuISxFsAv+cD8GTWXGUrINLp9JNAIEABhSRkRpJhTBVCuXzlsw8v1dbW1nBPT8+kCfIKwE0vAF4zYnVw3BeRSOROY2MjSZAAcP/fJpyyUdDI6xHuD/rpSvzuMTw8HGlqahoHcA/ASEHR2UPKIDxQKpUaraiouA1gYKkAXqXhPQodC04BeFEsCGWzFjOg01z/AO80F2POKuSqAAAAAElFTkSuQmCC");
}

.cluster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  height: 46px;
  color: #fff;
  border-radius: 100%;
  cursor: pointer;
  text-align: center;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAYAAABXuSs3AAAAAXNSR0IArs4c6QAABYRJREFUaEPVWm1MU1cYvpcPFcrH6kBtUXDgLFqZBDYalCgs6CRbtplMEtSZYciSlmUbLMZNN36wiTNmYrJVksXMZdOS4BK3ZQnOkVGdSmCD4CgibBqLQhWYXQuFSj/u8p713NwW7u25tEV7/rRw7jnnOc99znvej9JUENqb+aezolzMOpiKoeksiqHRd7bRjIFmmB742xlJG75s242+B9LouQ7W5H1bhoBSEehTbKMpdyOMOdHxOvoU20QDB8C+rD77Qqo5e9MK52KZRJa8PD5akrhwAUVRsR4wkzbLw+nRu+OOByabqfvSnag/fh6Uer0Qyt0odgPEwEEOkW6qDMsga5N8pGiHIiEzT7aUoiiJSMZsNzpM91vP9lt7Lg0vwWNdkcxBUhkRAUcseyQBgEveWCdfqUxiFxQJ2uvx271jI+e+6I79q2vECh0gIRL2/QJXq07XYZbVxzZbsjamrAkEKN/YnitDfQ3VFxNRP80YGtp3HxBahxc4VxqrcpKHK+oKUhKkMbJQgObM2Xd4T7P8Tr/ZBv9r6Nj1Mt96vMAx03DwyvarlDGS6BBjZqe3aav0Eb1Xh81C4GcFzgW9t7ZgLZLe/DZGW6W3I/A8spkBCB9EkEd1wxbQs1iLEawt2g7vaXaCbGY7sF7Aka5d9CFY+dPz22kxmh7ovCe5dnEo8VbPaNzY0MSiyXFHFMwTGx/tTEqJs6dnJU+s35xiWZ27DOmXsPVpVDp0YH317gUcS+SArqR/eYa0iGTyrpbBxF/OXF9q7HsQT/J82prF41t2rb2fU5xqIXn+7k1za93OZoUveBY4ZhvstPpoYTbJpKdqrqb+fuF2Msmzvs88t3XlaHnthkGSsfXqlgmw89wLigWuzjvzI0zy8fevWJ6USQRt9cS/DyO1Va0ZpCzzgQP2K+uLbsY9sdAltIF/TLa+j179wUsyCLhYto+Un18dKGgMFMDvP7VtwB/zmHWsdQQca7um6SXjsrSEfKFJApEH37wksrlntLbVlv6UhrX+P3CPTE6074TXwWv+4CCe/PDyKn/szKW/4pOCv/0cWJtGpUMHGlinsUzghtxbW6AUWjSYEvFdh0Qy2ir9FFxKCDiWSel7udGFpQpeCwF2+njlr5lzYZN0zLva528I2fmuFuO1kwevJMOFxAL3Z03OHuuUtzb1h9TJKipVmHZU5w4LbPQ3jUqXAf00R98OiqKQ+GdroZSJCAtj1Kh0yNvjAhc8mPu2fveMzTodUhdRkrDAcfTCa38KMM4eUC5wkAGvF1iZ35jDMExIvUSaphltW1mXAHBGo9KZfBkPW+BhK5UwO5yeYDgczCHrbEFmDEc8FYc2juYUp63nOxiPwwWkb+ofbfqs0wHhHOurKDfIpZX1hTHhcOWDXx6+ThbXO3z78yJ7Zp4s/bF2az1Rv1cE9HTOkoSqhuI4f05RMK9/Eq8QubL79N2QZ8ThW3iFbpwcy4xgmZR1YCGQaIgk6sFvXjBY5mpdTHJz3tITPhmtGU4Tx82FMIk4MxuKhJDVPGV6f9s5Bkj1zZ3zpuBWKKSSD74pgWzUI0nBTdkc1HF1i4UoBYc1hcM5z6W06FEkPb+quXwdlVxIk54seE/k7wHvni/mgenGI+29QqCRPy5ks7HePbKBWJBY8/7ugtn6QdPad/SxKLFPMwZXBNXIVxPyG9Fw6z9irI1Y4EErpXAX5oIHO7/9rezJYBavmr82DOPqW9CKV9wNcAtZsIGScuVImjIpXWyZBXRs7B275VUu9CMN3zfoVyq+A7js4z44wPkvPjWAC7QRURHSGEk0M213xrhcjN3tdJt5C7SecjlJiZCLRTRwPDigkjinti8WMF5/zsC5u5/xIwTohB8i0IyBXSjIP0L4Dzzhiram3x/wAAAAAElFTkSuQmCC');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  font-size: 13px;
}

.fullscreen {
  width: 26px;
  height: 26px;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg fill='%236B6B6B'%3E%3Cpath d='M16.14 7.86L14.27 6H20v5.7l-1.83-1.82L15.04 13 13 10.98l3.13-3.13zm0 0M9.86 18.14L11.73 20H6v-5.7l1.83 1.82L10.96 13 13 15.02l-3.13 3.13zm0 0'/%3E%3C/g%3E%3C/svg%3E");
}

.exit-fullscreen {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Cg fill='%236B6B6B'%3E%3Cpath d='M8.14 15.86L6.27 14H12v5.7l-1.83-1.83-3.13 3.14L5 18.98l3.13-3.13zm0 0M17.86 10.14L19.73 12H14V6.3l1.83 1.83 3.13-3.14L21 7.02l-3.13 3.13zm0 0'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
