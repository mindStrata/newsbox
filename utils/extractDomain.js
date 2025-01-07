export function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname; // Extract hostname
    const parts = hostname.replace(/^www\./, "").split("."); // Remove 'www.' and split by dots

    if (parts.length > 2) {
      // Handle subdomain.domain.com
      const subdomain = parts.slice(0, -2).join(" ").toUpperCase(); // Combine subdomain(s)
      const domain = parts.slice(-2, -1)[0].toUpperCase(); // Extract main domain
      return `${domain} ${subdomain}`.trim(); // Format as "DOMAIN SUBDOMAIN"
    } else {
      // Handle domain.com
      return parts[0].toUpperCase(); // Use the main domain
    }
  } catch (error) {
    // console.error("Invalid URL:", error);
    return "UNKNOWN"; // Fallback
  }
}
