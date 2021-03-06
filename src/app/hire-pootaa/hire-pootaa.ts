interface HirePootaaResponse {
    track_id: string;
    success: boolean;
    message?: string;
}

interface HirePootaaRequest {
    pick_ud_add: string;
    pick_up_lga: string;
    pick_up_state: string;
    pick_up_country: string;
    pick_up_nearest_busstop: string;
    pick_up_date: string;
    pick_up_time: string;
    phone: number;
    delivery_country: string;
    delivery_state: string;
    delivery_lga: string;
    delivery_address: string;
    delivery_busstop: string;
    recipient_name: string;
    recipient_phone: number;
}

interface UploadImageResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: Date;
    tags: object[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean | string;
    url: string;
    secure_url: string;
    original_filename: string;
}

interface HirePootaaItems{
    item: string;
    quantity: number;
    cost: number;
    instructions: string;
    image_url: string;
}

interface MakePaymentRequest {
    track_id: string;
    payment_option: string;
    reference: string
}

interface MakePaymentResponse {
    success: boolean,
    message:string
}

export { HirePootaaRequest, HirePootaaResponse, UploadImageResponse, HirePootaaItems, MakePaymentRequest, MakePaymentResponse };
