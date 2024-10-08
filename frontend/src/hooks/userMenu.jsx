
// src/hooks/useMenu.js
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addMenuItem, deleteMenuItem, fetchMenus, updateMenuItem } from '../services/api';

export const useMenus = () => {
  return useQuery('menus', fetchMenus);
};

export const useAddMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(addMenuItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }) => updateMenuItem(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMenuItem, {
    onSuccess: () => {
      queryClient.invalidateQueries('menus');
    },
  });
};
