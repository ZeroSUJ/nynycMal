import React from "react";

export default function ChangenowWidget() {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://changenow.io/embeds/exchange-widget/v2/stepper-connector.js';
    script.async = true;
    const timerId = setTimeout(() => {
      document.body.appendChild(script);
    }, 0);
    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
      <div>
        <iframe id='iframe-widget' src='https://changenow.io/embeds/exchange-widget/v2/widget.html?FAQ=true&amount=0.1&amountFiat=1500&backgroundColor=FFFFFF&darkMode=false&from=btc&fromFiat=eur&horizontal=false&isFiat&lang=en-US&link_id=a245f5439863a9&locales=true&logo=true&primaryColor=00C26F&to=eth&toFiat=eth&toTheMoon=true' style={{height: "356px", width: "100%", border: "none"}}></iframe>
      </div>
  )
}
