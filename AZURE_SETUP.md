# Azure Portal Configuration Guide

This guide will help you set up your application in the Azure Portal step-by-step.

## Step 1: Register Your Application
1. Log in to the [Azure Portal](https://portal.azure.com).
2. In the left-hand menu, select **Azure Active Directory**.
3. Under **Manage**, select **App registrations**.
4. Click on **New registration**.
5. Fill in the following details:
   - **Name**: Enter a meaningful name for your app.
   - **Supported account types**: Choose the appropriate option based on your users.
   - **Redirect URI**: Set this to `http://localhost:3000/auth-callback` (you can change this later).
6. Click the **Register** button.

## Step 2: Obtain Application Credentials
1. After registration, you will be taken to your app's Overview page.
2. Note down the **Application (client) ID** and **Directory (tenant) ID**. You will need these later.
3. In the left-hand menu, select **Certificates & secrets**.
4. Under **Client secrets**, click on **New client secret**.
5. Add a description and select the expiration period that meets your needs.
6. Click **Add**, and make sure to copy the client secret value now, as it won't be visible again.

## Step 3: Set Redirect URIs
1. Navigate back to the **Overview** page of your app registration.
2. Under **Redirect URIs**, add your redirect URIs as needed (e.g., `http://localhost:3000/auth-callback`).
3. Click on **Save**.

## Step 4: Configure API Permissions
1. In the left-hand menu, click on **API permissions**.
2. Click on **Add a permission**.
3. Choose the type of API you want to access (e.g., Microsoft Graph).
4. Select the permissions your application requires. Make sure to **Grant admin consent** if necessary.
5. Click on **Add permissions**.

## Important Notes
- Ensure you protect your application credentials. Treat them like passwords.
- Adjust your redirect URIs based on your deployment environments.

By following these steps, you will configure your application in the Azure Portal successfully.