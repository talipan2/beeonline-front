import { useToast } from "vue-toastification";
import { useChannelsStore } from "~/store/channelsStore";
import { useUserStore } from "~/store/userStore";

export const useApi = () => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl;

    const getAuthHeader = () => {
        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token") ||
            null;
        return token ? `Bearer ${token}` : "";
    };

    const getCurrentRole = () => {
        return useUserStore().role;
    };

    const getSocketId = () => {
        return useChannelsStore().socketId || "";
    };

    const handleFetchError = (error: any, form?: any, silent?: boolean) => {
        const errorMessage =
            error?.data?.message ||
            error?.message ||
            "An unknown error occurred";
        if (form && error?.data?.errors) {
            if (Array.isArray(error.data.errors)) {
                if (!silent) {
                    useToast().error(error.data.errors[0]);
                }
            } else {
                if (!silent) {
                    useToast().error("Ошибка при валидации формы");
                }
                // console.log(error.data.errors);
                form.setErrors(error.data.errors);
                for (let key in error.data.errors) {
                    form.setFieldTouched(key, true);
                }
                form.evt.target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } else {
            if (!silent) {
                useToast().error(errorMessage);
            }
        }

        throw {
            message: errorMessage,
            data: error?.data,
        };
    };

    const getHeaders = () => {
        const headers: Record<string, string> = {
            Accept: "application/json",
        };

        const authHeader = getAuthHeader();
        if (authHeader) {
            headers["Authorization"] = authHeader;
        }

        const socketId = getSocketId()?.toString() ?? "";
        if (socketId) {
            headers["X-Socket-ID"] = socketId;
        }

        const role = getCurrentRole() ?? "";
        if (role) {
            headers["X-Role"] = role;
        }

        return headers;
    };

    const request = async (
        endpoint: string,
        method: string,
        body?: any,
        params?: any,
        form?: any,
        silent: boolean = false,
        isBlob: boolean = false
    ) => {
        // if (form) {
        //     if (form.controlledValues?.isLoading) {
        //         throw new Error("Form is already loading");
        //     }
        //     form.setFieldValue('isLoading', true);
        // }
        try {

            endpoint = endpoint.startsWith("/")
                ? endpoint.substring(1)
                : endpoint;
            const response = await useFetch(`${baseUrl}/${endpoint}`, {
                method,
                headers: getHeaders(),
                body: body ? JSON.stringify(body) : undefined,
                params,
                baseURL: baseUrl,
                server: false,
                responseType: isBlob ? "blob" : "json",
            });

            if (form) {
                form.resetField('isLoading');
            }

            if (response.error.value) {
                throw response.error.value;
            }

            if (isBlob) {
                return response.data.value;
            }

            const result = response.data.value;
            return result;
        } catch (error) {
            handleFetchError(error, form, silent);
        } finally {
            // if (form) {
            //     form.setFieldValue('isLoading', false);
            // }
        }
    };

    const get = (
        endpoint: string,
        params?: any,
        form?: any,
        silent: boolean = false,
        isBlob: boolean = false
    ) => request(endpoint, "GET", undefined, params, form, silent, isBlob);
    const post = (
        endpoint: string,
        body?: any,
        form?: any,
        silent: boolean = false
    ) => request(endpoint, "POST", body, undefined, form, silent);
    const put = (
        endpoint: string,
        body?: any,
        form?: any,
        silent: boolean = false
    ) => request(endpoint, "PUT", body, undefined, form, silent);
    const del = (
        endpoint: string,
        body?: any,
        form?: any,
        silent: boolean = false
    ) => request(endpoint, "DELETE", body, undefined, form, silent);
    const patch = (
        endpoint: string,
        body?: any,
        form?: any,
        silent: boolean = false
    ) => request(endpoint, "PATCH", body, undefined, form, silent);

    return { get, post, put, del, patch };
};
