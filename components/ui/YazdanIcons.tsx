import React from "react";

export interface YazdanIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// ─────────────────────────────────────────────────────────────
// 1. Yazdan Diamond Star (Brand Signet Accent)
// ─────────────────────────────────────────────────────────────
export function YazdanStarIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <linearGradient id="yzStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#AA771C" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L13.8 9.2L21 11L13.8 12.8L12 20L10.2 12.8L3 11L10.2 9.2L12 2Z"
        fill="url(#yzStarGrad)"
      />
      <circle cx="12" cy="11" r="1.5" fill="#FFF8E7" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. Direct Tech Team / Core Engineers (Why Choose Us - Card 1)
// Bespoke: Dual interlocking architectural engineer silhouettes connected by a central Yazdan Star
// ─────────────────────────────────────────────────────────────
export function YazdanDirectTeamIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzTeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      {/* Primary Engineer Archetype */}
      <circle cx="9" cy="7" r="3.2" stroke="url(#yzTeamGrad)" fill="url(#yzTeamGrad)" fillOpacity="0.12" />
      <path
        d="M3 19.5C3 15.8 5.8 13.2 9 13.2C10.6 13.2 12.1 13.8 13.2 14.8"
        stroke="url(#yzTeamGrad)"
      />
      
      {/* Secondary Tech Lead Node */}
      <path
        d="M15 4.5C16.5 4.8 17.5 6 17.5 7.5C17.5 8.9 16.6 10 15.3 10.4"
        stroke="url(#yzTeamGrad)"
        strokeDasharray="0.2 1"
        strokeLinecap="round"
      />
      <path
        d="M16 13.5C18.8 14 21 16.2 21 19.5"
        stroke="url(#yzTeamGrad)"
      />

      {/* Central Yazdan Direct-Link Star */}
      <path
        d="M14.5 12L15.3 14.2L17.5 15L15.3 15.8L14.5 18L13.7 15.8L11.5 15L13.7 14.2L14.5 12Z"
        fill="url(#yzTeamGrad)"
        stroke="none"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. Step-by-Step Delivery & Roadmap (Why Choose Us - Card 2)
// Bespoke: Curved ascending constellation path with precision diamond-star milestone nodes
// ─────────────────────────────────────────────────────────────
export function YazdanRoadmapIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzRoadGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#FFF2B2" />
        </linearGradient>
      </defs>
      {/* Flowing Precision Path */}
      <path
        d="M4 18.5C7.5 18.5 8 13.5 12 13.5C16 13.5 16.5 6 20 6"
        stroke="url(#yzRoadGrad)"
        strokeDasharray="2.5 1.5"
      />
      
      {/* Milestone 1: Origin Foundation */}
      <circle cx="4" cy="18.5" r="2.2" stroke="url(#yzRoadGrad)" fill="url(#yzRoadGrad)" fillOpacity="0.2" />
      <circle cx="4" cy="18.5" r="0.8" fill="#FFF8E7" />

      {/* Milestone 2: Midpoint Architecture Diamond */}
      <rect
        x="10.8"
        y="12.3"
        width="2.4"
        height="2.4"
        transform="rotate(45 12 13.5)"
        stroke="url(#yzRoadGrad)"
        fill="url(#yzRoadGrad)"
      />

      {/* Milestone 3: Peak Launch Rocket/Star */}
      <path
        d="M20 3L21 5.5L23.5 6.5L21 7.5L20 10L19 7.5L16.5 6.5L19 5.5L20 3Z"
        fill="url(#yzRoadGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. High Velocity & Supersonic Speed (Why Choose Us - Card 3 & Hero)
// Bespoke: Multi-faceted geometric aerodynamic crystal bolt with speed fins
// ─────────────────────────────────────────────────────────────
export function YazdanVelocityIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzVoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="45%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Main Faceted Lightning Blade */}
      <path
        d="M13.5 2.5L5 13H12L10.5 21.5L19 11H12L13.5 2.5Z"
        stroke="url(#yzVoltGrad)"
        fill="url(#yzVoltGrad)"
        fillOpacity="0.14"
      />
      {/* Inner Accent Ray */}
      <path
        d="M10.8 7.5L8.5 13H12.5"
        stroke="url(#yzVoltGrad)"
        strokeWidth={1.3}
        strokeLinecap="round"
      />
      {/* Speed Trails */}
      <path d="M4 8.5H2" stroke="url(#yzVoltGrad)" strokeWidth={1.4} opacity={0.6} />
      <path d="M5.5 5H3.5" stroke="url(#yzVoltGrad)" strokeWidth={1.4} opacity={0.4} />
      <path d="M22 15.5H20" stroke="url(#yzVoltGrad)" strokeWidth={1.4} opacity={0.6} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. Full Transparency & Code Ownership Shield (Why Choose Us - Card 4 & Hero)
// Bespoke: Hexagonal luxury armor shield with engraved Yazdan star and keyhole notch
// ─────────────────────────────────────────────────────────────
export function YazdanShieldArmorIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Outer Armor Crest */}
      <path
        d="M12 2.5L20 6.2V12.2C20 17.2 16.5 20.8 12 22C7.5 20.8 4 17.2 4 12.2V6.2L12 2.5Z"
        stroke="url(#yzShieldGrad)"
        fill="url(#yzShieldGrad)"
        fillOpacity="0.1"
      />
      {/* Inner Concentric Bevel */}
      <path
        d="M12 5.8L17.5 8.4V12.3C17.5 15.8 15.1 18.5 12 19.5C8.9 18.5 6.5 15.8 6.5 12.3V8.4L12 5.8Z"
        stroke="url(#yzShieldGrad)"
        strokeWidth={1.1}
        strokeDasharray="1.5 1"
        opacity={0.7}
      />
      {/* Central Star Crest */}
      <path
        d="M12 9.5L12.7 11.5L14.7 12.2L12.7 12.9L12 14.9L11.3 12.9L9.3 12.2L11.3 11.5L12 9.5Z"
        fill="url(#yzShieldGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. Premium Quality Gemstone (Hero Strip - Card 1)
// Bespoke: Brilliant-cut geometric diamond with fine light reflections
// ─────────────────────────────────────────────────────────────
export function YazdanGemstoneIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzGemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="45%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Outer Facets */}
      <path
        d="M6 3.5H18L22 9.5L12 21.5L2 9.5L6 3.5Z"
        stroke="url(#yzGemGrad)"
        fill="url(#yzGemGrad)"
        fillOpacity="0.12"
      />
      {/* Table & Crown Facets */}
      <path d="M2 9.5H22" stroke="url(#yzGemGrad)" />
      <path d="M12 21.5L8.5 9.5L6 3.5" stroke="url(#yzGemGrad)" />
      <path d="M12 21.5L15.5 9.5L18 3.5" stroke="url(#yzGemGrad)" />
      <path d="M8.5 9.5L12 3.5L15.5 9.5" stroke="url(#yzGemGrad)" strokeWidth={1.2} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. 24/7 Concierge Support (Hero Strip - Card 4)
// Bespoke: Luxury studio acoustic halo headset with sound harmonics & star node
// ─────────────────────────────────────────────────────────────
export function YazdanConciergeIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      {/* Arch Crown */}
      <path
        d="M3.5 13V11C3.5 6.3 7.3 2.5 12 2.5C16.7 2.5 20.5 6.3 20.5 11V13"
        stroke="url(#yzHeadGrad)"
      />
      {/* Left Acoustic Capsule */}
      <rect
        x="2.5"
        y="12"
        width="4"
        height="6.5"
        rx="2"
        stroke="url(#yzHeadGrad)"
        fill="url(#yzHeadGrad)"
        fillOpacity="0.2"
      />
      {/* Right Acoustic Capsule */}
      <rect
        x="17.5"
        y="12"
        width="4"
        height="6.5"
        rx="2"
        stroke="url(#yzHeadGrad)"
        fill="url(#yzHeadGrad)"
        fillOpacity="0.2"
      />
      {/* Concierge Mic Boom with Star Node */}
      <path
        d="M19.5 17V19C19.5 20.4 18.4 21.5 17 21.5H13"
        stroke="url(#yzHeadGrad)"
      />
      <circle cx="12" cy="21.5" r="1.3" fill="url(#yzHeadGrad)" />
      {/* Sound Wave Accent */}
      <path d="M10 8C10.7 7.4 11.3 7 12 7C12.7 7 13.3 7.4 14 8" stroke="url(#yzHeadGrad)" strokeWidth={1.2} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. Cloud Solutions & Architecture (Expertise Card 1)
// Bespoke: Sleek multi-tiered cloud platform with integrated database server slab
// ─────────────────────────────────────────────────────────────
export function YazdanCloudPlatformIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzCloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Floating Cloud Arch */}
      <path
        d="M6.5 15.5C4 15.5 2 13.5 2 11C2 8.7 3.7 6.8 6 6.5C7 4.2 9.4 2.5 12.2 2.5C15.6 2.5 18.4 4.8 19 8C20.7 8.3 22 9.8 22 11.5C22 13.7 20.2 15.5 18 15.5"
        stroke="url(#yzCloudGrad)"
        fill="url(#yzCloudGrad)"
        fillOpacity="0.1"
      />
      {/* High-speed Server Base Slab */}
      <rect x="5" y="17.5" width="14" height="4" rx="1.5" stroke="url(#yzCloudGrad)" />
      <circle cx="8" cy="19.5" r="0.75" fill="url(#yzCloudGrad)" />
      <path d="M12 19.5H16" stroke="url(#yzCloudGrad)" strokeWidth={1.2} />
      {/* Downlink Beam */}
      <path d="M12 12V15" stroke="url(#yzCloudGrad)" strokeDasharray="1 1" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. AI Neural Core & Automation (Expertise Card 2)
// Bespoke: Quantum processor silicon die with diagonal neural pathways and central Yazdan Star
// ─────────────────────────────────────────────────────────────
export function YazdanNeuralCoreIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzAIGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Processor Die Frame */}
      <rect
        x="5.5"
        y="5.5"
        width="13"
        height="13"
        rx="2.5"
        stroke="url(#yzAIGrad)"
        fill="url(#yzAIGrad)"
        fillOpacity="0.12"
      />
      {/* Pins - North, South, East, West */}
      <path d="M9 2V5.5M15 2V5.5" stroke="url(#yzAIGrad)" />
      <path d="M9 18.5V22M15 18.5V22" stroke="url(#yzAIGrad)" />
      <path d="M2 9H5.5M2 15H5.5" stroke="url(#yzAIGrad)" />
      <path d="M18.5 9H22M18.5 15H22" stroke="url(#yzAIGrad)" />

      {/* Central Quantum Neural Diamond */}
      <path
        d="M12 8.5L13.2 10.8L15.5 12L13.2 13.2L12 15.5L10.8 13.2L8.5 12L10.8 10.8L12 8.5Z"
        fill="url(#yzAIGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. Global Standards & Cryptographic Security (Expertise Card 3)
// Bespoke: Orbital cryptographic globe with meridian rings and gold padlock core
// ─────────────────────────────────────────────────────────────
export function YazdanCryptoGlobeIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzGlobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      {/* Sphere Outer */}
      <circle cx="12" cy="12" r="9.5" stroke="url(#yzGlobeGrad)" />
      {/* Meridians */}
      <ellipse cx="12" cy="12" rx="4.5" ry="9.5" stroke="url(#yzGlobeGrad)" strokeDasharray="2 1.5" />
      <path d="M2.8 12H21.2" stroke="url(#yzGlobeGrad)" />
      {/* Cryptographic Keyhole Lock Overlay in Foreground */}
      <circle cx="12" cy="12" r="3.2" fill="#090807" stroke="url(#yzGlobeGrad)" strokeWidth={1.4} />
      <circle cx="12" cy="11.2" r="0.9" fill="url(#yzGlobeGrad)" />
      <path d="M12 12.1V13.8" stroke="url(#yzGlobeGrad)" strokeWidth={1.2} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 11. Interactive Live Viewport & Portals (Expertise Card 4)
// Bespoke: Floating multi-layer perspective screen with live cursor and code bar
// ─────────────────────────────────────────────────────────────
export function YazdanInteractivePortalIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzPortalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Main Studio Viewport */}
      <rect
        x="3"
        y="4"
        width="18"
        height="14"
        rx="2.5"
        stroke="url(#yzPortalGrad)"
        fill="url(#yzPortalGrad)"
        fillOpacity="0.1"
      />
      {/* Top Header Dots */}
      <circle cx="6.5" cy="7.5" r="0.8" fill="url(#yzPortalGrad)" />
      <circle cx="9" cy="7.5" r="0.8" fill="url(#yzPortalGrad)" opacity={0.6} />
      <path d="M3 10.5H21" stroke="url(#yzPortalGrad)" strokeWidth={1} />
      
      {/* Interactive Element: Live Play/Cursor */}
      <path
        d="M10 13.5L14.5 15.5L12.5 16.5L11.5 18.5L10 13.5Z"
        fill="url(#yzPortalGrad)"
        stroke="url(#yzPortalGrad)"
        strokeWidth={1}
      />
      {/* Base Pedestal */}
      <path d="M8 21H16" stroke="url(#yzPortalGrad)" strokeWidth={1.6} />
      <path d="M12 18V21" stroke="url(#yzPortalGrad)" strokeWidth={1.6} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 12. Strategic Investment & Exponential Growth (Expertise Card 5)
// Bespoke: Stepped architectural growth bars with surging supersonic arrowhead
// ─────────────────────────────────────────────────────────────
export function YazdanGrowthStrategyIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzGrowthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#FFF2B2" />
        </linearGradient>
      </defs>
      {/* Financial Horizon Axis */}
      <path d="M3 20.5H21" stroke="url(#yzGrowthGrad)" strokeWidth={1.4} />

      {/* Tier 1 Column */}
      <rect x="4.5" y="14.5" width="3" height="6" rx="0.8" stroke="url(#yzGrowthGrad)" fill="url(#yzGrowthGrad)" fillOpacity="0.2" />
      {/* Tier 2 Column */}
      <rect x="9.5" y="10.5" width="3" height="10" rx="0.8" stroke="url(#yzGrowthGrad)" fill="url(#yzGrowthGrad)" fillOpacity="0.3" />
      {/* Tier 3 Column */}
      <rect x="14.5" y="6.5" width="3" height="14" rx="0.8" stroke="url(#yzGrowthGrad)" fill="url(#yzGrowthGrad)" fillOpacity="0.45" />

      {/* Surging Arrow Vector */}
      <path
        d="M6 11L11 6.5L15 9.5L20.5 3.5"
        stroke="url(#yzGrowthGrad)"
        strokeWidth={1.8}
      />
      <path
        d="M17 3.5H20.5V7"
        stroke="url(#yzGrowthGrad)"
        strokeWidth={1.8}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 13. Clean Code Architecture & Refactoring (Expertise Card 6)
// Bespoke: Angular stylized code chevron brackets enclosing a golden compiler node
// ─────────────────────────────────────────────────────────────
export function YazdanCodeArchitectureIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzCodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      {/* Left Chevron Bracket */}
      <path
        d="M8.5 7L3.5 12L8.5 17"
        stroke="url(#yzCodeGrad)"
        strokeWidth={1.8}
      />
      {/* Right Chevron Bracket */}
      <path
        d="M15.5 7L20.5 12L15.5 17"
        stroke="url(#yzCodeGrad)"
        strokeWidth={1.8}
      />
      {/* Central Architectural Slash with Diamond Node */}
      <path
        d="M13.5 4.5L10.5 19.5"
        stroke="url(#yzCodeGrad)"
        strokeWidth={1.5}
      />
      <rect
        x="11"
        y="11"
        width="2"
        height="2"
        transform="rotate(45 12 12)"
        fill="url(#yzCodeGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 14. Live Project Monitor CTA (Hero Action Button)
// Bespoke: Sleek studio display with golden prism play button
// ─────────────────────────────────────────────────────────────
export function YazdanMonitorActionIcon({ className = "w-4 h-4", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
      <path d="M10 7.5L15 10L10 12.5V7.5Z" fill="currentColor" />
      <path d="M8 20.5H16" />
      <path d="M12 16.5V20.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 15. Luxury Order / Cart CTA (Hero Action Button & Order Configurator)
// Bespoke: High-end jewel portfolio briefcase / tote
// ─────────────────────────────────────────────────────────────
export function YazdanOrderCartIcon({ className = "w-4 h-4", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 7V5C6 3.3 7.3 2 9 2H15C16.7 2 18 3.3 18 5V7" />
      <rect x="3.5" y="7" width="17" height="14" rx="2.5" />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" />
      <path d="M9 13H7M17 13H15" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 16. Luxury WhatsApp Communication Icon
// Bespoke: Sleek rounded speech capsule with golden handset & audio pulse
// ─────────────────────────────────────────────────────────────
export function YazdanWhatsAppIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzWaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      <path
        d="M21 11.5C21 16.2 17.2 20 12.5 20C10.8 20 9.2 19.5 7.8 18.6L3 20L4.5 15.4C3.6 14.2 3 12.8 3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 21 6.8 21 11.5Z"
        stroke="url(#yzWaGrad)"
        fill="url(#yzWaGrad)"
        fillOpacity="0.12"
      />
      <path
        d="M9 8.5C9 9.8 10.2 12.5 12 14.2C13.2 15.5 14.5 15.5 15.2 14.8L16 13.8C16.2 13.5 16.2 13 15.8 12.8L14.2 12C13.8 11.8 13.4 11.9 13.1 12.2L12.5 12.8C11.5 12.2 10.8 11.5 10.2 10.5L10.8 9.9C11.1 9.6 11.2 9.2 11 8.8L10.2 7.2C10 6.8 9.5 6.8 9.2 7L8.2 7.8C7.5 8.5 7.8 9.8 9 8.5Z"
        stroke="url(#yzWaGrad)"
        fill="url(#yzWaGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 17. Luxury Official Mail Icon
// Bespoke: Faceted origami correspondence envelope with Yazdan Star seal
// ─────────────────────────────────────────────────────────────
export function YazdanMailIcon({ className = "w-5 h-5", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id="yzMailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#E5C396" />
          <stop offset="100%" stopColor="#C5A059" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="url(#yzMailGrad)"
        fill="url(#yzMailGrad)"
        fillOpacity="0.1"
      />
      <path d="M3 6.5L12 13.5L21 6.5" stroke="url(#yzMailGrad)" />
      {/* Central Yazdan Diamond Stamp */}
      <path
        d="M12 11.5L12.7 13.2L14.5 13.8L12.7 14.5L12 16.2L11.3 14.5L9.5 13.8L11.3 13.2L12 11.5Z"
        fill="url(#yzMailGrad)"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 18. Luxury Send / Dispatch Icon
// Bespoke: Angular aerodynamic supersonic flight chevron
// ─────────────────────────────────────────────────────────────
export function YazdanSendActionIcon({ className = "w-4 h-4", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 19. Luxury Consultation / Handshake Partnership Icon
// Bespoke: Sleek interlocking geometric hands with central Yazdan Star
// ─────────────────────────────────────────────────────────────
export function YazdanConsultationIcon({ className = "w-4 h-4", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M11 17L14 20L19 15L15 11" />
      <path d="M13 7L10 4L5 9L9 13" />
      <path d="M2 14L8 8" />
      <path d="M16 16L22 10" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 20. Luxury Nav Globe (Theme Adaptive currentColor)
// ─────────────────────────────────────────────────────────────
export function YazdanNavGlobeIcon({ className = "w-4 h-4", size, ...props }: YazdanIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9.5" />
      <ellipse cx="12" cy="12" rx="4.5" ry="9.5" />
      <path d="M2.8 12H21.2" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

