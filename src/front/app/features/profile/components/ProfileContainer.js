import { connect } from 'react-redux';
import Profile from './Profile';

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Profile);
