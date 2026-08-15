import { usePermissionStore } from '@/store';

export const usePermission = () => {
    const permissions = usePermissionStore((state) => state.permissions) || [];

    const hasPermission = (requiredPermission) => {
        if (!requiredPermission) return true;
        return permissions.includes(requiredPermission);
    };

    const can = (perm) => permissions.includes(perm);
    const canAny = (perms) => perms.some(p => permissions.includes(p));
    const canAll = (perms) => perms.every(p => permissions.includes(p));

    return { hasPermission, permissions, can, canAny, canAll };
};

