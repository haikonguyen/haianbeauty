// TypeScript declarations for Cal.com embed custom elements

declare global {
  namespace Jsx {
    interface IntrinsicElements {
      "cal-inline": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          "data-cal-link": string;
          "data-cal-config"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
