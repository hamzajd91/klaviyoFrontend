import Head from 'next/head';

export default function User_guide() {
  return (
    <>
      <Head>
        <title>Klaviyo Integration Guide</title>
      </Head>

      <div className="container mt-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h1 className="card-title text-primary mb-4">How to Connect Your Klaviyo Account with Our App</h1>
            <p className="card-text">
              Learn how to connect your Klaviyo account with our integration in just a few steps. This guide walks you
              through the OAuth setup, permissions required, and how to begin accessing your campaign and metric data
              seamlessly.
            </p>
            <hr />
            <h4>Steps:</h4>
            <ol>
            <li>Go to the Dashboard and select "Connect Klaviyo".</li>
            <li>Click the "Authorize with Klaviyo" button to start the OAuth process.</li>
            <li>Log in to your Klaviyo account when prompted.</li>
            <li>Review and approve the requested permissions.</li>
            <li>After authorization, you will be redirected back to the app and your account will be connected.</li>
            </ol>
            
          </div>
        </div>
      </div>
    </>
  );
}

