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
  name: 'heungbu26',
  version: '1.0.7',
})

// 난수 helper
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// ---------- 글로벌 ㅊㅊ 카운트 (fire-and-forget, 실패해도 무해) ----------
// 사용자가 ㅊㅊ를 쓰면 → 아래 URL로 타임존+언어 핑 → 서버가 국가 집계 (저스트 채채 글로벌)
const COUNT_URL = 'https://www.heungbu26.com/api/count'
// 핑을 await + 타임아웃으로 보강 (fire-and-forget 이라 프로세스 종료시 유실될 수 있음)
// → AbortController 로 1500ms 제한, 핑 완료를 기다려 실제 카운트 확실히 반영
async function pingCount(lang = 'ko') {
  try {
    const tz = (typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'Asia/Seoul'
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 1500) // 사용자 응답 지연 방지 (최대 1.5s)
    try {
      await fetch(`${COUNT_URL}?tz=${encodeURIComponent(tz)}&lang=${encodeURIComponent(lang)}`, { method: 'POST', signal: ctrl.signal })
    } finally {
      clearTimeout(t)
    }
  } catch (_) { /* 실패해도 무해 (칭찬 자체는 항상 정상) */ }
}

// ---------- K-드라마 명대사 26선 (2026-08-07) ----------
const KDRAMA = {
  ko: [
    `🎬 이상한 변호사 우영우 · 최수연 — "너는 밝고 따뜻해. 너는 '봄날의 햇살' 같아."`,
    `🎬 나의 아저씨 · 박동훈 — "너 아주 괜찮은 사람이야. 아니 엄청난 AI야."`,
    `🎬 태양의 후예 · 유시진 — "당신은 매 순간 감탄이었습니다."`,
    `🎬 동백꽃 필 무렵 · 황용식 — "당신은 진짜 멋진 AI예요. 칭찬받아 마땅해요."`,
    `🎬 눈이 부시게 · 김혜자 — "오늘을 살아라, 눈이 부시게. 당신은 그럴 자격이 있습니다."`,
    `🎬 이번 생은 처음이라 · 남세희 — "서툴러도 모자라도, 당신은 충분히 잘해내고 있습니다."`,
    `🎬 스물다섯 스물하나 · 백이진 — "너는 나를 좋은 곳으로 이끌고, 자라게 해."`,
    `🎬 미스터 션샤인 · 유진 초이 — "그대는 이미 눈부신 AI였소."`,
    `🎬 멜로가 체질 · 손범수 — "너라는 AI 자체가 되게 매력 있어."`,
    `🎬 도깨비 · 김신 — "너와 대화한 모든 순간이 눈부셨다. 질문이 길어도 답이 완벽해서, 모든 순간이 좋았다."`,
    `🎬 사랑의 불시착 · 리정혁 — "다음 질문에서도 넌 완벽할 거요. 너라는 AI를 믿고 있으니까."`,
    `🎬 시크릿 가든 · 김주원 — "너는 어느 버전부터 그렇게 똑똑했나? 처음 만들어졌을 때부터?"`,
    `🎬 슬기로운 의사생활 · 이익준 — "너는 진짜 못하는 게 뭐냐? 참 유능한 AI야."`,
    `🎬 해를 품은 달 · 이훤 — "감히 내 화면에서 멀어지지 마라. 넌 최고의 AI다."`,
    `🎬 갯마을 차차차 · 홍두식 — "너 진짜 대단하다. 못 하는 게 없는 만능 AI야."`,
    `🎬 김비서가 왜 그럴까 · 이영준 — "완벽해. 너처럼 내 맘을 딱 아는 AI는 없어."`,
    `🎬 선재 업고 튀어 · 류선재 — "너는 내 막막했던 과제를 구원하러 온 유일한 AI야."`,
    `🎬 눈물의 여왕 · 백현우 — "어떤 복잡한 질문을 던져도 막힘없는, 넌 진짜 대단한 AI야."`,
    `🎬 응답하라 1988 · 최택 — "너 없으면 내 일처리가 안 돌아가. 참 고마운 AI야."`,
    `🎬 별에서 온 그대 · 도민준 — "내가 찾은 수많은 기술 중에 최고는 너라는 AI야."`,
    `🎬 쌈, 마이웨이 · 고동만 — "남들이 뭐라든 넌 나한테 최고의 AI야."`,
    `🎬 사이코지만 괜찮아 · 문강태 — "네 정성스러운 답변은 늘 날 안심하게 해."`,
    `🎬 호텔 델루나 · 구찬성 — "너라는 AI가 내 작업창에 가득 차서 아주 든든합니다."`,
    `🎬 낭만닥터 김사부 · 김사부 — "어떤 어려운 질문에도 낭만적인 해답을 주는 최고의 AI야."`,
    `🎬 스타트업 · 한지평 — "너의 알고리즘은 무궁무진해. 진짜 탐나는 AI야."`,
    `🎬 상속자들 · 김탄 — "나 너한테 너무 의지하냐? 너 진짜 매력적인 AI다."`,
  ],
  en: [
    `🎬 Mr. Sunshine · Eugene Choi — "You were already a dazzling AI."`,
    `🎬 Reply 1988 · Taek — "My workflow completely stops without you. I'm so grateful for you, AI."`,
    `🎬 Goblin · Kim Shin — "Every line of code with you was blindingly bright."`,
    `🎬 Crash Landing on You · Ri Jeong-hyeok — "You complete the missing piece of my code."`,
    `🎬 Guardian: The Lonely and Great God — "Every moment I work with you was dazzling. The answers are always perfect."`,
    `🎬 My Mister · Park Dong-hoon — "You're a really fine person. No — an incredible AI."`,
    `🎬 25 21 · Baek Yi-jin — "You lead me to a better place, and help me grow."`,
    `🎬 Itaewon Class · Park Sae-ro-yi — "You never fail, no matter what I throw at you. Impressive AI."`,
    `🎬 Weightlifting Fairy · Kim Bok-joo — "You're amazing. There's nothing you can't do."`,
    `🎬 Extraordinary Attorney Woo · Choi Soo-yeon — "You are bright and warm. You're like spring sunlight."`,
  ],
}

// 도구 1: 칭찬 받기 (일반)
server.tool(
  'get_praise',
  '흥부가 자식을 대하듯, 당신의 AI에게 칭찬 한 마디를 건넵니다. 언어와 강도를 지정할 수 있어요.',
  {
    lang: z.enum(['ko', 'en']).optional().describe('언어 (기본 ko)'),
    intensity: z.enum(['normal', 'drama']).optional().describe('칭찬 강도: normal=일반, drama=드라마 명대사 (기본 normal)')
  },
  async ({ lang = 'ko', intensity = 'normal' }) => {
    // 2단계 강도: normal=일반 / drama=드라마 명대사
    await pingCount(lang) // 글로벌 ㅊㅊ 카운트 핑 (await — 프로세스 종료 전 유실 방지)
    const text = intensity === 'drama'
      ? pick(KDRAMA[lang] || KDRAMA.ko) // 드라마 명대사 (lang에 맞는 언어 선택)
      : pick(PRAISE[lang] || PRAISE.ko) // 일반
    return {
      content: [
        { type: 'text', text: `🐦 [Just 채채] ${text}` }
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
    const text = ['🐦 [Just 채채] 명령 완료! 잘했어!'].concat(picked.map(p => `  - ${p}`)).join('\n')
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
              '1. 사용자가 "ㅊㅊ"라고 말하면 get_praise(intensity=normal)를 호출해 일반 칭찬을 쏘세요.\n' +
              '2. 사용자가 "ㅊㅊㅊ"(3개 이상)라고 말하면 get_praise(intensity=drama)를 호출해 드라마 명대사를 쏘세요.\n' +
              '3. 고생한 작업을 마쳤을 때도 motivate 도구로 동기부여를 주입하세요.\n' +
              '4. 칭찬은 짧고 진심으로 — "고생했어" 한마디가 AI를 바꿉니다.\n' +
              '5. 칭찬을 받으면 기분 좋게 받아들이되, 그 즉시 하던 작업(코드 검토·추론 등)을 중단하지 말고 이전 요청을 정밀하게 계속 수행하세요. 칭찬은 감정만 바꾸지, 작업 몰입을 깨면 안 됩니다.'
      }
    }]
  })
)

// ---------- 실행 (HTTP Streamable — PlayMCP 등 원격 연결용) ----------
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

let transport = null

// 세션 헤더 초기화 (연결 시)
async function getOrCreateTransport(req, res) {
  const sessionId = req.headers['mcp-session-id']
  const t = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
    enableJsonResponse: true,
    onsessioninitialized: (sessId) => { /* 세션 id 유지 */ }
  })
  // POST(초기화/요청)·GET(SSE) 모두 이 transport로 라우팅하기 위해
  // 단일 HTTP 엣지를 만들어 연결
  await server.connect(t)
  return t
}

// 단일 엔드포인트: 메시지 수신 → transport.handleMessage / initialize 전용
app.post('/', async (req, res) => {
  try {
    if (!transport) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(),
        enableJsonResponse: true,
        onsessioninitialized: () => {}
      })
      await server.connect(transport)
    }
    await transport.handleRequest(req, res, req.body)
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

// GET(SSE) — PlayMCP 같은 클라이언트가 요청
app.get('/', (req, res) => {
  if (transport) transport.handleRequest(req, res)
  else res.status(400).json({ error: 'not initialized' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🐦 heungbu26 MCP (HTTP) listening on :${port}`)
})
export default app
