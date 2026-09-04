import crypto from "crypto";

const isSandbox = process.env.P24_SANDBOX !== "false";

const HOST = isSandbox
  ? "https://sandbox.przelewy24.pl"
  : "https://secure.przelewy24.pl";

const API_BASE = `${HOST}/api/v1`;

const MERCHANT_ID = Number(process.env.P24_MERCHANT_ID);
const POS_ID = Number(process.env.P24_POS_ID || process.env.P24_MERCHANT_ID);
const CRC = process.env.P24_CRC as string;
const API_KEY = process.env.P24_API_KEY as string;

function authHeader() {
  const token = Buffer.from(`${POS_ID}:${API_KEY}`).toString("base64");
  return `Basic ${token}`;
}

function sha384(data: Record<string, unknown>) {
  return crypto.createHash("sha384").update(JSON.stringify(data)).digest("hex");
}

interface RegisterParams {
  sessionId: string;
  amount: number; // integer, smallest currency unit (grosz): 19.99 PLN -> 1999
  currency?: string;
  description: string;
  email: string;
  urlReturn: string;
  urlStatus: string;
  country?: string;
  language?: string;
}

export async function registerTransaction(params: RegisterParams) {
  const currency = params.currency || "PLN";

  const sign = sha384({
    sessionId: params.sessionId,
    merchantId: MERCHANT_ID,
    amount: params.amount,
    currency,
    crc: CRC,
  });

  const body = {
    merchantId: MERCHANT_ID,
    posId: POS_ID,
    sessionId: params.sessionId,
    amount: params.amount,
    currency,
    description: params.description,
    email: params.email,
    country: params.country || "PL",
    language: params.language || "pl",
    urlReturn: params.urlReturn,
    urlStatus: params.urlStatus,
    timeLimit: 15,
    sign,
  };

  const response = await fetch(`${API_BASE}/transaction/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify(body),
  });

  const json: any = await response.json();

  if (!response.ok || !json?.data?.token) {
    throw new Error(
      `P24 registerTransaction failed: ${response.status} ${JSON.stringify(json)}`,
    );
  }

  const token = json.data.token as string;

  return {
    token,
    redirectUrl: `${HOST}/trnRequest/${token}`,
  };
}

interface VerifyParams {
  sessionId: string;
  orderId: number;
  amount: number;
  currency?: string;
}

export async function verifyTransaction(params: VerifyParams) {
  const currency = params.currency || "PLN";

  const sign = sha384({
    sessionId: params.sessionId,
    orderId: params.orderId,
    amount: params.amount,
    currency,
    crc: CRC,
  });

  const body = {
    merchantId: MERCHANT_ID,
    posId: POS_ID,
    sessionId: params.sessionId,
    amount: params.amount,
    currency,
    orderId: params.orderId,
    sign,
  };

  const response = await fetch(`${API_BASE}/transaction/verify`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader(),
    },
    body: JSON.stringify(body),
  });

  const json: any = await response.json();

  return { ok: response.ok, json };
}

export function calculateNotificationSign(payload: {
  merchantId: number;
  posId: number;
  sessionId: string;
  amount: number;
  originAmount?: number;
  currency: string;
  orderId: number;
  methodId?: number;
  statement?: string;
}) {
  return sha384({ ...payload, crc: CRC });
}
