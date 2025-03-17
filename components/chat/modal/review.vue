<template>
    <UiModal v-model="opened" @confirm="() => confirm()" class="modal">
        <template #content>
      <div class="review-modal__wrapper">
        <div class="review-modal__header">
          <h2 class="review-modal__title">Оставить отзыв</h2>
        </div>
        <div class="review-modal__content">
          <UiForm class="review-modal__form" :submit="submit">
            <div class="form-group">
              <label class="form-group-data form-group__title"> 
                Выберите оценку 
                <CommonRating class="review-modal__rating"
                  :isSelected="true" 
                  :isCountRating="false" 
                  :isReviewText="false" 
                  :isCountReviews="false"
                  v-model="rate"
                />
              </label>
            </div>
            <div class="form-group">
              <label class="form-group-data form-group__title"> 
                Плюсы сотрудничества:
                <UiTextArea
                  class="form-group__value review-modal__textarea"
                  type="text"
                  label="Плюсы сотрудничества"
                  name="positive"
                  :rules="{required: true}"
                  v-model="positive"
                />
              </label>
            </div>
            <div class="form-group">
              <label class="form-group-data form-group__title"> 
                Минусы сотрудничества:
                <UiTextArea
                  class="form-group__value review-modal__textarea"
                  type="text"
                  label="Минусы сотрудничества"
                  name="negative"
                  :rules="{ required: true }"
                  v-model="negative"
                />
              </label>
            </div>
            <file-drop
                v-model:files-value="files"
                @fileLoaded="fileLoaded"
                :hidden="false"
                :preload="true"
                :link="`/api/chat/file`"
            ></file-drop>

            <file-list-new v-model:files-value="files" />
            <UiButton class="review-modal__btn" type="submit" variant="quinary" size="large">Отправить</UiButton>
          </UiForm>
        </div>
      </div>
    </template>
    </UiModal>
</template>

<script>
import ChatModalReviewRate from "./review-rate.vue";
import FileDrop from "~/components/file/drop.vue";
import FileListNew from "~/components/file/list-new.vue";
import { useChatStore } from "~/store/chatStore";
import { useReviewsStore } from "~/store/reviewsStore";
import { useToast } from "vue-toastification";

export default {
  components: {
    ChatModalReviewRate,
    FileDrop,
    FileListNew,
  },

  emits: [],

  props: {},

  data: () => ({
    message: "",
    opened: false,
    loading: false,
    files: [],
    rate: 0,
    positive: "",
    negative: "",
    chat_id: null,
    org_id: null,
    ownerRole: null,
    ownerOrgId: null,
    ownerUserid: null,
  }),

  mounted() {
    // this.fileLoad = this.$refs.fileLoad;
  },

  methods: {
    reset() {
      this.rate = 0;
      this.positive = "";
      this.negative = "";
      this.files = [];
    },
    fileLoaded(file) {
      console.log(file)
      let index = this.files.indexOf(file);
      if (index !== -1) {
        this.files.splice(index, 1);
        this.files = [...this.files];
      }
      console.log(this.files)
    },
    removeFile(file) {
      let index = this.files.indexOf(file);
      if (index !== -1) {
        this.files.splice(index, 1);
        this.files = [...this.files];
      }
    },

    open(orgId, role, chat, org) {
      if(orgId) {
        this.ownerOrgId = orgId;
      }

      if(role) {
        this.ownerRole = role;
      }

      if (chat) {
        this.chat_id = chat.id;
        this.ownerUserid = chat.user_id;
      }

      if (org) {
        this.org_id = org.id;
        this.role = org.pivot?.role;
      }
      this.opened = true;
    },
    close() {
      this.opened = false;
    },
    submit(values, form) {
      console.log(this.role, this.org_id)
      useReviewsStore().createReview({
        user_id: this.ownerUserid,
        owner_org_id: this.ownerOrgId,
        owner_org_type: this.ownerRole,
        about_org_id: this.org_id,
        about_org_type: this.role,
        text_positive: values.positive,
        text_negative: values.negative,
        rate: this.rate
      }, form)
        .then((data) => {
          console.log(data);
          let media_ids = [];
          this.files.forEach(file => {
            if(file.id) {
              media_ids.push(file.id);
            }
          })
          if(media_ids.length) {
            useReviewsStore().addReviewFiles(data.id, {media_ids});
          }
          useToast().success('Отзыв успешно отправлен');
          this.close();
          this.reset();
        })
    },
  },
};
</script>

<style lang="scss">

.review-modal {
  font-size: 1rem;
  
  .modal-content {
    width: 28vw;
  }

  &__header, &__content {
    padding: 2em;
  }

  &__header {
    background-color: var(--bg-tertiary-color);
    padding-bottom: 1em;
  }

  &__title {
    font-size: 1.8em;
  }

  &__rating {
    margin-top: .5em;

    .rate {
      font-size: 20px;
    }

    .rate__choice {
      font-size: 13px;
    }
  }

  .form-group__title {
    color: var(--text-color-secondary);
  }

  &__file-load {
    height: 15em;
    position: relative;
    margin-block: 1em;
  }

  &__textarea {
    .text-area__container {
      padding-bottom: 18%;
    }
  }

  &__btn {
    font-size: 1.2em;
    margin-inline: auto;
    width: 50%;
    text-transform: uppercase;
    font-weight: 400;
  }
}

</style>
