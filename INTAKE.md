# Intake — send this to the client

Copy-paste this the moment they pay. Everything in it maps to one field in
their `content/<slug>.json`, so a complete reply means you never go back and
forth.

---

**Thanks! I need six things. Most people have this in 10 minutes.**

**1. Photos — 12 of them**
Your best recent work. Portrait orientation is ideal but I'll crop anything.
Send originals from your camera roll, not screenshots or Instagram
downloads — those come back blurry on a laptop.

**2. Instagram Insights screenshots**
Professional dashboard → Total followers, then screenshot:
- Age range
- Gender split
- Top cities
- Most active times

**3. Your numbers**
- Average reach per reel (last 30 days)
- Average saves per post
- Engagement rate, if you know it

**4. Your rates**
What you currently charge for a reel, a story set, a carousel, and UGC. If
you don't have rates yet, say so — I'll suggest some from your follower count
and you can adjust.

**5. Brands you've worked with**
Up to six names. Paid, gifted or ambassador all count. Skip if none yet.

**6. The basics**
- Name as you want it displayed
- Handle
- City
- Booking email
- One sentence on what you make and who it's for

---

## What I do with it

| Their reply | Where it goes |
| --- | --- |
| 12 photos | `npm run images -- <slug> <folder>` |
| Insights screenshots | `age`, `cities`, `glance` |
| Numbers | `stats` |
| Rates | `rates` |
| Brands | `brands` |
| Basics | `name`, `handle`, `base`, `email`, `line` |

## Delivery checklist

1. `npm run images -- <slug> ~/Downloads/their-photos`
2. `npm run new -- <slug> <followers>`
3. Fill in every TODO in `content/<slug>.json`
4. `npm run check`
5. Commit and push — live in about a minute
6. Send the link

**Never invent a number.** If they didn't send engagement, ask again. The
whole product is that a brand can trust what's on the page.
