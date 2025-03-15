'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { CollectionContentType, type CommonCollectionFragment } from '@/api/types';
import { FormMessages } from '@/shared/form/form-messages';
import { notification } from '@/shared/notifications/notifications';

import { createCollection } from '../../actions/create-collection';
import { updateCollection } from '../../actions/update-collection';

export const useCollectionDetailsForm = (collection?: CommonCollectionFragment) => {
  const [isLoading, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CollectionDetailsFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: collection?.name ?? '',
      description: collection?.description ?? '',
      enabled: collection?.enabled ?? true,
      contentType: collection?.contentType ?? CollectionContentType.Products
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
        await updateCollection(collection.id, input);
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
  image: z.instanceof(File).optional(),
  contentType: z
    .enum([CollectionContentType.Products, CollectionContentType.Collections])
    .default(CollectionContentType.Products)
});

export type CollectionDetailsFormInput = z.infer<typeof schema>;
