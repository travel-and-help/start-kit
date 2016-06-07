export default function rankToType(rank) {
    if (rank <= 3) {
        return 'bad';
    }

    if (rank <= 6) {
        return 'middle';
    }

    return 'good';
}
