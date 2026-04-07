export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 text-foreground sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(100,95,255,0.35),transparent_42%),radial-gradient(circle_at_bottom,rgba(68,64,216,0.25),transparent_55%),linear-gradient(135deg,rgba(10,10,24,0.92),rgba(19,16,54,0.98))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-[#6f6bff]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-[#2a2790]/35 blur-3xl" />

      <section className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white/75 backdrop-blur-md">
          Fluxer Gaming
        </div>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
          The community built for gamers, by gamers.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
          Jump into Fluxer Gaming for to find teammates, talk about your gaming experiences, share clips and enjoy a nice community!
        </p>

        <a
          href="https://fluxer.gg/eDfgY33P"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-[#4440d8] px-8 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(68,64,216,0.45)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#5b57e3] hover:shadow-[0_28px_70px_rgba(68,64,216,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          Join the Community
        </a>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-center backdrop-blur-md">
            <div className="text-sm font-medium text-white">Looking for Groups?</div>
            <div className="mt-1 text-sm leading-6 text-white/65">
              Find teammates, fire up a squad, and ready up!
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-center backdrop-blur-md">
            <div className="text-sm font-medium text-white">Multilingual</div>
            <div className="mt-1 text-sm leading-6 text-white/65">
              Enjoy an international community with people from all around the world, chatting in multiple languages.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 px-5 py-4 text-center backdrop-blur-md">
            <div className="text-sm font-medium text-white">Fluxer energy</div>
            <div className="mt-1 text-sm leading-6 text-white/65">
              Made on an awesome platform, built for awesome people!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
