const { Provider } = require('oidc-provider');

const clients = [
  {
    client_id: 'maplcredit-equifax',
    client_secret: '78cecf280d98897b9d4e36ea5e91b355a9c342e62633aa3c73487b7fbdf3066d',
    grant_types: ['authorization_code'],
    redirect_uris: ['https://equifax.com/callback'], // Replace with real Equifax redirect URI
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post',
  },
];

const configuration = {
  clients,
  features: {
    devInteractions: { enabled: false },
  },
  cookies: {
    keys: ['some long random string', 'another long random string'], // optional: rotate every few months
  },
};

const issuer = process.env.ISSUER || '"https://web-production-b6ba4.up.railway.app"
';
const oidc = new Provider(issuer, configuration);

// If behind proxy (like Railway), trust proxy headers
oidc.proxy = true;

// Start the server
const PORT = process.env.PORT || 3000;
oidc.listen(PORT, () => {
  console.log(`OIDC Provider listening on ${issuer}`);
});
