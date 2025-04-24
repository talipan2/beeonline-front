<template>
    <file-drop
        ref="fileDrop"
        class="chat-filedrop"
        :class-name="className"
        v-model:files-value="files"
        @update:files-value="loadFile"
        :hidden="true"
        :max_count="chat ? 5 : -1"
        :preload="false"
        :link="`/api/chat/file`"
    >
        <template #content>
            <div
                class="dialog__top"
                v-if="!onlyBody"
            >
                <div class="dialog__close">
                    <a
                        href="javascript:;"
                        @click="$emit('close')"
                    >
                        <i class="icon-arrow"></i>
                    </a>
                </div>
                <div class="dialog__orgs">
                    <template v-if="chat">
                        <template v-for="org in chat.organizations">
                            <div
                                class="dialog-head"
                                v-if="org.id != org_id"
                            >
                                <div class="dialog-head__img">
                                    <UiImage
                                        v-if="org.pubcard?.logo?.length"
                                        :src="org.pubcard.logo"
                                        :alt="org.pubcard.name"
                                        :external="true"
                                    />
                                    <UiImage
                                        v-else
                                        src="/assets/images/default.svg"
                                        :alt="org.pubcard?.name"
                                    />
                                </div>
                                <div class="dialog-head__info">
                                    <a
                                        :href="`/members/${org.pubcard?.id}/${org.pivot.role}`"
                                        target="_blank"
                                        class="dialog-head__info-title"
                                    >
                                        {{ org.pubcard?.name }}
                                    </a>
                                    <div class="dialog-head__info-status">
                                        {{ orgOnline(org) }}
                                    </div>
                                </div>
                                <div
                                    class="dialog-head__buttons"
                                    v-if="chat?.id"
                                >
                                    <UiButton
                                        v-if="chat.deal"
                                        :href="`/deals/${chat.deal.id}`"
                                        class="dialog-head__btn dialog-head__btn_type_colored"
                                        variant="tertiary"
                                        size="around"
                                        target="_blank"
                                    >
                                        Открыть сделку
                                    </UiButton>
                                    <UiButton
                                        class="dialog-head__btn dialog-head__btn_type_colored"
                                        type="button"
                                        @click="selectPerformer(org)"
                                        variant="tertiary"
                                        size="large"
                                        target="_blank"
                                        v-if="org.pivot.role === 'performer' && chat.order && !chat.deal && !chat.order.selected_performer_id"
                                    >
                                        Выбрать исполнителя
                                    </UiButton>
                                    <UiButton
                                        class="dialog-head__btn dialog-head__btn_type_colored"
                                        type="button"
                                        @click="unselectPerformer(org)"
                                        variant="tertiary"
                                        size="large"
                                        target="_blank"
                                        v-if="chat.order?.selected_performer_id === org.id"
                                    >
                                        Отменить выбор
                                    </UiButton>
                                    <UiButton
                                        class="dialog-head__btn"
                                        type="button"
                                        @click="setPinned"
                                        :variant="
                                            chat.is_pinned
                                                ? `primary`
                                                : `tertiary`
                                        "
                                        size="around"
                                        target="_blank"
                                        :without-padding="true"
                                    >
                                        <SvgoPin
                                            class="svg-l"
                                            fill="currentColor"
                                        />
                                    </UiButton>
                                </div>
                                <UiNewDropdown
                                    placement="bottom-end"
                                    :arrow="false"
                                    v-if="chat?.id"
                                >
                                    <UiButton
                                        class="dialog-head__btn"
                                        variant="tertiary"
                                        size="around"
                                        :without-padding="true"
                                    >
                                        <SvgoDots
                                            class="svg-m"
                                            fill="#6937a5"
                                        />
                                    </UiButton>
                                    <template #content>
                                        <div class="dialog-head__dropdown-menu">
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                v-if="chat.deal"
                                                :to="`/deals/${chat.deal.id}`"
                                                >Открыть сделку</UiButton
                                            >
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                @click="openReviewModal(org)"
                                                type="button"
                                                >Оставить отзыв</UiButton
                                            >
                                            <PaidServiceCounterpartyCheck
                                                :id="this.org_id"
                                            >
                                                <template #button="{ open }">
                                                    <UiButton class="dropdown-menu__btn" variant="default" type="button" @click="open">
                                                        Проверить контрагента
                                                    </UiButton>
                                                </template>
                                            </PaidServiceCounterpartyCheck>
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                :to="`/members/${org.pubcard?.id}/${org.pivot.role}`"
                                                >Перейти в профиль</UiButton
                                            >
                                            <UiButton
                                                v-if="chat.order"
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                :to="`/orders/${chat.order.id}`"
                                                >Перейти к заказу</UiButton
                                            >
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                type="button"
                                                @click="toggleTranslate"
                                            >
                                                <template v-if="translate">
                                                    Отключить перевод
                                                </template>
                                                <template v-else>
                                                    Включить перевод
                                                </template>
                                            </UiButton>
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                :to="`https://calendar.google.com/calendar/u/0/r/eventedit?text=Встреча с ${org.pubcard?.name}`"
                                                >Запланировать событие</UiButton
                                            >
                                            <UiButton
                                                class="dropdown-menu__btn"
                                                variant="default"
                                                :to="`https://meet.google.com/new`"
                                                >Видео-конференция</UiButton
                                            >
                                        </div>
                                    </template>
                                </UiNewDropdown>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div
                class="dialog__body"
                ref="chatContainer"
                @scroll="handleScroll"
            >
                <template v-if="chat && chat.id">
                    <template v-for="group in groupedMessages">
                        <div class="dialog__messages-group">
                            <div class="dialog__messages-group-date">
                                <span>{{ group.date }}</span>
                            </div>
                            <template
                                v-for="(message, key) in group.messages"
                                :key="key"
                            >
                                <div
                                    :ref="'message-' + message.id"
                                    v-if="message.scrollTo"
                                ></div>
                                <chat-message
                                    :small="small"
                                    :message="message"
                                    :prev="group.messages[key - 1]"
                                    :next="group.messages[key + 1]"
                                    :translate="translate"
                                />
                            </template>
                        </div>
                    </template>
                </template>
                <div
                    class="dialog__body-message"
                    v-else
                >
                    <template v-if="chat && !chat.id"
                        >Чтобы начать чат отправьте первое сообщение</template
                    >
                    <template v-else>Выберите чат</template>
                </div>
            </div>
            <div
                class="dialog__bottom"
                v-if="!onlyBody"
            >
                <form
                    @submit="submitMessage"
                    class="dialog__form"
                >
                <CommonTooltip
                    :is-html="true"
                    :text="
                        $refs.fileDrop.maxSizeMessage +
                        '<br>' +
                        $refs.fileDrop.allowedExtensionsMessage
                ">
                        <template #trigger>
                            <a
                            href="javascript:;"
                            class="dialog__form-btn"
                            @click="$refs.fileDrop.$refs.input.click"
                        >
                            <SvgoFileDrop class="svg-m"/>
                        </a>
                    </template>
                </CommonTooltip>

                    <input
                        class="dialog__form-message"
                        v-model="message"
                        placeholder="Сообщение"
                        name="message"
                        maxlength="255"
                        required="required"
                    />

                    <button
                        type="submit"
                        class="dialog__form-submit"
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </template>
    </file-drop>

    <chat-modal-files
        v-model:open-value="filesModalOpen"
        v-model:files-value="files"
        :message-value="message"
        @modal:open="this.message = ''"
        @modal:close="this.message = $event"
        @submit="sendMessageWithFiles"
        :link="`/api/chat/file`"
    />

    <chat-modal-review ref="modalReview" />
</template>

<script>
import { useTranslateStore } from "~/store/translateStore";
import ChatMessage from "./message.vue";
import ChatModalFiles from "./modal/files.vue";
import ChatModalReview from "./modal/review.vue";
import FileDrop from "~/components/file/drop.vue";
import { useChatStore } from "~/store/chatStore";
import { useChannelsStore } from "~/store/channelsStore";
import { useUserStore } from "~/store/userStore";
import { useToast } from "vue-toastification";

export default {
    components: {
        ChatMessage,
        ChatModalFiles,
        ChatModalReview,
        FileDrop,
    },
    props: {
        init_chat_id: {
            type: Number,
            default: 0,
        },
        init_order_id: {
            type: Number,
            default: 0,
        },
        init_adjacent_service_id: {
            type: Number,
            default: 0,
        },
        init_performer_id: {
            type: Number,
            default: 0,
        },
        class: {
            type: String,
            default: "",
        },
        small: {
            type: Boolean,
            default: false,
        },
        isManager: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["change:chat", "change:deal-stage", "change:pinned"],
    data: () => ({
        loading: false,
        sending: false,
        chat: null,
        init_org: null,
        messages: [],
        channel: null,
        translate: false,

        user_id: null,
        org_id: null,
        user_role: null,
        message: "",
        files: [],
        // groupedMessages: {},

        maxMessages: 50,
        lastLoaded: false,
        firstLoaded: false,
        previousScrollHeight: 0,
        previousScrollTop: 0,

        refreshFlag: false,
    }),

    mounted() {
        useChatStore().setIsManager(this.isManager);
        console.log(useUserStore().userData);
        this.user_id = useUserStore().userData?.id;
        this.org_id = useUserStore().userData?.organization_id;
        this.user_role = useUserStore().role;

        if (this.init_chat_id) {
            this.changeInitChatId(this.init_chat_id);
        } else if (this.init_order_id) {
            this.initChatByProps();
        } else if (this.init_adjacent_service_id) {
            this.initChatByProps();
        } else if (this.init_org_id && this.init_org_type?.length) {
            this.initChatByProps();
        }
    },

    methods: {
        toggleTranslate() {
            console.log("toggleTranslate");
            this.translate = !this.translate;

            localStorage.setItem(
                "translate_chat_" + this.chat.id,
                this.translate
            );

            this.changeInitChatId(this.chat.id);
        },
        createDealUrl(org) {
            let data = {
                foreign_org_id: org.id,
                foreign_role: org.pivot.role,
            };
            if (this.chat.order) {
                data.order_id = this.chat.order.id;
            }
            const searchParams = new URLSearchParams(data);
            return `/deals/create?${searchParams.toString()}`;
        },


        selectPerformer(org) {
            useChatStore()
                .selectPerformer(this.chat.id, org.id)
                .then(() => {
                    this.changeInitChatId(this.chat.id);
                });
        },

        unselectPerformer(org) {
            useChatStore()
                .unselectPerformer(this.chat.id, org.id)
                .then(() => {
                    this.changeInitChatId(this.chat.id);
                });
        },
        setAsReaded(messageId = null) {
            if (!messageId) return;
            if (!this.chat?.id) return;
            if (this.chat.read_message_id < messageId) {
                this.chat.read_message_id = messageId;
                useChatStore().setAsReaded(this.chat.id, {
                    messageId: this.lastMessageId,
                });
            }
        },
        async loadMessages(direction = "up", messageId = null) {
            if (this.loading) return;

            const container = this.$refs.chatContainer;
            const previousScrollHeight = container.scrollHeight;
            const previousScrollTop = container.scrollTop;

            if (!this.messageId && this.messages.length) {
                if (direction === "up") {
                    messageId = this.messages[0].id;
                } else if (direction === "down") {
                    messageId = this.messages[this.messages.length - 1].id;
                }
            }

            if (direction === "up") {
                if (this.firstLoaded) {
                    this.loading = false;
                    return;
                }
            } else if (direction === "down") {
                if (this.lastLoaded) {
                    this.loading = false;
                    this.setAsReaded(messageId);
                    return;
                }
            } else if (direction === "center") {
                this.firstLoaded = false;
                this.lastLoaded = false;
            }

            this.loading = true;
            useChatStore()
                .getMessages(this.chat.id, messageId, direction)
                .then((response) => {
                    // response.forEach((msg) => {
                    //     this.prepareMessage(msg);
                    // });

                    if (direction === "up") {
                        this.messages = [...response, ...this.messages];
                        if (!response.length) {
                            this.firstLoaded = true;
                        }
                        this.$nextTick(() => {
                            const newScrollTop =
                                container.scrollHeight - previousScrollHeight;
                            this.$nextTick(() => {
                                this.clearMessages(direction);
                                this.$nextTick(() => {
                                    container.scrollTop = newScrollTop;
                                });
                            });
                        });
                    } else if (direction === "down") {
                        if (!response.length) {
                            this.lastLoaded = true;
                        }
                        this.messages = [...this.messages, ...response];
                        this.$nextTick(() => {
                            const newScrollHeight = container.scrollHeight;

                            this.clearMessages(direction);
                            this.$nextTick(() => {
                                container.scrollTop =
                                    previousScrollTop -
                                    (newScrollHeight - container.scrollHeight);
                            });
                        });
                    } else if (direction === "center") {
                        let centerMessage = null;
                        if (messageId) {
                            centerMessage = response.find(
                                (msg) => msg.id === messageId
                            );
                            if (centerMessage) {
                                centerMessage.scrollTo = true;
                            }
                        }
                        this.messages = [...response];
                        this.clearMessages(direction);
                    }

                    let lastMessage = this.messages[this.messages.length - 1];
                    if (lastMessage?.id > this.chat.read_message_id) {
                        this.chat.read_message_id = lastMessage.id;
                    }

                    // Проверка на необходимость подгрузки дополнительных сообщений
                    if (direction === "down") {
                        this.checkIfMoreMessagesNeeded("up");
                    } else {
                        this.checkIfMoreMessagesNeeded("down");
                    }
                    this.loading = false;
                });
        },

        clearMessages(direction) {
            // Ограничение количества сообщений
            if (this.messages.length > this.maxMessages) {
                if (direction === "up") {
                    this.messages = this.messages.splice(0, this.maxMessages);
                    this.lastLoaded = false;
                } else if (direction === "down") {
                    this.messages = this.messages.splice(
                        this.messages.length - this.maxMessages
                    );
                    this.firstLoaded = false;
                } else if (direction === "center") {
                    const excessMessages =
                        this.messages.length - this.maxMessages;
                    const excessStart = Math.floor(excessMessages / 2);
                    const excessEnd = excessMessages - excessStart;
                    this.messages = this.messages.splice(0, excessStart);
                    this.messages = this.messages.splice(
                        this.messages.length - excessEnd,
                        excessEnd
                    );
                    this.firstLoaded = false;
                    this.lastLoaded = false;
                }
            }
        },

        handleScroll() {
            const container = this.$refs.chatContainer;
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const offsetHeight = container.offsetHeight;

            if (scrollTop === 0 && !this.loading) {
                this.loadMessages("up", this.messages[0]?.id);
            } else if (
                scrollTop + offsetHeight >= scrollHeight - 10 &&
                !this.loading
            ) {
                this.loadMessages(
                    "down",
                    this.messages[this.messages.length - 1]?.id
                );
            }
        },
        checkIfMoreMessagesNeeded(direction = "down") {
            this.$nextTick(() => {
                const container = this.$refs.chatContainer;
                if (
                    container.scrollHeight <= container.offsetHeight &&
                    !this.loading
                ) {
                    if (direction === "down") {
                        this.loadMessages(
                            "down",
                            this.messages[this.messages.length - 1]?.id
                        );
                    } else {
                        this.loadMessages("up", this.messages[0]?.id);
                    }
                }
            });
        },

        addMessage(message, needScroll = true, needLoad = false) {
            if (this.lastLoaded || needLoad) {
                let index = message.id
                    ? this.messages.findIndex((msg) => msg.id === message.id)
                    : -1;
                if (index !== -1) {
                    this.messages[index] = message;
                } else {
                    this.messages.push(message);
                }

                if (!this.lastMessageId || message.id > this.lastMessageId) {
                    this.lastMessageId = message.id;
                }

                const container = this.$refs.chatContainer;
                if (needScroll) {
                    this.$nextTick(() => {
                        if (container) {
                            container.scrollTop = container.scrollHeight;
                        }
                    });
                }
            }

            return message;
        },

        sendMessageWithFiles(message) {
            if (this.sending) return false;
            let new_message = this.addMessage({
                text: message,
                created_at: new Date(),
                files: [...this.files],
                organization_id: this.org_id,
                user_id: this.user_id,
            });

            // this.files = [];

            let sended = false;
            new_message.files.forEach((file) => {
                file.loaded = false;
                this.$refs.fileDrop.sendFile(file, () => {
                    if (
                        !sended &&
                        new_message.files.every((file) => file.loaded)
                    ) {
                        const filesIds = new_message.files.map(
                            (file) => file.id
                        );
                        this.sendMessage(
                            {
                                message: new_message.text,
                                files: filesIds,
                            },
                            new_message
                        );
                        sended = true;
                        this.files = [];
                    }
                });
                if (sended) return;
            });
        },
        prepareMessage(message) {
            let date = new Date(message.created_at);

            message.date = date;
            message.own = message.user_id == this.user_id;
            console.log(this.user_id, this.org_id);

            if (message.organization_id == this.org_id) {
                message.side = "right";
            } else {
                message.side = "left";
            }
            message.readed = false;
            this.chat.organizations.forEach((org) => {
                if (org.pivot.read_message_id >= message.id) {
                    message.readed = true;
                }
            });

            // const index = this.messages.findIndex(
            //     (obj) => obj.id === message.id
            // );
            // if (index !== -1) {
            //     this.messages[index] = message;
            // }
        },
        changeInitChatId(init_chat_id, message_id = null) {
            this.loading = true;
            this.messages = [];
            this.firstLoaded = false;
            this.lastLoaded = false;

            useChatStore()
                .getChat(init_chat_id)
                .then((response) => {
                    // this.groupedMessages = {};
                    if (this.channel) {
                        useChannelsStore().leave(this.channel.name);
                    }

                    this.chat = response;
                    useChatStore().setIsManager(this.chat.is_manager);
                    this.changeDealStage();

                    // if (this.chat.messages) {
                    //     this.chat.messages.forEach((message) => {
                    //         this.addMessage(message);
                    //     });
                    // }

                    this.loading = false;

                    if (!message_id) {
                        message_id = this.chat.read_message_id;
                    }
                    this.loadMessages("center", message_id);

                    this.channel = useChannelsStore().private(
                        `chat.${response.id}`
                    );
                    const container = this.$refs.chatContainer;

                    this.translate =
                        localStorage.getItem("translate_chat_" + response.id) ==
                        "true";
                    if (this.translate) {
                        useTranslateStore().initGoogleTranslate(true);
                        this.translate = useTranslateStore().lang;
                        // this.translate = window.TranslateGetCode(
                        //     window.googleTranslateConfig
                        // );
                    }

                    this.channel.listen("NewChatMessageEvent", (event) => {
                        const scrollEnd =
                            container.scrollHeight - container.scrollTop ===
                            container.clientHeight;

                        let organization = this.chat.organizations.find(
                            (org) => org.id == event.message.org_id
                        );
                        if (organization) {
                            organization.last_active_at =
                                event.message.created_at;
                        }

                        // this.lastLoaded = false;
                        this.addMessage(event.message, scrollEnd, true);
                    });
                    this.channel.listen("ChatMessageReadedEvent", (event) => {
                        let organization = this.chat.organizations.find(
                            (org) => org.id == event.organization_id
                        );
                        if (!organization) return;
                        organization.pivot.read_message_id = event.message_id;
                    });

                    // this.loading = false;
                });
        },
        initChatByProps() {
            this.loading = true;
            this.messages = [];
            this.firstLoaded = false;
            this.lastLoaded = false;

            useChatStore()
                .getInitChat({
                    order_id: this.init_order_id,
                    adjacent_service_id: this.init_adjacent_service_id,
                    performer_id: this.init_performer_id,
                })
                .then((response) => {
                    if (response.type === "chat_id") {
                        this.$emit("change:chat", response.chat_id);
                    } else if (response.chat) {
                        this.init_org = response.chat.organizations[0];
                        this.chat = response.chat;
                        this.$emit("change:chat", null);
                        this.changeDealStage();
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        submitMessage(e) {
            e.preventDefault();
            if (this.sending) return false;
            this.sendMessage({
                message: this.message,
                files: null,
            });
            return false;
        },

        sendMessage(values, message = null) {
            if (!this.chat) return null;

            if (!message) {
                message = this.addMessage({
                    text: values.message,
                    created_at: new Date(),
                    files: values.files,
                    organization_id: this.org_id,
                    user_id: this.user_id,
                    sent: false,
                    readed: false,
                });
            }

            this.sending = true;
            if (this.chat.id) {
                useChatStore()
                    .sendMessage(this.chat.id, {
                        message: values.message,
                        files: values.files,
                    })
                    .then((response) => {
                        if (this.lastLoaded) {
                            // message = response;
                            message.id = response.id;
                            message.is_sent = response.is_sent;
                            this.refreshFlag = !this.refreshFlag;
                            this.addMessage(response, false);
                            this.clearMessages("down");
                        } else {
                            this.loadMessages("center", response.id);
                        }
                    })
                    .finally(() => {
                        this.message = "";
                        this.sending = false;
                    });
            } else {
                useChatStore()
                    .sendFirstMessage({
                        message: this.message,
                        organization_id: this.init_org_id,
                        organization_type: this.init_org_type,
                        order_id: this.init_order_id,
                        adjacent_service_id: this.init_adjacent_service_id,
                        performer_id: this.init_performer_id,
                    })
                    .then((response) => {
                        this.$emit("change:chat", response);
                    })
                    .finally(() => {
                        this.message = "";
                        this.sending = false;
                    });
            }
        },

        changeDealStage() {
            let stage = this.chat?.deal?.stage;
            if (!stage && this.chat?.id) {
                stage = "communication";
            }
            if (stage === "completed") {
                stage = "payment";
            }
            this.$emit("change:deal-stage", stage);
        },

        openReviewModal(org) {
            if (!org.pubcard) return;
            if (org.pubcard.can_write_review_at) {
                const can_write_review_at = formatDate(new Date(org.pubcard.can_write_review_at), "DD.MM.YYYY");
                useToast().info("Вы уже оставляли отзыв об этой организации в этом месяце. Следующий отзыв вы сможете оставить " + can_write_review_at);
                return;
            }
            this.$refs.modalReview.open(this.org_id, this.user_role, this.chat, org);
        },

        orgOnline(org) {
            let last_active_at = new Date(org.last_active_at);

            if (new Date() - last_active_at < 5 * 60 * 1000) {
                return "Онлайн";
            }
            return "Офлайн";
        },

        setPinned() {
            let pinned = !this.chat.is_pinned;
            useChatStore()
                .setPinned(this.chat.id, pinned)
                .then(() => {
                    this.chat.is_pinned = pinned;
                    this.$emit("change:pinned", this.chat);
                });
        },
    },

    watch: {
        init_chat_id(newVal, oldVal) {
            if (newVal && newVal != oldVal) {
                this.changeInitChatId(newVal);
            }
        },
    },

    computed: {
        filesModalOpen() {
            if (
                this.files.length &&
                this.files.every((file) => !file.loading)
            ) {
                return true;
            }
            return false;
        },
        onlyBody() {
            return !this.chat && !this.init_org;
        },
        className() {
            let className = "dialog " + this.class;

            if (this.small) {
                className += " dialog_small";
            }

            return className;
        },

        groupedMessages() {
            let groups = {};
            let options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            this.refreshFlag;

            this.messages.forEach((message) => {
                this.prepareMessage(message);
                const date = message.date;
                let formattedDate = date.toLocaleDateString(
                    navigator.language,
                    options
                );

                if (date.toDateString() == new Date().toDateString()) {
                    formattedDate = "Сегодня";
                }

                if (!groups[formattedDate]) {
                    groups[formattedDate] = {
                        messages: [],
                        date: formattedDate,
                    };
                }

                let group = groups[formattedDate];

                const index = group.messages.findIndex(
                    (obj) => obj.id === message.id
                );

                if (index !== -1) {
                    group.messages[index] = message;
                } else {
                    group.messages.push(message);
                }
            });

            return groups;
        },
    },
};
</script>

<style lang="scss">
.chat-filedrop {
    position: absolute !important;
    inset: 0 !important;
}

.dialog {
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

    --font-size-10: 1em;
    --font-size-11: 1.1em;
    --font-size-12: 1.2em;
    --font-size-14: 1.4em;
    --font-size-16: 1.6em;

    background-color: var(--color-white);

    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;

    font-size: 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &__top {
        border-bottom: 1px solid var(--color-border-gray);
        display: flex;
    }

    &__close {
        flex: 0 0 auto;
        display: none;
        align-items: stretch;
        justify-content: center;

        @media (max-width: 767px) {
            display: flex;
        }

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            &:hover {
                text-decoration: none;
            }
        }
    }

    &__orgs {
        flex: 1 1 100%;
    }

    &-head {
        display: flex;
        align-items: center;
        padding: 2em;
        gap: 1rem;

        &__img {
            position: relative;
            font-size: var(--font-size-10);
            width: 4.8em;
            height: 4.8em;
            flex: 0 0 auto;
            margin-right: 0.6em;
            overflow: hidden;
            border-radius: 100%;
            background-color: var(--color-gray-300);

            img {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__info {
            flex: 1 1 0;

            &-title {
                font-size: var(--font-size-14);
                font-weight: 600;
                color: var(--color-gray-600);
            }

            &-status {
                font-size: var(--font-size-10);
                color: var(--color-gray-500);
            }
        }

        &__buttons {
            flex: 0 1 auto;
            display: flex;
            gap: 1rem;

            @media screen and (max-width: 1379px) {
                display: none;
            }
        }

        &__btn {
            text-transform: uppercase;
            column-gap: 1em;
            font-size: 1.2em;
            font-weight: 400;

            &_type_colored {
                color: var(--text-color-primary);
            }
        }

        &__dropdown-menu {
            display: flex;
            flex-direction: column;
            padding: 2em;
            font-size: 1.4rem;
            .btn {
                display: block;
                font-size: 1em;
                padding: 0.3em;
                justify-content: flex-start;
                color: var(--text-color-primary);
                text-align: left;
                text-transform: none;
                border-radius: 0;

                &:hover {
                    background-color: var(--button-background-secondary-hover);
                }
            }
        }
    }

    &__body {
        flex: 1 1 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        background: var(--color-gray-200);

        &-message {
            padding: 1em 2em;
            background-color: var(--color-white);
            font-size: var(--font-size-16);
            line-height: 1.5em;
            color: var(--color-gray-600);
            margin: auto;
            border-radius: 0.8em;
            max-width: 70%;
        }
    }

    &__bottom {
        flex: 0 0 auto;
        padding: 2em;
        border-top: 1px solid var(--color-border-gray);
    }

    &__form {
        display: flex;

        &-message {
            font-size: var(--font-size-14);
            height: 2.8em;
            width: 100%;
            background: var(--color-gray-300);
            outline: none;
            border: none;
            border-radius: 0.8em;
            padding: 0.8em;
            margin: 0 1.6em;
        }

        &-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size-14);
            background-color: var(--color-gray-300);
            height: 2.8em;
            min-width: 2.8em;
            cursor: pointer;
        }

        &-submit {
            border: 1px solid var(--color-border-gray);
            font-size: var(--font-size-14);
            height: 2.8em;
            border-radius: 0.8em;
        }

        &-file {
            position: relative;

            input {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                pointer-events: none;
                z-index: -1;
            }
        }
    }

    &__messages-group {
        padding-bottom: 2em;

        &-date {
            font-size: var(--font-size-11);
            position: sticky;
            top: 2em;
            margin-top: 2em;
            text-align: center;
            z-index: 2;

            span {
                display: inline-block;
                font-size: var(--font-size-12);
                padding: 0.2em 0.5em;
                border-radius: 1em;
                color: var(--color-gray-600);
                background-color: var(--color-gray-200);
            }
        }
    }

    &_small {
        font-size: 5px;
        --font-size-10: 10px;
        --font-size-11: 10px;
        --font-size-12: 11px;
        --font-size-14: 12px;
        --font-size-16: 14px;
    }
}
</style>
