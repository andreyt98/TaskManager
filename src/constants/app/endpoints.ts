export const API_ENDPOINTS = {
  TASKS: {
    GET: "/api/tasks",
    ADD: "/api/tasks",
    GET_CATEGORIES: "/api/tasks/categories",
    UPDATE: (id: number) => `/api/tasks/${id}`,
    DELETE: (id: number) => `/api/tasks/${id}`,
  },
  AUTH: "/api/auth",
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
