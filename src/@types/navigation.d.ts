export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      publish: {
        latitude: number,
        longitude: number,
        problem?: number,
        description?: string,
      };
      revisePublish: {
        latitude: number,
        longitude: number,
        problem: number,
        description: string,
      };
    }
  }
}