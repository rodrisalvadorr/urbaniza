export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: {
        latitude?: number,
        longitude?: number,
        problem?: string,
        description?: string,
        createdAt?: string,
      };
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