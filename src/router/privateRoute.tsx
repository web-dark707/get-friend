import { useNavigate } from 'react-router-dom';
import UserToken from '@/common/token';

const PrivateRoute = (props: any) => {
    const token = UserToken.getToken();
    const navigate = useNavigate();

    return token
        ? props.element
        : navigate('/login', {
              replace: true,
              state: {
                  pathname: location.pathname,
                  search: location.search,
              },
          });
};

export default PrivateRoute;
