import { LitElement, css, html, customElement } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import * as microsoftTeams from "@microsoft/teams-js";


// Set the desired theme
function setTheme(theme: string): void {
  if (theme) {
      // Possible values for theme: 'default', 'light', 'dark' and 'contrast'
      document.body.className = "theme-" + (theme === "default" ? "light" : theme);
  }
}

// Create the URL that Microsoft Teams will load in the tab. You can compose any URL even with query strings.
function createTabUrl(): string {
  console.log(window.location.protocol + "//" + window.location.host);
  return window.location.protocol + "//" + window.location.host;
}

// Call the initialize API first
microsoftTeams.initialize();

// Check the initial theme user chose and respect it
microsoftTeams.getContext(function(context: microsoftTeams.Context): void {
    if (context && context.theme) {
        setTheme(context.theme);
    }
});



@customElement('app-home')
export class AppHome extends LitElement {

  static get styles() {
    return css`
      #welcomeBlock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      #welcomeBlock h2 {
        margin-bottom: 0;
      }

      #welcomeBlock p {
        max-width: 22em;
      }

      #welcomeBlock img {
        width: 6em;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;
      }

      pwa-install::part(openButton) {
        background: grey;
      }

      button {
        cursor: pointer;
      }

      @media(spanning: single-fold-vertical) {
        #welcomeBlock {
          width: 50%;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      })
    }
  }

  

  render() {
    return html`
      <div>

        <div id="welcomeBlock">

          <img src="assets/icons/icon_512.png" alt="app icon">
          <h2>Welcome!</h2>

          <h3>V2</h3>

          <p>
            Welcome to PWAedu! This is a sample PWA to test and highlight features of PWAs!
          </p>

          ${'share' in navigator ? html`<button @click="${this.share}">Share this Starter!</button>` : null}
          <pwa-auth
              microsoftkey="9402ef38-0e2a-4152-8837-47d3a2534d0e"
              googlekey="..."
              facebookkey="...">
          </pwa-auth>
        </div>

        <pwa-install>Install PWAedu</pwa-install>

        Adaptive Card feature:
        <pwb-adapcard>GREAT</pwb-adapcard>

        People Picker feature:
        <mgt-people-picker></mgt-people-picker>
        <br></br>
        Person Graph component:
        <mgt-person person-query="me" show-name show-email></mgt-person>
        
        
        <div
          class="teams-share-button"
          data-href="https://www.pwabuilder.com">
        </div>

        <script>
        microsoftTeams.initialize();
        microsoftTeams.getContext(function(context: microsoftTeams.Context): void {
          if (context && context.theme) {
              setTheme(context.theme);
          }
        });
        </script>
        <p>Last element</p>
        
      </div>
    `;
  }
}