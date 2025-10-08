import React from 'react'

const TopComponentHome = () => {
  return (
    <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
            A <span className="font-semibold">Free Blog Web</span> for Community{' '}
            <br className="hidden lg:block" /> Users Of Earn 11{' '}
            {/* <span className="font-semibold underline decoration-primary">
              Tailwind CSS
            </span> */}
          </h1>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
            Free to Read and Give Feedback <br className="hidden lg:block" />{' '}
            for Earn 11 and{' '}
            <a
              href="https://earn11.app/ "
              target="_black"
              className="underline"
            >
              Other Applications
            </a>
          </p>
          <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20">
          </div>
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
          <img
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="tailwind css components"
            className="w-full h-full max-w-md mx-auto"

          />
        </div>
      </section>
  )
}

export default TopComponentHome
