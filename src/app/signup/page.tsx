import React from "react";

import Link from "next/link";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/Footer";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16 p-10">
        <div>
          <div className="flex w-full flex-col">
            <h1 className="font-bold text-center text-3xl mb-5">
              Steps to Sign Up
            </h1>

            <div className="divider">1.</div>
            <div className="card bg-base-200 rounded-box p-7">
              <p className="text-center">
                Register on DSE, you can use this{" "}
                <a
                  className="link"
                  href="https://temple.dserec.com/online/clubsports"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link
                </a>
                .
              </p>
            </div>
            <div className="divider">2.</div>
            <div className="card bg-base-200 rounded-box p-7">
              <p className="text-center">
                {" "}
                Pay dues to the treasurer of the club. For more info about
                memebership types visit the{" "}
                <Link
                  className="link"
                  href="/membership"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  memebership page
                </Link>
                .
              </p>
            </div>
            <div className="divider">3.</div>
            <div className="card bg-base-200 rounded-box p-7">
              <p className="text-center">
                Go to the{" "}
                <Link className="link" href="/practises/signup">
                  practises page
                </Link>{" "}
                and sign up for practises!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
