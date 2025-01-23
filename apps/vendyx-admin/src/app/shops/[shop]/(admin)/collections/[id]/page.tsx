import { notFound } from 'next/navigation';

import { type ID } from '@/api/scalars/scalars.type';
import { CollectionService } from '@/api/services/collection.service';
import { CollectionDetailsForm } from '@/core/collection/components/collection-details/collection-details-form';

export default async function CollectionPage({ params }: { params: { id: ID } }) {
  const collection = await CollectionService.getById(params.id);

  if (!collection) {
    notFound();
  }

  return <CollectionDetailsForm collection={collection} />;
}
