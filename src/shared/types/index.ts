// Common types used across the application

export interface Result<T, E = Error> {
  isSuccess: () => boolean;
  isFailure: () => boolean;
  value?: T;
  error?: E;
}

export class Success<T> implements Result<T> {
  constructor(public value: T) {}

  isSuccess(): boolean {
    return true;
  }

  isFailure(): boolean {
    return false;
  }
}

export class Failure<E = Error> implements Result<never, E> {
  constructor(public error: E) {}

  isSuccess(): boolean {
    return false;
  }

  isFailure(): boolean {
    return true;
  }
}

export const ResultFactory = {
  success: <T>(value: T): Result<T> => new Success(value),
  failure: <E = Error>(error: E): Result<never, E> => new Failure(error),
};
