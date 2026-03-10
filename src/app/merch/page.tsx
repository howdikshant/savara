import Image from "next/image";

const merchItems = [
  { src: "/merch/green_shirt.webp", title: "Savara Black Tee", price: "Rs 350" },
  { src: "/merch/maroon_shirt.webp", title: "Savara Maroon Tee", price: "Rs 350" },
  { src: "/merch/hoodie.webp", title: "Savara Hoodie", price: "Rs 600" },
];

export default function MerchPage() {
  return (
    <main className="relative min-h-screen px-6 pb-20 pt-28 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/media/hero-2560.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.55)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10, 4, 8, 0.45) 0%, rgba(10, 4, 8, 0.7) 60%, rgba(10, 4, 8, 0.82) 100%)",
          }}
        />
        <div
          className="absolute -left-28 top-8 h-72 w-72 rounded-full blur-[120px]"
          style={{ background: "rgba(230, 81, 0, 0.12)" }}
        />
        <div
          className="absolute -right-28 bottom-8 h-72 w-72 rounded-full blur-[120px]"
          style={{ background: "rgba(74, 20, 140, 0.18)" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.35em]"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            color: "rgba(245, 230, 211, 0.6)",
          }}
        >
          Merch
        </p>
        <h1
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-cinzel), serif" }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, #f5e6d3 0%, #f5d5a0 35%, #e65100 60%, #4a148c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Merch
          </span>
        </h1>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            color: "rgba(245, 230, 211, 0.75)",
          }}
        >
          Limited-edition Savara drops are live. Grab yours before stocks run
          out.
        </p>

        <section className="mt-8 grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {merchItems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border"
              style={{
                borderColor: "rgba(212, 165, 116, 0.25)",
                background: "rgba(42, 31, 26, 0.58)",
              }}
            >
              <div className="relative w-full p-3">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <p
                  className="text-sm font-semibold uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-rajdhani), sans-serif",
                    color: "rgba(245, 230, 211, 0.9)",
                  }}
                >
                  {item.title}
                </p>
                <span
                  className="text-sm font-bold uppercase tracking-[0.08em]"
                  style={{
                    fontFamily: "var(--font-rajdhani), sans-serif",
                    color: "var(--savara-gold)",
                  }}
                >
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </section>

        <p
          className="mt-4 inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            fontFamily: "var(--font-rajdhani), sans-serif",
            borderColor: "rgba(212, 165, 116, 0.45)",
            background: "rgba(42, 31, 26, 0.72)",
            color: "rgba(245, 230, 211, 0.92)",
          }}
        >
          Combo offers available!
        </p>

        <section
          className="mt-8 w-full max-w-xl rounded-xl border px-5 py-6 sm:px-6"
          style={{
            borderColor: "rgba(212, 165, 116, 0.25)",
            background: "rgba(42, 31, 26, 0.5)",
          }}
        >
          <h2
            className="text-xl font-bold uppercase"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            Purchase Merch
          </h2>
          <p
            className="mt-2 text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-rajdhani), sans-serif",
              color: "rgba(245, 230, 211, 0.78)",
            }}
          >
            Open the form to place your order.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfhOG8Di5-M9E6sTfN-8ROlYUEhwJIFiFb4W6881jfIm3UP6w/viewform"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em]"
            style={{
              background: "var(--savara-gold)",
              color: "#0a0408",
              fontFamily: "var(--font-rajdhani), sans-serif",
            }}
          >
            Order Now
          </a>
        </section>
      </div>
    </main>
  );
}
