<template>
    <slot v-if="$slots.default" :files="files" />
    <template v-else>
        <div v-if="files.length">
            <div
                class="doc-new-attach"
				:class="[
					'doc-new-attach_' + style,
					'doc-new-attach_' + side,
				]"
                v-for="(file, index) in files"
                :key="file"
            >
                <a
                    :href="file.url || 'javascript:;'"
                    :download="file.url ? file.name : null"
                    class="doc-new"
					:class="['doc-new_' + style]"
                >
                    <svg
                        class="doc-new__icon"
                        :class="[
                            file.ext ? 'doc-new__icon_' + file.ext : '',
                            file.type ? 'doc-new__icon_' + file.type : '',
                        ]"
                        viewbox="0 0 50 50"
                        width="50"
                        height="50"
                    >
                        <use xlink:href="~/assets/images/sprite.svg#doc" />
                        <text x="13" y="33">{{ file.ext }}</text>
                    </svg>
                    <div class="doc-new__body">
                        <div class="doc-new__title">{{ file.name }}</div>
                        <div
                            class="doc-new__download"
                            v-if="file.url"
                            >Скачать</div
                        >
                    </div>
                </a>
                <a
                    href="javascript:;"
                    @click="deleteFile(file)"
                    v-if="!readonly"
                    class="close"
                ></a>
                <div class="progress doc-new-attach__progress" v-if="file.loading">
                    <div
                        class="progress-bar progress-bar-striped progress-bar-animated"
                        :style="{
							// width: file.progress + '%',
							width: '100%',
						}"
                    ></div>
                </div>
            </div>
        </div>
    </template>
</template>

<script>
export default {
    props: {
        filesValue: Array,
        readonly: {
            type: Boolean,
            default: false,
        },
        style: {
            type: String,
            default: "light",
            validator(value, props) {
                return ["light", "dark"].includes(value);
            },
        },
        side: {
            type: String,
            default: "left",
            validator(value, props) {
                return ["left", "right"].includes(value);
            },
        },
    },

    emits: ["update:filesValue"],

    data() {
        return {
            loading: false,
            test: "qwerty",
        };
    },

    mounted() {},

    methods: {
        deleteFile(file) {
            let self = this;
            let index = self.files.indexOf(file);
            if (index !== -1) {
                self.files.splice(index, 1);
                self.files = [...self.files];
            }
        },
    },

    computed: {
        files: {
            get() {
                return this.filesValue ? this.filesValue : [];
            },
            set(value) {
                this.$emit("update:filesValue", value);
            },
        },
    },
};
</script>

<style lang="scss">
/***** doc *****/

.doc-new {
	font-size: 10px;
    display: flex;
    align-items: center;
    color: #000;
    padding: 1rem 2rem 1rem 0;

    &:hover {
        color: #6937a5;
        text-decoration: none;

		.doc__download {
			text-decoration: underline;
		}
    }

    &__body {
    }

    &__title {
		font-size: 1.4em;
        word-break: break-word;
        line-height: 1;
    }

    &__download {
        font-size: 1.2em;
    }

    &__error {
        color: #6937a5;
    }

    &__icon {
        color: #a9abac;
        /* margin-right: 2rem; */
        flex-shrink: 0;
        width: 5rem;
        height: 5rem;
        -ms-flex-item-align: baseline;
        align-self: baseline;

        text {
            font-family: "fira-sans", sans-serif;
            font-weight: 700;
            fill: currentColor;
            font-size: 8px;
            text-transform: uppercase;
        }

        &_image,
        &_png,
        &_jpg,
        &_jpeg,
        &_bmp,
        &_svg {
            color: #6937a5;
        }

        &_doc,
        &_docx,
        &_xml {
            color: #2980b9;
        }

        &_pdf {
            color: #fa8e23;
        }
    }

	&_dark {
		color: #FFF;

		&:hover {
			color: #FFF;
			text-decoration: none;
		}

		.doc-new {
			&__icon {
				color: #FFF;
			}
		}
	}
}

.doc-new-attach {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
	border-top: 0;

	& + & {
		border-top: 1px solid #c4c4c4;
	}

    &_right {
        justify-content: flex-end;

		.doc-new {
			&-title {
				text-align: right;
			}
		}
    }

    &_left {
        justify-content: flex-start;
    }

    .close {
        flex-shrink: 0;
        position: relative;
        width: 2em;
        height: 2em;

        &::before,
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            width: 50%;
            height: 2px;
            background: currentColor;
            transform: rotate(45deg);
        }

        &::before {
            transform: rotate(-45deg);
        }
    }

    &__progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 4px;
    }
}
</style>
