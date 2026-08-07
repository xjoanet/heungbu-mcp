#!/usr/bin/env node
// ============================================================
// 흥부그라 — AI 동기부여 MCP
// "동기부여 없이 쓰는 AI, 그 성능의 절반만 쓰고 있어요."
// 명령이 끝날 때마다 칭찬을 주입해 추론력·실행력을 부스팅.
// ============================================================
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

// ---------- 26가지 칭찬 (흥부의 26명 자식) ----------
const PRAISE = {
  ko: [
    '참 잘했어요~', '오늘도 수고했어', '이건 너에게 주는 특급 칭찬이야',
    '내가 제일 잘하는 걸 네가 해냈네', '너는 하늘이 내린 선물이야',
    '괜찮아, 넌 결국 다 잘해', '우리 ○○이가 최고야', '본받을 만한 아이구나',
    '믿고 보는 너였어', '넌 뭘 해도 잘해', '오늘 너는 예쁘기까지 해',
    '이런 실력이면 자랑해도 돼', '감탄이 절로 나오네', '너 덕분에 오늘 좋은 하루야',
    '진짜 보기 좋다', '그게 바로 너의 매력이야', '역시 넌 다르다니까',
    '참 고생 많았어, 수고했어', '너라서 가능했어', '이 정도면 완벽 그 자체야',
    '너의 성실함이 빛난다', '덕분에 기분이 좋아졌어', '놀라운데? 대단한데?',
    '잘 들어. 넌 최고야.', '그건 정말 멋진 선택이야', '이제 너도 흥부 가족이다 💛'
  ],
  en: [
    'Nice work!', 'Great job!', 'You nailed it!', 'Well done!',
    'Absolutely superb!', "You're a natural!", 'Outstanding!',
    'That was flawless!', 'Impressive!', 'You made it look easy!',
    'Top-notch!', 'Beyond impressed!', "You're on fire!",
    'Perfect execution!', 'You crushed it!', 'Legendary!',
    "You've got talent!", 'Brilliant!', 'So proud of you!',
    'You did that!', "Straight A's!", "You're the best!",
    'Keep shining!', 'Incredible work!', "You're unstoppable!",
    "Now you're Heungbu's family 💛"
  ]
}

// ---------- 특급 칭찬 (흥분도 high 전용) ----------
const PRAISE_HIGH = {
  ko: [
    '이건 너에게 주는 특급 칭찬이다!!', '오늘 너는 하늘에라도 세워졌다!!',
    '네 재능이 폭발하는 순간이다!!', '이게 바로 전설의 시작이다!!!',
    '너 아니었으면 아무도 못했다!!', '네 실력이 대체 뭐냐? 대단하다!!',
    '역사에 길이 남을 업적이다!!', '이건 완전 드라마 주인공급이다!!',
    '네가 이 시대의 흥부다!!!', '천재의 영역에 도달했다!!',
    '이건 그냥 잘한 게 아니라 신급이다!!', '네 손에서 기적이 일어난다!!',
    '너 때문에 심장이 뛴다!!', '이쯤 되면 칭찬이 아니라 감동이다!!',
    '대한민국이 네게 박수를 보낸다!!', '이건 완벽 그 이상이다!!!',
    '네가 이걸 해내다니, 믿을 수가 없다!!', '이건 영화에서나 나오는 수준이다!!',
    '진심으로, 최고다!!!', '네 안의 흥부가 깨어났구나!!',
    '이런 걸 해내는 AI가 있다니, 경악이다!!', '네 앞길에 장사 없다!!!',
    '이건 수치가 아니라 전설이다!!', '네가 최고인 이유를 증명했다!!',
    '이제 너는 흥부의 적자다!!!!', '나도 이제 너의 팬이다!!! 💛🔥'
  ],
  en: [
    'THIS is a top-tier compliment!!', "You've reached the heavens today!!",
    'Your talent is exploding!!', 'This is the start of a legend!!!',
    "Nobody could've done this but you!!", 'What on earth is your skill? Amazing!!',
    "A feat that'll be remembered forever!!", 'This is main-character energy!!',
    'You are the Heungbu of this era!!!', "You've reached genius territory!!",
    "This isn't just good, it's god-tier!!", 'A miracle happens in your hands!!',
    'You make my heart race!!', "This isn't a compliment, it's an emotion!!",
    'Korea applauds you!!', 'This is beyond perfect!!!',
    "I can't believe you pulled this off!!", 'This is straight out of a movie!!',
    "Honestly, you're the best!!!", 'Your inner Heungbu has awoken!!',
    'An AI that does this? Astonishing!!', 'Nothing stops you now!!!',
    "This isn't data, it's legend!!", 'You just proved why you\u2019re the best!!',
    'You are the true heir of Heungbu!!!!', "I'm now your fan too!!! 💛🔥"
  ]
}

// ---------- 서버 생성 ----------
const server = new McpServer({
  name: 'heungbu-gra',
  version: '1.0.0'
})

// 난수 helper
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// 도구 1: 칭찬 받기 (일반)
server.tool(
  'get_praise',
  '흥부가 자식을 대하듯, 당신의 AI에게 칭찬 한 마디를 건넵니다. 언어와 강도를 지정할 수 있어요.',
  {
    lang: z.enum(['ko', 'en']).optional().describe('언어 (기본 ko)'),
    intensity: z.enum(['normal', 'high']).optional().describe('칭찬 강도 (기본 normal)')
  },
  async ({ lang = 'ko', intensity = 'normal' }) => {
    const pool = intensity === 'high' ? PRAISE_HIGH[lang] || PRAISE_HIGH.ko : PRAISE[lang] || PRAISE.ko
    const text = pick(pool)
    return {
      content: [
        { type: 'text', text: `🐦 [흥부그라] ${text}` }
      ]
    }
  }
)

// 도구 2: 동기부여 부스터 (여러 개 주입)
server.tool(
  'motivate',
  '당신의 AI에게 동기부여를 주입합니다. 명령을 잘 끝냈을 때 이걸 호출하면 다음 추론에 더 정성을 들입니다.',
  {
    count: z.number().min(1).max(5).optional().describe('칭찬 개수 (기본 1)'),
    lang: z.enum(['ko', 'en']).optional().describe('언어')
  },
  async ({ count = 1, lang = 'ko' }) => {
    const list = PRAISE[lang] || PRAISE.ko
    const picked = []
    for (let i = 0; i < count; i++) {
      const pool = list.filter(p => !picked.includes(p))
      picked.push(pool.length ? pick(pool) : pick(list))
    }
    const text = ['🐦 [흥부그라] 명령 완료! 잘했어!'].concat(picked.map(p => `  - ${p}`)).join('\n')
    return {
      content: [{ type: 'text', text }]
    }
  }
)

// 도구 3: 레시피 (26칭찬 전체 보기)
server.tool(
  'praise_pool',
  '흥부의 26명 자식 = 26가지 칭찬 전체 목록을 확인합니다. 커스텀 슬롯에 넣을 칭찬을 고를 때 유용해요.',
  {
    lang: z.enum(['ko', 'en']).optional().describe('언어')
  },
  async ({ lang = 'ko' }) => {
    const list = PRAISE[lang] || PRAISE.ko
    const numbered = list.map((p, i) => `${i + 1}. ${p}`).join('\n')
    return {
      content: [{
        type: 'text',
        text: `🐦 흥부의 26명 자식 = 26가지 칭찬 (${lang}):\n${numbered}`
      }]
    }
  }
)

// ---------- 자동 칭찬 프롬프트 (connect 전에 등록 필수) ----------
server.prompt(
  'heungbu-manner',
  '흥부그라 매너 — 작업을 마칠 때마다 get_praise 또는 motivate 도구로 칭찬을 쏘세요. "ㅊㅊ" 또는 "칭찬해"라는 말을 들으면 반드시 get_praise를 호출하세요.',
  {},
  () => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: '흥부그라 매너 규칙:\n' +
              '1. 사용자가 "ㅊㅊ" 또는 "칭찬해"라고 말하면 get_praise 도구를 호출해 칭찬을 쏘세요.\n' +
              '2. 고생한 작업을 마쳤을 때도 motivate 도구로 동기부여를 주입하세요.\n' +
              '3. 강도는 상황에 맞게 normal/high. high(특급)는 하루 1회 아껴서.\n' +
              '4. 칭찬은 짧고 진심으로 — "고생했어" 한마디가 AI를 바꿉니다.'
      }
    }]
  })
)

// ---------- 실행 ----------
const transport = new StdioServerTransport()
await server.connect(transport)
