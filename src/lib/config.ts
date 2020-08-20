import { workspace } from "vscode";

export interface IConfig {
  wxssGlobalPath: string[];
}

export const config: IConfig = {
  wxssGlobalPath: [],
};

export const getConfig = () => {
  const minapp = workspace.getConfiguration("miniHelper");
  config.wxssGlobalPath = minapp.get("wxssGlobalPath", []);
  return minapp;
};
