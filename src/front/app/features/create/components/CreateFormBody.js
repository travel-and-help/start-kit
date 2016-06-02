import React, { PropTypes } from 'react';
import CreateCategories from './CreateCategories';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CreatePhoto from '../../../common/components/create/CreatePhoto';
import CreateDatePicker from '../../../common/components/create/CreateDatePicker';
import CreateTumbler from '../../../common/components/create/CreateTumbler';
import CreateError from './CreateError';

const CreateFormBody = ({ fields, categories }) => (
    <div className="challenge-create__body">
        <CreateError formFields={fields} />

        <div className="challenge-create__photo-wrapp">
            <CreatePhoto />
        </div>

        <div className="challenge-create__title-field-wrapp">
            <input
              className={fields.title.error && fields.title.touched ?
                  'challenge-create__input challenge-create__input_error' :
                  'challenge-create__input'}

              placeholder="Enter title" {...fields.title}
            />

        </div>

        <h2 className="challenge-create__subtitle">
            Description
        </h2>

        <CreateCategories
          categories={categories}
          category={fields.category}
        />

        <textarea
          className={fields.description.error && fields.description.touched ?
              'challenge-create__descr challenge-create__descr_error' :
              'challenge-create__descr'}

          placeholder="Description" {...fields.description}
        >
        </textarea>

        <h2 className="challenge-create__subtitle">
            Settings
        </h2>

        <CreateDatePicker
          label="Start Date"
          date={fields.startDate}
        />

        <CreateDatePicker
          label="End Date"
          date={fields.endDate}
          minDate={fields.startDate.value}
        />

        <CreateTumbler
          label="Repeateble"
          disabled
          checked
          value={fields.repeateble}
        />

        <h3 className="challenge-create__subtitle">
            Confirmation
        </h3>

        <CreateTumbler
          label="Location"
          disabled
        />

        <CreateTumbler
          label="Photo proof"
          value={fields.proof}
        />
    </div>
);


CreateFormBody.propTypes = {
    fields: PropTypes.object.isRequired,
    categories: ImmutablePropTypes.list.isRequired
};

export default CreateFormBody;
