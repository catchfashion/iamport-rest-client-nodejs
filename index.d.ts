
// interface IamportResponse<T = any> {
//     code: number
//     message: string
//     response?: T
// }

type iamportStatus = 'ready' | 'paid' | 'failed' | 'cancelled';

interface IamportPayment {
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

// interface IamportScheduleResult {
//     customer_uid?: string
//     merchant_uid?: string
//     imp_uid?: string
//     schedule_at?: number
//     executed_at?: number
//     revoked_at?: number
//     amount?: number
//     name?: string
//     buyer_name?: string
//     buyer_email?: string
//     buyer_tel?: string
//     buyer_addr?: string
//     buyer_postcode?: string
//     custom_data?: string
//     schedule_status?: 'scheduled' | 'executed' | 'revoked'
//     payment_status?: null | 'paid' | 'failed' | 'cancelled'
//     fail_reason?: string
// }

// interface IamportCustomer {
//     customer_uid: string
//     pg_provider?: string
//     pg_id?: string
//     card_name?: string
//     card_code?: string
//     card_number?: string
//     card_type?: number
//     customer_name?: string
//     customer_tel?: string
//     customer_email?: string
//     customer_addr?: string
//     customer_postcode?: string
//     inserted: number
//     updated: number
// }

interface IamportCertification {
    imp_uid: string
    merchant_uid?: string
    pg_tid?: string
    pg_provider?: string
    name?: string
    gender?: string
    birth?: number
    birthday?: string
    foreigner?: boolean
    certified?: boolean
    certified_at?: number
    unique_key?: string
    unique_in_site?: string
    origin?: string
}

interface IamportBankHolder {
    bank_holder: string;
}

interface IamportEscrows {
    company: string;
    invoice: string;
    sent_at: number;
    applied_at: number;
}

declare class Payments {
    getByImpUid(params:{imp_uid: string}): Promise<IamportPayment>

    getByMerchant(params:{
        merchant_uid: string
        payment_status: iamportStatus
        sorting?: '-started' | 'started' | '-paid' | 'paid' | '-updated' | 'updated'
    }): Promise<IamportPayment>

    getByStatus(params:{
        payment_status: 'all' | iamportStatus
        page?: number
        limit?: number
        from?: number
        to?: number
        sorting?: '-started' | 'started' | '-paid' | 'paid' | '-updated' | 'updated'
    }): Promise<{
        total: number
        previous: number
        next: number
        list: IamportPayment[]
    }>

    cancel(params:{
        imp_uid?: string
        merchant_uid: string
        amount: number
        tax_free?: number
        checksum?: number
        reason: string
        refund_holder?: string
        refund_bank?: string
        refund_account?: string
    }): Promise<IamportPayment>

    prepare(params:{
        merchant_uid: string
        amount: number
    }): Promise<{
        merchant_uid?: string
        amount?: number
    }>

    getPrepare(params:{
        merchant_uid: string
    }): Promise<{
        merchant_uid?: string
        amount?: number
    }>
}

// class Subscribe {
//     onetime(params:{
//         merchant_uid: string
//         amount: number
//         tax_free?: number
//         card_number: string
//         expiry: string
//         birth: string
//         pwd_2digit: string
//         customer_uid?: string
//         pg?: string
//         name?: string
//         buyer_name?: string
//         buyer_email?: string
//         buyer_tel?: string
//         buyer_addr?: string
//         buyer_postcode?: string
//         card_quota?: number
//         custom_data?: string
//         notice_url?: string
//     }): Promise<IamportPayment>

//     again(params:{
//         customer_uid: string
//         merchant_uid: string
//         amount: number
//         tax_free?: number
//         name: string
//         buyer_name?: string
//         buyer_email?: string
//         buyer_tel?: string
//         buyer_addr?: string
//         buyer_postcode?: string
//         card_quota?: number
//         custom_data?: string
//         notice_url?: string
//     }): Promise<IamportPayment>

    // schedule(params:{
    //     customer_uid: string
    //     checking_amount?: number
    //     card_number: string
    //     expiry: string
    //     birth: string
    //     pwd_2digit: string
    //     pg?: string
    //     schedules: Array<{
    //         merchant_uid: string
    //         schedule_at: number
    //         amount: number
    //         tax_free?: number
    //         name?: string
    //         buyer_name?: string
    //         buyer_email?: string
    //         buyer_tel?: string
    //         buyer_addr?: string
    //         buyer_postcode?: string
    //         custom_data?: string
    //         notice_url?: string
    //     }>

    // }): Promise<IamportResponse<IamportScheduleResult[]>>

    // unschedule(params:{
    //     customer_uid: string
    //     merchant_uid?: string[]
    // }): Promise<IamportResponse<IamportScheduleResult[]>>
// }

// class SubscribeCustomer {
//     get(params:{
//         customer_uid: string[] | string
//     }): Promise<IamportResponse<IamportCustomer[]>>

//     create(params:{
//         customer_uid: string
//         pg?: string
//         card_number: string
//         expiry: string
//         birth: string
//         pwd_2digit?: string
//         customer_name?: string
//         customer_tel?: string
//         customer_email?: string
//         customer_addr?: string
//         customer_postcode?: string
//     }): Promise<IamportResponse<IamportCustomer>>

//     delete(params:{
//         customer_uid: string
//     }): Promise<IamportResponse<IamportCustomer>>

// }

// class Certifications {
//     get(params:{imp_uid: string}): Promise<IamportCertification>

//     delete(params:{imp_uid: string}): Promise<IamportCertification>
// }

declare class Vbank {
    create(params:{
        merchant_uid: string
        amount: number
        vbank_code: string
        vbank_due: number
        vbank_holder: string
        name?: string
        buyer_name?: string
        buyer_email?: string
        buyer_tel?: string
        buyer_addr?: string
        buyer_postcode?: string
        pg?: string
        notice_url?: string[]
        custom_data?: string
    }): Promise<IamportPayment>

    getBank(params: {
        bank_code: string,
        bank_num: string
    }): Promise<IamportBankHolder>
}

declare class Escrow {
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
    }): Promise<IamportEscrows>
}

declare class Iamport {
    readonly payment: Payments;
    // readonly subscribe: Subscribe;
    // readonly subscribe_customer: SubscribeCustomer;
    // readonly certification: Certifications;
    readonly vbank: Vbank;
    readonly escrow: Escrow;
    constructor(options?: {
        impKey: string
        impSecret: string
    });
}

export default Iamport;