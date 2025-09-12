import React from "react";

const TermsPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  text-primary mb-2">
            Terms & Policies
          </h1>
          <div className="w-20 h-1 bg-green-500 mx-auto"></div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-primary">
          <p className="text-gray">
            At Fresh Basket, we value your feedback and strive to create a trustworthy community for all shoppers.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
          <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
          General Information
        </h2>
        <p className="text-gray-700  my-4 rounded-lg p-4 mb-6 bg-gray-50">
          At Fresh Basket, we love being part of your everyday shopping stories.
          Whether it's a compliment for the fresh produce that exceeded your
          expectations, feedback for a delivery that didn't go as planned, or
          a chronicle of your in-store or online grocery experience – it all
          matters to us.
        </p>

        <p className="text-gray-700  my-4 rounded-lg p-4 mb-6 bg-gray-50">
          We encourage you to share your feedback, as it helps other customers
          make informed shopping and ordering decisions. Your reviews also
          contribute to each store's overall rating, which we calculate using a
          proprietary weighted average that factors in recent customer
          experiences.
        </p>

        <p className="text-gray-700  bg-gray-50  my-4 rounded-lg p-4 mb-6">
          While we welcome honest opinions and detailed descriptions of your
          experiences, we expect all customers to follow our Content Guidelines
          outlined in the Shopper Code of Conduct.
        </p>

        <div className="border-t border-gray-200 my-6"></div>

        <h2 className="text-2xl font-bold mb-4 flex items-center text-green-600">
          <span className="bg-blue-100 text-green-600 p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          Shopper Code of Conduct
        </h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Keep out the clutter · Keep it relevant · Keep it clean
        </h3>
        <p className="text-gray-700  bg-gray-50 my-4 rounded-lg p-4 mb-6">
          There's no easier way to show how fresh and juicy those mangoes were
          than with a picture, right? That said, it's important to follow our
          photo guidelines and understand why some photos may be removed after
          you upload them.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">We may remove:</h4>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Exact duplicate photos, multiple clicks of the same product</li>
            <li>Plagiarized or copied photos from other sources</li>
            <li>Photos of others posted without permission</li>
            <li>Blurry, unclear, or low-quality images</li>
            <li>Photos containing promotional or advertising material</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Keep Out the Clutter
            </h3>
            <p className="text-blue-700">
              Reviews should be clear, readable, and meaningful. Excessive random
              symbols, emojis, or irrelevant text may lead to removal.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Keep It Relevant
            </h3>
            <p className="text-green-700">
              Only share experiences related to your grocery shopping or delivery
              via Fresh Basket. Irrelevant content may be removed without notice.
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Keep It Clean
            </h3>
            <p className="text-red-700">
              Avoid foul, abusive, hateful, or threatening language. This includes
              derogatory remarks or personal attacks on stores and staff.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Keep It Fresh
            </h3>
            <p className="text-purple-700">
              Write about your most recent experience. Reviews older than six months
              may be removed unless still relevant.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0 ">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Need help?
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  If you come across content that does not align with our guidelines, 
                  please contact us at <span className="font-medium">support@freshbasket.com</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPolicy;