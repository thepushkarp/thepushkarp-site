export const baseUrl = 'https://thepushkarp.com';

export default async function sitemap() {
  // TODO: add blogposts

  const routes = ['', '/blog', '/projects', '/misc', '/etymology', '/poems'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}
