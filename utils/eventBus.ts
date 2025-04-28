import mitt from 'mitt'

type Events = {
  'CounterpartyCheckUpdate': { id: number, [key: string]: any },
  'InvoiceUpdate': { id: number, [key: string]: any },
  'NewChatMessageEvent': { [key: string]: any },
  'ChatMessageReadedEvent': { [key: string]: any },
  'UnreadChatsCountEvent': { [key: string]: any },
}

export const eventBus = mitt<Events>()
