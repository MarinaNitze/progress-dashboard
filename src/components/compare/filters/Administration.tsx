import React, { useState } from 'react';
import { Fieldset, Label } from '@trussworks/react-uswds';
import { Option } from 'react-select';

import Select from '../../select/Select';
import { PracticeAreaData } from '../../../hooks/useDataPractices';

const ADMINISTRATION_OPTS = [
  { value: '', label: 'Either' },
  { value: 'County', label: 'County' },
  { value: 'State', label: 'State' },
];

type AdministrationFilterProps = {
  applyFilter: (filterFunc: (value: PracticeAreaData) => boolean) => void;
};
export default function AdministrationFilter({
  applyFilter,
}: AdministrationFilterProps) {
  const [adminFilter, setAdminFilter] = useState<typeof Option>(
    ADMINISTRATION_OPTS[0],
  );
  return (
    <Fieldset>
      <div className="select single">
        <Label htmlFor="admin">Administration</Label>
        <Select
          isMulti={false}
          id="admin"
          name="admin"
          selectOptions={ADMINISTRATION_OPTS}
          value={adminFilter}
          handleChange={(opt: typeof Option) => {
            setAdminFilter(opt);
            applyFilter(d => {
              if (opt === undefined || opt.value === '') return true;
              return opt.value.toLowerCase() === d.admin.toLowerCase();
            });
          }}
        />
      </div>
    </Fieldset>
  );
}
