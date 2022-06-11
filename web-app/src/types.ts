export interface IFile {
  readonly uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  is_subscribed: boolean;
  dl: number;
  provider: string;
}
export interface IUi {
  showOverPageLoader: boolean;
  hiddenHeader: boolean;
}
export interface IState {
  ui: IUi;
}
