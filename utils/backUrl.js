export default function backUrl(path = '', query = {}) {
    const config = useRuntimeConfig();
    const backUrl = config.public.backUrl;

    let url = `${backUrl}${path}`;
    if (Object.keys(query).length) {
        url += `?${new URLSearchParams(query).toString()}`;
    }
    return url;
}
