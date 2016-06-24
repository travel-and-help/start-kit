import api from '../../common/api';

export function getChallengesByStatus(status) {
    return api(`/api/my/${status}-challenges`);
}
