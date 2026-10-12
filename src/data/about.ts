/**
 * ABOUT PAGE COPY
 * Brand-level copy only. No founding story, bios or credentials have been
 * invented. Add real people to `people` when you're ready and the section
 * appears automatically.
 */
export const about = {
  lede:
    'Every business has things it can’t see because it’s too close to them. We bring the outside view, then stay to build what it reveals.',

  why: {
    title: 'Why creative, marketing and AI belong together',
    paragraphs: [
      'A customer never experiences your brand, your marketing and your systems separately. They see an ad, visit the website, send an enquiry and wait for a reply. If any one of those moments lets them down, the rest suffers.',
      'Yet most businesses buy these things from different people. The designer makes it look good. The marketer brings traffic. Someone else wires up the tools. Each does their part, and the gaps between them are where customers drop off.',
      'Outside In works across all three on purpose. Our creative thinking is sharper because we understand the commercial goal. Our marketing works harder because it’s connected to the systems that follow up. And our AI work is grounded, because it starts with a real business problem rather than a tool looking for a use.',
      'We’re curious, practical and happy to challenge the brief when we think there’s a better answer. If AI isn’t the right fix, we’ll tell you. If the problem is the website and not the ads, you’ll hear that too.',
    ],
  },

  name: [
    {
      title: 'Outside',
      text: 'An outside perspective notices what familiarity hides: the confusing booking step, the message that only makes sense internally, the opportunity everyone walked past.',
    },
    {
      title: 'In',
      text: 'Seeing it is only half the job. We bring that view inside the business and build it in: into the brand, the marketing and the everyday systems your team relies on.',
    },
  ],

  /** Add real team members here, e.g. { name: 'Your Name', role: 'Founder & Creative Director', bio: '...' } */
  people: [] as { name: string; role: string; bio: string }[],

  who: {
    title: 'For businesses ready to do something differently.',
    list: [
      { name: 'Tourism and hospitality', text: 'Visitor experiences, seasonal campaigns and smarter guest communication.' },
      { name: 'Small and medium businesses', text: 'A joined-up creative, marketing and AI team without the overhead of hiring one.' },
      { name: 'Startups and technology', text: 'Brands and websites that explain complex products simply.' },
      { name: 'Events and entertainment', text: 'Campaigns and content systems that keep pace with the day.' },
      { name: 'Larger organisations', text: 'Practical AI pilots, marketing intelligence and campaign support.' },
    ],
  },
};
