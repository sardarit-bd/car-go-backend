import crypto from "crypto";
const isSandbox = process.env.P24_SANDBOX !== "false";
const HOST = isSandbox
    ? "https://sandbox.przelewy24.pl"
    : "https://secure.przelewy24.pl";
const API_BASE = `${HOST}/api/v1`;
const MERCHANT_ID = Number(process.env.P24_MERCHANT_ID);
const POS_ID = Number(process.env.P24_POS_ID || process.env.P24_MERCHANT_ID);
const CRC = process.env.P24_CRC;
const API_KEY = process.env.P24_API_KEY;
function authHeader() {
    const token = Buffer.from(`${POS_ID}:${API_KEY}`).toString("base64");
    return `Basic ${token}`;
}
function sha384(data) {
    return crypto.createHash("sha384").update(JSON.stringify(data)).digest("hex");
}
export async function registerTransaction(params) {
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
    const json = await response.json();
    if (!response.ok || !json?.data?.token) {
        throw new Error(`P24 registerTransaction failed: ${response.status} ${JSON.stringify(json)}`);
    }
    const token = json.data.token;
    return {
        token,
        redirectUrl: `${HOST}/trnRequest/${token}`,
    };
}
export async function verifyTransaction(params) {
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
    const json = await response.json();
    return { ok: response.ok, json };
}
export function calculateNotificationSign(payload) {
    return sha384({ ...payload, crc: CRC });
}
