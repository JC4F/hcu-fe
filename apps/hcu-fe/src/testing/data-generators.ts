import { randUuid, randBoolean, randTodo } from '@ngneat/falso';

const generateTask = () => ({
  id: randUuid(),
  title: randTodo().title,
  complete: randBoolean(),
  createdAt: Date.now(),
});

export const createTask = <T extends Partial<ReturnType<typeof generateTask>>>(
  overrides?: T & {
    title?: string;
    complete?: boolean;
  }
) => {
  return { ...generateTask(), ...overrides };
};
