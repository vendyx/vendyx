'use client';

import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { type CommonCountryFragment } from '@/api/types';
import { AccordionEntitySelectorRow } from '@/shared/components/entity-selector/accordion-entity-selector-row';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { useEntityContext } from '@/shared/contexts/entity-context';

import { type ShipmentContext } from '../../contexts/shipment-context';
import { isStateInCountry } from '../../utils/shipment.utils';
import { type ZoneDetailsFormInput } from '../zone-details/use-zone-details-form';

export const ZoneCountriesSelector = () => {
  const [search, setSearch] = useState('');
  const { setValue, watch } = useFormContext<ZoneDetailsFormInput>();
  const {
    entity: { countries }
  } = useEntityContext<ShipmentContext>();
  const states = watch('states');

  const [selectedStates, setSelectedStates] = useState<CommonCountryFragment['states']>(states);

  const filteredCountries = useMemo(
    () => countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  return (
    <EntitySelector
      title="Add countries"
      description="Add countries to your zone"
      triggerText="Add countries"
      items={filteredCountries}
      isFetching={false}
      onDone={() => setValue('states', selectedStates)}
      onSearch={query => setSearch(query)}
      renderItem={country => (
        <AccordionEntitySelectorRow
          value={country.id}
          checked={selectedStates.some(s => isStateInCountry(s, country))}
          onCheckedChange={checked => {
            if (checked) {
              setSelectedStates([...selectedStates, ...country.states]);
            } else {
              const stateIds = country.states.map(s => s.id);

              setSelectedStates(
                selectedStates.filter(selectedState => !stateIds.includes(selectedState.id))
              );
            }
          }}
          label={country.name}
          content={country.states.map(state => ({
            id: state.id,
            label: state.name,
            checked: selectedStates.map(s => s.id).includes(state.id),
            onCheckedChange: checked => {
              if (checked) {
                setSelectedStates([...selectedStates, state]);
              } else {
                setSelectedStates(selectedStates.filter(s => s.id !== state.id));
              }
            }
          }))}
        />
      )}
    />
  );
};
