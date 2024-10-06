/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse, http } from 'msw';
import { nanoid } from 'nanoid';

import { env } from '@/config/env';
import { db } from '../db';
import { networkDelay } from '../utils';

type TaskCreateBody = {
  title: string;
};

type TaskUpdateBody = {
  complete: boolean;
};

export const tasksHandlers = [
  http.get(`${env.API_URL}/tasks`, async () => {
    await networkDelay();

    try {
      const result = db.task.getAll();
      return HttpResponse.json({ data: result });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      );
    }
  }),

  http.post(`${env.API_URL}/tasks`, async ({ request }) => {
    await networkDelay();

    try {
      const { title } = (await request.json()) as TaskCreateBody;

      const newTask = db.task.create({
        id: nanoid(),
        title,
        complete: false,
        createdAt: new Date().getTime(),
      });

      return HttpResponse.json({ data: newTask }, { status: 201 });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      );
    }
  }),

  http.put(`${env.API_URL}/tasks/:id`, async ({ request, params }) => {
    await networkDelay();

    try {
      const id = params.id as string;
      const { complete } = (await request.json()) as TaskUpdateBody;

      const updatedTask = db.task.update({
        where: { id: { equals: id } },
        data: { complete },
      });

      if (!updatedTask) {
        return HttpResponse.json(
          { message: 'Task not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json({ data: updatedTask });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      );
    }
  }),

  http.delete(`${env.API_URL}/tasks/:id`, async ({ request, params }) => {
    await networkDelay();

    try {
      const id = params.id as string;

      const deletedTask = db.task.delete({
        where: { id: { equals: id } },
      });

      if (!deletedTask) {
        return HttpResponse.json(
          { message: 'Task not found' },
          { status: 404 }
        );
      }

      return HttpResponse.json({ data: deletedTask });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 }
      );
    }
  }),
];
