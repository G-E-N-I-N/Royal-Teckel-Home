import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export interface Dog {
    _id: string;
    name: string;
    breed: string;
    age_months: number;
    price: number;
    description_en?: string;
    description_fr?: string;
    gender: 'male' | 'female';
    size: 'small' | 'medium' | 'large';
    status: 'available' | 'reserved' | 'sold';
    image_url?: string;
    is_featured?: boolean;
    createdAt: string;
    updatedAt: string;
}

export type DogInsert = Omit<Dog, '_id' | 'createdAt' | 'updatedAt'>;

export function useDogs(breed?: string) {
    return useQuery({
        queryKey: ['dogs', breed],
        queryFn: async () => {
            const res = await fetch(`/api/dogs?breed=${breed ?? 'all'}`);
            if (!res.ok) throw new Error('Error fetching dogs');
            return res.json() as Promise<Dog[]>;
        },
    });
}

export function useFeaturedDogs() {
    return useQuery({
        queryKey: ['dogs', 'featured'],
        queryFn: async () => {
            const res = await fetch('/api/dogs');
            const dogs: Dog[] = await res.json();
            return dogs.filter(d => d.is_featured && d.status === 'available').slice(0, 3);
        },
    });
}

export function useDog(id: string) {
    return useQuery({
        queryKey: ['dog', id],
        queryFn: async () => {
            const res = await fetch(`/api/dogs/${id}`);
            if (!res.ok) throw new Error('Dog not found');
            return res.json() as Promise<Dog>;
        },
        enabled: !!id,
    });
}

export function useBreeds() {
    return useQuery({
        queryKey: ['breeds'],
        queryFn: async () => {
            const res = await fetch('/api/dogs');
            const dogs: Dog[] = await res.json();
            return [...new Set(dogs.map(d => d.breed))];
        },
    });
}

export function useCreateDog() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async (dog: DogInsert) => {
            const res = await fetch('/api/dogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dog),
            });
            if (!res.ok) throw new Error();
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dogs'] });
            toast({ title: t('admin.success') });
        },
        onError: () => {
            toast({ title: t('admin.error'), variant: 'destructive' });
        },
    });
}

export function useUpdateDog() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async ({ _id, ...dog }: Partial<Dog> & { _id: string }) => {
            const res = await fetch(`/api/dogs/${_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dog),
            });
            if (!res.ok) throw new Error();
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dogs'] });
            toast({ title: t('admin.success') });
        },
    });
}

export function useDeleteDog() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`/api/dogs/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dogs'] });
            toast({ title: t('admin.success') });
        },
    });
}
