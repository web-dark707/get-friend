import React, { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { compose } from '@/utils/tools';
import {
    WithRecoilRoot,
    WithErrorScreen,
    WithQueryClientProvider,
    WithOfflineMask,
} from '@/components/HOC';
import WarpCommon from '@/components/WrapCommon';
import RenderRouter from './router';

function App() {
    const RouteComponent = () => {
        return (
            <Router>
                <WarpCommon>
                    <RenderRouter></RenderRouter>
                </WarpCommon>
            </Router>
        );
    };

    const renderer: (c: ComponentType) => ComponentType = compose(
        WithRecoilRoot,
        WithErrorScreen,
        WithQueryClientProvider,
        WithOfflineMask,
    );

    const Main = renderer(RouteComponent);

    return <Main></Main>;
}

export default App;
