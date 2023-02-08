import { Fieldset, Label } from '@trussworks/react-uswds';
import { Dispatch, SetStateAction, useState } from 'react';
import { Option } from 'react-select';

import { PracticeAreaData } from '../../../hooks/useDataPractices';
import { RegionType } from '../../../types/regionType';
import Select from '../../select/Select';

const POP_SIZE_ANY = { value: '', label: 'Any' };
const STATES_POP_SIZE_OPTS = [
  POP_SIZE_ANY,
  { value: '0', label: 'Less than 2.5 Million' },
  { value: '2500000', label: '2.5 Million - 7.5 Million' },
  { value: '7500000', label: 'Greater than 7.5 Million' },
];

const COUNTIES_POP_SIZE_OPTS = [
  POP_SIZE_ANY,
  { value: '0', label: 'Less than 75,000' },
  { value: '75000', label: '75,000 - 450,000' },
  { value: '450000', label: 'Greater than 450,000' },
];

type PopulationSizeFilterProps = {
  regionType: RegionType;
  setFilteredData: Dispatch<SetStateAction<PracticeAreaData[]>>;
};
export default function PopulationSizeFilter({
  regionType,
  setFilteredData,
}: PopulationSizeFilterProps) {
  const options =
    regionType === 'states' ? STATES_POP_SIZE_OPTS : COUNTIES_POP_SIZE_OPTS;
  const [popSizeFilter, setPopSizeFilter] = useState(POP_SIZE_ANY);
  return (
    <Fieldset>
      <div className="select single">
        <Label htmlFor="pop">Population</Label>
        <Select
          isMulti={false}
          id="pop"
          name="pop"
          selectOptions={options}
          value={popSizeFilter}
          handleChange={(opt: typeof Option) => {
            setPopSizeFilter(opt);
            setFilteredData(data =>
              data.filter(d => {
                if (opt.value === options[1].value) {
                  return d.population < parseInt(options[1].value);
                } else if (opt.value === options[2].value) {
                  return (
                    d.population >= parseInt(options[1].value) &&
                    d.population < parseInt(options[2].value)
                  );
                } else if (opt.value === options[3].value) {
                  return d.population >= parseInt(options[3].value);
                } else {
                  // no filter selected
                  return true;
                }
              }),
            );
          }}
        />
      </div>
    </Fieldset>
  );
}
