export default defineNuxtRouteMiddleware((to) => {
  // Если пользователь пытается открыть /page-contacts, редиректим на /contacts
  if (to.path === '/page-contacts') {
    return navigateTo('/contacts', { replace: true })
  }
})
