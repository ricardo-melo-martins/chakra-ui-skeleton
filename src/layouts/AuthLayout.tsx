import { Routes, Route } from 'react-router-dom';

import RegisterPage from '../pages/auth/RegisterPage';
import LoginPage from '../pages/auth/LoginPage';

export function AuthLayout() {

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Routes>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}