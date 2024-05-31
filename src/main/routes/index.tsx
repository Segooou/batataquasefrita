import { AdminRoute, LoginRoute, PrivateRoute } from 'main/proxies';
import {
  AuthContent,
  FunctionalityContent,
  FunctionalityTestContent,
  HomeContent,
  PanelContent,
  PlatformContent,
  ProfileContent
} from 'presentation/environment';
import { AuthTemplate, MainTemplate } from 'presentation/atomic-component/template';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routePaths } from 'main/config';
import type { FC } from 'react';

const RouterConfig: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Outlet />}>
      <Routes>
        {/* public routes */}
        <Route element={<LoginRoute />}>
          <Route element={<AuthTemplate />}>
            <Route element={<AuthContent />} path={routePaths.login} />
          </Route>
        </Route>

        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<HomeContent />} path={routePaths.home} />
            <Route element={<ProfileContent />} path={routePaths.profile} />
            <Route element={<PlatformContent />} path={routePaths.platform} />
            <Route element={<FunctionalityContent />} path={routePaths.functionality} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<MainTemplate />}>
            <Route element={<PanelContent />} path={routePaths.panel} />
            <Route element={<FunctionalityTestContent />} path={routePaths.functionalityTest} />
          </Route>
        </Route>

        <Route element={<PrivateRoute isRedirect />}>
          <Route element={<> </>} path={'*'} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default RouterConfig;
