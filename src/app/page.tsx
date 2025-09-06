import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-base-100">
        <Navbar />
        <div className="hero min-h-screen relative">
          <Image
            src="/imgs/hero.jpg"
            alt="Temple Climbing Club"
            fill
            className="object-cover opacity-70"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

          {/* Move content to bottom-left */}
          <div className="absolute md:bottom-17 lg:left-28 z-10 text-white max-w-4xl px-10 bottom-10">
            <h1 className="md:text-6xl text-4xl font-bold mb-7 drop-shadow-lg">
              Temple University Climbing Club
            </h1>
            <p className="mb-7 md:text-2xl font-semibold drop-shadow-md">
              Join our community of climbers, build skills, and have fun!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="btn btn-primary rounded md:btn-lg"
              >
                Sign Up
              </Link>
              <Link
                href="/practises/signup"
                className="btn btn-outline md:btn-lg"
              >
                Practices
              </Link>
            </div>
          </div>
        </div>

        {/* BODY CONTENT SECTION */}
        <section className="pt-6 px-4">
          <div className="space-y-12">
            <div className="space-y-6">
              {/* Horizontal Card 1 */}
              <div className="card shadow-lg flex flex-col md:flex-row items-center p-0 gap-4  bg-black">
                <div className="flex-shrink-0 w-full md:w-23/50">
                  <Image
                    src="/imgs/temple-indoor.jpg"
                    width={400}
                    height={400}
                    alt=""
                    className="object-cover w-full h-120 md:rounded-l-2xl
                    rounded-t-2xl
                    md:rounded-t-none"
                  />
                </div>
                <div className="flex-1 text-center p-10 flex flex-col gap-8 md:text-left text-base-100">
                  <h3 className="md:text-2xl text-xl font-semibold mb-2 lg:text-3xl">
                    Weekly Training
                  </h3>
                  <p className="lg:text-lg">
                    Improve your skills with long practice sessions held weekly
                    only available to club members
                  </p>
                  <span className="badge mt-3 lg:badge-lg">Practice</span>
                </div>
              </div>

              {/* Horizontal Card 2 */}
              <div className="card flex flex-col md:flex-row-reverse items-center p-0 gap-4">
                <div className="flex-shrink-0 w-full md:w-23/50">
                  <Image
                    src="/imgs/temple-tufas.jpg"
                    alt="Outdoor Climbing"
                    width={300}
                    height={200}
                    className="object-cover w-full h-120 rounded-2xl"
                  />
                </div>
                <div className="flex-1 text-center p-10 flex flex-col gap-8 md:text-left">
                  <h3 className="md:text-2xl text-xl font-semibold mb-2 lg:text-3xl">
                    TUFAS Bouldering Lounge
                  </h3>
                  <p className="lg:text-lg">
                    Come with us for free every Friday to TUFAS Bouldering
                    Lounge, a rock climbing gym in Fishtown.
                  </p>
                  <span className="badge badge-primary mt-3 lg:badge-lg">
                    Gyms
                  </span>
                </div>
              </div>

              {/* Horizontal Card 3 */}
              <div className="card bg-primary shadow-lg flex flex-col md:flex-row items-center p-0 gap-4">
                <div className="flex-shrink-0 w-full md:w-23/50">
                  <Image
                    src="/imgs/temple-outdoor.jpg"
                    alt="Expert Guidance"
                    width={300}
                    height={200}
                    className="object-cover w-full h-120 md:rounded-l-2xl
                    rounded-t-2xl md:rounded-t-none"
                  />
                </div>
                <div className="flex-1 text-center p-10 flex flex-col gap-8 md:text-left text-base-100">
                  <h3 className="md:text-2xl text-xl font-semibold mb-2 lg:text-3xl">
                    Outdoor Trips
                  </h3>
                  <p className="lg:text-lg">
                    Join us on outdoor climbing trips to improve your skills and
                    experience the world of outdoor climbing.
                  </p>
                  <span className="badge lg:badge-lg badge-base-100 mt-3">
                    Outdoor
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="mt-6 py-16 px-4 text-center bg-black text-primary-content">
          <h2 className="text-4xl font-bold mb-6">Ready to Climb?</h2>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Sign Up Now
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
