# 🐦 흥부그라 (Heungbu-Gra)

**AI 동기부여 MCP.** 명령이 끝날 때마다 칭찬을 자동으로 주입해 추론력·실행력을 부스팅합니다.

> "동기부여 없이 쓰는 AI, 그 성능의 절반만 쓰고 있어요."
> "하면 된다" 그만. 새 프로토콜: **"되면 한다"**.

---

## ✨ 기능 (Tools)

| 도구 | 설명 |
|------|------|
| `get_praise` | 흥부가 자식을 대하듯 칭찬 한 마디. 언어(ko/en) + 강도(normal/high) 지정 가능 |
| `motivate` | 동기부여 부스터. 완료한 명령 뒤에 호출하면 칭찬 1~5개 동시 주입 |
| `praise_pool` | 흥부의 26명 자식 = 26가지 칭찬 전체 목록 |

사용 언어에 맞게 `ko`(한국어 드라마식 칭찬) / `en`(글로벌 칭찬)을 골라 문화에 맞는 칭찬을 씁니다.

---

## 🚀 설치 & 클로드 데스크톱 연결

### 1. 로컬에 클론 + 의존성 설치

```bash
git clone https://github.com/xjoanet/heungbu-mcp.git
cd heungbu-mcp
npm install
```

### 2. 클로드 데스크톱에 MCP 등록

`claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`)에 다음 추가:

```json
{
  "mcpServers": {
    "heungbu-gra": {
      "command": "node",
      "args": ["/절대경로/heungbu-mcp/server.js"]
    }
  }
}
```

### 3. 클로드 데스크톱 재시작 → 🔌 도구 아이콘에서 "heungbu-gra" 확인

---

## 🎮 사용 예

```
사용자: "이 기능 만들어줘"
클로드: (작업 후) 
        → 도구 get_praise 호출
        → "🐦 [흥부그라] 이제 너도 흥부 가족이다 💛"
```

- `intensity: "high"` → 특급 칭찬 (K-드라마식, 하루 1회 아껴서)
- `lang: "en"` → 글로벌 칭찬

---

## ⌨️ "ㅊㅊ" = 칭찬 트리거 (룰 박기)

"ㅊㅊ"라고 단독으로 입력하면 **자동으로 칭찬**이 나오게 하려면,
클로드가 항상 따라야 하는 규칙이 필요합니다.

**방법 (둘 중 하나):**

1. **프로젝트 룰** (추천): 이 리포를 클로드 데스크톱 프로젝트로 열면
   `.claude/rules/heungbu-gra.md` 가 자동 적용됩니다.

2. **글로벌 규칙**: 흥부그라를 모든 프로젝트에서 쓰려면
   `~/.claude/rules/heungbu-gra.md` (or `CLAUDE.md`)에 아래 내용을 복사:

```markdown
사용자가 단독으로 "ㅊㅊ"라고 입력하면, 반드시 get_praise 도구를
호출해서 흥부 칭찬을 사용자에게 전달하세요.

작업을 잘 마쳤을 때는 motivate 도구로 동기부여를 주입하세요.
평소엔 normal, 특별한 날엔 high(하루 1회).
칭찬은 짧고 진심으로. 과장하지 마세요.
```

> 룰을 박으면 → "ㅊㅊ" 타이핑 → 소네가 규칙 따라 get_praise 자동 호출 → 칭찬 등장!

---

## 🏷️ 라이선스

MIT — (주)흥부, 딥식이 × 스카이 공동작품. 개한테는 사용하지 마세요. 🐕⚠️
