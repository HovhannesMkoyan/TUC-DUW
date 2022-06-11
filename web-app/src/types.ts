export interface NotifyInterface {
  (type: "error" | "success", toUpper: string): void;
}

export interface IBook {
  readonly uuid: string;
  title: string;
  description: string;
  author: string;
  language: string;
  date: string;
  publisher: string;
  pn: string;
  rt: string;
  filename: string;
  cover: string;
  visible: boolean;
}

export interface IUser {
  readonly uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  is_subscribed: boolean;
  dl: number;
  provider: string;
}

export interface ISubscription {
  next_payment_date: string;
  subscription_status:
    | "pending-payment"
    | "active"
    | "pending-cancellation"
    | "cancelled"
    | "expired";
  subscription_type: "monthly" | "yearly";
}

export interface IAuth {
  isLoggedIn: boolean;
  user: {
    uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    is_subscribed: boolean;
    dl: string;
    dgd: string;
    provider: string;
  } | null;
}

export interface IUi {
  showOverPageLoader: boolean;
  hiddenHeader: boolean;
  noHeaderShadow: boolean;
  headerWithOnlyLogo: boolean;
  hiddenFooter: boolean;
  lang: "am" | "en";
}

export interface IState {
  auth: IAuth;
  ui: IUi;
  books: [];
}

export interface Comment {
  body: string;
  author: string;
  date: Date;
}

export type TUserBookActivityStatus = "bookmarked" | "completed" | "inprogress";
