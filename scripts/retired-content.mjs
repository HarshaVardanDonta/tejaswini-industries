/**
 * Content document ids that must never be shown on the site.
 *
 * These are the original demo blog posts and "Most Read" entries. They were
 * seeded into Firestore before the real articles existed, and the build and the
 * browser both merge Firestore over the baked seed, so removing them from the
 * seed alone would let them reappear. Anything listed here is dropped from
 * remote content at build time (scripts/build-content.mjs), dropped at runtime
 * (src/cms/repository.ts) and deleted by `npm run seed:firestore`.
 */
export const retiredContentIds = [
  'optimizing-core-performance',
  'transformer-maintenance',
  'arc-flash-standards',
  'iso-audit',
  'cable-routing',
  'trending-01',
  'trending-02',
  'trending-03',
  'trending-04',
]
