export default function findRoute(routes, path) {
  for (const route of routes) {
    if (route.routes) {
      const routesMatch = findRoute(route.routes, path);
      if (routesMatch) {
        return routesMatch;
      }
    } else if (require('react-router-dom').matchPath(path, route)) {
      // for get params (/news/1 => { params: { id： 1 } })
      const { params } = require('react-router-dom').matchPath(path, route);
      return {
        ...route,
        params,
      };
    }
  }
}

export const getUrlQuery = url => {
  if (typeof url === 'string' && url.indexOf('?') > -1) {
    const params = url.slice(1).split('&');
    if (Array.isArray(params) && params.length > 0) {
      return params.reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        return { ...acc, [key]: value };
      }, {});
    }
  }
  return {};
};

export const parseUrl = path => {
  let pathname = path || '/';
  let search = '';
  let hash = '';
  const hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }
  const searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }
  return {
    pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash,
  };
};
