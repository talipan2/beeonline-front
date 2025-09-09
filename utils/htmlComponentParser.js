/**
 * Парсит HTML контент и извлекает компоненты вида {{ component:name props }}
 * @param {string} html - HTML контент для парсинга
 * @returns {Object} - Объект с очищенным HTML и массивом компонентов
 */
export function parseHtmlComponents(html) {
  if (!html) return { cleanHtml: '', components: [] };

  const componentRegex = /\{\{\s*component:([a-zA-Z0-9_-]+)(?:\s+([^}]+))?\s*\}\}/g;
  const components = [];
  let match;
  let cleanHtml = html;

  // Находим все компоненты в HTML
  while ((match = componentRegex.exec(html)) !== null) {
    const [fullMatch, componentName, propsString] = match;

    // Парсим props
    const props = parseProps(propsString);

    components.push({
      id: `component_${components.length}_${Date.now()}`,
      name: componentName,
      props: props,
      originalMatch: fullMatch
    });

    // Заменяем компонент на placeholder
    cleanHtml = cleanHtml.replace(fullMatch, `<div data-component-id="${components[components.length - 1].id}"></div>`);
  }

  return {
    cleanHtml,
    components
  };
}

/**
 * Парсит строку props в объект
 * @param {string} propsString - Строка с props (например: "group='Команда проекта' title='Заголовок'")
 * @returns {Object} - Объект с props
 */
function parseProps(propsString) {
  if (!propsString) return {};

  const props = {};
  const propRegex = /(\w+)=['"]([^'"]*)['"]/g;
  let match;

  while ((match = propRegex.exec(propsString)) !== null) {
    const [, key, value] = match;
    props[key] = value;
  }

  return props;
}

/**
 * Рендерит компоненты в DOM после загрузки HTML
 * @param {Array} components - Массив компонентов для рендеринга
 * @param {Object} container - Контейнер Vue для рендеринга
 */
export async function renderComponents(components, container) {
  for (const componentInfo of components) {
    try {
      // Импортируем компонент из ~/components/pages/
      const componentModule = await import(`~/components/pages/${componentInfo.name}.vue`);
      const Component = componentModule.default;

      // Находим placeholder в DOM
      const placeholder = container.querySelector(`[data-component-id="${componentInfo.id}"]`);
      if (placeholder) {
        // Создаем Vue компонент и монтируем его
        const app = createApp(Component, componentInfo.props);
        app.mount(placeholder);
      }
    } catch (error) {
      console.error(`Ошибка загрузки компонента ${componentInfo.name}:`, error);
    }
  }
}
