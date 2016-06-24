import {
    PROFILE_RECEIVED,
} from './profile.actions';

export default (state = {}, { type, profile }) => {
    switch (type) {
    case PROFILE_RECEIVED:
        return profile;
    default:
        return state;
    }
};
