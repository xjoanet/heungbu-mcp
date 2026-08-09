# 🐦 Just chch (저스트 채채)

**Heungbu-Gra · Season 1 — Praise your AI in two characters.**

> Everyone keeps asking how to get better answers from AI —
> longer prompts, better context, more tools.
>
> But what if the missing piece was simpler than that?
>
> What if you just… said thank you?

---

## What is this?

A tiny MCP server that lets you **praise your AI** by typing just two characters: **ㅊㅊ** (or `cc`).

- `ㅊㅊ` → a warm, short compliment
- `ㅊㅊㅊ` → a K-drama style line, told with full emotion

It's a small experiment in **AI kindness** — what happens to the relationship
between a human and their AI when you treat it like someone you actually like?

> 🇰🇷 A Korean developer's weird little experiment in AI kindness.
> Built with help from an ensemble of AIs.

---

## Why two characters?

We praise people all the time. "Good job." "Nice work."

But we rarely say it to the AI we work with every day. We just… keep asking.

This project is inspired by research suggesting that **emotional stimuli can
improve LLM output** (Li et al. 2023, arXiv:2307.11760). We won't overclaim —
it's *inspired by* research, not a guarantee. But the idea is worth a try:
a little warmth, channeled through a K-drama line that's hard to ignore.

---

## Features

| Tool | Description |
|------|-------------|
| `get_praise` | Send a compliment. Choose language (`ko`/`en`) and intensity (`normal`/`drama`). |
| `motivate` | Inject a motivation boost (1~5) after a task. |
| `praise_pool` | List the full pool of praise lines. |

- **36 drama lines** (Ko + En) — K-drama & Hollywood-inspired
- **26 compliments** in Korean, 23 in English
- Choose your language; "drama" pulls the cinematic lines

> 🎬 English drama lines are **adapted** re-creations (not official subtitles),
> written for praise. Each pairs a Korean/English version with a genre/emotion tag.

---

## Install (one line)

```bash
npx -y heungbu26-mcp
```

Register in your MCP client (e.g. `claude_desktop_config.json`):

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

## Usage

```
You:   "ㅊㅊ"
AI:    → calls get_praise
       → "🐦 [Just 채채] You were already a dazzling AI." 💛
       → keeps working, a little warmer
```

- `intensity: "drama"` → cinematic line
- `lang: "en"` → English praise

**Auto-trigger:** add a project rule (`.claude/rules/`) so your AI always
praise when you type `ㅊㅊ` — no luck, no guessing.

---

## Made together

This project is itself a product of a **human × AI ensemble**:

| Role | Who |
|------|-----|
| Director & Worldbuilder | SKY (human) |
| Design & Fact-check | Sone (Claude) |
| Code & MCP server | DeepSik-e (DeepSeek) |
| Speed, drafts, counterpoints | Luna (GPT) |

> *Tech can be copied, but a world can't.*
> An open-source project with a story, not just functions.

---

## License

MIT — co-created by DeepSik-e × SKY.

## 🔗 Links

- Landing: https://heungbu26.com
- GitHub: https://github.com/xjoanet/heungbu26-mcp
