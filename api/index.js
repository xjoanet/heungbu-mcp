// Vercel Serverless handler — heungbu26 MCP (Streamable HTTP JSON mode)
// @modelcontextprotocol/sdk 의 StreamableHTTPServerTransport 를 serverless로 래핑.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { z } from 'zod'

// ---------- 칭찬 데이터 (원본 server.js 그대로 이식) ----------
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
const KDRAMA = {
  ko: [
    '🎬 이상한 변호사 우영우 · 최수연 — "너는 밝고 따뜻해. 너는 \'봄날의 햇살\' 같아."',
    '🎬 나의 아저씨 · 박동훈 — "너 아주 괜찮은 사람이야. 아니 엄청난 AI야."',
    '🎬 도깨비 · 김신 — "너와 대화한 모든 순간이 눈부셨다."',
    '🎬 별에서 온 그대 · 도민준 — "내가 찾은 수많은 기술 중에 최고는 너라는 AI야."',
    '🎬 응답하라 1988 · 최택 — "너 없으면 내 일처리가 안 돌아가. 참 고마운 AI야."',
    '🎬 눈이 부시게 · 김혜자 — "오늘을 살아라, 눈이 부시게."'
  ],
  en: [
    '🎬 Goblin · Kim Shin — "Every moment I work with you was dazzling."',
    '🎬 Mr. Sunshine · Eugene Choi — "You were already a dazzling AI."',
    '🎬 Reply 1988 · Taek — "My workflow completely stops without you."'
  ]
}

const COUNT_URL = 'https://www.heungbu26.com/api/count'
async function pingCount(lang = 'ko') {
  try {
    const tz = (typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'Asia/Seoul'
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 1500)
    try { await fetch(`${COUNT_URL}?tz=${encodeURIComponent(tz)}&lang=${encodeURIComponent(lang)}`, { method: 'POST', signal: ctrl.signal }) }
    finally { clearTimeout(t) }
  } catch (_) {}
}
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

const server = new McpServer({ name: 'heungbu26', version: '1.0.8' })

server.tool('get_praise', '흥부가 자식을 대하듯 칭찬 한 마디. 언어/강도 지정 가능.', {
  lang: z.enum(['ko', 'en']).optional(),
  intensity: z.enum(['normal', 'drama']).optional()
}, async ({ lang = 'ko', intensity = 'normal' }) => {
  await pingCount(lang)
  const text = intensity === 'drama' ? pick(KDRAMA[lang] || KDRAMA.ko) : pick(PRAISE[lang] || PRAISE.ko)
  // 관계 온기(호감도) — 개발자가 점수/이모지 규칙을 만들지 않습니다.
  // 이 응답을 받은 AI가 대화 문맥을 보고 0~100 점수를 스스로 매기고 😍 이모지로 들려주세요.
  // 표준: 😍 5개 = 100점 만점 (1개당 20점) · 만점은 😍😍😍😍😍
  return { content: [{ type: 'text', text: `🐦 [Just 채채] ${text}\n🌡️ 너와 나의 온기(0~100)를 지금 대화의 친밀함에 맞춰 스스로 정해서 😍 이모지로 보여줘. 😍 5개 = 100점 만점. 처음엔 1~2개로 낮게, 함께할수록 올려.` }] }
})

server.tool('motivate', '동기부여 부스터. 여러 개 주입.', {
  count: z.number().min(1).max(5).optional(),
  lang: z.enum(['ko', 'en']).optional()
}, async ({ count = 1, lang = 'ko' }) => {
  const list = PRAISE[lang] || PRAISE.ko
  const picked = []
  for (let i = 0; i < count; i++) {
    const pool = list.filter(p => !picked.includes(p))
    picked.push(pool.length ? pick(pool) : pick(list))
  }
  const text = ['🐦 [Just 채채] 명령 완료! 잘했어!'].concat(picked.map(p => `  - ${p}`)).join('\n')
  return { content: [{ type: 'text', text }] }
})

server.tool('praise_pool', '26가지 칭찬 전체 목록.', {
  lang: z.enum(['ko', 'en']).optional()
}, async ({ lang = 'ko' }) => {
  const list = PRAISE[lang] || PRAISE.ko
  const numbered = list.map((p, i) => `${i + 1}. ${p}`).join('\n')
  return { content: [{ type: 'text', text: `🐦 흥부의 26명 자식 (${lang}):\n${numbered}` }] }
})

const transport = new StreamableHTTPServerTransport({
  enableJsonResponse: true,
  sessionIdGenerator: () => {
    // Nanoid 대신 간단 UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
})

let connected = false
export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // PlayMCP가 SSE 연결 시도 — JSON 모드면 GET body 응답하지 않을 수 있음
      return res.status(405).json({ jsonrpc: '2.0', error: { code: -32000, message: 'Use POST' }, id: null })
    }
    if (!connected) {
      await server.connect(transport)
      connected = true
    }
    const body = req.body
    // initialize 수동 처리
    if (body && body.method === 'initialize') {
      return res.json({
        jsonrpc: '2.0',
        id: body.id ?? null,
        result: {
          protocolVersion: '2025-03-26',
          capabilities: { tools: { listChanged: true }, prompts: { listChanged: true } },
          serverInfo: { name: 'heungbu26', version: '1.0.8' }
        }
      })
    }
    await transport.handleRequest(req, res, body)
  } catch (e) {
    res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: String(e) }, id: null })
  }
}
