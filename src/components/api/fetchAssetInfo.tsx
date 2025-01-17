// src/components/api/fetchAssetInfo

import { API_BASE_URL } from "./config";

interface ChannelDetails {
  counterpartyChannelId: string;
  connectionId: string;
  channelId: string;
  portId: string;
}

export async function fetchChannelDetails(channelId: string, portId: string): Promise<ChannelDetails> {
  const response = await fetch(`${API_BASE_URL}/ibc/core/channel/v1/channels/${channelId}/ports/${portId}`);
  const channelData: {
    channel: { counterparty: { channel_id: string }; connection_hops: string[] };
  } = await response.json();

  return {
    counterpartyChannelId: channelData.channel.counterparty.channel_id,
    connectionId: channelData.channel.connection_hops[0],
    channelId,
    portId,
  };
}