import { Fieldset, Label } from '@trussworks/react-uswds';
import { Dispatch, SetStateAction, useState } from 'react';
import { Option } from 'react-select';
import { PracticeAreaData } from '../../../hooks/useDataPractices';

import { PracticeName, Value } from '../../../types/compare';
import Select from '../../select/Select';

type RecommendationFilterProps = {
  topicPractices: PracticeName[];
  setFilteredData: Dispatch<SetStateAction<PracticeAreaData[]>>;
};

export default function RecommendationFilter({
  topicPractices,
  setFilteredData,
}: RecommendationFilterProps) {
  const recOptions: (typeof Option)[] = topicPractices.map(practice => ({
    value: practice,
    label: practice,
  }));
  const [recFilter, setRecFilter] = useState<string[]>([]);
  return (
    <Fieldset>
      <div className="select multi">
        <Label htmlFor="rec">Recommendations</Label>
        <Select
          isMulti={true}
          id="rec"
          name="rec"
          selectOptions={recOptions}
          value={recFilter}
          handleChange={(opts: (typeof Option)[]) => {
            setRecFilter(opts);
            setFilteredData(data =>
              data.filter(d => {
                if (opts.length === 0) return true;

                const implementedPractices = d.practices
                  .filter(
                    practice =>
                      practice.value === Value.partial ||
                      practice.value === Value.full,
                  )
                  .map(practice => practice.practiceName);

                return opts.every(filterOption =>
                  implementedPractices.includes(filterOption.value),
                );
              }),
            );
          }}
        />
      </div>
    </Fieldset>
  );
}
