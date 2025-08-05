
import Head from 'next/head';

export default function Test_guide() {
  return (
    <>
      <Head>
        <title>Klaviyo App Testing Instructions</title>

      </Head>

      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h1 className="card-title text-primary mb-4">Klaviyo App Testing Instructions</h1>
            <p className="card-text">
              This guide will help the Klaviyo review team test the OAuth flow and functionality of our application.
              Please follow the steps below. No credentials are required.
            </p>
            <hr />
            <ol>
              <li>Visit our website homepage: <a href="https://klaviyodashboard.vercel.app" target="_blank">https://klaviyodashboard.vercel.app</a></li>
              <li>Click the "Connect to Klaviyo" button. This will redirect you to the Klaviyo authorization screen.</li>
              <li>Approve the required scopes: <code>campaigns:read</code> and <code>metrics:read</code>.</li>
              <li>Once redirected back to our app, the server will handle the code exchange at:<br />
                <code>https://klaviyobackend.onrender.com/api/klaviyo/oauth</code>
              </li>
              <li>Access and refresh tokens will be securely stored (for testing, they are logged to the server console).</li>
              <li>After successful authentication, a confirmation message will be shown: <code>OAuth setup complete!</code></li>
            </ol>
            <p className="mt-4">If any error occurs during the process, it will be displayed on the callback page or logged in the backend console.</p>
          </div>
        </div>
      </div>
    </>
  );
}

