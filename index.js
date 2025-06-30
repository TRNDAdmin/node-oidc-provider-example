const { Provider } = require('oidc-provider');

const clients = [
  {
    client_id: 'maplcredit-equifax',
    client_secret: 'REPLACE_THIS_WITH_YOUR_SECRET',
    grant_types: ['authorization_code'],
    redirect_uris: ['https://equifax.com/callback'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post',
  },
];

const oidc = new Provider(process.env.ISSUER || 'http://localhost:3000', {
  clients,
});

oidc.proxy = true;

const PORT = process.env.PORT || 3000;
oidc.listen(PORT, () => {
  console.log(`OIDC Provider listening on port ${PORT}`);
});
