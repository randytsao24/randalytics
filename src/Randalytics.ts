interface AnalyticsEvent {
  eventName: string;
  timestamp: number;
  properties?: Record<string, any>;
}

interface PageViewEvent extends AnalyticsEvent {
  path: string;
  title: string;
}

interface ClickEvent extends AnalyticsEvent {
  elementId?: string;
  elementClass?: string;
  text?: string;
}

export class Randalytics {
  private static instance: Randalytics;
  private constructor() {}

  public static getInstance(): Randalytics {
    if (!Randalytics.instance) {
      Randalytics.instance = new Randalytics();
    }
    return Randalytics.instance;
  }

  private trackEvent(event: AnalyticsEvent): void {
    // TODO: Send event to backend
    console.log("Analytics Event:", event);
  }

  public trackPageView(): void {
    const event: PageViewEvent = {
      eventName: "page_view",
      timestamp: Date.now(),
      path: window.location.pathname,
      title: document.title,
    };
    this.trackEvent(event);
  }

  public trackClick(element: HTMLElement): void {
    const event: ClickEvent = {
      eventName: "click",
      timestamp: Date.now(),
      elementId: element.id || undefined,
      elementClass: element.className || undefined,
      text: element.textContent || undefined,
    };
    this.trackEvent(event);
  }

  public init(): void {
    this.trackPageView();

    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement) {
        this.trackClick(e.target);
      }
    });

    // Navigation events
    window.addEventListener("popstate", () => {
      this.trackPageView();
    });
  }
}
