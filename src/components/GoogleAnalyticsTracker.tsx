import { useGoogleAnalytics } from "@/src/hooks/useGoogleAnalytics";

// Component to track page views in React SPA
const GoogleAnalyticsTracker = () => {
  useGoogleAnalytics();
  return null; // This component doesn't render anything
};

export default GoogleAnalyticsTracker;
