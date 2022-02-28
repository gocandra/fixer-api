export type IAppSettings = {
	DefaultLang: string;
	environment: string;
	ServerRoot: string;
	ServerPort: number;
	ServerOrigins: string;
	projectId: string;
	serviceName: string;
}
export default class AppSettings {
  static DefaultLang: string;
  static environment: string;
  static ServerRoot: string;
  static ServerPort: number;
  static ServerOrigins: string;
  static projectId: string;
  static serviceName: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static init(config: { [key: string]: any }): void {
    this.DefaultLang = config.params.DefaultLang
    this.environment = config.server.Environment
    this.ServerRoot = config.server.Root
    this.ServerPort = config.server.Port
    this.ServerOrigins = config.server.Origins
    this.projectId = config.projectId
    this.serviceName = config.serviceName
  }
}
