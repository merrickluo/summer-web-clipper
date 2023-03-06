export interface Message {
  action: string;
}

type Left = { tag: "left"; error: Error };
type Right<T> = { tag: "right"; value: T };
export type Either<T> = Left | Right<T>;

export function match<T, R>(
  input: Either<T>,
  left: (error: Error) => R,
  right: (value: T) => R
) {
  switch (input.tag) {
    case "left":
      return left(input.error);
    case "right":
      return right(input.value);
  }
}

export function Left<T>(error: Error): Either<T> {
  return { tag: "left", error: error };
}

export function Right<T>(value: T): Either<T> {
  return { tag: "right", value: value };
}
