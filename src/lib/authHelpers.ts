import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken";

export async function validateJWT(token: string): Promise<JwtPayload | null> {
  try {
    const decoded = await new Promise<JwtPayload | null>((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) reject(err);
        else if (typeof decoded === "object" && decoded !== null) resolve(decoded);
        else reject(new Error("Invalid token"));
      });
    });
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export function getKey(
  _: unknown,
  callback: (err: Error | null, key?: Secret) => void
): void {
  fetch(
    `https://app.dynamicauth.com/api/v0/environments/${process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID}/keys`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_DYNAMIC_BEARER_TOKEN}`,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => {
      const publicKey = json.key.publicKey;
      const pemPublicKey = Buffer.from(publicKey, "base64").toString("ascii");
      callback(null, pemPublicKey);
    })
    .catch((err) => {
      console.error(err);
      callback(err);
    });
}
