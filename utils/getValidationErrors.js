export async function getErrorsList (validate) {
  if(!validate) return
  const result = await validate();
  
  if (!result.valid && result.errors) {
    console.log(result.errors)
    scrollToError(result.errors);
  }
};