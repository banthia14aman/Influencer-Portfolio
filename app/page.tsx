/* ---------------------------------------------------------------------------
 * The message. Edit the string below to change what the page says.
 * ------------------------------------------------------------------------- */
const MESSAGE =
  "You could've gotten everything you ever wanted but you had to ruin it all. It doesn't even make me sad just disappointed";

const FROM = "Aman";

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-24">
      <article className="w-full max-w-3xl">
        <p
          className="animate-rise font-display text-[clamp(1.8rem,5vw,3.2rem)] font-bold leading-[1.18] tracking-[-0.02em] text-paper"
          style={{ animationDelay: "180ms" }}
        >
          {MESSAGE}
        </p>

        <p
          className="kicker mt-14 animate-rise text-paper/40"
          style={{ animationDelay: "900ms" }}
        >
          {FROM}
        </p>
      </article>
    </main>
  );
}
