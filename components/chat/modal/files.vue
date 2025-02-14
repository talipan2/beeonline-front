<template>
    <UiModal
        class="modal"
        v-model="open"
        title="Отправить файл"
        :click-to-close="false"
        @beforeOpen="beforeOpen"
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
                        <label class="form-group-data form-group__title">
                            Подпись
                            <UiInput
                                name="message"
                                label="Подпись"
                                class="form-group__value"
                                type="text"
                                placeholder="Подпись"
                                v-model="message"
                            />
                        </label>
                    </div>
                </template>
            </file-drop>
        </template>
        <template #footer>
            <div class="chat-modal-files-buttons">
                <div class="chat-modal-files-buttons-col">
                    <UiButton type="button" @click="addFile" variant="primary">Добавить</UiButton>
                </div>
                <div class="chat-modal-files-buttons-col">
                    <UiButton type="button" @click="files = []" variant="tertiary">Отмена</UiButton>
                    <UiButton type="button" @click="$emit('submit', message)" variant="primary">Отправить</UiButton>
                </div>
            </div>
        </template>
    </UiModal>
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
        addFile() {
            return this.$refs.fileDrop.addFile;
        },
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
                if (!newValue) {
                    this.beforeClose();
                }
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

<style lang="scss">
.chat-modal-files-buttons {
    display: flex;
    gap: 15px;
    justify-content: space-between;
}

.chat-modal-files-buttons-col {
    display: flex;
    gap: 15px;
}
</style>
