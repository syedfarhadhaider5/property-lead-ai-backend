export type LeadIntent =
    | "Greeting"
    | "Property Inquiry"
    | "Buy"
    | "Sell"
    | "Rent"
    | "Invest"
    | "Price Inquiry"
    | "Availability"
    | "Resume Conversation"
    | "Out of Context"
    | "Spam"
    | "Abuse"
    | "Unknown";

export interface IntentDetectionResult {
    intent: LeadIntent;
    confidence: number;
}