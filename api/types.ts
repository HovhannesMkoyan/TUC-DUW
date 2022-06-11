declare namespace Express {
  export interface Request {
    user: any;
  }
  export interface Response {
    user: any;
  }
}

export enum OauthProvider {
  GOOGLE = "google",
  FACEBOOK = "facebook",
  LINKEDIN = "linkedin",
}

export enum UserRole {
  USER = "user",
  PRIVILIGED = "privileged",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export enum SubscriptionType {
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

export enum SubscriptionStatus {
  PENDING_PAYMENT = "pending-payment",
  ACTIVE = "active",
  PENDING_CANCELLATION = "pending-cancellation",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export enum SubscriptionCancellationReason {
  IS_COSTLY = "IS_COSTLY",
  IS_REDUNDANT = "IS_REDUNDANT",
  FOUND_ALTERNATIVE = "FOUND_ALTERNATIVE",
  OTHER_REASON = "OTHER_REASON",
}

export enum EUserBookActivityStatus {
  BOOKMARKED = "bookmarked",
  COMPLETED = "completed",
  INPROGRESS = "inprogress",
}
export type TUserBookActivityStatus = "bookmarked" | "completed" | "inprogress";

export enum EGoalStatus {
  SUCCESS = "success",
  FAILURE = "failure",
  INPROGRESS = "inprogress",
}

// Subscription
export interface ISubscription {
  id: number;
  uuid: string;
  UserId: string;
  user_id: string;
  subscription_type: SubscriptionType;
  subscription_status: SubscriptionStatus;
  next_payment_date: string;
  stripe_sub_id: string;
  stripe_cus_id: string;
  created_at: Date;
  updated_at: Date;
}

// Subscription Cancellation
export interface ISubscriptionCancellation {
  id: number;
  reason: string;
  comment: string;
  UserId: string;
  user_id: string;
  SubscriptionId: string;
  subscription_id: string;
  created_at: Date;
  updated_at: Date;
}

// User
export interface IUser {
  id: number;
  uuid: string;
  firstname?: string;
  lastname: string;
  email: string;
  city: string;
  country: string;
  detailed_geo_info: any;
  provider: OauthProvider;
  provider_id: string;
  downloads_left: number;
  is_subscribed: boolean;
  role: UserRole;
}

// Book
export interface IBook {
  id: number;
  uuid: string;
  title: string;
  description: string;
  author: string;
  language: string;
  date: string;
  publisher: string;
  pages_number: string;
  reading_time: string;
  downloads_number: string;
  filename: string;
  cover: string;
  visible: boolean;
}

// Invoice
export interface IInvoice {
  id: number;
  uuid: string;
  user_id: string;
  subscription_id: string;
  filename: string;
  hosted_invoice_url: string;
  amount_paid: number;
  createdAt: Date;
}

export interface IGoal {
  id: number;
  title: string;
  start_date: any;
  end_date: any;
  total_books_number: number;
  read_books_number: number;
  status: EGoalStatus;
  createdAt: Date;
  UserId: number;
  UserBookActivities: any[];
  update: (obj: any) => {};
}

export interface IControllers {
  userController: any;
  bookController: any;
}

export interface IMappers {
  userMapper: any;
  bookMapper: any;
  subscriptionMapper: any;
}

export interface IServices {
  userService: any;
  bookService: any;
  downloadService: any;
  pdfService: any;
  stripeService: any;
  subscriptionService: any;
  emailService: any;
  invoiceService: any;
  oauthService: any;
  recommendationService: any;
}
