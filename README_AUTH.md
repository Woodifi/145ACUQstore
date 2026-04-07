# Azure AD Authentication Setup Instructions

## 1) Install Dependencies

To begin setting up Azure AD authentication, make sure to have the necessary dependencies installed. You can do this by running the following command:

```
npm install azure-ad-auth
```

## 2) Azure Portal Configuration Steps

1. Go to the [Azure Portal](https://portal.azure.com).
2. Select **Azure Active Directory** from the left-hand menu.
3. Click on **App registrations** and then **New registration**.
4. Enter a name for your application, select the supported account types, and set the redirect URI to your development server URL.
5. After creating the app, take note of the **Application (client) ID** and **Directory (tenant) ID**.
6. Go to **Certificates & secrets** and create a new client secret. Save this secret securely.
7. Under **API permissions**, add the necessary permissions for your application.

## 3) Environment Variables Setup

Create a `.env` file in the root directory of your project and add the following environment variables:

```
AZURE_CLIENT_ID=your-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret
```

Make sure to replace `your-client-id`, `your-tenant-id`, and `your-client-secret` with the actual values obtained from the Azure Portal.

## 4) Running Development Server

To run your development server, execute the following command:

```
npm start
```

This will start the server and you can then access it at `http://localhost:3000`.

## 5) Integration with Frontend HTML

To integrate Azure AD authentication with your frontend HTML, ensure you have included the necessary JavaScript SDK:

```html
<script src="https://alcdn.msauth.net/browser/2.18.4/js/msal-browser.min.js"></script>
```

Then, initialize MSAL in your JavaScript code:

```javascript
const msalConfig = {
    auth: {
        clientId: "your-client-id",
        authority: "https://login.microsoftonline.com/your-tenant-id",
        redirectUri: "http://localhost:3000",
    }
};
const msalInstance = new Msal.UserAgentApplication(msalConfig);
```

Set up a login button to acquire tokens:

```javascript
document.getElementById('loginButton').addEventListener('click', () => {
    msalInstance.loginPopup().then((loginResponse) => {
        console.log('id_token acquired at: ' + new Date().toString());
    }).catch((error) => {
        console.error(error);
    });
});
```

## 6) Example API Calls with Authentication

Once authenticated, you can make API calls by including the access token in the Authorization header:

```javascript
const token = "your-access-token";
fetch('https://your-api-endpoint', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}).then(response => response.json()).then(data => {
    console.log(data);
});
```