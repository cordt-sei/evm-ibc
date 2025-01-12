// src/components/api/fetchIbcInfo

interface IbcInfo {
  clientId: string;
  counterpartyClientId: string;
  counterpartyConnectionId: string;
}

export async function fetchIbcInfo(connectionId: string): Promise<IbcInfo> {
  const response = await fetch(`https://api.sei.basementnodes.ca/ibc/core/connection/v1/connections/${connectionId}`);
  const connectionData: {
    connection: {
      client_id: string;
      counterparty: {
        client_id: string;
        connection_id: string;
      };
    };
  } = await response.json();
  return {
    clientId: connectionData.connection.client_id,
    counterpartyClientId: connectionData.connection.counterparty.client_id,
    counterpartyConnectionId: connectionData.connection.counterparty.connection_id,
  };
}