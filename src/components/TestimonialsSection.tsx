import { motion } from 'motion/react';
import { SLEEP_STORIES } from '../data/sleepSystems';

export function TestimonialsSection() {
  const [featuredStory, ...secondaryStories] = SLEEP_STORIES;

  return (
    <section id="storie" className="py-20 md:py-28 bg-[#F1F0EC] border-y border-[#111111]/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="pb-8 border-b border-[#111111]/12">
          <h2
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            className="font-serif font-medium text-[#111111] leading-[1.08]"
          >
            Storie di Chi <em className="italic font-normal">Dorme Bene</em>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between p-8 md:p-10 rounded-2xl bg-white border border-[#111111]/10 editorial-shadow"
          >
            <div>
              <span className="text-xs font-semibold text-[#595753]">
                {featuredStory.systemChosen}
              </span>

              <span
                aria-hidden="true"
                className="block font-serif text-6xl leading-none text-[#111111]/20 mt-4 select-none"
              >
                “
              </span>

              <blockquote className="mt-1 font-serif text-2xl md:text-3xl leading-[1.35] text-[#111111]">
                {featuredStory.quote}”
              </blockquote>
            </div>

            <div className="mt-8 pt-5 border-t border-[#111111]/10">
              <p className="text-sm font-semibold text-[#111111]">
                {featuredStory.author} · {featuredStory.city}
              </p>
            </div>
          </motion.article>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryStories.map((story, idx) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx + 1) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col justify-between p-7 rounded-2xl bg-white/90 border border-[#111111]/10 shadow-sm"
              >
                <div>
                  <span className="text-xs font-semibold text-[#595753]">
                    {story.systemChosen}
                  </span>
                  <blockquote className="mt-3 font-serif text-xl leading-relaxed text-[#111111]">
                    “{story.quote}”
                  </blockquote>
                </div>

                <div className="mt-5 pt-4 border-t border-[#111111]/10">
                  <p className="text-sm font-semibold text-[#111111]">
                    {story.author} · {story.city}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
