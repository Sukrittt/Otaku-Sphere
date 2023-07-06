import { Balancer } from "react-wrap-balancer";

import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32"
    >
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Discover, Connect, and Explore the Fascinating World of Anime
      </h1>
      <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
        Unleash your Otaku Spirit and Dive into a Captivating Universe of
        Animated Wonders, Where Imagination Knows No Bounds
      </Balancer>
    </section>
  );
}
