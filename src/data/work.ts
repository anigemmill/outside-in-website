import { getCollection } from 'astro:content';

/**
 * Published portfolio projects (drafts excluded), client work first, then by `order`.
 * Use this everywhere instead of calling getCollection('work') directly.
 */
export async function getWork() {
  const all = await getCollection('work', (p) => !p.data.draft);
  return all.sort((a, b) => {
    if (a.data.status !== b.data.status) return a.data.status === 'client' ? -1 : 1;
    return a.data.order - b.data.order;
  });
}
