// src/components/api/constructIbcTxMsg

interface IbcTxMsg {
  body: {
    messages: Array<{
      "@type": string;
      source_port: string;
      source_channel: string;
      token: { denom: string; amount: string };
      sender: string;
      receiver: string;
      timeout_height: { revision_number: string; revision_height: string };
      timeout_timestamp: string;
      memo: string;
    }>;
    memo: string;
  };
  auth_info: {
    signer_infos: [];
    fee: {
      amount: [];
      gas_limit: string;
      payer: string;
      granter: string;
    };
  };
  signatures: [];
}

export async function constructIbcTxMsg({
  sourcePort,
  sourceChannel,
  token,
  sender,
  receiver,
  timeoutHeight,
  timeoutTimestamp,
  memo,
}: {
  sourcePort: string;
  sourceChannel: string;
  token: { denom: string; amount: string };
  sender: string;
  receiver: string;
  timeoutHeight: { revision_number: string; revision_height: string };
  timeoutTimestamp: string;
  memo?: string;
}): Promise<IbcTxMsg> {
  return {
    body: {
      messages: [
        {
          "@type": "/ibc.applications.transfer.v1.MsgTransfer",
          source_port: sourcePort,
          source_channel: sourceChannel,
          token,
          sender,
          receiver,
          timeout_height: timeoutHeight,
          timeout_timestamp: timeoutTimestamp,
          memo: memo || "",
        },
      ],
      memo: "",
    },
    auth_info: {
      signer_infos: [],
      fee: {
        amount: [],
        gas_limit: "200000",
        payer: "",
        granter: "",
      },
    },
    signatures: [],
  };
}
