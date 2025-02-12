<template>
    <Modal v-model="opened" title="Оставить отзыв" @beforeClose="close">
        <template #content>
            <form class="" @submit="submit" novalidate ref="form">
                <div class="form-group mb-15">
                    <label>Выберите оценку</label>
                    <chat-modal-review-rate @change="rate = $event" />
                </div>
                <div class="form-group mb-15">
                    <label>Плюсы сотрудничества:</label>
                    <textarea
                        name="positive"
                        rows="5"
                        class="form-control"
                        required
                        v-model="positive"
                    ></textarea>
                    <div class="invalid-feedback">Введите плюсы</div>
                </div>
                <div class="form-group mb-15">
                    <label>Минусы сотрудничества:</label>
                    <textarea
                        name="negative"
                        rows="5"
                        class="form-control"
                        required
                        v-model="negative"
                    ></textarea>
                    <div class="invalid-feedback">Введите минусы</div>
                </div>

                <file-drop
                    v-model:files-value="files"
                    @fileLoaded="fileLoaded"
                    :hidden="false"
                    :preload="true"
                    :link="`/api/chat/file`"
                ></file-drop>

				<file-list-new v-model:files-value="files" />

                <div class="row">
                    <div class="col-6 mx-auto">
                        <button class="btn btn-block btn-primary" type="submit">
                            Отправить
                        </button>
                    </div>
                </div>
            </form>
        </template>
    </Modal>
</template>

<script>
import ChatModalReviewRate from "./review-rate.vue";
import FileDrop from "~/components/file/drop.vue";
import FileListNew from "~/components/file/list-new.vue";
import { useChatStore } from "~/store/chatStore";

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
		role: null,
    }),

    mounted() {},

    methods: {
		reset() {
			this.rate = 0;
			this.positive = "";
			this.negative = "";
			this.files = [];
		},
		fileLoaded(file) {
			let index = this.files.indexOf(file);
			if (index !== -1) {
				this.files.splice(index, 1);
				this.files = [...this.files];
			}
		},
        open(chat, org) {
			if (chat) {
				this.chat_id = chat.id;
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
        submit(e) {
            let form = this.$refs.form;

            e.preventDefault();
            e.stopPropagation();
            form.classList.add("was-validated");

            if (form.checkValidity() === false) {
                return false;
            }

			if (this.loading) {
				return false;
			}
			this.loading = true;

			useChatStore()
				.sendReview(this.chat_id, {
					rate: this.rate,
					positive: this.positive,
					negative: this.negative,
					files: this.files,
					org_id: this.org_id,
					role: this.role,
				})
				.then((response) => {
					if (response) {
						this.reset();
						this.close();
					}
				})
				.finally(() => {
                    this.loading = false;
                });

            return false;
        },
    },
};
</script>

<style lang="scss"></style>
