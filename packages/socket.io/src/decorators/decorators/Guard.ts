import { ClassMethodDecorator, Modifier } from "@discordx/internal";
import {
  DEvent,
  DGuard,
  DWs,
  GuardFunction,
  MetadataStorage,
} from "../../index.js";
import { Method } from "../classes/Method.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Guard<Type = any>(
  ...fns: GuardFunction<Type>[]
): ClassMethodDecorator {
  return function <T>(
    target: Record<string, T>,
    key?: string,
    descriptor?: PropertyDescriptor
  ) {
    const guards = fns.map((fn) => {
      return DGuard.create(fn as () => unknown).decorateUnknown(
        target,
        key,
        descriptor
      );
    });

    MetadataStorage.instance.addModifier(
      Modifier.create<Method>(
        (original) => {
          original.guards = guards;
        },
        DEvent,
        DWs
      ).decorateUnknown(target, key, descriptor)
    );
  };
}
