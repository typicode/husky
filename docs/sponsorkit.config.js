import { defineConfig, tierPresets } from 'sponsorkit'

export default defineConfig({
  github: {
    login: 'typicode',
    type: 'user',
  },
  
  width: 800,
  formats: ['svg', 'png', 'webp'],

  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    {
      title: 'Backers',
      preset: tierPresets.base,
    },
    {
      title: 'Sponsors',
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
    {
      title: 'Bronze Sponsors',
      monthlyDollars: 100,
      preset: tierPresets.large,
    },
    {
      title: 'Silver Sponsors',
      monthlyDollars: 250,
      preset: tierPresets.large,
    },
    {
      title: 'Gold Sponsors',
      monthlyDollars: 500,
      preset: tierPresets.xl,
    },
  ],

  renders: [
    {
      name: 'sponsors',
      formats: ['svg'],
    },
    {
      name: 'sponsors.wide',
      width: 1200,
    },
    {
      name: 'sponsors.circles',
      renderer: 'circles',
      width: 600,
    },
  ],
})
