function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__circular-spinner`;
  const styleContent = `
    @keyframes circular-spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .${className} {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 6px solid #A499BE;
      border-top-color: #663EFF;
      animation: circular-spinner 1s linear infinite;
      background-color: white;
    }

    .app-loading-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      background-color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      animation: fade-in 0.5s ease-in-out forwards;
    }

    .app-loading-wrap img {
      display: block;
      margin: 0 auto 20px auto;
      max-width: 100%;
      height: auto;
    }

    .spinner-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  
  const oStyle = document.createElement('style');
  const oDiv = document.createElement('div');

  oStyle.id = 'app-loading-style';
  oStyle.innerHTML = styleContent;
  oDiv.className = 'app-loading-wrap';
  oDiv.innerHTML = `
    <div class="spinner-wrap">
      <img src="../src/assets/athena_logo01.png" alt="Loading..." />
      <div class="${className}"><div></div></div>
    </div>
  `;

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle);
      safeDOM.append(document.body, oDiv);
    },
    removeLoading() {
      oDiv.addEventListener('animationend', () => {
        safeDOM.remove(document.head, oStyle);
        safeDOM.remove(document.body, oDiv);
      });
      oDiv.style.animation = 'fade-out 0.5s ease-in-out forwards';
    },
  };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = (ev) => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 4999)