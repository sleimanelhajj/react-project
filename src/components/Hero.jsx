const Hero = ({
    // i can put defualt values for the props and now i can just use title and subtitle deghre
    // and that is how we assign props !!!!
  title = "React Crash course",
  subtitle = "Find the React job that fits your skill set",
}) => {
  return (
    <section className="bg-indigo-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="my-4 text-xl text-white">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
