<template>
	<div
		v-if="dialog"
		class="dialogs-item"
		:class="{
			active: dialog.id == chat_id,
			unreaded: hasUnreadMessages,
			// highlight: hasHighlightOrg,
			// is_pinned: dialog.is_pinned,
		}"
		@click="handleClick(dialog)"
		@contextmenu.prevent.stop="handleContext($event, item)"
	>
		<div class="dialogs-item__unreaded" v-if="hasUnreadMessages"></div>
		<div class="dialogs-item__pinned" v-if="dialog.is_pinned"></div>
		<div class="dialogs-item__highlight" v-if="hasHighlightOrg"></div>
		<div class="dialogs-item__wrap">
			<div class="dialogs-item__image"
				:class="{
				'dialogs-item__image_product': dialog.product,
			}">
				<div class="dialogs-item__image-wrap">
					<div
						class="dialogs-item__image-product"
						v-if="dialog.product"
					>
						<UiImage
							v-if="dialog.product?.first_image?.length"
							:src="dialog.product.first_image"
							:alt="dialog.product.name"
						/>
						<UiImage
							v-else
							src="/assets/svg/default.svg"
							:alt="dialog.product.name"
						/>
					</div>
					<div class="dialogs-item__image-orgs">
						<div class="dialogs-item__image-orgs-wrap"
						:class="['grid-' + ((dialog.organizations.length > 4) ? '4' : dialog.organizations.length)]"
					>
						<template v-for="organization in dialog.organizations">
							<div v-if="organization.id != org_id">
								<UiImage
									v-if="organization.pubcard.logo?.length"
									:src="organization.pubcard.logo"
									:alt="organization.pubcard.name"
								/>
                                <UiImage
                                    v-else
                                    src="/assets/svg/default.svg"
                                    :alt="organization.pubcard.name"
                                />
							</div>
						</template>
					</div>
					</div>
				</div>
			</div>
			<div class="dialogs-item__data">
				<div
					class="dialogs-item__org"
					v-for="organization in dialog.organizations"
				>
					<template v-if="organization.id != org_id">
						<div class="dialogs-item__org-title">
							{{ organization.pubcard.name }} ({{
								getOrgType(organization)
							}})
						</div>
					</template>
				</div>
				<div
					class="dialogs-item__subtitle"
					v-if="dialog.product?.name"
				>
					{{ getProductType(dialog.product) }}:
					{{ dialog.product.name }}
				</div>
				<div
					class="dialogs-item__deal"
					:class="{
						'disabled': dialog.deal?.ended
					}"
					v-if="dialog.deal"
				>
					<span>{{ dialog.deal.status }}</span>
				</div>
				<div class="dialogs-item__info" v-if="dialog.last_message">
					<div class="dialogs-item__message">
						{{ dialog.last_message.text }}
					</div>
					<div
						class="dialogs-item__status"
						:class="{
							// unreaded: dialog.read_message_id < dialog.last_message?.id
						}"
						v-if="dialog.last_message.date"
					>
						{{ lastMessageTimeDiff(dialog.last_message.date) }}
					</div>
				</div>
			</div>
		</div>
	</div>

	<ContextMenu
		:model="contextOptions"
		ref="contextMenu"
	/>
</template>

<script>
import { useChatStore } from "~/store/chatStore";
// import VueSimpleContextMenu from "vue-simple-context-menu";
// import 'vue-simple-context-menu/dist/vue-simple-context-menu.css';

export default {
    props: {
		dialog: {
			type: Object,
			default: null,
		},
        chat_id: {
            type: Number,
            default: null,
        },
    },
    emits: ["change:chat", "change:chat-by-message", "change:pinned"],
    data: () => ({
        org_id: null,
    }),

    mounted() {
        this.org_id = useChatStore().org_id;
    },

	computed: {
		hasUnreadMessages() {
			return this.dialog.read_message_id < this.dialog.last_message_id;
		},
		hasHighlightOrg() {
			let flag = false;
			this.dialog.organizations.forEach(organization => {
				if (organization.id != this.org_id && organization.highlight_response) {
					flag = true;
				}
			});
			return flag;
		},

		contextOptions() {
			let label = "Закрепить чат";
			if (this.dialog.is_pinned) {
				label = "Открепить чат";
			}

			return [
				{
					label: label,
					command: () => {
						useChatStore().setPinned(this.dialog.id, !this.dialog.is_pinned).then(() => {
							this.$emit("change:pinned", !this.dialog.is_pinned);
						});
					},
				},
			];
		}
	},

    methods: {
		handleContext(event) {
			this.$refs.contextMenu.show(event);
		},
		contextOptionClicked(event) {
			window.alert(JSON.stringify(event));
		},
		handleClick(dialog) {
			if (dialog.is_message_search) {
				this.$emit('change:chat-by-message', dialog.last_message);
			} else {
				this.$emit('change:chat', dialog.id);
			}
		},
        lastMessageTimeDiff(date) {
            const now = new Date();
            const diff = now - date;
            const oneDay = 24 * 60 * 60 * 1000; // один день в миллисекундах
            const oneWeek = 7 * oneDay; // одна неделя в миллисекундах
            const oneMonth = 30 * oneDay; // приблизительное количество дней в месяце
            const oneYear = 365 * oneDay; // приблизительное количество дней в году

            // Вычисляем разницу в днях
            const daysDiff = Math.floor(diff / oneDay);

            if (daysDiff === 0) {
                return "Сегодня";
            } else if (daysDiff === 1) {
                return "Вчера";
            } else if (daysDiff < 7) {
                return `${daysDiff} ${this.pluralize(daysDiff, [
                    "день",
                    "дня",
                    "дней",
                ])}`;
            } else if (daysDiff < 30) {
                const weeks = Math.floor(daysDiff / 7);
                return `${weeks} ${this.pluralize(weeks, [
                    "неделя",
                    "недели",
                    "недель",
                ])}`;
            } else if (daysDiff < oneYear) {
                const months = Math.floor(daysDiff / 30);
                return `${months} ${this.pluralize(months, [
                    "месяц",
                    "месяца",
                    "месяцев",
                ])}`;
            } else {
                const years = Math.floor(daysDiff / 365);
                return `${years} ${this.pluralize(years, [
                    "год",
                    "года",
                    "лет",
                ])}`;
            }
        },
        getOrgType(organization) {
            return useChatStore().getOrgType(organization);
        },
        getProductType(product) {
            return useChatStore().getProductType(product);
        },
        pluralize(number, forms) {
            return useChatStore().pluralize(number, forms);
        },
    },
};
</script>

<style lang="scss">
.dialogs {
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

    &-item {
		position: relative;
		z-index: 1;
        display: block;
        padding: 1.2em 2.4em;
        background-color: var(--color-white);
        cursor: pointer;

		&.unreaded {
			background-color: var(--color-gray-300);
		}

		&__unreaded {
			position: absolute;
			z-index: 2;
			top: .8em;
			right: .8em;
			width: 1.2em;
			height: 1.2em;
			background-color: var(--color-purple);
			border-radius: 1em;
			border: 1px solid var(--color-gray-300);
		}

		&__pinned {
			position: absolute;
			z-index: 1;
			right: 1em;
			top: 1em;
			width: 2em;
			height: 2em;

			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='%236937a5'%3E%3Cpath d='m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z'/%3E%3C/svg%3E");
		}

        &:hover {
            background-color: var(--color-gray-100);
        }

		&.active {
			box-shadow: inset 4px 0px 0 0 var(--color-purple);
			background-color: var(--color-gray-200);
		}

		&__highlight {
			position: absolute;
			z-index: -1;
			inset: 0;
			width: 100%;
			height: 100%;
			background: rgba(105,55,165, 0.2);
			// background: linear-gradient(125deg, rgba(105,55,165,0.5) 0%,rgba(105,55,165,0.3) 20%, rgba(105,55,165,0.1) 100%);
		}

        &__wrap {
            display: flex;
            gap: 1.6em;
        }

        &__image {
            width: 4.8em;
            flex: 0 0 4.8em;

			&-wrap {
				position: relative;
			}

			&_product {
				position: relative;

				.dialogs-item__image-orgs {
					position: absolute;
					width: 50%;
					height: 50%;
					padding-top: 0;
					left: 0;
					bottom: 0;
				}
			}

			&-orgs {
				position: relative;
                height: 0;
                padding-top: 100%;
                border-radius: 100%;
                overflow: hidden;
			}

            &-orgs-wrap {
                position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
                background-color: var(--color-gray-300);
                display: grid;

				div {
					position: relative;
					width: 100%;
					height: 100%;

					img {
						position: absolute;
						inset: 0;
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}

                /* Сетка для одного изображения */
                &.grid-1 {
                    grid-template-columns: 1fr;
                    grid-template-rows: 1fr;
                }

                /* Сетка для двух изображений: два столбца */
                &.grid-2 {
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr;
                }

                /* Сетка для трёх изображений: одно сверху, два внизу */
                &.grid-3 {
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;

                    div:nth-child(1) {
                        grid-column: 1 / span 2;
                    }
                }

                /* Сетка для четырёх изображений: четыре части */
                &.grid-4 {
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                }

                /* Скрыть все изображения после 4-го */
                div:nth-child(n + 5) {
                    display: none;
                }
            }
        }

        &__image-product {
            position: relative;
            height: 0;
            padding-top: 100%;
            border-radius: 30%;
            overflow: hidden;
            background-color: var(--color-gray-400);

            img {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__data {
            align-self: center;
			max-width: calc(100% - 6.4em);
        }

        &__org-title {
            font-size: 1.4em;
            line-height: 1.2;
            font-weight: 600;
            color: var(--color-gray-600);
        }

        &__subtitle {
            font-size: 1.3em;
            line-height: 1;
            font-weight: 400;
            margin: 0.2em 0;
            color: var(--color-gray-700);
        }

		&__deal {
			span {
				display: inline-block;
				font-size: 1.2em;
				line-height: 1.2;
				background-color: #6dbf2f;
				color: var(--color-white);
				padding: 0.2em 0.6em;
				border-radius: 2px;
			}

			&.disabled {
				span {
					background-color: var(--color-gray-500);
				}
			}
		}

        &__info {
            display: flex;
            align-items: center;
        }

        &__message {
            font-size: 1.2em;
            line-height: 1.5em;
            height: 1.5em;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            // white-space: nowrap;
            color: var(--color-gray-600);
        }

        &__status {
            position: relative;
            font-size: 1em;
            line-height: 1em;
            color: var(--color-gray-500);
            padding-left: 1.6em;
            white-space: nowrap;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto 0;
                left: 0.6em;
                width: 0.4em;
                height: 0.4em;
                border-radius: 0.4em;
                background-color: var(--color-gray-500);
            }

			// &.unreaded {
			// 	&::before {
			// 		background-color: var(--color-purple);
			// 	}
			// }
		}
    }
}
</style>
