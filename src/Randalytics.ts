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

type EventHandler = (event: AnalyticsEvent) => void | Promise<void>;

export class Randalytics {
  private static instance: Randalytics;
  private onEvent: EventHandler;

  private constructor(onEvent: EventHandler) {
    this.onEvent = onEvent;
  }

  public static getInstance(onEvent?: EventHandler): Randalytics {
    if (!Randalytics.instance) {
      if (onEvent) {
        Randalytics.instance = new Randalytics(onEvent);
      } else {
        const defaultHandler = (event: AnalyticsEvent) => {
          console.log("Randalytics event:", event);
        };
        Randalytics.instance = new Randalytics(defaultHandler);
      }
    }

    return Randalytics.instance;
  }

  private sendEvent(event: AnalyticsEvent): void {
    this.onEvent(event);
  }

  public trackPageView(): void {
    const event: PageViewEvent = {
      eventName: "page_view",
      timestamp: Date.now(),
      path: window.location.pathname,
      title: document.title,
    };

    this.sendEvent(event);
  }

  public trackClick(element: HTMLElement): void {
    const event: ClickEvent = {
      eventName: "click",
      timestamp: Date.now(),
      elementId: element.id || undefined,
      elementClass: element.className || undefined,
      text: element.textContent || undefined,
    };

    this.sendEvent(event);
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
