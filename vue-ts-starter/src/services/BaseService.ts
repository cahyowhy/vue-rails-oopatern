export default interface BaseService<T> {
  store(T): Promise<boolean>;

  destroy(id: number): Promise<boolean>;

  findById(id: string): Promise<boolean>;

  update(T, param: any): Promise<boolean>;

  findBy(param: any): Promise<boolean>;
}
