import firebase from 'firebase';

const authProviders = {
  google: new firebase.auth.GoogleAuthProvider(),
  github: new firebase.auth.GithubAuthProvider(),
};

export const getProviderById = (providerId, providers = authProviders) => {
  switch (providerId) {
    case 'google.com':
      return providers.google;
    case 'github.com':
      return providers.github;
    default:
      throw new Error('Unknow Provider ID');
  }
};

export const getValidCredential = ({
  accessToken,
  providerId,
}) => {
  switch (providerId) {
    case 'google.com':
      return firebase.auth.GoogleAuthProvider.credential(accessToken);
    case 'github.com':
      return firebase.auth.GithubAuthProvider.credential(accessToken);
    default:
      throw new Error('Unable to get valid credential.');
  }
};
