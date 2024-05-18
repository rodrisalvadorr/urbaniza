export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: {
        reload?: boolean,
      },
      publish: {
        latitude: number,
        longitude: number,
        problem?: string,
        description?: string,
      };
      revisePublish: {
        latitude: number,
        longitude: number,
        problem: string,
        description: string,
      };
    }
  }
}