import { Link } from "react-router-dom";
import Card from "./Card";

const HomeCards = () => {
  return (
    // section
    <section className="py-4">
        {/* wrap with container */}
      <div className="container-xl lg:container m-auto">
             {/* wrap with a grid single coluimn for small screends and 2 for large -> medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            {/* this is our first card component, leave bg as defualt and give the child as input */}
          <Card>
            <h2 className="text-2xl font-bold">For Developers</h2>
            <p className="mt-2 mb-4">
              Browse our React jobs and start your career today
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Jobs
            </Link>
          </Card>
          <Card bg="bg-indigo-100">
                {/* what is inside is considered the children the card component takes the place of the div */}
            <h2 className="text-2xl font-bold">For Employers</h2>
            <p className="mt-2 mb-4">
              List your job to find the perfect developer for the role
            </p>
            <Link
              to="/add-job"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Job
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
