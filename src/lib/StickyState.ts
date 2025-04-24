/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, entity } from 'simpler-state';

const entities: Record<string, { savedEntity: Entity<any>; savedSetter: (value: any) => void }> = {};

// eslint-disable-next-line import/prefer-default-export
export const useStickyState = <T>(name: string, initialValue: T) => {
  if (entities[name]) {
    const { savedEntity, savedSetter } = entities[name];
    return [savedEntity.use(), savedSetter];
  }
  // Otherwise create a new entity
  const newEntity = entity(initialValue);
  const newEntitySetter = (newValue: T) => newEntity.set(newValue);
  entities[name] = { savedEntity: newEntity, savedSetter: newEntitySetter as (value: unknown) => void };
  return [newEntity.use(), newEntitySetter];
};
