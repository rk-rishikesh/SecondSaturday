import * as React from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <div className="p-2">
<WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect({ connector })}
    />
    </div>
    
  ));
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <button disabled={!ready} onClick={onClick} class="comic-button">
     Login with {connector.name}
    </button>
  );
}
