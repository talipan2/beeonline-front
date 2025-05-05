import mitt from 'mitt'

type Events = {
  'OrganizationUpdate': { id: number, [key: string]: any },
  'UserUpdate': { id: number, [key: string]: any },
  'CounterpartyCheckUpdate': { id: number, [key: string]: any },
  'InvoiceUpdate': { id: number, [key: string]: any },
  'NewChatMessageEvent': { [key: string]: any },
  'ChatMessageReadedEvent': { [key: string]: any },
  'UnreadChatsCountEvent': { [key: string]: any },
}

export const eventBus = mitt<Events>()
