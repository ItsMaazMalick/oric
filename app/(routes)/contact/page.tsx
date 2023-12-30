import Footer from "@/components/footer/Footer";
import MainHeader from "@/components/header/MainHeader";
import { contactNumber, siteTitle } from "@/constants/basicInfo";
import React from "react";

const ContactPage = () => {
  return (
    <div>
      <MainHeader />
      <div className="m-2">
        <h2 className="text-center my-10 text-3xl font-bold text-primary">
          CONTACT
        </h2>
        <div className="space-y-4">
          <h3 className="text-center text-xl font-bold text-primary">
            Dr. Muhammad Latif Gondal
          </h3>
          <p className="text-center text-primary">
            Executive Director (Planning & Monitoring)
          </p>
          <p className="text-center text-primary">{siteTitle}</p>
          <p className="text-center text-primary">
            Allama Iqbal Open University
          </p>
          <p className="text-center text-primary">H-8 Islamabad</p>
          <p className="text-center text-primary">
            Email: muhammad.latif@aiou.edu.pk
          </p>
          <p className="text-center text-primary">Phone: {contactNumber}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
