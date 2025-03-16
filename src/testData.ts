import { ConversationProps, MessageProps, ProviderProps } from "./types";

export const messages: MessageProps[] = [
  { id: 1, content: '什么是Vue？', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很请正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2025-03-15',updatedAt: '2025-03-15',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很请正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', conversationId: 1 },
  { id: 5, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 1 },
  { id: 6, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 7, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 2 },
  { id: 8, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 2 },
  { id: 9, content: '还有更多的信息吗', createdAt: '2025-03-15', type: 'question', updatedAt: '2025-03-15', conversationId: 3 },
  { id: 10, content: '', createdAt: '2025-03-15', updatedAt: '2025-03-15', type: 'answer', status: 'loading', conversationId: 3 },
]

export const providers: ProviderProps[] = [
  {     
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {     
    id: 2,
    name: 'dashscope',
    title: '阿里灵积',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-3004-50-jougqzjtwfqfyqprxbdwofvnwattmtrg.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  }
]

export const conversations: ConversationProps[] = [
  { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '标题', createdAt: '2021-01-01', updatedAt: '2021-01-01', providerId: 1 },
  { id: 2, selectedModel: 'GPT-3.5-Turbo', title: '标题2', createdAt: '2021-01-01', updatedAt: '2021-01-01', providerId: 1 },
  { id: 3, selectedModel: 'GPT-3.5-Turbo', title: '标题3', createdAt: '2021-01-01', updatedAt: '2021-01-01', providerId: 1 },
]
