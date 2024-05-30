import { Button } from '@mui/material';
import {
  FunctionalityPanel,
  NewFunctionalityPanel,
  PlatformPanel,
  UserPanel
} from 'presentation/atomic-component/organism';
import { Link, useLocation } from 'react-router-dom';
import { paths } from 'main/config';
import { useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';

export type Ids = 'functionality' | 'new-functionality' | 'platform' | 'user';

const buttons: { id: Ids; title: string }[] = [
  {
    id: 'user',
    title: 'Usuários'
  },
  {
    id: 'platform',
    title: 'Plataformas'
  },
  {
    id: 'functionality',
    title: 'Funcionalidades'
  },
  {
    id: 'new-functionality',
    title: 'Funcionalidades solicitadas'
  }
];

export const PanelContent: FC = () => {
  const { search } = useLocation();

  const getId = (): Ids => {
    switch (search?.replace('?', '')) {
      case 'user':
        return 'user';

      case 'platform':
        return 'platform';

      case 'functionality':
        return 'functionality';

      case 'new-functionality':
        return 'new-functionality';

      default:
        return 'user';
    }
  };

  const [selected, setSelected] = useState<Ids>(getId());

  const getElement = (): ReactNode => {
    switch (selected) {
      case 'user':
        return <UserPanel />;
      case 'platform':
        return <PlatformPanel />;
      case 'functionality':
        return <FunctionalityPanel />;
      case 'new-functionality':
        return <NewFunctionalityPanel />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setSelected(getId());
  }, [search]);

  return (
    <div className={'flex flex-col gap-8'}>
      <div className={'flex flex-wrap gap-4 w-full justify-center'}>
        {buttons.map((item) => (
          <Link
            key={item.id}
            to={{
              pathname: paths.panel,
              search: item.id
            }}
          >
            <Button color={item.id === selected ? 'success' : undefined}>{item.title}</Button>
          </Link>
        ))}
      </div>

      {getElement()}
    </div>
  );
};
