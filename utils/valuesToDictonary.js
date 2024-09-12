export const mapValuesToDictionary = (data, dictionaries, getDictionaryKey) => {
  return data.map((item) => {
    const dictionaryKey = getDictionaryKey(item.name);
    const dictionary = dictionaries[dictionaryKey];

    if (Array.isArray(item.value) && dictionary) {
      return {
        ...item,
        value: item.value.map((id) => {
          const foundItem = dictionary.find((entry) => entry.id === id);
          return foundItem?.label || 'Неизвестное значение';
        }),
      };
    } else if (item.value && dictionary) {
      const foundItem = dictionary.find((entry) => entry.id == item.value);
      return {...item, value: foundItem?.label || 'Неизвестное значение'};
    }
    else {
      return item;
    }
  });
};