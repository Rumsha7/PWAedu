import { LitElement, css, html, customElement } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';

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
        
        <button @click="${this.openPopup}">BUTTON</button>
      </div>
    `;
  }
  openPopup(e) {
    console.log("openPopup");
  }
}