import axios from "axios";

export default {
  async setOrganization(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(data) {
          resolve({
            data: {
              message: 'компания успешно создана',
              data: { id: Math.random().toString(36).substr(2, 9), 
                id: null,
                is_active: false,
                name: null,
                user_id: null,
                phone: null,
                email: null,
                org_form: 1,
                inn: null,
                kpp: null,
                ogrn: null,
                legal_address: null,
                url_site: null,
                is_foreigner: false,
                country_id: null,
                currency_id: null,
                rating_value: null,
                reviews_count: null,
                blocked_till: null,
                block_reason: null,
                addr_lat: null,
                addr_lng: null,
                can_edit: false,
                last_active_at: null,
                verified_at: null,
                balance: 0,
                created_at: null,
                updated_at: null,
              }
            }
          })
        } else {
          reject({
            response: {
              data: {
                message: 'Произошла ошибка при авторизации!'
              }
            }
          })
        }
      }, 1000);
    })
  }
}