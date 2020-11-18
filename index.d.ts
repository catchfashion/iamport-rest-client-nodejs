interface PayResponse {
  amount: number;
  apply_num: string;
  // bank_code: null,
  bank_name: string | null;
  // buyer_addr: null,
  // buyer_email: null,
  // buyer_name: null,
  // buyer_postcode: null,
  // buyer_tel: null,
  // cancel_amount: number,
  // cancel_history: Array<{
  //   "pg_tid": string,
  //   "amount": number,
  //   "cancelled_at": number,
  //   "reason": string,
  //   "receipt_url": string
  // }>,
  // cancel_reason: null | string,
  // cancel_receipt_urls: [],
  // cancelled_at: 0,
  // card_code: null,
  card_name: string | null;
  card_number: string | null;
  // card_quota: 0,
  // card_type: null,
  // cash_receipt_issued: false,
  channel: "pc";
  currency: "KRW";
  custom_data: null;
  escrow: boolean;
  fail_reason: null;
  failed_at: number;
  imp_uid: string;
  merchant_uid: string;
  name: string;
  paid_at: number;
  pay_method: string; // 'card',
  pg_id: string; // 'IP01N',
  pg_provider: string; // 'kcp',
  pg_tid: string;
  receipt_url: string;
  started_at: number; // 1581563330,
  status: "paid" | "ready" | "failed" | "cancelled"; // 'ready',
  // user_agent: 'sorry_not_supported_anymore',
  // vbank_code: string,
  vbank_date: number;
  vbank_holder: string;
  // vbank_issued_at: 0,
  vbank_name: string;
  vbank_num: string;
}

interface CancelResponse {
  cancel_amount: number;
  cancelled_at: number;
  cancel_reason: string;
  // cancel_history: {
  //   pg_tid: string;
  //   amount: number;
  //   cancelled_at: number;
  //   reason: string;
  //   receipt_url: string;
  // }[];
  cancel_receipt_urls: string[];
  // cash_receipt_issued: boolean;
}

declare class Iamport {

  public readonly payment: {
    getByImpUid(options: { imp_uid: string }): Promise<PayResponse>;
    getByMerchant(options: { merchant_uid: string }): Promise<any>;
    cancel(body: {
      merchant_uid: string;
      amount: number;
      reason: string;
      tax_free?: number;
      checksum?: number;
      refund_holder?: string;
      refund_bank?: string;
      refund_account?: string;
    }): Promise<PayResponse & CancelResponse>;
  };
  public readonly vbank: {
    getBank(params: {
      bank_code: string,
      bank_num: string
    }): Promise<{ bank_holder: string; }>;
    deleteVbank(params: {
      imp_uid: string
    }): Promise<PayResponse & CancelResponse>;
  };
  public readonly escrow: {
    postEscrow(params: {
      imp_uid: string;
      sender: {
          name: string;
          tel: string;
          addr: string;
          postcode: string;
      },
      receiver: {
          name: string;
          tel: string;
          addr: string;
          postcode: string;
      },
      logis: {
          company: string;
          invoice: string;
          sent_at: number;
      }
  }): Promise<{
    company: string;
    invoice: string;
    sent_at: number;
    applied_at: number;
  }>};

  public readonly subscribe: {
    onetime(params: {
      merchant_uid: string;
      amount: number;
      card_number: string;
      expiry: string;
      birth: string;
      pg: string;
      pwd_2digit?: string;
      voucher?: number;
      name?: string;
      buyer_name?: string;
      buyer_email?: string;
      buyer_tel?: string;
      buyer_addr?: string;
      buyer_postcode?: string;
      custom_data?: string;
      tax_free?: number;
      customer_uid?: string;
    }): Promise<PayResponse>;
  }

  constructor(options?: {
    impKey: string,
    impSecret: string,
  })
}
export default Iamport;
