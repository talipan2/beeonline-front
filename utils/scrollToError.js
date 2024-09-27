export function scrollToError(errors) {
  console.log(errors)
  const firstErrorField = Object.keys(errors)[0]; 

  if (firstErrorField) {
    const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      errorElement.focus();
    }
  }
}