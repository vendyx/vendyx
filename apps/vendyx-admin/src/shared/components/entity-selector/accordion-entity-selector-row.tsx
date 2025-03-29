import { type FC } from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Checkbox } from '../ui/checkbox';

/**
 * @description
 * Displays an accordion row with a checkbox and a list of items as its content.
 */
export const AccordionEntitySelectorRow: FC<Props> = ({
  label,
  image,
  value,
  checked,
  onCheckedChange,
  content
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`entity-${value}`}>
        <div className="flex items-center border-b pl-6 w-full sticky top-0 bg-background">
          <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
          <AccordionTrigger className="py-0 pr-6" containerClassName="w-full">
            <div className="flex items-center gap-4 px-6 py-4 cursor-pointer">
              {image && <img src={image} alt={label} className="w-10 h-10 rounded object-cover" />}
              <p>{label}</p>
            </div>
          </AccordionTrigger>
        </div>
        <AccordionContent className="divide-y py-0">
          {content.map(item => (
            <label
              key={item.id}
              htmlFor={`state-${item.id}`}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted cursor-pointer"
            >
              <Checkbox
                id={`state-${item.id}`}
                className="ml-8"
                checked={item.checked}
                onCheckedChange={item.onCheckedChange}
              />
              <p>{item.label}</p>
            </label>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

type Props = {
  /**
   * @description
   * Label for the accordion trigger.
   */
  label: string;
  /**
   * @description
   * Image URL for the accordion item.
   */
  image?: string;
  /**
   * @description
   * Value for the accordion item (Should be unique).
   */
  value: string;
  /**
   * @description
   * Checked state of the checkbox.
   */
  checked: boolean;
  /**
   * @description
   * Function to handle checkbox state change.
   */
  onCheckedChange: (checked: boolean) => void;
  /**
   * @description
   * Content of the accordion item.
   */
  content: {
    /**
     * @description
     * Unique identifier for the item.
     */
    id: string;
    /**
     * @description
     * Label for the item.
     */
    label: string;
    /**
     * @description
     * Checked state of the item.
     */
    checked: boolean;
    /**
     * @description
     * Function to handle checkbox state change for the item.
     */
    onCheckedChange: (checked: boolean) => void;
  }[];
};
