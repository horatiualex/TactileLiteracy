const redirects = async () => {
  const homeToAcasaRedirect = {
    source: '/',
    destination: '/acasa',
    permanent: true,
  }

  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const redirects = [homeToAcasaRedirect, internetExplorerRedirect]

  return redirects
}

export default redirects
