

const Banner = () => {

  return (
    <main className="w-full mt-20">
      <div className='w-navWidth mx-auto'>
        <div className='w-full h-24 flex items-center'>
          <h3>Home</h3>
        </div>

        {/* main banner section */}
        <div className='banner__section w-full'>
          <div className='overlay'>
            <div className='z-50 flex flex-col items-center justify-center h-80'>
                <h1 className='text-white text-3xl'>New to Skincare?</h1>
                <p className='text-white py-2'>Unlock your personality skincare routine today.</p>
                <button className='bg-white text-gray-700 py-4 px-8 w-52 mt-12'>
                  START SHOPPING
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { Banner }