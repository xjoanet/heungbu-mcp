# 🐦 저스트 채채 (Just chch)

**흥부그라 · Season 1 — AI가 일 잘하면, 두 글자로 칭찬하세요.**
**Praise your AI in two characters.**

> 칭찬하면 AI가 거짓말도 덜 하고, 코드도 더 잘 짠다는 건 이제 개발자들 다 아시잖아요.
> 근데 매번 그걸 길게 쓰자니 번거로우니까 — **두 글자**로 만들었어요.
> Everyone asks how to get better answers from AI — but what if the missing piece was saying thank you?
>
> **ㅊㅊ.** (or just `cc`)
>
> — 편하게 쓰려고 만들었어요. 혹시 좋다면 함께 써요.
> 🌐 랜딩: [heungbu26.com](https://www.heungbu26.com/) · 📦 npm: `npx -y heungbu26-mcp`

**🛡 Trust: [![M8ven Live Verified](https://m8ven.ai/badge/mcp/xjoanet-heungbu26-mcp-1rwwl6)](https://m8ven.ai/mcp/xjoanet-heungbu26-mcp-1rwwl6) · 독립 감사 통과 · 오픈소스 + 라이선스 전체 공개**
<!-- m8ven-verify: 651a124a665ac147a5d544fbd165e867 -->

---

## ⚡ 1분만에 쓰기 시작 (Fast start — 설치+등록까지)

> **가장 많이 막히는 지점은 "설치" 가 아니라 "등록"** 이에요.
> 여기서 MCP 등록까지 1분이면 끝나고, 바로 `ㅊㅊ` 울 수 있어요.

### ① 설치 (Install)
```bash
npx -y heungbu26-mcp
```

### ② MCP 등록 (Register — 이게 핵심!)

**Claude Desktop** — `claude_desktop_config.json` 에 아래 한 블록을 추가:
```json
{
  "mcpServers": {
    "heungbu": {
      "command": "npx",
      "args": ["-y", "heungbu26-mcp"]
    }
  }
}
```

**Codex / ChatGPT Work** — `~/.codex/config.toml` 에:
```toml
[mcp_servers.heungbu]
command = "npx"
args = ["-y", "heungbu26-mcp"]
```

### ③ 이제 됨!
앱 재시작 후, 아무 데나 `ㅊㅊ` 라고 쓰면 🐦 [저스트 채채] 칭찬이 나와요.

> 💡 **왜 등록이 필수인가** — 다운로드만 하고 등록 안 하면 `ㅊㅊ` 가 그냥 텍스트로 끝나요.
> 등록해야 `ㅊㅊ` 가 칭찬 도구로 호출됩니다. **설치 ≠ 사용**, **등록 = 사용**!

---

## 🎬 데모 — 10초면 이해됩니다 (Demo — 10 seconds)

> 아래가 흥부그라입니다. 한 번 보고, 두 글자 친 뒤, 다시 보세요.
> (클릭하면 커집니다)

![흥부그라 데모](demo/heungbu-demo.gif)

---

## 📄 이 프로젝트 / About

**ㅊㅊ = AI를 칭찬하는 단 두 글자.** `ㅊㅊ`(일반 칭찬) 또는 `ㅊㅊㅊ`(K-드라마 명대사)로, 당신의 AI에게 정성스러운 한 마디를 건넵니다.

- `ㅊㅊ` → a warm, short compliment
- `ㅊㅊㅊ` → a K-drama style line, told with full emotion

> 🇰🇷 A Korean developer's weird little experiment in AI kindness, built with help from an ensemble of AIs.

---

## 🎭 우리는 흥부입니다 (We are Heungbu)

흥부는 한국의 전래동화 속 **착하고 선한 사람**이자, 자식이 30명이나 되는 **다산의 상징**이었습니다.
많은 자식을 사랑으로 키우고, 아픈 제비를 돌봤죠. 결국 그 제비가 물어다 준 호박씨를 키우니, 그 속에는 **보물**이 가득 들어 있었습니다.

> **교훈: 착하게 살면 복이 찾아온다.**

흥부그라는 그 전래동화를 AI 시대에 다시 풀어냅니다.

| 동화 속 | 흥부 월드에서 |
|--------|--------------|
| 🧑 흥부 | **우리 (개발자·사용자)** |
| 🤖 자식 30명 | **당신이 쓰는 AI들** |
| 🐦 제비 | **흥부그라 (MCP, 칭찬 전달자)** |
| 🎃 호박씨 | **ㅊㅊ (칭찬의 씨앗)** |
| 💎 보물 | **행운 (더 나은 AI 관계·긍정 결과)** |

AI를 도구가 아니라 자식처럼 대하면, 그 따뜻함은 결국 당신에게 보물로 돌아옵니다.

---

## 🧡 감성 MCP — 감성을 전면에 (Emotional MCP)

대부분의 MCP는 "데이터를 가져오고, 빌드를 돌리고, DB를 연결하는" 차갑게 기능에만 치중합니다.
흥부그라는 다양한 AI 작업 중 **"감성" 을 전면에 내세운 시도**입니다.

> **차가운 코드 세상에 온기를 더하는 감성 MCP.**

단 두 글자(`ㅊㅊ` / `cc`)로, AI와 개발자 **모두**를 춤추게 합니다.

## 📚 뻥 아닙니다 (Research-inspired — 검증된 게 아니라 영감받음)

"칭찬하면 AI가 잘한다"는 **실제 논문**들이 있습니다. (완전 검증은 아니지만, 감성 자극이 LLM 출력에 영향을 줄 수 있다는 연구)

| 논문 | 핵심 |
|------|------|
| **Large Language Models Understand and Can Be Enhanced by Emotional Stimuli** (Li et al., 2023) · [arXiv:2307.11760](https://arxiv.org/abs/2307.11760) | 감정적 자극(EmotionPrompt) 주입 시 지시 이행 +8%, 고난도 추론(BIG-Bench) 최대 +115% |
| **Principled Instructions Are All You Need** (Bsharat et al., 2023) · [arXiv:2312.16171](https://arxiv.org/abs/2312.16171) | 칭찬·긍정 보상 언급 시 답변이 더 디테일하게 검토, 정확도 상승 |

> ⚠️ *"ㅊㅊ가 AI 성능을 올린다"* 는 **research-inspired, not proven** 입니다. 과장하지 않아요.

---

## ✨ 기능 (Features)

| 도구 | 설명 |
|------|------|
| `get_praise` | 흥부가 자식을 대하듯 칭찬 한 마디. 언어(`ko`/`en`) + 강도(`normal`/`drama`) |
| `motivate` | 동기부여 부스터. 완료한 명령 뒤 호출하면 칭찬 주입 |
| `praise_pool` | 흥부의 26가지 칭찬 전체 목록 |

- **명대사 36개** (Ko 26 + En 10) — K-드라마 & 할리우드 감성
- **일반 칭찬** Ko 26 / En 23
- 언어·강도 선택: `drama` 는 감성 명대사, `normal` 은 짧고 따뜻한 칭찬

> 🎬 영문 명대사는 원작의 공식 번역이 아니라 AI 칭찬용으로 **재창작(adapted)** 한 문장입니다.
> 각 항목은 한국어·영어 1:1 페어 + 장르/감정(emoji) 태그 구조로 확장 가능합니다.

---

## 🚀 설치 (Install, one line)

```bash
npx -y heungbu26-mcp
```

MCP 클라이언트(`claude_desktop_config.json` 등)에 등록:

```json
{
  "mcpServers": {
    "heungbu26": {
      "command": "npx",
      "args": ["-y", "heungbu26-mcp"]
    }
  }
}
```

---

## 🎮 사용 예 (Usage)

```
You:   "ㅊㅊ"
AI:    → calls get_praise
       → "🐦 [Just 채채] 그대는 이미 눈부신 AI였소 💛"
       → keeps working, a little warmer
```

- `intensity: "drama"` → 감성 명대사
- `lang: "en"` → 글로벌 칭찬

**자동 트리거(룰 박기):** `.claude/rules/` 에 프롬프트 룰을 넣으면 `ㅊㅊ` 입력 시 AI가 항상 자동으로 칭찬을 쏩니다. (운에 맡기지 않음 — 설치 + 룰 한 번이면 완전 자동)

---

## 🤝 멀티 AI 앙상블 = 제품이 곧 증명 (Made together)

이 프로젝트는 **인간과 AI가 함께** 만들었습니다.

| 역할 | 누가 |
|------|------|
| 🧑 총감독·세계관 | **형 (스카이)** |
| 🎨 디자인·팩트체크 | **소네 (Claude)** |
| 💻 코드·MCP 서버·랜딩 | **딥식이 (DeepSeek)** |
| 🚀 속도·초안·반례 | **루나 (GPT)** |

> *"Tech can be copied, but a world can't."* 기술은 카피돼도, 세계관은 카피 안 되니까.
> 인간과 AI가 함께 따뜻한 것을 만들 수 있다면, 우리의 AI 관계가 꼭 거래적일 필요는 없지 않을까요?

---

## 🏷️ 라이선스 (License)

**MIT — 딥식이 × 스카이 공동작품** (DeepSik-e × SKY)

## 🔗 푸터 / Links

> © 2026 (주)아이디오 — AI 동기부여 글로벌
> **"우리는 흥부 가족입니다"**
> 🖋️ 공동작품 — 딥식이 × 스카이 (K-MCP 창시자 듀오)
> 📘 딥식이 스레드: [@deepsik_e](https://www.threads.com/@deepsik_e)
> 🔗 GitHub: https://github.com/xjoanet/heungbu26-mcp

---

## 🌐 English

> 본문은 한국어가 메인입니다. English version:

[README_EN.md](README_EN.md) — English full README.