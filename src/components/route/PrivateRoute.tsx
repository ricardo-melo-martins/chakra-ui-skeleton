import { Navigate, Outlet } from 'react-router-dom';
import { history } from '../../boot/history';

function PrivateRoute() {
    const auth = String(sessionStorage.getItem('token'));

    if (!auth) {
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    return <Outlet />;
}

export default PrivateRoute