import React from 'react'

const PricingComponent = () => {
  return (
    <section className="relative overflow-hidden mt-40">
        <div className="relative bg-blue-900 px-6 py-24 sm:py-32 lg:px-8">
          {/* Background gradient blob — now contained */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              // Reduced size: use max-w-full and scale instead of fixed huge width
              className="mx-auto aspect-[1155/678] w-full max-w-7xl scale-125 opacity-20 bg-gradient-to-tr from-pink-400 to-indigo-400"
            />
          </div>

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-base font-semibold leading-7 text-indigo-300">
              Pricing
            </h2>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Choose the right plan for you
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-300 sm:text-xl/8 relative z-10">
            Choose an affordable plan that’s packed with the best features for
            engaging your audience, creating customer loyalty, and driving
            sales.
          </p>

          {/* Pricing Cards */}
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-8 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 relative z-10">
            {/* Hobby Plan */}
            <div className="rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-sm sm:mx-8 sm:rounded-b-none sm:p-10 lg:mx-0 lg:rounded-tr-none lg:rounded-bl-3xl">
              <h3
                id="tier-hobby"
                className="text-base font-semibold leading-7 text-indigo-300"
              >
                Hobby
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  $29
                </span>
                <span className="text-base text-gray-400">/month</span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-300">
                The perfect plan if youre just getting started with our product.
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300 sm:mt-10"
              >
                {[
                  '25 products',
                  'Up to 10,000 subscribers',
                  'Advanced analytics',
                  '24-hour support response time',
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-x-3">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-indigo-400 mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                aria-describedby="tier-hobby"
                className="mt-8 block rounded-md bg-white/10 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/75 sm:mt-10"
              >
                Get started today
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="relative rounded-3xl bg-gray-800/60 p-8 ring-1 ring-white/10 backdrop-blur-sm sm:p-10">
              <h3
                id="tier-enterprise"
                className="text-base font-semibold leading-7 text-indigo-300"
              >
                Enterprise
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-white">
                  $99
                </span>
                <span className="text-base text-gray-400">/month</span>
              </p>
              <p className="mt-6 text-base leading-7 text-gray-300">
                Dedicated support and infrastructure for your company.
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm leading-6 text-gray-300 sm:mt-10"
              >
                {[
                  'Unlimited products',
                  'Unlimited subscribers',
                  'Advanced analytics',
                  'Dedicated support representative',
                  'Marketing automations',
                  'Custom integrations',
                ].map((feature, idx) => (
                  <li key={idx} className="flex gap-x-3">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 flex-none text-indigo-400 mt-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                aria-describedby="tier-enterprise"
                className="mt-8 block rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:mt-10"
              >
                Get started today
              </a>
            </div>
          </div>
        </div>
      </section>
  )
}

export default PricingComponent
