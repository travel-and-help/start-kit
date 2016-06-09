import React, { PropTypes } from 'react';
import CreateCategories from './CreateCategories';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CreateDatePicker from '../../../common/components/create/CreateDatePicker';
import CreatePhoto from '../../../common/components/create/CreatePhoto';
import CreateTumbler from '../../../common/components/create/CreateTumbler';
import CreateError from './CreateError';

const CreateFormBody = ({ fields, categories }) => {
    const {
        image,
        title,
        category,
        description,
        startDate,
        endDate,
        repeateble,
        proof
        } = fields;
    return (
        <div className="challenge-create__body">
            <CreateError formFields={fields} />

            <CreatePhoto image={image} />

            <input
                className={title.error && title.touched ?
              'challenge-create__input challenge-create__input_error' :
              'challenge-create__input'}

                placeholder="Enter challange name" {...title}
            />

            <h2 className="challenge-create__subtitle">
                DESCRIPTION
            </h2>

            <CreateCategories
                categories={categories}
                category={category}
            />

        <textarea
            className={description.error && description.touched ?
              'challenge-create__descr challenge-create__descr_error' :
              'challenge-create__descr'}

            placeholder="Enter description here" {...description}
        >
        </textarea>

            <h2 className="challenge-create__subtitle">
                SETTINGS
            </h2>

            <CreateDatePicker
                label="Start Date"
                date={startDate}
            />

            <CreateDatePicker
                label="End Date"
                date={endDate}
                minDate={startDate.value}
            />

            <CreateTumbler
                label="Repeateble"
                disabled
                checked
                value={repeateble}
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
                value={proof}
            />
        </div>
    );
};


CreateFormBody.propTypes = {
    fields: PropTypes.object.isRequired,
    categories: ImmutablePropTypes.list.isRequired
};

export default CreateFormBody;
