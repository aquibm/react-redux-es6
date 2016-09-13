import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({isLoading}) => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>

            <div className="pull-right">
                {isLoading && <LoadingDots interval={100} dots={10} />}
            </div>
        </nav>
    );
};

Header.propTypes = {
    isLoading: PropTypes.number
};

export default Header;