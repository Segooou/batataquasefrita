const defaultValues = {
  indexOfPathname: 3,
  lastNumber: 1,
  splitNumber: 4
};

export const usePath = (): {
  allPathname: (string | undefined)[];
  firstPathname: string;
  lastPathname: string;
  getLink: (all: (string | undefined)[], index: number) => string;
} => {
  const queryParams = new URLSearchParams(location.search);

  const firstPathname = `/${
    window.location.href.split('/', defaultValues.splitNumber)[defaultValues.indexOfPathname]
  }`;

  const lastPath =
    window.location.href.split('/')[
      window.location.href.split('/').length - defaultValues.lastNumber
    ];

  const lastPathname = lastPath.replace(`?${queryParams.toString()}`, '').replace(/#.+/gu, '');

  const allPathname = window.location.href
    .split('/')
    .map((pathname, index): string | undefined => {
      if (index >= defaultValues.indexOfPathname)
        return pathname.replace(`?${queryParams.toString()}`, '').replace(/#.+/gu, '');
      return '';
    })
    .filter((value) => value !== '');

  const getLink = (all: (string | undefined)[], index: number): string =>
    all
      .map((pathname, indexMap): string | undefined => {
        if (indexMap <= index) return `/${pathname}`;
        return '';
      })
      .filter((value) => value !== '')
      .toString()
      .replace(/,/gu, '');

  return { allPathname, firstPathname, getLink, lastPathname };
};
