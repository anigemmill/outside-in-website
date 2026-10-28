/**
 * The approach stages. Used on /approach/ and in the homepage's Approach section.
 */
export interface Stage { n: string; name: string; text: string; youGet: string }

export const stages: Stage[] = [
  {
    n: '01', name: 'Look outside',
    text: 'We start where your customers are. How do they find you, what do they compare you with, and what do they see that you might not? We look at your audience, your market and your competitors with fresh eyes.',
    youGet: 'A clear picture of how you’re seen from outside',
  },
  {
    n: '02', name: 'Look inside',
    text: 'Then we look at how the business works: goals, team, tools, data and the jobs that eat time. This is where we agree what success means and how we’ll measure it.',
    youGet: 'An agreed goal, a baseline and a measure',
  },
  {
    n: '03', name: 'Decide',
    text: 'The strategy lives where the two views meet. We recommend what to do, what to leave alone and in what order, with effort and value spelled out so the choice is yours.',
    youGet: 'A prioritised plan you can say yes or no to',
  },
  {
    n: '04', name: 'Build',
    text: 'Then we make it: brand, website, campaign, content, automation or AI system. You see work early and often, so there are no big reveals that miss the point.',
    youGet: 'Finished work, documented and handed over',
  },
  {
    n: '05', name: 'Measure and refine',
    text: 'We check results against the goal we agreed in stage two and improve what isn’t working. For ongoing partners, this becomes the monthly rhythm.',
    youGet: 'A report that ends with a recommendation',
  },
];
