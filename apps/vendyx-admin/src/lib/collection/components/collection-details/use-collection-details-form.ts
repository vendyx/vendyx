'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { type CommonCollectionFragment } from '@/api/types';
import { FormMessages } from '@/lib/shared/form';
import { notification } from '@/lib/shared/notifications';

import { createCollection } from '../../actions/create-collection';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CollectionDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      description: collection?.description ?? '',
      enabled: collection?.enabled ?? true
    }
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      notification.success('Collection saved');
    }
  }, [isSuccess, isLoading]);

  async function onSubmit(input: CollectionDetailsFormInput) {
    startTransition(async () => {
      if (collection) {
        // Update collection
        setIsSuccess(true);
      } else {
        const { image, ...rest } = input;

        const formData = new FormData();
        image && formData.append('files', image);

        await createCollection({ ...rest, image: formData });
      }
    });
  }

  return {
    ...form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit)
  };
};

const schema = z.object({
  name: z.string().min(1, FormMessages.required),
  description: z.string().optional(),
  enabled: z.boolean(),
  image: z.instanceof(File).optional()
});

export type CollectionDetailsFormInput = z.infer<typeof schema>;
