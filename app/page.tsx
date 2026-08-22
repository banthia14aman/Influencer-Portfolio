/* ---------------------------------------------------------------------------
 * This is an apology, so it should sound like you and not like me.
 * Rewrite any line below in your own words before you leave it up.
 * ------------------------------------------------------------------------- */
const TO = "Vidhi";
const FROM = "Aman";

const body = [
  "The site that used to be at this link is gone. Every photo of you has been deleted from the page, from the repository behind it, and from its history.",
  "I should have asked you before I put your pictures, your name and your details on a public link, and before I made you the subject of something you never agreed to. That was mine to get wrong. You should not have had to find it and deal with it.",
  "I'm sorry.",
];

const closing =
  "You don't need to reply to this. I won't put anything of yours online again, and if you ever find something still up, it comes down the moment you say so.";

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-20">
      <article className="w-full max-w-xl">
        <p
          className="kicker animate-rise text-blush/60"
          style={{ animationDelay: "120ms" }}
        >
          {TO}
        </p>

        <h1
          className="mt-6 animate-rise font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.02] tracking-[-0.02em]"
          style={{ animationDelay: "260ms" }}
        >
          I&rsquo;ve taken it down.
        </h1>

        <div className="mt-10 space-y-5">
          {body.map((p, i) => (
            <p
              key={i}
              className="animate-rise text-lg leading-relaxed text-paper/75"
              style={{ animationDelay: `${460 + i * 160}ms` }}
            >
              {p}
            </p>
          ))}
        </div>

        <p
          className="mt-10 animate-rise border-t border-blush/15 pt-8 leading-relaxed text-paper/55"
          style={{ animationDelay: "1020ms" }}
        >
          {closing}
        </p>

        <p
          className="kicker mt-10 animate-rise text-paper/45"
          style={{ animationDelay: "1200ms" }}
        >
          {FROM}
        </p>
      </article>
    </main>
  );
}
