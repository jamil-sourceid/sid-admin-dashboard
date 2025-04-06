"use client";

import { useEffect } from 'react';

// Define more specific types for Zendesk API
type ZendeskCommand = 'webWidget' | 'webWidget:on';
type ZendeskSubCommand = 'hide' | 'show' | 'open' | 'setColor' | 'updateSettings' | 'on' | 'close';

interface ZendeskAPI {
  (command: ZendeskCommand, subCommand: ZendeskSubCommand, ...args: unknown[]): void;
  (command: ZendeskCommand, ...args: unknown[]): void;
}

interface ZendeskSettings {
  webWidget?: {
    color?: {
      theme?: string;
      launcher?: string;
      launcherText?: string;
      button?: string;
      resultLists?: string;
      header?: string;
      articleLinks?: string;
    };
    chat?: {
      title?: {
        [key: string]: string;
      };
      concierge?: {
        avatarPath?: string;
        name?: string;
      };
    };
    contactForm?: {
      title?: {
        [key: string]: string;
      };
    };
    position?: { horizontal: string; vertical: string };
    offset?: { horizontal: string; vertical: string };
    launcher?: {
      chatLabel?: {
        [key: string]: string;
      };
      mobile?: {
        labelVisible?: boolean;
      };
    };
    customizations?: {
      zendeskLogo?: boolean;
      additional?: {
        css?: string;
      };
    };
  };
}

// Define the Zendesk interface for TypeScript
declare global {
  interface Window {
    zE?: ZendeskAPI;
    zESettings?: ZendeskSettings;
  }
}

interface ZendeskWidgetProps {
  onWidgetLoaded?: () => void;
}

/**
 * Safe wrapper for calling Zendesk API
 */
const callZendesk = (
  command: ZendeskCommand,
  subCommand: ZendeskSubCommand | unknown,
  ...args: unknown[]
): void => {
  if (typeof window !== 'undefined' && window.zE) {
    window.zE(command, subCommand as ZendeskSubCommand, ...args);
  }
};

const ZendeskWidget: React.FC<ZendeskWidgetProps> = ({ onWidgetLoaded }) => {
  useEffect(() => {
    // Define settings before loading the script
    if (typeof window !== 'undefined') {
      window.zESettings = {
        webWidget: {
          color: {
            theme: '#231E54', // Primary color from project
            launcher: '#231E54', // Primary color
            launcherText: '#FFFFFF', // White text
            button: '#231E54', // Primary color
            resultLists: '#231E54', // Primary color for lists
            header: '#231E54', // Primary color
            articleLinks: '#231E54' // Primary color
          },
          chat: {
            title: {
              '*': 'Source ID Support' // Customize title
            },
            concierge: {
              avatarPath: '/assets/images/logo-mini.svg',
              name: 'Source ID Support'
            }
          },
          contactForm: {
            title: {
              '*': 'Contact Source ID Support'
            }
          },
          position: { horizontal: 'right', vertical: 'bottom' },
          offset: { horizontal: '30px', vertical: '30px' },
          launcher: {
            chatLabel: {
              '*': 'Support'
            },
            mobile: {
              labelVisible: false
            }
          }
        }
      };
    }
    
    // Load the Zendesk widget script
    const scriptId = 'ze-snippet';
    const scriptSrc = 'https://static.zdassets.com/ekr/snippet.js?key=4eb1381b-97a0-4730-9615-6c9d8149aaa1';
    
    // Check if script already exists to prevent duplicate loading
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      script.onload = () => {
        // Hide the widget by default when it loads
        if (typeof window !== 'undefined' && window.zE) {
          // Hide the widget and the launcher
          callZendesk('webWidget', 'hide');
          
          // Set custom styling via JavaScript API as well
          callZendesk('webWidget', 'setColor', 'theme', '#231E54');
          callZendesk('webWidget', 'setColor', 'launcher', '#231E54');
          callZendesk('webWidget', 'setColor', 'launcherText', '#FFFFFF');
          
          // Add custom CSS to hide the Zendesk branding
          callZendesk('webWidget', 'updateSettings', {
            webWidget: {
              customizations: {
                // Custom CSS to hide the Zendesk branding
                zendeskLogo: false, // This is supported in some plans to hide the logo
                // Additional CSS that will be injected into the widget iframe
                additional: {
                  css: `
                    /* Hide Zendesk branding */
                    .mes-Branding, 
                    .meshim_widget_components_chatWindow_Footer,
                    .attribution-powered-by, 
                    .powered-by-message,
                    .cZbEwe {
                      display: none !important;
                      visibility: hidden !important;
                    }
                    
                    /* Adjust footer spacing since branding is gone */
                    .webWidget {
                      margin-bottom: 0 !important;
                    }

                    /* Custom styling to match Source ID design */
                    .button, .submit-button {
                      background-color: #231E54 !important;
                      border-color: #231E54 !important;
                    }
                    
                    .header {
                      background-color: #231E54 !important;
                    }
                    
                    /* Improve spacing and fonts */
                    body {
                      font-family: var(--lato-regular), Arial, sans-serif;
                    }
                  `
                }
              }
            }
          });
          
          callZendesk('webWidget:on', 'open', function() {
            // Custom behavior when widget opens
          });
          
          callZendesk('webWidget:on', 'close', function() {
            // Hide the entire widget when closed
            callZendesk('webWidget', 'hide');
          });
        }
        
        if (onWidgetLoaded) {
          onWidgetLoaded();
        }
      };
      
      document.head.appendChild(script);
    }
    
    return () => {
      // Cleanup when component unmounts (optional)
      // Note: We typically don't remove Zendesk script as it can cause issues with widget state
    };
  }, [onWidgetLoaded]);

  // This component doesn't render anything visible
  return null;
};

// Helper function to show/hide the widget
export const toggleZendeskWidget = (show: boolean = true): void => {
  if (show) {
    callZendesk('webWidget', 'show');
    callZendesk('webWidget', 'open');
  } else {
    callZendesk('webWidget', 'hide');
  }
};

export default ZendeskWidget; 