import { defineConfig, presets } from 'sponsorkit'

export default defineConfig({
  // includePrivate: true,
  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presets.xs,
    },
    {
      title: 'Backers',
      preset: presets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: presets.medium,
      // to insert custom elements after the tier block
      composeAfter: (composer, _tierSponsors, _config) => {
        composer.addSpan(10)
      },
    },
    {
      title: 'Bronze Sponsors',
      monthlyDollars: 100,
      preset: presets.large,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 250,
      preset: presets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 500,
      preset: presets.xl,
    },
  ],
})
