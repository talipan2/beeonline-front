<template>
    <div class="file-drop-neo" :class="class">
        <input
            type="file"
            class="file-drop-neo-input"
            :multiple="multiple"
            @change="change"
            ref="input"
        />
        <div
            class="file-drop-neo-drop"
            :class="[
                {
                    'file-drop-neo-highlight': highlight,
                },
                className,
            ]"
            ref="drop"
        >
            <slot name="content" />
            <slot
                name="wrap"
                v-if="$slots.default"
                :limit="limit"
                :multiple="multiple"
                :change="change"
                :description="description"
                :max-size="maxSize"
                :accept_ext_arr="accept_ext_arr"
                :highlight="highlight"
            />
            <template v-else>
                <div
                    class="file-drop-neo-wrap"
                    v-if="limit && (!hidden || (hidden && highlight))"
                    :class="{
                        'file-drop-neo-wrap-hidden': hidden,
                    }"
                >
                    <i class="file-drop-neo-icon icon-file-drop-neo"></i>
                    <div class="file-drop-neo-text">{{ description }}</div>
                    <div class="file-drop-neo-text">
						<div>{{ maxSizeMessage }}</div>
						<div>{{ allowedExtensionsMessage }}</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";
export default {
    props: {
        preload: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
        max_count: {
            type: Number,
            default: 0,
        },
        accept_ext: {
            type: String,
            default: "jpg,jpeg,png,bmp,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,rar,7z",
        },
        max_size: {
            type: Number,
            default: 2048,
        },
        description: {
            type: String,
            default: "Перетащите документ сюда или нажмите, чтобы загрузить.",
        },
        link: String,

        class: String,
        className: String,

        type: String,
        attachable_type: String,
        attachable_id: Number,

        drop: Object,

        filesValue: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },

    emits: ["addFile", "update:filesValue"],

    data() {
        return {
            loading: false,
            addedFiles: [],
            addedFilesCount: 0,
            preparedFiles: [],

            accept_ext_arr: this.accept_ext.split(","),
            highlight: false,
            dragCounter: 0,
        };
    },

    mounted() {
        let drop = this.$refs.drop;
        drop.addEventListener("click", (event) => {
            if (!this.hidden) {
                event.preventDefault();
                this.$refs.input.click();
                console.log(this.$refs.input);
                return false;
            }
        });

        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            drop.addEventListener(eventName, this.preventDefaults);
        });

        [
            "dragenter",
            // "dragover",
        ].forEach((eventName) => {
            drop.addEventListener(eventName, this.highlightHandler);
        });

        ["dragleave", "drop"].forEach((eventName) => {
            drop.addEventListener(eventName, this.unhighlightHandler);
        });

        drop.addEventListener("drop", this.dropHandler);
    },

    methods: {
        addFiles: function (files) {
            if (this.loading) return;
            if (!files.length) return;

            this.loading = true;
            this.preparedFiles = [];
            this.addedFiles = files;
            this.addedFilesCount = 0;
            this.addFile(0);
        },

        addFile: function (index) {
            let reader = new FileReader(),
                error = false,
                file = this.addedFiles[index];

            if (!file) {
                console.log(file, index);
                this.uploadEnd();
                return;
            }

            let ext = file.name.split(".").pop().toLowerCase();

            if (this.max_count) {
                if (
                    this.files.length + this.addedFilesCount >=
                    this.max_count
                ) {
					showMessage("Максимальное количество файлов: " + this.max_count);
                    // useToast().error(
                    //     "Максимальное количество файлов: " + this.max_count
                    // );
                    this.addFile(this.addedFiles.length);
                    return;
                }
            }

            if (Math.ceil(file.size / 1024) > this.max_size) {
                error =
                    'Размер файла "' +
                    file.name +
                    '" должен быть не более ' +
                    this.max_size +
                    " Кб.";
            }

            if (this.accept_ext_arr.indexOf(ext) < 0) {
                error =
                    'Файл "' +
                    file.name +
                    '" должен быть файлом типа: ' +
                    this.accept_ext_arr.join(", ") +
                    ".";
            }

            if (error) {
				showMessage(error);
                // useToast().error(error);
                this.addFile(index + 1);
                return;
            }

            this.addedFilesCount++;
            reader.onload = (e) => {
                this.onLoad(e, file);
                this.addFile(index + 1);
            };

            reader.readAsDataURL(file);
        },

        uploadEnd: function () {
            this.files = this.files.concat(this.preparedFiles);
			if (this.preload) {
				this.preparedFiles.forEach((file) => {
					this.sendFile(file);
				});
			}
            this.addedFiles = [];
            this.preparedFiles = [];
            this.loading = false;
        },

        sendFile(new_file, callback = null) {
            let formData = new FormData();
            formData.append("file", new_file.file);

            let uniqueId = new_file.uid;


            // let request = this.makeRequest(formData)
            let request = useSettingStore().uploadFiles(useUserStore().userData.id, formData)
			.then((result) => {
				console.log(uniqueId, this.files);
                let fileIndex = this.files.findIndex((f) => f.uid === uniqueId);
				console.log(fileIndex);
				if (fileIndex === -1) return;

				if (!result) {
					this.files.splice(fileIndex, 1);
					this.files = [...this.files];
					return;
				}

				let file = this.files[fileIndex];
				file.id = result.id;
				file.url = result.url;
				file.loaded = true;
				file.loading = false;
				file.delete = this.delete;
				file.request = null;

				this.$emit("update:filesValue", this.files);

				if (typeof callback === "function") {
					callback();
				}
            });
            new_file.request = request;
        },

        onLoad: function (e, file) {
            let new_file = null;

            var blob = new Blob([file], { type: file.type });
            var blobUrl = URL.createObjectURL(blob);

            const uniqueId = Date.now() + Math.random();

            new_file = {
                uid: uniqueId,
                id: null,
                file: file,
                name: file.name,
                ext: file.name.split(".").pop(),
                loading: this.preload,
                loaded: !this.preload,
                request: null,
                delete: this.cancel,
                url: blobUrl,
                thumb: blobUrl,
            };

            this.preparedFiles.push(new_file);

            return;
        },

        change: function (e) {
            this.addFiles(Array.from(e.target.files));
            e.target.value = "";
        },

        cancel: function (file) {
            let self = this;
            console.log(self.files.indexOf(file));
            URL.revokeObjectURL(file.thumb);
            if (file.request && file.loading) {
                file.request.cancel();
                let index = self.files.indexOf(file);
                if (index !== -1) {
                    self.files.splice(index, 1);
                }
            }
        },

        delete: function (file) {
            let self = this;
            console.log(self.files.indexOf(file));
            if (file.loaded) {
                file.delete = true;
                let index = self.files.indexOf(file);
                if (index !== -1) {
                    self.files.splice(index, 1);
                }
            }
        },

        preventDefaults: function (e) {
            e.preventDefault();
            e.stopPropagation();
        },

        highlightHandler: function (e) {
			if (this.max_count < 0) return;
            this.dragCounter++;
            // console.log(this.dragCounter);
            this.highlight = true;
        },

        unhighlightHandler: function (e) {
            this.dragCounter--;
            if (this.dragCounter < 1) {
				this.dragCounter = 0;
                this.highlight = false;
            }
        },

        dropHandler: function (e) {
            this.dragCounter = 0;
            let dt = e.dataTransfer;
            let files = [];

            if (dt.items) {
                [...dt.items].forEach((item, i) => {
                    if (item.kind === "file") {
                        let file = item.getAsFile();
                        files.push(file);
                    }
                });
            } else {
                [...dt.files].forEach((file, i) => {
                    files.push(file);
                });
            }

            this.addFiles(files);
        },
    },

    computed: {
        limit() {
            if (!this.max_count) return true;
            if (this.max_count > this.files.length) return true;
            return false;
        },
        maxSize() {
            if (this.max_size > 1024) {
                return parseFloat((this.max_size / 1024).toFixed(1)) + " Мб";
            } else {
                return this.max_size + " Кб";
            }
        },
		maxSizeMessage() {
			return "Максимальный размер файла: " + this.maxSize;
		},
		allowedExtensionsMessage() {
			return "Допустимые расширения: " + this.accept_ext_arr.join(", ");
		},
        files: {
            get() {
                return this.filesValue || [];
            },
            set(value) {
                console.log("set files", value);
                this.$emit("update:filesValue", value);
            },
        },
    },
};
</script>

<style lang="scss">
.file-drop-neo-new {
    display: flex;
    align-items: center;
    color: #716568;

    &::before,
    &::after {
        content: "";
        display: block;
        flex-grow: 1;
        height: 1px;
        background: #716568;
    }

    span {
        margin: 0 10px;
    }
}

.file-drop-neo {
    display: block;
    position: relative;

    &-pointer {
        &-highlight {
            // pointer-events: none;
        }
    }

    &-drop {
        position: relative;
    }

    &-wrap {
        position: relative;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #f0f4fb;
        color: #716568;
        border: 1px solid #a29699;
        padding: 2em;
        line-height: 1.5;
        text-align: center;
        cursor: pointer;
        margin: 1em 0;
        min-height: 15em;

        &-hidden {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            min-height: 100%;
            margin: 0;
			z-index: 999;
        }
    }

    &-input {
        position: absolute;
        z-index: -1;
        pointer-events: none;
        width: 0;
        height: 0;
    }

    &-text {
        display: block;
        font-size: 1.4em;
    }

    &-icon {
        display: block;
        font-size: 2.4em;
        line-height: 1;
        transition: color 0.3s ease-in-out;
    }

    &-highlight {
        .file-drop-neo {
            &-wrap {
                border-style: dashed;
            }
            &-icon {
                color: #6937a5;
                animation: 0.3s infinite alternate drop;
            }
        }
    }
}

@keyframes drop {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(10%);
    }
}
</style>
