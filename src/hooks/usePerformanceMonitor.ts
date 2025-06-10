import { useEffect } from "react";

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

/**
 * Hook to monitor and log performance metrics
 * Only runs in production to avoid development noise
 */
export const usePerformanceMonitor = () => {
  useEffect(() => {
    // Only monitor performance in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      
      if (!navigation) return;

      const metrics: PerformanceMetrics = {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      };

      // Get paint metrics if available
      const paintEntries = performance.getEntriesByType("paint");
      paintEntries.forEach((entry) => {
        if (entry.name === "first-contentful-paint") {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });

      // Get LCP if available
      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              metrics.largestContentfulPaint = lastEntry.startTime;
            }
          });
          observer.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch (error) {
          console.warn("LCP monitoring not supported:", error);
        }
      }

      // Log metrics (in production, you might want to send these to an analytics service)
      console.log("Performance Metrics:", metrics);

      // Check for performance issues
      if (metrics.loadTime > 3000) {
        console.warn("Slow page load detected:", metrics.loadTime + "ms");
      }

      if (metrics.firstContentfulPaint && metrics.firstContentfulPaint > 2500) {
        console.warn("Slow FCP detected:", metrics.firstContentfulPaint + "ms");
      }
    };

    // Measure performance after page load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
      return () => window.removeEventListener("load", measurePerformance);
    }
  }, []);
};
