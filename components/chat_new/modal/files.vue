<template>
    <Modal
        v-model="open"
        title="Отправить файл"
        :click-to-close="false"
        @beforeOpen="beforeOpen"
        @beforeClose="beforeClose"
    >
        <template #content>
            <file-drop
                ref="fileDrop"
                class-name="file-drop-chat"
                v-model:files-value="files"
                @update:files-value="loadFile"
                :hidden="true"
                :preload="false"
                :link="link"
            >
                <template #content>
                    <file-list-new v-model:files-value="files" />

                    <div class="my-15"></div>
                    <div class="form-group">
                        <label>Подпись</label>
                        <input
							placeholder="Подпись"
                            type="text"
                            class="form-control"
                            name="message"
							v-model="message"
                        />
                    </div>
                </template>
            </file-drop>
        </template>
        <template #footer>
            <div class="d-flex">
                <a
                    href="javascript:;"
                    @click="$refs.fileDrop.addFile"
                    class="btn btn-primary mr-auto"
                    >Добавить
                </a>
                <a
                    href="javascript:;"
                    @click="files = []"
                    class="btn btn-outline-primary ml-auto"
                    >Отмена
                </a>
                <a
                    href="javascript:;"
                    @click="$emit('submit', message)"
                    class="btn btn-primary ml-15"
                    >Отправить
                </a>
            </div>
        </template>
    </Modal>
</template>

<script>
import FileDrop from "~/components/file/drop.vue";
import FileListNew from "~/components/file/list-new.vue";

export default {
    components: {
        FileDrop,
        FileListNew,
    },

    emits: ["update:openValue", "update:filesValue", "modal:open"],

    props: {
        openValue: Boolean,
        filesValue: Boolean,
        messageValue: String,
        link: String,
    },

    data: () => ({
        message: "",
    }),

    mounted() {
        // this.message = this.messageValue;
    },

    methods: {
        beforeOpen(e) {
            this.message = this.messageValue;
            this.$emit("modal:open");
        },
        beforeClose(e) {
            if (this.files.length) {
                this.files = [];
            }
            this.$emit("modal:close", this.message);
        },
    },

    computed: {
        open: {
            get: function () {
                return this.openValue;
            },
            set: function (newValue) {
                this.$emit("update:openValue", newValue);
            },
        },
        files: {
            get: function () {
                return this.filesValue;
            },
            set: function (newValue) {
                this.$emit("update:filesValue", newValue);
            },
        },
    },
};
</script>

<style lang="scss"></style>
