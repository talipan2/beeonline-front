<template>
  <div>
    <div v-for="(part, index) in htmlParts" :key="index">
      <!-- Если это HTML контент -->
      <div v-if="part.type === 'html'" v-html="part.content"></div>
      <!-- Если это компонент -->
      <component
        v-else-if="part.type === 'component'"
        :is="part.component"
        v-bind="part.props"
      />
    </div>
  </div>
</template>

<script setup>
import { parseHtmlComponents } from '~/utils/htmlComponentParser';

const props = defineProps({
  html: {
    type: String,
    required: true
  }
});

const htmlParts = ref([]);

// Парсим HTML и создаем массив частей
const { cleanHtml, components } = parseHtmlComponents(props.html);

// Создаем массив частей HTML
const parts = [];
let currentHtml = cleanHtml;
let componentIndex = 0;

// Заменяем placeholders на специальные маркеры
components.forEach(component => {
  const placeholder = `<div data-component-id="${component.id}"></div>`;
  const marker = `__COMPONENT_${componentIndex}__`;
  currentHtml = currentHtml.replace(placeholder, marker);
  componentIndex++;
});

// Разбиваем HTML на части
const htmlSections = currentHtml.split(/(__COMPONENT_\d+__)/);
let componentIndex2 = 0;

htmlSections.forEach(section => {
  if (section.match(/^__COMPONENT_\d+__$/)) {
    // Это маркер компонента
    const component = components[componentIndex2];
    if (component) {
      parts.push({
        type: 'component',
        name: component.name,
        props: component.props
      });
    }
    componentIndex2++;
  } else if (section.trim()) {
    // Это HTML контент
    parts.push({
      type: 'html',
      content: section
    });
  }
});

// Загружаем компоненты асинхронно
const loadedComponents = ref({});

onMounted(async () => {
  for (const part of parts) {
    if (part.type === 'component' && !loadedComponents.value[part.name]) {
      try {
        const componentModule = await import(`~/components/pages/${part.name}.vue`);
        loadedComponents.value[part.name] = componentModule.default;
      } catch (error) {
        console.error(`Ошибка загрузки компонента ${part.name}:`, error);
        // Создаем компонент-заглушку для ошибки
        loadedComponents.value[part.name] = {
          template: `<div style="color: red; padding: 10px; border: 1px solid red; margin: 10px 0;">
            Ошибка загрузки компонента: ${part.name}
          </div>`
        };
      }
    }
  }
});

// Создаем финальный массив частей с загруженными компонентами
const updateHtmlParts = () => {
  htmlParts.value = parts.map(part => {
    if (part.type === 'component') {
      return {
        ...part,
        component: loadedComponents.value[part.name] || null
      };
    }
    return part;
  });
};

// Инициализируем htmlParts
updateHtmlParts();

// Обновляем htmlParts после загрузки компонентов
watch(loadedComponents, () => {
  updateHtmlParts();
}, { deep: true });
</script>
