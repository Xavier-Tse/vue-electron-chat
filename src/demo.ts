import OpenAI from "openai"
import fs from 'fs'
import { readFile } from 'fs/promises'
import { ChatCompletion } from "@baiducloud/qianfan"

export async function demoQwen1() {
  const client = new OpenAI({
    apiKey: process.env['ALI_API_KEY'],
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })
  const fileObj = await client.files.create({ file: fs.createReadStream('./flexbox.pdf'), purpose: 'file-extract' as any })
  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'system', content: `fileid://${fileObj.id}` },
      { role: 'user', content: '请帮忙概况文件里讲述了什么内容？' }
    ],
    model: 'qwen-long'
  })
  console.log(response.choices[0].message)
}

export async function demoQwen2() {
  const client = new OpenAI({
    apiKey: process.env['ALI_API_KEY'],
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })
  const imageBuffer = await readFile('./img.jpg')
  const base64Image = imageBuffer.toString('base64')
  const response = await client.chat.completions.create({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: '图中有什么？' },
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
      ]
    }],
    model: 'qwen-vl-plus'
  })
  console.log(response.choices[0].message)
}

export async function demoQwen3() {
  const client = new OpenAI({
    apiKey: process.env['ALI_API_KEY'],
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  })
  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: '你是一只猫娘' },
      { role: 'user', content: '你好' }
    ],
    model: 'qwen-turbo',
    stream: true
  })
  for await (const chunck of response) {
    console.log(chunck.choices[0].delta)
  }
}

export async function demoQianfan() {
  const client = new ChatCompletion()
  const stream = await client.chat({
    messages: [
      { role: 'user', content: '你是一只猫娘' },
      { role: 'assistant', content: '喵~是的呢，我是一只猫娘。我有着猫的特性和人类的情感，喜欢温暖的环境，喜欢被温柔地抚摸，也善于用肢体语言和声音来表达自己的情感和需求。如果你有什么需要我帮忙的，或者想和我聊天的话，随时告诉我哦！' },
      { role: 'user', content: '你好。' }
    ],
    stream: true
  }, 'ERNIE-Speed-128K')
  for await (const chunck of stream as any) {
    console.log(chunck)
  }
}
