// src/components/api/fetchIbcInfo

import { API_BASE_URL } from './config';

interface IbcInfo {
  clientId: string;
  counterpartyClientId: string;
  counterpartyConnectionId: string;
  revision_number: string;
  revision_height: string;
}

export async function fetchIbcInfo(
  channelId: string,
  portId: string
): Promise<IbcInfo> {
  const clientStateResponse = await fetch(
    `${API_BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`
  );
  const clientStateData: {
    proof_height: {
      revision_number: string;
      revision_height: string;
    };
  } = await clientStateResponse.json();

  const connectionResponse = await fetch(
    `${API_BASE_URL}/ibc/core/connection/v1/connections/${channelId}`
  );
  const connectionData: {
    connection: {
      client_id: string;
      counterparty: {
        client_id: string;
        connection_id: string;
      };
    };
  } = await connectionResponse.json();

  return {
    clientId: connectionData.connection.client_id,
    counterpartyClientId: connectionData.connection.counterparty.client_id,
    counterpartyConnectionId:
      connectionData.connection.counterparty.connection_id,
    revision_number: clientStateData.proof_height.revision_number,
    revision_height: clientStateData.proof_height.revision_height,
  };
}
