import React, { ComponentType } from 'react';
import { HashRouter } from 'react-router-dom';
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
            <HashRouter>
                <WarpCommon>
                    <RenderRouter></RenderRouter>
                </WarpCommon>
            </HashRouter>
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
