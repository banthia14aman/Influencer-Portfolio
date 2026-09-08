# Outreach

`prospects.csv` is gitignored on purpose. It holds real people's names and
contact details, and this is a public repo.

```bash
npm run outreach stats            # pipeline summary + reply/close rates
npm run outreach due              # who needs a follow-up
npm run outreach draft <handle>   # personalised draft
```

## Columns

| Column | Notes |
| --- | --- |
| `bio_link` | `linktree` is the strongest buying signal: they already care about the link they send people to |
| `hook` | One true, specific sentence about their work. **`draft` refuses to run without it** |
| `status` | `new` → `researched` → `contacted` → `replied` → `won` / `lost` / `no-fit` |
| `last_contact` | `YYYY-MM-DD`, drives the follow-up list |

No commas inside fields; the parser is deliberately dumb.

## Rules

- **Never automate sending.** Meta blocks, then bans, DM automation, and
  volume is not the constraint anyway.
- **One follow-up. Never two.**
- **Always honour a no**, first time, no rebuttal. Set `status` to `no-fit`.
- Cold *email* to a business address listed publicly is a legitimate channel
  in the US if you identify yourself, don't fake headers, and honour opt-outs.
  Cold DMs are not, practically speaking.
