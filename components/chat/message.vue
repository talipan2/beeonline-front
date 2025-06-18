<template>
    <div class="message" :class="messageClass" ref="message"
		:translate="needTranslate ? 'yes' : 'no'"
        lang="auto"
	>
        <div class="message__left">
            <div
                class="message__status"
                :class="{
                    message__status_error: message.error,
                    message__status_sent: message.is_sent,
                    message__status_readed: message.readed,
                    message__status_not_own: !message.own,
                }"
            ></div>
        </div>
        <div class="message__body">
			<div class="message__title" v-if="isFirst && message.type != 'system' && message.user?.name">
				{{ message.user.name }}
			</div>
            <div class="message__text">
                <div>{{ message.text }}</div>
                <template v-if="false && hasTranslate">
                    {{ needTranslate ? 'Перевод' : 'Оригинал' }}
                    {{ withoutTranslate ? '1' : '0' }}
                    <a href="javascript:;" @click="withoutTranslate = !withoutTranslate">Переключить</a>
                </template>
            </div>
			<div class="message__buttons" v-if="message?.buttons?.length">
				<template v-for="button in message.buttons">
                    <UiButton class="message__button" :variant="message.own ? 'primary' : 'secondary'" size="large" target="_blank" :to="button.url">{{ button.title }}</UiButton>
				</template>
			</div>
            <file-list-new
                v-model:files-value="message.files"
                v-if="message.files"
                :readonly="true"
                :style="message.own ? 'dark' : 'light'"
            />
        </div>
        <div class="message__right">
            <div class="message__time">{{ time }}</div>
        </div>

        <transition @after-enter="scrollToAnimate = false" name="msg-fade">
            <div v-if="scrollToAnimate" class="message__scrollto"></div>
        </transition>
    </div>
</template>

<script>
import { useTranslateStore } from '~/store/translateStore';
// import FileListNew from "@/chat/components/file/list-new.vue";

export default {
	components: {
		// FileListNew
	},
    props: {
        prev: {
            type: Object,
            default: null,
        },
        message: {
            type: Object,
            required: true,
        },
        next: {
            type: Object,
            default: null,
        },
        small: {
            type: Boolean,
            default: false,
        },
		translate: {
			type: Boolean,
			default: false
		}
    },
    emits: ["change:chat"],
    data: () => ({
        scrollToAnimate: false,
        withoutTranslate: false,
    }),

    mounted() {
        if (this.message.scrollTo) {
            this.$nextTick(() => {
                this.$refs.message.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

                this.scrollToAnimate = true;
                delete this.message.scrollTo;
            });
        }
    },

    methods: {},

    watch: {},

    computed: {
        hasTranslate() {
            if (!this.translate) return false;
			if (this.message.type == 'system' && this.message.own == true) return true;
			if (this.message.own) return false;
			return useTranslateStore().googleTranslateInitEnded;
        },
		needTranslate() {
            if (this.withoutTranslate) return false;
            return this.hasTranslate;
		},
        time() {
            return this.message.date.toLocaleTimeString(navigator.language, {
                timeStyle: "short",
            });
        },
		isFirst() {
			let is_first = true;
			if (this.prev) {
            	if (this.prev.organization_id == this.message.organization_id) {
            		if (Math.abs(this.prev.date.getTime() - this.message.date.getTime()) < 120000) {
            			is_first = false;
            		}
            	}
            }
			return is_first;
		},
        messageClass() {
            let messageClass = [];
            let is_last = true;
            let is_system = false;

            if (this.next) {
            	if (this.next.organization_id == this.message.organization_id) {
            		if (Math.abs(this.next.date.getTime() - this.message.date.getTime()) < 120000) {
            			is_last = false;
            		}
            	}
            }

            if (this.message.type === "system") {
                is_system = true;
            }

            if (this.isFirst) {
                messageClass.push("first");
            }
            if (is_last) {
                messageClass.push("last");
            }
            if (is_system) {
                messageClass.push("system");
            }
            if (this.message.side) {
                messageClass.push(this.message.side);
            }
            if (this.message.own) {
                messageClass.push("own");
            }

            if (this.small) {
                messageClass.push("message_small");
            }

            return messageClass.join(" ");
        },
    },
};
</script>

<style lang="scss">
.msg-fade-enter-active,
.msg-fade-leave-active {
    transition: opacity 1s;
}
.msg-fade-enter,
.msg-fade-leave-to {
    opacity: 0;
}

.message {
    --color-white: #fff;
    --color-black: #000000;
    --color-border-gray: #c4c4c4;
    --color-purple: #6937a5;
    --color-blue-100: #60a5fa;
    --color-blue-200: #3897f0;
    --color-gray-100: #f1f5f9;
    --color-gray-200: #f0f4fb;
    --color-gray-300: #e2e8f0;
    --color-gray-400: #cbd5e1;
    --color-gray-500: #94a3b8;
    --color-gray-600: #64748b;
    --color-gray-700: #475569;

    --font-size-12: 1.2em;
    --font-size-14: 1.4em;

	position: relative;
	z-index: 1;
    font-size: 10px;
    display: flex;
    padding: 0.3em 2.4em;

    &__scrollto {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
        background-color: var(--color-gray-400);
		pointer-events: none;
		z-index: -1;
    }

    &__left {
        flex: 0 0 3.2em;
        margin-right: 1.2em;
        display: flex;
        align-items: flex-end;
    }

    &__status {
        font-size: 2em;
        width: 1em;
        height: 1em;
        margin-left: 0.5em;
        background: no-repeat 0 / cover url("/assets/svg/msg-status.svg");

        &_error {
            background-position-x: -1em;
        }

        &_sent {
            background-position-x: -2em;
        }

        &_readed {
            background-position-x: -3em;
        }

		&_not_own {
			background-position-x: -4em;
			&.message__status_readed {
				background-position-x: -5em;
			}
		}
    }

    &__body {
		display: flex;
		flex-direction: column;
		gap: 1em;
        padding: 1.4em 1.6em;
        flex: 0 1 auto;
        max-width: 100%;
        max-width: 40em;
        color: var(--color-gray-600);
        background-color: var(--color-white);
        border-radius: 4px 8px 8px 4px;
    }

	&__title {
		font-size: var(--font-size-14);
		// margin-bottom: .5em;
		font-weight: bold;
	}

    &__text {
        font-size: var(--font-size-14);
        white-space: pre-line;
    }

	&__buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	&__button {
        font-size: var(--font-size-14);
	}

    &__right {
        flex: 0 0 auto;
        display: flex;
        align-items: flex-end;
    }

    &__time {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
        font-size: var(--font-size-12);
        color: var(--color-gray-600);
        margin: 0 0.5em;
    }

    &.own {
        .message {
            &__body {
                border-radius: 8px 4px 4px 8px;
                color: var(--color-white);
                background-color: var(--color-purple);
            }
        }
    }

    &.first {
        padding-top: 2em;

        .message {
            &__body {
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
        }
    }

    &.last {
        padding-bottom: 2em;

        .message {
            &__body {
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        }
    }

    &.system {
        .message {
            &__left,
            &__right {
                display: none;
            }

            &__body {
                margin-left: auto;
                margin-right: auto;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }

			&__buttons {
				justify-content: center;
			}
        }
    }

    &.right {
        flex-direction: row-reverse;
    }

    &:hover {
        .message {
            &__time {
                opacity: 1;
            }
        }
    }

    &_small {
        font-size: 6px;
        --font-size-12: 11px;
        --font-size-14: 13px;
    }
}
</style>
