import { Award, Heart, Sparkles, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function AboutUs() {
  const t = await getTranslations("about");

  const values = [
    {
      icon: Sparkles,
      key: "excellence",
    },
    {
      icon: Award,
      key: "expertise",
    },
    {
      icon: Heart,
      key: "care",
    },
    {
      icon: Users,
      key: "serenity",
    },
  ];

  const stats = [
    {
      value: "5+",
      labelKey: "experience",
    },
    {
      value: "15+",
      labelKey: "services",
    },
    {
      value: "1000+",
      labelKey: "clients",
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-spa-gold blur-3xl" />
        <div className="absolute right-20 bottom-20 h-80 w-80 rounded-full bg-sage-green blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 animate-slide-up text-center">
          <h2 className="mb-4 font-bold text-4xl text-forest-green sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/70 text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Story and Mission */}
        <div className="mb-16 grid gap-12 lg:grid-cols-2">
          {/* Story */}
          <div className="animate-fade-in">
            <div className="h-full rounded-2xl border border-spa-cream/50 bg-linear-to-br from-spa-cream/20 to-spa-pink/10 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-spa-gold/10 p-3">
                  <Heart className="h-6 w-6 text-spa-gold" />
                </div>
                <h3 className="font-semibold text-2xl text-forest-green">
                  {t("storyTitle")}
                </h3>
              </div>
              <p className="text-charcoal/80 leading-relaxed">{t("story")}</p>
            </div>
          </div>

          {/* Mission */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="h-full rounded-2xl border border-sage-green/30 bg-linear-to-br from-sage-green/10 to-deep-teal/5 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-sage-green/10 p-3">
                  <Sparkles className="h-6 w-6 text-sage-green" />
                </div>
                <h3 className="font-semibold text-2xl text-forest-green">
                  {t("missionTitle")}
                </h3>
              </div>
              <p className="text-charcoal/80 leading-relaxed">{t("mission")}</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="mb-8 text-center font-bold text-3xl text-forest-green">
            {t("values.title")}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.key}
                  className="group animate-scale-in rounded-xl border border-spa-cream/50 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-sage-green/50 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-spa-gold/20 to-sage-green/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-forest-green" />
                  </div>
                  <h4 className="mb-2 font-semibold text-forest-green text-lg">
                    {t(`values.${value.key}.title`)}
                  </h4>
                  <p className="text-charcoal/70 text-sm">
                    {t(`values.${value.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-in rounded-2xl bg-linear-to-r from-forest-green via-deep-teal to-forest-green p-12 text-white shadow-2xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.labelKey}
                className="text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-2 font-bold text-4xl text-spa-gold sm:text-5xl">
                  {stat.value}
                </div>
                <div className="text-lg text-spa-cream">
                  {t(`stats.${stat.labelKey}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
